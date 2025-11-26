import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import * as path from 'path';

// Force Node.js runtime
export const runtime = 'nodejs';

const EXCEL_FILE_PATH = path.join(process.cwd(), 'data', 'newsletter-subscribers.xlsx');

// Ensure data directory exists
const ensureDataDirectory = async () => {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Read existing subscribers from Excel
const getSubscribers = async () => {
  await ensureDataDirectory();
  
  try {
    await fs.access(EXCEL_FILE_PATH);
    const fileBuffer = await fs.readFile(EXCEL_FILE_PATH);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data;
  } catch {
    return [];
  }
};

// Add new subscriber to Excel
const addSubscriber = async (email: string, name?: string) => {
  await ensureDataDirectory();

  const subscribers = await getSubscribers();
  
  // Check if email already exists
  const existingSubscriber = subscribers.find((sub: any) => sub.Email === email);
  if (existingSubscriber) {
    throw new Error('Email already subscribed');
  }

  const newSubscriber = {
    'Subscriber ID': subscribers.length + 1,
    'Email': email,
    'Name': name || 'Not provided',
    'Subscribed Date': new Date().toISOString(),
    'Status': 'Active',
    'Source': 'Blog Page'
  };

  subscribers.push(newSubscriber);

  // Create new workbook
  const worksheet = XLSX.utils.json_to_sheet(subscribers);
  
  // Set column widths
  worksheet['!cols'] = [
    { wch: 15 }, // Subscriber ID
    { wch: 30 }, // Email
    { wch: 25 }, // Name
    { wch: 20 }, // Subscribed Date
    { wch: 10 }, // Status
    { wch: 15 }  // Source
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers');
  
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  await fs.writeFile(EXCEL_FILE_PATH, buffer);

  return newSubscriber;
};

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Add to Excel
    let subscriber;
    try {
      subscriber = await addSubscriber(email, name);
    } catch (error: any) {
      if (error.message === 'Email already subscribed') {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 409 }
        );
      }
      throw error;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to subscriber (Welcome email)
    const subscriberEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Aimecol Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0C0C0C; color: #EDEDED;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0C0C0C;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1A1A1A 0%, #0C0C0C 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #D77B35 0%, #C85A23 50%, #004CFF 100%); padding: 40px 30px; text-align: center;">
              <img src="https://images.aimecol.com/uploads/large/aimecol_691c4680253c7_large.jpg" alt="Aimecol Logo" style="max-width: 180px; height: auto; margin-bottom: 20px; border-radius: 8px;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">Welcome to My Newsletter!</h1>
            </td>
          </tr>

          <!-- Success Banner -->
          <tr>
            <td style="padding: 20px 30px; background-color: #1A1A1A;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px; background: linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 230, 118, 0.05) 100%); border-radius: 12px; text-align: center; border: 1px solid rgba(0, 230, 118, 0.2);">
                    <p style="margin: 0; color: #00E676; font-size: 16px; font-weight: 600;">
                      ✨ You're successfully subscribed!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #D77B35; font-size: 24px; font-weight: 600;">Thank you for subscribing! 🎉</h2>
              
              <p style="margin: 0 0 20px 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                I'm thrilled to have you join my community of developers, designers, and tech enthusiasts!
              </p>

              <p style="margin: 0 0 20px 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                Here's what you can expect from my newsletter:
              </p>

              <!-- Benefits List -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 15px; background-color: #1A1A1A; border-radius: 8px; margin-bottom: 10px;">
                    <p style="margin: 0; color: #EDEDED; font-size: 15px;">
                      <span style="color: #D77B35; font-weight: 600;">📚 Technical Deep Dives</span><br>
                      <span style="color: #A0A0A0; font-size: 14px;">In-depth articles about React, Next.js, Flutter, and modern web development</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #1A1A1A; border-radius: 8px; margin-bottom: 10px;">
                    <p style="margin: 0; color: #EDEDED; font-size: 15px;">
                      <span style="color: #004CFF; font-weight: 600;">💡 Project Insights</span><br>
                      <span style="color: #A0A0A0; font-size: 14px;">Behind-the-scenes looks at my latest projects and case studies</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #1A1A1A; border-radius: 8px; margin-bottom: 10px;">
                    <p style="margin: 0; color: #EDEDED; font-size: 15px;">
                      <span style="color: #D77B35; font-weight: 600;">🚀 Career Growth Tips</span><br>
                      <span style="color: #A0A0A0; font-size: 14px;">Lessons learned from real-world experience in software development</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #1A1A1A; border-radius: 8px;">
                    <p style="margin: 0; color: #EDEDED; font-size: 15px;">
                      <span style="color: #004CFF; font-weight: 600;">🎨 Design & Innovation</span><br>
                      <span style="color: #A0A0A0; font-size: 14px;">Exploring the intersection of beautiful design and powerful functionality</span>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                I promise to deliver high-quality content without spamming your inbox. You'll typically hear from me 1-2 times a month with my latest insights and articles.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://aimecol.com/blog" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #D77B35 0%, #004CFF 100%); color: #FFFFFF; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(215, 123, 53, 0.3);">
                      📖 Read My Latest Articles
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                Thank you for being here! I'm excited to share my journey with you.
              </p>
              
              <p style="margin: 20px 0 0 0; color: #EDEDED; font-size: 16px; line-height: 1.8;">
                Best regards,<br>
                <strong style="color: #D77B35; font-size: 18px;">Aime Claudien</strong><br>
                <span style="color: #A0A0A0; font-size: 14px;">Full-Stack Developer & Designer</span>
              </p>
            </td>
          </tr>

          <!-- Social Links -->
          <tr>
            <td style="padding: 20px 30px; background-color: #1A1A1A; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 15px 0; color: #A0A0A0; font-size: 14px; text-align: center;">
                Connect with me on social media:
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://www.linkedin.com/in/aime-claudien-mazimpaka-61801b356" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #0077B5; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">LinkedIn</a>
                    <a href="https://github.com/Aimecol" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #333; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">GitHub</a>
                    <a href="https://x.com/aimecol314" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #1DA1F2; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">X (Twitter)</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 10px 0; color: #A0A0A0; font-size: 13px;">
                You're receiving this because you subscribed to the newsletter at <a href="https://aimecol.com" style="color: #D77B35; text-decoration: none;">aimecol.com</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">
                © ${new Date().getFullYear()} Aimecol. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Email to admin (notification)
    const adminEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Newsletter Subscriber</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0C0C0C; color: #EDEDED;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0C0C0C;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1A1A1A 0%, #0C0C0C 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #D77B35 0%, #C85A23 50%, #004CFF 100%); padding: 40px 30px; text-align: center;">
              <img src="https://images.aimecol.com/uploads/large/aimecol_691c4680253c7_large.jpg" alt="Aimecol Logo" style="max-width: 180px; height: auto; margin-bottom: 20px; border-radius: 8px;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">🎉 New Newsletter Subscriber!</h1>
            </td>
          </tr>

          <!-- Notification Banner -->
          <tr>
            <td style="padding: 20px 30px; background-color: #1A1A1A; border-bottom: 3px solid #00E676;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background-color: #00E676; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #000000; font-size: 14px; font-weight: 600;">
                      📧 Someone just subscribed to your newsletter!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subscriber Details -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #1A1A1A; border-radius: 12px; overflow: hidden; border: 1px solid rgba(215, 123, 53, 0.2);">
                <tr>
                  <td style="padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <h2 style="margin: 0 0 15px 0; color: #D77B35; font-size: 20px; font-weight: 600;">👤 Subscriber Information</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; width: 40%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Email Address:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px; font-weight: 600;">${email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; width: 40%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Name:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px; font-weight: 600;">${name || 'Not provided'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; width: 40%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Subscriber ID:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #004CFF; font-size: 16px; font-weight: 600;">#${subscriber['Subscriber ID']}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; width: 40%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Subscribed Date:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px;">${new Date(subscriber['Subscribed Date']).toLocaleString()}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; width: 40%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Source:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #EDEDED; font-size: 16px;">${subscriber.Source}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; width: 40%; vertical-align: top;">
                          <span style="color: #A0A0A0; font-size: 14px; font-weight: 500;">Total Subscribers:</span>
                        </td>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="color: #00E676; font-size: 18px; font-weight: 700;">${subscriber['Subscriber ID']}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Actions -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 15px 0; color: #A0A0A0; font-size: 14px;">
                      The subscriber has been added to your Excel file and received a welcome email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 10px 0; color: #A0A0A0; font-size: 13px;">
                Newsletter subscription notification from <a href="https://aimecol.com" style="color: #D77B35; text-decoration: none;">aimecol.com</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">
                © ${new Date().getFullYear()} Aimecol. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send emails
    await Promise.all([
      // Email to subscriber
      transporter.sendMail({
        from: `"Aimecol" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🎉 Welcome to Aimecol Newsletter!',
        html: subscriberEmailHTML,
        text: `Welcome to Aimecol Newsletter!\n\nThank you for subscribing! You'll receive quality content about development, design, and innovation.\n\nBest regards,\nAimecol`,
      }),
      
      // Email to admin
      transporter.sendMail({
        from: `"Aimecol Newsletter" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `🎉 New Newsletter Subscriber: ${email}`,
        html: adminEmailHTML,
        text: `New Newsletter Subscriber\n\nEmail: ${email}\nName: ${name || 'Not provided'}\nSubscriber ID: #${subscriber['Subscriber ID']}\nDate: ${new Date(subscriber['Subscribed Date']).toLocaleString()}\n\nTotal Subscribers: ${subscriber['Subscriber ID']}`,
      })
    ]);

    return NextResponse.json(
      { 
        message: 'Successfully subscribed!',
        subscriber: {
          id: subscriber['Subscriber ID'],
          email: subscriber.Email
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
