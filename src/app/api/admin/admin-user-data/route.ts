import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel"; // Import the Admin model
import User from "@/models/userModel"; // Import the User model
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    await connect();

    try {
        const token = request.cookies.get("adminToken")?.value || '';
        
        // Verify the token
        const decodedToken: any = jwt.verify(token, process.env.ADMIN_SECRET_TOKEN!);
        
        const adminId = decodedToken.id;
        const admin = await Admin.findById(adminId);
        
        // Check if the admin exists
        if (!admin) {
            return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 403 }
            );
        }
        
        const users = await User.find().select("-password").select("-_id");
        
        return NextResponse.json({
            message: "Success",
            success: true,
            users: users
        });
        
    } catch (error: any) {
        // For security, don't expose details about token verification failures
        return NextResponse.json(
            { message: "Unauthorized access" },
            { status: 401 }
        );
    }
}