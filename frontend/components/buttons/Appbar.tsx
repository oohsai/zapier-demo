"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./LinkButtons";
import { PrimaryButton } from "./PrimaryButton";


export const Appbar = ({type}: {type: "signup" | "signin" | "home" | "logout"}) => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            _Zapier
        </div>
        <div className="flex">
            {type === "home" ? (
                <div className="flex">
                <div className="pr-4">
                <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
            </div>
            <div className="pr-4">
                <LinkButton onClick={() => {
                    router.push("/login")
                }}>Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Sign up
            </PrimaryButton> 
            </div> 
            ) : null}
            {type === "signup" ? (
                <div>
                    <div className="flex">
                    <div className="pr-4">
                    <div className="flex justify-center px-2 py-2 cursor-pointer hover:font-bold font-light text-sm" onClick={() => {
                        router.push("/login")
                    }}>Login</div>
                </div>
            </div>
                </div>
            ):null}
            {type === "signin" ? (
                <div>
                    <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Sign up
            </PrimaryButton> 
                </div>
            ):null}
            {
                type === "logout" ? (
                    <div>
                    <PrimaryButton onClick={() => {
                        localStorage.removeItem("token");
                router.push("/")
            }}>
                Log Out
            </PrimaryButton> 
                </div>
                ) : null
            }
                      
        </div>
    </div>
}