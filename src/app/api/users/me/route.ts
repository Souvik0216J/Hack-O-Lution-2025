import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


export async function GET(request:NextRequest){
    await connect();

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password").select("-_id").select("-leaderCity").select("-projectIDea").select("-leaderLinkedin").select("-lastLogin");
        return NextResponse.json({
            message: "User found",
            success: true,
            user: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}