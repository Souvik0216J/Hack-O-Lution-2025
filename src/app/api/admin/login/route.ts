import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if admin exists
    const admin = await Admin.findOne({ adminEmail: email });

    if (!admin) {
      return NextResponse.json({ error: "Admin does not exist" }, { status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, admin.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create token data
    const tokenData = {
      id: admin._id,
      email: admin.adminEmail
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.ADMIN_SECRET_TOKEN!, { expiresIn: "1h" });

    const response = NextResponse.json({
      message: "Admin login successful",
      success: true,
    });

    response.cookies.set("adminToken", token, {
      httpOnly: true,
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
