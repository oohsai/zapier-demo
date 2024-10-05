import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
    clientId:'outbox-processor',
    brokers:['localhost:9092']
});

async function main() {

    const producer = kafka.producer();
    await producer.connect();

    while(1){
        const pendingRow = await client.zapRunOutBox.findMany({
            where: {},
            take:10
        })
        
        await producer.send({
            topic: TOPIC_NAME,
            messages: pendingRow.map(r => {
                return {
                    value: r.zapRunId
                }
            })
        })
        await client.zapRunOutBox.deleteMany({
            where: {
                id: {
                    in: pendingRow.map(x => x.id)
                }
            }
        })
    }
}

main();