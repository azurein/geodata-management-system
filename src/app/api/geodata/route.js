import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const middleware = "@/middleware.js";

/**
 * Spec for the route GET api/geodata.
 *
 * @openapi
 * /api/geodata:
 *   get:
 *     summary: Get User Geodata
 *     description: |
 *       Retrieves a list of geodata records associated with the authenticated user.
 *     tags:
 *       - Geodata
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful retrieval of user geodata
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique identifier of the geodata record.
 *                       userId:
 *                         type: integer
 *                         description: The ID of the user associated with the geodata.
 *                       geoJson:
 *                         type: object
 *                         description: The GeoJSON data representing the geographical information.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp indicating when the geodata was created.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp indicating when the geodata was last updated.
 *             example:
 *               success: true
 *               message: "List User Geodata"
 *               data:
 *                 - id: 1
 *                   userId: 1
 *                   geoJson: {}
 *                   createdAt: "2024-05-18T14:37:12.638Z"
 *                   updatedAt: "2024-05-18T14:37:12.638Z"
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
export async function GET(request) {
  try {
    const userId = await request.headers.get('x-user-id');
    
    const result = await prisma.userGeoData.findMany({
      where: {
        userId: parseInt(userId)
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "List User Geodata",
      data: result,
    }, { status: 200 });
  } catch (e) {
    console.error(e);
    
    return NextResponse.json({
      success: false,
      message: "Internal Server Error!",
    }, { status: 500 });
  }

}

export async function POST(request) {
  const userId = await request.headers.get('x-user-id');
  const { geoJson } = await request.json();

  if (!userId) {
    return NextResponse.json({
      success: false,
      message: 'Missing userId'
    }, { status: 400 });
  }

  try {
    const result = await prisma.userGeoData.create({
      data: {
        userId: parseInt(userId),
        geoJson: geoJson,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User Geo Data Created Successfully!"
    }, { status: 200 });
  } catch (e) {
    console.error(e);

    return NextResponse.json({
      headers: {
        'Content-Type': 'application/json'
      },
      success: false,
      message: 'Error creating user Geo Data',
      error: e.message
    }, { status: 500 });
  }
}
