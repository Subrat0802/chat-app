'use client'
import { signin, signup } from "@/services/operations/auth";
import { useParams } from "next/navigation";
import { useRef } from "react"


export function AuthPage({isSignin}:{isSignin: boolean}){
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const params = useParams();
    console.log("PARAMS", params);

    const handleClick = () => {
        const username = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(username, password, email);

        if(!isSignin){
            signup({username, email, password})
        }else if(isSignin){
            signin({email, password});
        }
        
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-2 bg-black text-white">
            {!isSignin && <input ref={nameRef} placeholder="Username" type="text" className="border"/>}
            <input ref={emailRef} placeholder="Email" type="text" className="border"/>
            <input ref={passwordRef} placeholder="Password" type="password" className="border"/>
            <button onClick={handleClick} className="bg-white p-2 text-black">{isSignin ? "SIgnin" : "Signup"}</button>
        </div>
    )
}