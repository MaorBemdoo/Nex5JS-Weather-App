"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaEyeSlash, FaEye } from "react-icons/fa6"

export default function Register() {

    const [full_name, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const redirect = useRouter()

    return (
        <form className="px-8 flex flex-col gap-4 is-[input]:*:block is-[input]:*:p-4 is-[input]:*:h-12 is-[input]:*:w-full is-[input]:*:rounded-md is-[input]:*:border is-[input]:*:border-gray-300 is-[input]:*:shadow-sm focus:is-[input]:*:border-indigo-300 focus:is-[input]:*:ring focus:is-[input]:*:ring-indigo-200 focus:is-[input]:*:ring-opacity-50">
            <input type="text" placeholder="Full Name" name="full_name" value={full_name} onChange={(e) => setFullname(e.target.value)}/>
            <input type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <div className="relative">
                <input type={isPasswordVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" className="block p-4 h-12 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <FaEyeSlash/> : <FaEye/>}</span>
            </div>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button type="submit" className="rounded bg-blue-900 text-white p-2 mb-2">Submit</button>
        </form>
    );
}
