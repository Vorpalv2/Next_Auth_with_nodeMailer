import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrpytjs from "bcryptjs";

interface customData {
  email: string;
  emailType: string;
  userID: number;
}

export async function sendEmail({ email, emailType, userID }: customData) {
  try {
    //TODO: configure mail for usage
    const hashedToken = await bcrpytjs.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e7dbb1e4d9ebaf",
        pass: "55c4ff95294d0a",
      },
    });

    const mailOptions = {
      from: "<maddison53@ethereal.email>", // sender address
      to: email, // list of receivers
      subject:
        emailType == "VERIFY" ? "Verify your Email" : "Rest your Password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">Here</a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      } or copy and paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
