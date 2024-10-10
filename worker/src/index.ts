import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";

const client = new PrismaClient();

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
    clientId:'outbox-processor',
    brokers:['localhost:9092']
});


async function main() {
    const consumer = kafka.consumer({groupId:"main-worker"});
    await consumer.connect();

    const producer = kafka.producer();
    await producer.connect();

    await consumer.subscribe({topic:"zap-events", fromBeginning: false})

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
        })

        if(!message.value?.toString()) {
            return;
        }

        const parsedValue = JSON.parse(message.value?.toString());
        const zapRunId = parsedValue.zapRunId;
        const stage = parsedValue.stage;

        const zapRunDetails = await client.zapRun.findFirst({
            where: {
                id:zapRunId
            }, include : {
                zap: {
                    include : {
                        action : {
                            include : {
                                type: true
                            }
                        }
                    }
                }
            }
        });

        const currentAction = zapRunDetails?.zap.action.find( x => x.sortingOrder === stage);

        if (!currentAction) {
            console.log("Current action not found");
            return;
        }

        const zapRunMetadata = zapRunDetails?.metadata;

        if (currentAction.type.id === "email") {
          const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
          const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
          console.log(`Sending out email to ${to} body is ${body}`)
        }

        if (currentAction.type.id === "send-sol") {

          const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
          const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
          console.log(`Sending out SOL of ${amount} to address ${address}`);
        }

        // message is not acknowledged
        await new Promise(r => setTimeout(r,5000));


        const zapId = message.value?.toString();
        const lastStage = (zapRunDetails?.zap.action?.length || 1) - 1;
        if(lastStage !== stage){
            await producer.send({
                topic: TOPIC_NAME,
                messages: [{
                    value: JSON.stringify({
                        stage : stage + 1,
                        zapRunId
                    })
                }]
            })
        }

        await consumer.commitOffsets([{
            topic:TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString()
        }])
        },
    })
}

main()