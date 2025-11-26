import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, budget, timeline } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // HTML email template
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0C0C0C; color: #EDEDED;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0C0C0C;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1A1A1A 0%, #0C0C0C 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #D77B35 0%, #C85A23 50%, #004CFF 100%); padding: 40px 30px; text-align: center;">
              <img src="https://images.aimecol.com/uploads/large/aimecol_691c4680253c7_large.jpg" alt="Aimecol Logo" style="max-width: 180px; height: auto; margin-bottom: 20px; border-radius: 8px;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">New Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Notification Banner -->
          <tr>
            <td style="padding: 20px 30px; background-color: #1A1A1A; border-bottom: 3px solid #D77B35;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background-color: #D77B35; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">
                      🔔 You have a new message from your portfolio website!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Information Section -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Sender Info Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #1A1A1A; border-radius: 12px; overflow: hidden; border: 1px solid rgba(215, 123, 53, 0.2);">
                <tr>
                  <td style="padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <h2 style="margin: 0 0 15px 0; color: #D77B35; font-size: 20px; font-weight: 600;">👤 Sender Information</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; width: 30%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Name:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px; font-weight: 600;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; width: 30%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Email:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <a href="mailto:${email}" style="color: #004CFF; font-size: 16px; text-decoration: none; font-weight: 500;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; width: 30%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Subject:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px; font-weight: 600;">${subject}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Project Details Card (if provided) -->
              ${budget || timeline ? `
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #1A1A1A; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0, 76, 255, 0.2);">
                <tr>
                  <td style="padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <h2 style="margin: 0 0 15px 0; color: #004CFF; font-size: 20px; font-weight: 600;">💼 Project Details</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      ${budget ? `
                      <tr>
                        <td style="padding: 10px 0; width: 30%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Budget Range:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px; font-weight: 600;">${budget}</span>
                        </td>
                      </tr>
                      ` : ''}
                      ${timeline ? `
                      <tr>
                        <td style="padding: 10px 0; width: 30%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Timeline:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px; font-weight: 600;">${timeline}</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Message Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #1A1A1A; border-radius: 12px; overflow: hidden; border: 1px solid rgba(215, 123, 53, 0.2);">
                <tr>
                  <td style="padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <h2 style="margin: 0 0 15px 0; color: #D77B35; font-size: 20px; font-weight: 600;">💬 Message</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0; color: #EDEDED; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #D77B35 0%, #004CFF 100%); color: #FFFFFF; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(215, 123, 53, 0.3); transition: transform 0.3s ease;">
                      📧 Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 10px 0; color: #A0A0A0; font-size: 13px;">
                This message was sent from your portfolio contact form at <a href="https://aimecol.com" style="color: #D77B35; text-decoration: none;">aimecol.com</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">
                © ${new Date().getFullYear()} Aimecol. All rights reserved.
              </p>
              <div style="margin-top: 15px;">
                <a href="https://www.linkedin.com/in/aime-claudien-mazimpaka-61801b356" style="display: inline-block; margin: 0 8px; color: #D77B35; text-decoration: none; font-size: 12px;">LinkedIn</a>
                <span style="color: #666666;">•</span>
                <a href="https://github.com/Aimecol" style="display: inline-block; margin: 0 8px; color: #D77B35; text-decoration: none; font-size: 12px;">GitHub</a>
                <span style="color: #666666;">•</span>
                <a href="https://x.com/aimecol314" style="display: inline-block; margin: 0 8px; color: #D77B35; text-decoration: none; font-size: 12px;">X</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission
============================

SENDER INFORMATION
------------------
Name: ${name}
Email: ${email}
Subject: ${subject}

${budget ? `PROJECT DETAILS\n------------------\nBudget Range: ${budget}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}

MESSAGE
-------
${message}

---
This message was sent from your portfolio contact form at aimecol.com
© ${new Date().getFullYear()} Aimecol. All rights reserved.
    `;

    // Send email
    await transporter.sendMail({
      from: `"Aimecol Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `🔔 New Contact: ${subject}`,
      text: textContent,
      html: htmlTemplate,
    });

    // Send auto-reply to sender
    const autoReplyHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Aimecol</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0C0C0C; color: #EDEDED;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0C0C0C;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1A1A1A 0%, #0C0C0C 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #D77B35 0%, #C85A23 50%, #004CFF 100%); padding: 40px 30px; text-align: center;">
              <img src="https://images.aimecol.com/uploads/large/aimecol_691c4680253c7_large.jpg" alt="Aimecol Logo" style="max-width: 180px; height: auto; margin-bottom: 20px; border-radius: 8px;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">Thank You for Reaching Out!</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                Thank you for getting in touch! I've received your message and I'm excited to hear about your project.
              </p>
              <p style="margin: 0 0 20px 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                I typically respond within <strong style="color: #D77B35;">24 hours</strong>. In the meantime, feel free to check out my latest work and blog posts on my website.
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #1A1A1A; border-radius: 12px; overflow: hidden; border: 1px solid rgba(215, 123, 53, 0.2);">
                <tr>
                  <td style="padding: 25px; text-align: center;">
                    <p style="margin: 0 0 15px 0; color: #A0A0A0; font-size: 14px;">Your message:</p>
                    <p style="margin: 0; color: #EDEDED; font-size: 15px; font-style: italic; line-height: 1.6;">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                Looking forward to connecting with you soon!
              </p>
              <p style="margin: 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                Best regards,<br>
                <strong style="color: #D77B35;">Aimecol</strong><br>
                <span style="color: #A0A0A0; font-size: 14px;">Full-Stack Developer & Designer</span>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 15px 0; color: #A0A0A0; font-size: 13px;">
                Visit my website: <a href="https://aimecol.com" style="color: #D77B35; text-decoration: none;">aimecol.com</a>
              </p>
              <div style="margin-top: 15px;">
                <a href="https://www.linkedin.com/in/aime-claudien-mazimpaka-61801b356" style="display: inline-block; margin: 0 8px; color: #D77B35; text-decoration: none; font-size: 12px;">LinkedIn</a>
                <span style="color: #666666;">•</span>
                <a href="https://github.com/Aimecol" style="display: inline-block; margin: 0 8px; color: #D77B35; text-decoration: none; font-size: 12px;">GitHub</a>
                <span style="color: #666666;">•</span>
                <a href="https://x.com/aimecol314" style="display: inline-block; margin: 0 8px; color: #D77B35; text-decoration: none; font-size: 12px;">X</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"Aimecol" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting me, ${name}!`,
      html: autoReplyHTML,
      text: `Hi ${name},\n\nThank you for getting in touch! I've received your message and I'm excited to hear about your project.\n\nI typically respond within 24 hours. Looking forward to connecting with you soon!\n\nBest regards,\nAimecol\nFull-Stack Developer & Designer\n\nVisit my website: https://aimecol.com`,
    });

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
