import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { generateAccessToken } from '@/lib/jwt';

const bcrypt = require("bcrypt");

export const middleware = "@/middleware.js";

/**
 * Spec for the route POST api/user/login.
 *
 * @openapi
 * /api/user/login:
 *   post:
 *     summary: User Login
 *     description: |
 *       Allows existing users to authenticate and obtain an access token (JWT) for authorized access to protected resources.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The registered email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password associated with the user's account.
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: "robin@example.com"
 *             password: "123"
 *     responses:
 *       "200":
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: The JSON Web Token (JWT) for authentication.
 *               example:
 *                 success: true
 *                 message: "Logged in!"
 *                 data:
 *                   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Example JWT (truncated)
 *       "401":
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *               example:
 *                 success: false
 *                 message: "Invalid email or password"
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Fetch User from Database
    const user = await prisma.user.findUnique({
      where: { email: email }, // Assuming the email is an email
    });

    // Handle Missing User
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid email!"
      }, { status: 401 });
    }

    // Compare Passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({
        success: false,
        message: "Invalid password!"
      }, { status: 401 });
    }

    // Create Access Token (exclude the password)
    const { password: _, ...userWithoutPass } = user;
    const accessToken = await generateAccessToken(userWithoutPass);

    // Send Successful Response
    return NextResponse.json({
      success: true,
      message: "Logged in!",
      data: { accessToken: accessToken }
    }, { status: 200 });
  } catch (e) {
    console.error(e);

    return NextResponse.json({
      success: false,
      message: "Internal Server Error!"
    }, { status: 500 });
  }
}
