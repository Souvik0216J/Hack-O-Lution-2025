import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { error } from 'console'


connect()

export async function POST(request: NextRequest) {
    try {
       const reqBody = await request.json() 
       const {teamName, teamSize, leaderName, leaderEmail, leaderNo, leaderCity, leaderClgName, leaderTshirtSize, projectIDea, isLeader} = reqBody

       console.log(reqBody)
       
       // cheak if user already exists
        const user = await User.findOne({leaderEmail})
        if(user){
            return NextResponse.json({error: "User already exists"}, 
                {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(leaderNo, salt)

        const newUser = new User({
            teamName : teamName,
            teamSize : teamSize,
            leaderName : leaderName,
            leaderEmail : leaderEmail,
            leaderNo : leaderNo,
            leaderCity : leaderCity,
            leaderClgName : leaderClgName,
            leaderTshirtSize : leaderTshirtSize,
            projectIDea : projectIDea,
            password: hashedPassword,
            isLeader : true
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "User created",
            success: true,
            savedUser
        }, {status: 201})
            
            
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}