import connect from '@/dbconfig/dbConfig'
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User not existed" }, { status: 400 });
        }

        // user id
        const id = user._id;
        const response = await sendEmail({ email, emailType: "RESET", userId: id });

        return NextResponse.json({
            message: "Email send successfully",
            res: response,
            sucess: true
        }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}