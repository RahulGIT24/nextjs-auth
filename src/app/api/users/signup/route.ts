import connect from "@/dbconfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { userName, email, password } = reqBody;

        // check if user already exist
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}