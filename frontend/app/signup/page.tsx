"use client"
import { Appbar } from "@/components/buttons/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function() {
    const router = useRouter();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    return <div>
        <Appbar type="signup" />
        <div className="grid grid-cols-2 p-4 items-center">
            <div>
                <div className="font-bold text-[3vh]">
                Join millions worldwide who automate their work using Zapier.
                </div>
                <div className=" pt-6 space-y-5">
                    <div className="flex items-center gap-2"><Check />Easy setup, no coding required<br></br></div>
                    <div className="flex items-center gap-2"><Check />Free forever for core features <br></br></div>
                    <div className="flex items-center gap-2"><Check />14-day trial of premium features & apps <br></br></div>
                </div>
            </div>
            <div>
                <Input label={"Work Email"} placeholder={"Email"} onChange={ e => {
                    setEmail(e.target.value);
                }} type="text">
                </Input>
                <Input label={"First Name"} placeholder={"John"} onChange={ e => {
                    setName(e.target.value);
                } } type="text">
                </Input>
                <Input label={"Password"} placeholder={"Password"} onChange={ e => {
                    setPassword(e.target.value);
                } } 
                type="text">
                </Input>
                <div className="pt-4">
                    <PrimaryButton onClick={async () => {
                        await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                            username: email,
                            password,
                            name
                        });
                        router.push("/login");
                    }} size="big">Get started free</PrimaryButton>
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