"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { FaEyeSlash, FaEye } from "react-icons/fa6"
import { toast } from "react-toastify"

export default function Register() {

    const [full_name, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const submitRef = useRef<HTMLButtonElement>(null)
    const redirect = useRouter()

    const register = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(submitRef.current !== null){
            submitRef.current.disabled = true
        }

        if(password !== confirmPassword){
            toast.error("Passwords are not equal")
            return
        }

        try{
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({full_name, username, password})
            })
            const data = await res.json()

            if(!res.ok){
                toast.error(data.message)
                return
            }

            toast.success(data.message)
            redirect.push("/")
        }catch(err){
            console.log(err)
            toast.error("Error Registering user")
        }finally{
            if(submitRef.current !== null){
                submitRef.current.disabled = false
            }
        }
    }

    return (
        <form onSubmit={register} className="px-8 flex flex-col gap-4 is-[input]:*:block is-[input]:*:p-4 is-[input]:*:h-12 is-[input]:*:w-full is-[input]:*:rounded-md is-[input]:*:border is-[input]:*:border-gray-300 is-[input]:*:shadow-sm focus:is-[input]:*:border-indigo-300 focus:is-[input]:*:ring focus:is-[input]:*:ring-indigo-200 focus:is-[input]:*:ring-opacity-50">
            <input type="text" placeholder="Full Name" name="full_name" value={full_name} onChange={(e) => setFullname(e.target.value)}/>
            <input type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <div className="relative">
                <input type={isPasswordVisible ? "text" : "password"} autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" className="block p-4 h-12 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl cursor-pointer opacity-50 hover:opacity-100" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <FaEyeSlash/> : <FaEye/>}</span>
            </div>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button type="submit" className="rounded bg-blue-900 text-white p-2 mb-2 disabled:bg-blue-900/50" ref={submitRef}>Submit</button>
        </form>
    );
}
