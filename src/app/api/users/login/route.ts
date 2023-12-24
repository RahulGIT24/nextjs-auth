import connect from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
    try {
        await connect();

        const reqBody = await req.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User not existed" }, { status: 400 });
        }

        const passwordCompare = await bcryptjs.compare(password, user.password);

        if (!passwordCompare) {
            return NextResponse.json({ message: "Please login with correct credentials" }, { status: 400 });
        }

        // create token data
        const tokenData = {
            id: user._id,
            userName: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}