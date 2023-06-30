import nodemailer from "nodemailer";

async function sendRegistrationEmail(name, email, username, password) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
    authMethod: "PLAIN",
  });

  const mailOptions = {
    from: "HospitalManagementSystem@example.com",
    to: process.env.TEST_EMAIL,
    subject: "Registration Details",
    text: `Dear ${name}, you have been successfully registered. Your Username/Reg.No is ${username} and Password is ${password}. Use them to access your portal. `,
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent:", info.messageId);
}

export default sendRegistrationEmail;
