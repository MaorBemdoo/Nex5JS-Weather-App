import { signOut } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await signOut({ redirect: false })

        return NextResponse.json({message: "Sucessfully logged out"}, {status: 200})
    }catch(err: any){
        return NextResponse.json({message: "Failed to logout" , error: err.message}, {status: 500})
    }
}