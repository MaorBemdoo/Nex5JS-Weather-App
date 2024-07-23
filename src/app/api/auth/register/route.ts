import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    const { full_name, username, password } = await req.json();

    if (!full_name || !username || !password) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        await connectDB();
    } catch (err: any) {
        return NextResponse.json(
            { message: "Error connecting to MongoDB", error: err.message },
            { status: 500 }
        );
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return NextResponse.json(
            { message: "Username already exist" },
            { status: 409 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const user = new User({
        full_name,
        username,
        password: hashedPassword,
    });

    try {
        await user.save();

        await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        return NextResponse.json(
            { message: "User created and signed in successfully" },
            { status: 201 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { message: "User creation or sign-in failed", error: err.message },
            { status: 500 }
        );
    }
}
