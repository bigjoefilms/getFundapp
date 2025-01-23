// pages/api/send-email.js
import nodemailer from 'nodemailer';

const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_PASSWORD;

const mailTransport = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  host: "smtp.gmail.com",
  auth: {
    user: user,
    pass: pass,
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      await mailTransport.sendMail({
        from: user,
        to: email,
        subject: "Please Confirm your account",
        html: `<h1>Email Confirmation</h1>
          <p>Thank you for signing up. Please confirm your email using the link below:</p>
          <a href="http://yourdomain.com/api/user/confirm" target="_blank" style="color: blue; text-decoration: none;">Click Here to Confirm</a>
          <p>If you didn't sign up for this service, you can safely ignore this email.</p>`,
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}