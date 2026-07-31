// backend/src/utils/emailService.js
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp, name) => {
  // Console এ OTP দেখান
  console.log(`========================================`);
  console.log(`📧 PASSWORD RESET OTP`);
  console.log(`📧 Email: ${email}`);
  console.log(`📧 OTP: ${otp}`);
  console.log(`📧 Name: ${name || 'User'}`);
  console.log(`📧 Time: ${new Date().toLocaleString()}`);
  console.log(`========================================`);

  // সবসময় সফল রিটার্ন করুন
  return { success: true, messageId: 'console-only' };
};

module.exports = {
  generateOTP,
  sendOTPEmail,
};
