import connect from '@/dbconfig/dbConfig'
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token, verfyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verfyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified",
            success: true,
            status: 200
        })

    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}