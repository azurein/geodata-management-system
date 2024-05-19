import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const middleware = "@/middleware.js";

/**
 * Spec for the route POST api/geodata.
 *
 * @openapi
 * /api/geodata:
 *   post:
 *     summary: Upload User Geodata
 *     description: |
 *       Uploads a GeoJSON file containing geographical data associated with the authenticated user.
 *     tags:
 *       - Geodata
 *     security:
 *       - bearerAuth: [] # Requires a valid Bearer token for authentication
 *     requestBody:
 *       content:
 *         multipart/form-data: # Specify multipart/form-data for file uploads
 *           schema:
 *             type: object
 *             properties:
 *               geoJson:
 *                 type: string
 *                 format: binary # Indicate that this is a binary file (GeoJSON)
 *                 description: The GeoJSON file to be uploaded.
 *       required: true
 *     responses:
 *       "201": # Use 201 Created for successful resource creation
 *         description: User GeoData created successfully
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
 *                 message: "User Geo Data Created Successfully!"
 *       "400":
 *         description: Bad Request - Invalid GeoJSON file or missing data
 *         content:
 *           application/json:
 *             schema:
 *               # ... (same as 201 but with error message example)
 *       "401":
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               # ... (same as 201 but with error message example)
 */
export async function POST(request) {
  const userId = await request.headers.get('x-user-id');
  const formData = await request.formData();
  const file = formData.get("geoJson");

  if (!file) {
    return NextResponse.json({
      success: false,
      message: "No file uploaded"
    }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({
      success: false,
      message: 'Missing userId'
    }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const geoJsonContent = buffer.toString('utf8');

  try {
    const result = await prisma.userGeoData.create({
      data: {
        userId: parseInt(userId),
        geoJson: geoJsonContent,
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
