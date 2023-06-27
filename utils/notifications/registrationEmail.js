import nodemailer from "nodemailer";

async function sendRegistrationEmail(name, email, username, password) {
  // Create a Nodemailer transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Compose the email
  const mailOptions = {
    from: "HospitalManagementSystem@example.com",
    to: email,
    subject: "Registration Details",
    text: `Dear ${name}, you have been successfully registered. Your Username/Reg.No is ${username} and Password is ${password}. Use them to access your portal. `,
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent:", info.messageId);
}

export default sendRegistrationEmail;
