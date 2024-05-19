import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const middleware = "@/middleware.js";

/**
 * Spec for the route POST api/user/register.
 *
 * @openapi
 * /api/user/register:
 *   post:
 *     summary: User Registration
 *     description: |
 *       Registers a new user with the provided name, email, and password.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user's account.
 *             required:
 *               - name
 *               - email
 *               - password
 *           example:
 *             name: "Robin@example.com"
 *             email: "robin@example.com"
 *             password: "123"
 *     responses:
 *       "201":
 *         description: Successful registration
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
 *                 success: true
 *                 message: "Success registration with email: robin@example.com"
 *       "400":
 *         description: Bad Request - Missing or invalid input data
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
 *                 message: "Email is already registered"
 *       "500":
 *         description: Internal Server Error - Unexpected error during registration
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
 *                 message: "Internal server error"
 */
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const saltRounds = 10; // Adjust the salt rounds as needed for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user with the hashed password
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Success registration with email: ${email}`
      }, { status: 200 });
  } catch (e) {
    console.error(e);
    
    return NextResponse.json(
      {
        success: false,
        message: 'User with this email already exists!',
      }, { status: 500 });
  }
}