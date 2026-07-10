import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, company, jobTitle, companySize, message } = body;

  const name = [firstName, lastName].filter(Boolean).join(" ");

  await resend.emails.send({
    from: "IncentIQ <onboarding@resend.dev>",
    to: "sreekanth.lapala@incentiq.ai",
    subject: `New Demo Request from ${name} — ${company}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0F2E24; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">
            New Demo Request — IncentIQ
          </h1>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #eee;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #475569; font-size: 14px; width: 140px;">Name</td>
              <td style="padding: 12px 0; color: #0B1D2D; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #475569; font-size: 14px;">Email</td>
              <td style="padding: 12px 0; color: #0B1D2D; font-weight: 600;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #475569; font-size: 14px;">Company</td>
              <td style="padding: 12px 0; color: #0B1D2D; font-weight: 600;">${company}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #475569; font-size: 14px;">Job title</td>
              <td style="padding: 12px 0; color: #0B1D2D; font-weight: 600;">${jobTitle || "Not provided"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #475569; font-size: 14px;">Sales team size</td>
              <td style="padding: 12px 0; color: #0B1D2D; font-weight: 600;">${companySize || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #475569; font-size: 14px;">Message</td>
              <td style="padding: 12px 0; color: #0B1D2D; font-weight: 600;">${message || "No message"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #E8F5E9; border-radius: 8px; border-left: 4px solid #00A651;">
            <p style="margin: 0; color: #0F2E24; font-size: 13px; font-weight: 600;">
              Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
          </div>
        </div>
      </div>
    `,
  });

  return Response.json({ success: true });
}
