import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await connect()
    try {

        const reqBody = await request.json()
        const { teamId, projectLink, githubLink } = reqBody

        if (!teamId || !projectLink || ! githubLink) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields'
            }, { status: 400 })
        }

        // update the record
        const team = await User.findOneAndUpdate(
            { teamId: teamId },
            { $set: { 'projectSubmit.0.isSubmit': true }, 'projectSubmit.0.projectLink': githubLink, 'projectSubmit.0.hostedLink': projectLink},
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
            message: `Project Submitted`,
            data: team
        }, { status: 200 })

    } catch (error: any) {
        console.error('Project Submitting error:', error)
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
            error: error.message
        }, { status: 500 })
    }
}