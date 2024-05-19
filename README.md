This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Geo Data Management System
This project is a Backend Component for [bvt-dashboard](https://github.com/azurein/bvt-dashboard). Deployment using Vercel, CI/CD using integration between Github and Vercel, Database using Vercel.

## Features (MVP)
- **Seeding and Migration:** Automated database schema initialization and updates.
- **Data Reader Endpoint:** API for uploading and validating GeoJSON files.
- **Authentication and Authorization:** Secure API access using Next.js middleware.
- **Data Processing Endpoint:** Efficiently process and store spatial data.

## Future Development
- **User Input Validation:** Validate data uploaded through API endpoints.
- **API Documentation (Swagger/Next.js):** Comprehensive and up-to-date documentation.
- **Unit Testing (Jest):** Thorough unit tests for key API routes and middleware.

## Installation
1. **Clone the Repository:**
   ```bash
   git clone <your-github-repo-link>
1. **Create .env File (contact me for key-value)**
1. **Install dependencies:**
   ```bash
   npm install
1. **Run project:**
   ```bash
   npm run dev
1. **Consume APIs:**
   ```bash
   # Authenticate User
   curl --location '{{baseUrl}}/api/user/login' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "email": "{{contact me for value}}",
      "password": "{{contact me for value}}"
   }'

   # Get Geo JSON of authenticated in User
   curl --location 'http://{{baseUrl}}/api/geodata' \
   --header 'Content-Type: application/json' \
   --header 'Authorization: Bearer {{accessToken}}' \
   --data '{
      "geoJson": "{{jsonString}}"
   }'

   # Post Geo JSON of authenticated in User
   curl --location 'http://{{baseUrl}}/api/geodata' \
   --header 'Content-Type: application/json' \
   --header 'Authorization: Bearer {{accessToken}}' \
   --data '{
      "geoJson": "{{jsonString}}"
   }'

## Postman Collection
Contact me