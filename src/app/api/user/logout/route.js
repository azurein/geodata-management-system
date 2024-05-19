import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const middleware = "@/middleware.js";

/**
 * Spec for the route POST api/user/logout.
 *
 * @openapi
 * /api/user/logout:
 *   post:
 *     summary: User Logout
 *     description: |
 *       Logs out the currently authenticated user, invalidating their access token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: [] # Requires a valid Bearer token for authentication
 *     responses:
 *       "200":
 *         description: Successful logout
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
 *                 message: "Logged out!"
 *       "401":
 *         description: Unauthorized - Invalid or missing authentication token
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
 *                 message: "Unauthorized"
 */
export async function POST(request) {
  try {
    const accessToken = await request.headers.get('Authorization');
    const token = accessToken?.split(" ")[1];
    // Add invalidated token to database
    // TODO: change to redis
    const result = await prisma.invalidatedToken.create({
      data: {
          token: token,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Logged out!"
    }, { status: 200 });
  } catch (e) {
    console.error(e);
    
    return NextResponse.json(
      {
        success: true,
        message: 'Logged out!',
      }, { status: 200 });
  }
}
