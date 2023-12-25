import { getData } from "@/helpers/getData";
import connect from "@/dbconfig/dbConfig"
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";

connect();

export async function GET(request:NextRequest){
    try{
        const userId = await getData(request);
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User found",
            data:user
        });
    }catch(e:any){
        return NextResponse.json({error:e.message},{status:400})
    }
}