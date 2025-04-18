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
    // Loop through each recipient and send a personalized email
    for (const person of allRecipients) {
      const { name, email } = person;

      await resend.emails.send({
        from: 'HACK{0}LUTION <hackolution2024@gmail.com>',
        to: email,
        subject: `🎉 Registration Successful - ${teamName}`,
        html: `
          <h2>Hi ${name} 👋</h2>
          <p>You've been successfully registered as a member of team <strong>${teamName}</strong> for Hack{0}Lution!</p>
          <p>We're excited to have you on board. More updates will be coming soon.</p>
          <br/>
          <h3>Your team's login credentials are</h3>
          <p>Email: <strong>${leaderEmail}</strong></p>
          <p>Password: <strong>${leaderNo}</strong></p>
          <br/>
          <p>Best Regards</p>
          <p>Team Hack{0}Lution</p>
        `,
      });
    }

    return NextResponse.json({ message: "Registration successful and emails sent." }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ error: "Registration successful but failed to send some emails." }, { status: 500 });
  }
}
