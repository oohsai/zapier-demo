"use client"
import { Appbar } from "@/components/buttons/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { BACKEND_URL } from "../config";

export default function() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return <div>
        <Appbar type="signin" />
        <div className="grid grid-cols-2 p-4 items-center">
            <div>
                <div className="font-bold text-[3vh]">
                Automate across your teams
                </div>
                <div className=" pt-6">
                    <div>Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.</div>
                </div>
            </div>
            <div>
                <Input label={"Email"} placeholder={"Email"} onChange={ e => {setEmail(e.target.value)}} type="text">
                </Input>
                <Input label={"Password"} placeholder={"Password"} onChange={ e =>{setPassword(e.target.value)} } 
                type="password">
                </Input>
                <div className="pt-4">
                    <PrimaryButton onClick={async () => {
                        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                            username: email,
                            password,
                        });
                        localStorage.setItem("token", res.data.token);
                        router.push("/dashboard");
                    }} size="big">Login</PrimaryButton>
                </div>
            </div>
        </div>
    </div>
}


function Check() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
  
}