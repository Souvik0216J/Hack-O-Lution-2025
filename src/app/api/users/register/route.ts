import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'


export async function POST(request: NextRequest) {
    await connect() // wait for connection
    try {
        const reqBody = await request.json()
        const { teamName, teamSize, leaderName, leaderEmail, leaderDiscord, leaderLinkedin, leaderGithub, leaderNo, leaderCity, leaderClgName, leaderTshirtSize, projectIDea, members } = reqBody
        const id = leaderNo.slice(-6)

        // cheak if user already exists
        const user = await User.findOne({ leaderEmail })
        if (user) {
            return NextResponse.json({ error: "User already exists" },
                { status: 400 })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(leaderNo, salt)

        // Create timestamp in IST format
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }

        const selectionInfo = [{
            isSelected: "Pending",
        }]

        const projectSubmit = [{
            isSubmit: false,
            projectLink: "null",
            hostedLink: "null",
        }]

        const istTime = date.toLocaleString('en-IN', options);
        const lastLogin = "null"
        
        const newUser = new User({
            date: istTime,
            teamId: id,
            teamName: teamName,
            teamSize: teamSize,
            leaderName: leaderName,
            leaderEmail: leaderEmail,
            leaderLinkedin: leaderLinkedin,
            leaderGithub: leaderGithub,
            leaderDiscord: leaderDiscord,
            leaderNo: leaderNo,
            leaderCity: leaderCity,
            leaderClgName: leaderClgName,
            leaderTshirtSize: leaderTshirtSize,
            members: members,
            projectIDea: projectIDea,
            password: hashedPassword,
            selectionInfo: selectionInfo,
            projectSubmit: projectSubmit,
            lastLogin: lastLogin
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created",
            success: true,
            savedUser
        }, { status: 201 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}