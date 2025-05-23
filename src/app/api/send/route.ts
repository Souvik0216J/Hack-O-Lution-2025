import resend from "@/utils/resend"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const { leaderEmail, leaderName, members, teamName, leaderNo } = data;

  // Create a combined list of leader and all members
  const allRecipients = [
    { name: leaderName, email: leaderEmail },
    ...members.filter((m: any) => m.name && m.email),
  ];

  try {
    // Loop through each recipient
    for (const person of allRecipients) {
      const { name, email } = person;

      await resend.emails.send({
        from: 'HACK{0}LUTION <noreply@hackolution.tech>',
        to: email,
        subject: `Registration Successful - ${teamName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Successful</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #4a86e8;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .header h1 {
                color: #ffffff;
                margin: 0;
                font-size: 24px;
              }
              .content {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 0 0 5px 5px;
                border: 1px solid #e9e9e9;
                border-top: none;
              }
              .credentials {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                border-left: 4px solid #4a86e8;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #666666;
                font-size: 14px;
              }
              .button {
                display: inline-block;
                background-color: #4a86e8;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 4px;
                margin-top: 15px;
                font-weight: bold;
              } 
              .social-links {
                margin-top: 20px;
              }
              .social-links a {
                margin: 0 10px;
                text-decoration: none;
                color: #4a86e8;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>HACK{0}LUTION</h1>
              </div>
              <div class="content">
                <h2>Welcome, ${name}!</h2>
                
                <p>Your registration for <strong>Hack{0}Lution 2025</strong> has been successfully completed. You are now officially a member of team <strong>${teamName}</strong>.</p>
                
                <p>We're thrilled to have you on board! Your project idea is currently under review - stay tuned for the next update!</p>
                
                <div class="credentials">
                  <h3>Your Team Login Information</h3>
                  <p><strong>Email:</strong> ${leaderEmail}</p>
                  <p><strong>Password:</strong> ${leaderNo}</p>
                  <p>Please save these credentials as you'll need them to access your team dashboard.</p>
                </div>
                
                <p>For any queries, feel free to join our official Discord server and contact our support team.</p>
                
                <a href="https://hackolution.tech/login" style="color: #ffffff; font-weight: bold;" class="button">Dashboard</a>
                
                <div class="footer">
                  <p>Best Regards,<br/>Team Hack{0}lution</p>
                  <p>© 2025 Hack{0}lution. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    }

    return NextResponse.json({ message: "Registration successful and emails sent." }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ error: "Registration successful but failed to send some emails." }, { status: 500 });
  }
}