import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await connect()
    try {

        const token = request.cookies.get("adminToken")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 403 }
            );
        }

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

        const reqBody = await request.json()
        const { teamId, status } = reqBody

        if (!teamId || !status) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields'
            }, { status: 400 })
        }

        // Validate status value
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid status value'
            }, { status: 400 })
        }

        // update the record
        const team = await User.findOneAndUpdate(
            { teamId: teamId },
            { $set: { 'selectionInfo.0.isSelected': status } },
            { new: true }
        )

        // if team was not found
        if (!team) {
            return NextResponse.json({
                success: false,
                message: 'Team not found'
            }, { status: 404 })
        }

        // success response
        return NextResponse.json({
            success: true,
            message: `Team status updated to ${status}`,
            data: team
        }, { status: 200 })

    } catch (error: any) {
        console.error('Update status error:', error)
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
            error: error.message
        }, { status: 500 })
    }
}