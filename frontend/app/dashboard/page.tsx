"use client"
import { Appbar } from "@/components/buttons/Appbar";
import { TButton } from "@/components/buttons/TButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URl } from "../config";
import { LinkButton } from "@/components/buttons/LinkButtons";
import { useRouter } from "next/navigation";

interface Zap {
        "id": string,
        "triggerId": string,
        "userId": number,
        "action":
            {
                "id": string,
                "zapId": string,
                "actionId": string,
                "sortingOrder": number,
                "type": {
                    "id": string,
                    "name": string,
                    "image": string
                }
            }[],
        "trigger": {
            "id": string,
            "zapId": string,
            "triggerId": string,
            "type": {
                "id": string,
                "name": string,
                "image": string
            }
        }
}

function useZaps(){
    const [loading,setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false);
            })
    }, [])

    return {
        loading,zaps
    }
}

function ZapTable({zaps} : {zaps: Zap[]}) {
    const router = useRouter();
    return <div className="p-8 max-w-screen-lg w-full">
    <div className="flex">
            <div className="flex-1">Name</div>
            <div className="flex-1">ID</div>
            <div className="flex-1">Created at</div>
            <div className="flex-1">Webhook URL</div>
            <div className="flex-1">Go</div>
    </div>
                {zaps.map(z => 
                    <div className="flex border-b border-t py-4">
                            <div className="flex flex-1"><img src ={z.trigger.type.image} className="w-[30px] h-[30px]" /> {z.action.map(x => <img src={x.type.image} className="w-[30px] h-[30px]" />)}</div>
                            <div className="flex-1">{z.id}</div>
                            <div className="flex-1">06 Oct, 2024</div>
                            <div className="flex-1">{`${HOOKS_URl}/hooks/catch/1/${z.id}`}</div>
                            <div className="flex-1"><LinkButton onClick={() => {
                            router.push("/zap/"+ z.id)
                    }}>Go</LinkButton></div>
                    </div>
                )
                }
    </div>
}

export default function() {
    const router = useRouter();
    const { loading, zaps } = useZaps();

    return <div>
        <Appbar type="logout" />
        <div className="flex justify-center items-center pt-8">
            <div className="max-w-screen-lg w-full">
                <div className="flex justify-between pr-8">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                    <TButton onClick={ () => {
                        router.push("/zap/create")
                    } } size="small">Create Zap</TButton>
                    </div>
                </div>
        </div>
        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}