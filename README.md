Contact Notes Service API
A secure, documented REST API for managing contacts and notes, built with Node.js, Express, Prisma, and
PostgreSQL. Authenticated with JWT and documented with Swagger.
---
Features
- JWT-based authentication
- CRUD operations for Contacts and Notes
- Field normalization for note content (note_body, note_text -> body)
- PostgreSQL database via Prisma ORM
- Swagger UI for API testing
- Deduplication script for cleaning up test data
- Fully containerizable, production-ready setup
---
Tech Stack
- Node.js + Express
- Prisma (ORM)
- PostgreSQL
- Swagger (swagger-ui-express + YAML)
- dotenv for config

- JWT (jsonwebtoken) for authentication
---
Setup Instructions
1. Clone the Repo
git clone https://github.com/your-username/contact-notes-service.git
cd contact-notes-service
2. Create .env file
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/notesdb"
JWT_SECRET=your_jwt_secret
3. Install dependencies
npm install
4. Set up the database
Create the DB manually or using psql:
CREATE DATABASE notesdb;
Then push schema:
npx prisma db push
5. Seed sample data
node prisma/seed.js

(Optional) Open Prisma Studio:
npx prisma studio
6. Start the server
node src/server.js
---
API Documentation
Once running, visit:
http://localhost:3000/docs
You->ll see a Swagger UI with all routes and examples.
---
Authentication
1. Login via POST /login
Use test credentials like:
{
"username": "admin",
"password": "password"
}
2. Copy the returned JWT token.
3. Click the Authorize button in Swagger and paste:
Bearer <your-token>
---

Final Commands Summary

# PostgreSQL setup
psql -U postgres
CREATE DATABASE notesdb;

# In project root
npm install
npx prisma db push
node prisma/seed.js
npx prisma studio
node src/server.js

# Swagger URL
http://localhost:3000/docs
