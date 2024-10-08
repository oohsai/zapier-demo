"use client"
import { Appbar } from "@/components/buttons/Appbar";
import { LinkButton } from "@/components/buttons/LinkButtons";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/Zapsell";
import { useState } from "react";


// export default function() {
//     const [selectedTrigger, setSelectedTrigger] = useState("");
//     const [selectedActions, setSelectedActions] = useState<{
//         availableTriggerId: string;
//         availableActionName: string;
//     }[]>([]);


//     return <div>
//         <Appbar type="home" />
//         <div className="w-full min-h-screen bg-slate-200 flex-col flex justify-center pt-[-80px]">
//             <div className="flex justify-center w-full">
//                 <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}></ZapCell>
//             </div>
//             <div className="flex justify-center w-full">
//                 {selectedActions.map((action, index) => <ZapCell name={action ? action.availableActionName : "Action"} index={1+index}></ZapCell>)}
//                 <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}></ZapCell>
//             </div>
//             <LinkButton onClick={ () => {
//                 setSelectedActions(a => [...a, {
//                     availableActionId: "",
//                     availableActionName: ""
//                 }])
//             }}>+</LinkButton>
//         </div>
//     </div>
// }

export default function() {
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<{
        availableActionId: string;
        availableActionName: string;
    }[]>([]);
    return <div>
        <Appbar type="home" />
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">
                <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1} />
            </div>
            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action, index) => <div className="pt-2 flex justify-center"> <ZapCell name={action.availableActionName ? action.availableActionName : "Action"} index={2 + index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <div>
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            availableActionId: "",
                            availableActionName: ""
                        }])
                    }}><div className="text-2xl">
                        +
                    </div></PrimaryButton>
                </div>
            </div>
        </div>
    </div>
}