import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    await connect()
    try {

        const reqBody = await request.json()
        const { teamId, projectLink, githubLink, pptLink, techStack, difficulty, projectVideo, isBeginner } = reqBody

        console.log(reqBody)

        if (!teamId || !projectLink || !githubLink || !pptLink || !techStack || !difficulty || !projectVideo || !isBeginner) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields'
            }, { status: 400 })
        }

        const team = await User.findOneAndUpdate(
            { teamId: teamId },
            {
                $set: {
                    'projectSubmit.0.isSubmit': true,
                    'projectSubmit.0.projectLink': githubLink,
                    'projectSubmit.0.hostedLink': projectLink,
                    'projectSubmit.0.pptLink': pptLink,
                    'projectSubmit.0.techStack': techStack,
                    'projectSubmit.0.projectVideo': projectVideo,
                    'projectSubmit.0.difficulty': difficulty,
                    'projectSubmit.0.isBeginner': isBeginner,
                }
            },
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