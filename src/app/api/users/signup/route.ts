import connectToDB from "@/dbconfig/dbConnect";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "user already exists", status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // send verification email

    await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

    return NextResponse.json({
      message: "user registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "get request working", status: 200 });
}
