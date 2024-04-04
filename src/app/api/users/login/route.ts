import connectToDB from "@/dbconfig/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

interface JSONToken {
  id: string;
  username: string;
  email: string;
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connectToDB();
    const userData = await request.json();

    const { username, email, password } = userData;
    const searchInDB = await User.findOne({ email });

    if (searchInDB) {
      const passwordValidation = await bcryptjs.compare(
        password,
        searchInDB.password
      );

      if (!passwordValidation) {
        return NextResponse.json({
          error: "Check your Credientials",
          status: 400,
        });
      }

      const payLoad: JSONToken = {
        id: searchInDB._id,
        username: searchInDB.username,
        email: searchInDB.email,
      };

      const token = jwt.sign(payLoad, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        loggedIn: "success",
        success: true,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    } else {
      return NextResponse.json({
        error: "Unable to find User in Database",
        status: 400,
      });
    }
  } catch (error: any) {
    console.log("error with POST Request : ", error.message);
  }
}
