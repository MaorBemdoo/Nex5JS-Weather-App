import User from "@/models/User";
import { auth } from "@/utils/auth";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth()

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401})
    }

    try{
        await connectDB()

        const user = await User.findOne({ _id: session.user?.id });

        return NextResponse.json({
            id: user._id,
            username: user.username,
            full_name: user.full_name,
            favourites: user.favourites,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }, {status: 200})
    }catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}