// utils/emailService.js
const nodemailer = require('nodemailer');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
const sendOTPEmail = async (email, otp, name) => {
  try {
    // Check if email configuration exists
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn(
        '⚠️ Email credentials not configured. Using console log instead.',
      );
      console.log(`📧 OTP for ${email}: ${otp}`);
      return { success: true, messageId: 'console-log' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #132018; color: #D8C9A3; padding: 20px; text-align: center; }
          .content { padding: 30px; background-color: #F7F3E9; }
          .otp-box { 
            background: white; 
            border: 2px solid #B08D57; 
            padding: 20px; 
            text-align: center; 
            margin: 20px 0;
            border-radius: 8px;
          }
          .otp-code { 
            font-size: 36px; 
            font-weight: bold; 
            color: #3F6B4F;
            letter-spacing: 8px;
          }
          .footer { 
            background-color: #132018; 
            color: #D8C9A3; 
            padding: 15px; 
            text-align: center; 
            font-size: 12px;
          }
          .expiry { color: #e74c3c; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📚 BookManager</h1>
            <p>Password Reset Request</p>
          </div>
          <div class="content">
            <h2>Hello ${name || 'User'}! 👋</h2>
            <p>We received a request to reset your password for your BookManager account.</p>
            <p>Your OTP (One-Time Password) is:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            
            <p>This OTP is valid for <span class="expiry">5 minutes</span>.</p>
            
            <p style="margin-top: 20px;">
              <strong>Didn't request this?</strong><br>
              If you didn't request a password reset, please ignore this email or contact support.
            </p>
            
            <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
            
            <p style="font-size: 14px; color: #666;">
              For security, never share your OTP with anyone.
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} BookManager. All rights reserved.</p>
            <p>Made with ❤️ for book lovers</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"BookManager" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Password Reset OTP - BookManager',
      html: htmlContent,
      text: `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes.\n\nIf you didn't request this, please ignore this email.`,
    });

    console.log('📧 Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    // Don't throw error in development, just log OTP
    if (process.env.NODE_ENV === 'development') {
      console.log(`📧 [DEV] OTP for ${email}: ${otp}`);
      return { success: true, messageId: 'dev-mode' };
    }
    throw new Error('Failed to send OTP email');
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
};
