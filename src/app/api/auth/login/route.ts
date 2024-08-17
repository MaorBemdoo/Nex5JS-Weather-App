import { auth, signIn } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { username, password } = await req.json()

    if(!username || !password){
        return NextResponse.json({ message: 'Missing required fields' }, {status: 400});
    }

    try{
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false
        })

        return NextResponse.json({message: "Successfully logged in"}, {status: 200});
    }catch(err: any){
        console.log(err)
        return NextResponse.json({message: err.cause.err.message}, {status: err.cause.err.status})
    }
}