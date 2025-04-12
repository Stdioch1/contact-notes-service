# Contact Notes Service 📝

A backend service to manage contacts and their attached notes, built as a take-home project for Linq.

This API supports JWT-based authentication, full CRUD operations, and field normalization for notes (e.g., `note_body`, `note_text` → `body`).

---

## 🚀 Tech Stack

- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- dotenv for config management
- Postman/Thunder Client for testing

---

## 📦 Project Structure

contact-notes-service/ ├── src/ │ ├── routes/ │ │ ├── auth.js │ │ ├── contacts.js │ │ └── notes.js │ ├── middleware/ │ │ └── auth.js │ └── server.js ├── prisma/ │ └── schema.prisma ├── .env ├── .gitignore ├── package.json └── README.md

yaml

---

## 🔐 Authentication

**Login Endpoint:**
```http
POST /login
Body:

json

{
  "username": "admin",
  "password": "password"
}
✅ Returns a JWT token, which must be included in all protected endpoints as:

makefile

Authorization: Bearer <your_token>
📘 API Endpoints
🔑 Auth
Method	Endpoint	Description
POST	/login	Login to receive JWT token
👥 Contacts
Method	Endpoint	Description
GET	/contacts	Get all contacts
POST	/contacts	Create a contact
GET	/contacts/:id	Get contact by ID
PUT	/contacts/:id	Update a contact
DELETE	/contacts/:id	Delete a contact
📝 Notes
Method	Endpoint	Description
POST	/notes	Create a note (normalized input fields like note_body, note_text)
GET	/notes/:id	Get a note by ID
PUT	/notes/:id	Update a note
DELETE	/notes/:id	Delete a note
⚙️ Running Locally
1. Clone the Repository

git clone https://github.com/Stdioch1/contact-notes-service.git
cd contact-notes-service
2. Install Dependencies

npm install
3. Set up .env
Create a .env file in the root directory:


JWT_SECRET=your_secret_key
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/notesdb"
Make sure the database notesdb exists.

4. Migrate the Database

npx prisma migrate dev --name init
5. Start the Server

node src/server.js
The server will start at:
➡️ http://localhost:3000

📥 Field Normalization
During note creation or update, the backend will automatically convert:

note_body or note_text → body

You can send any of the three — they’ll be handled the same.

🤔 Assumptions
No user registration is required (single-user flow assumed).

Notes must reference an existing contact (contactId).

JWT expiration is 1 hour for demo purposes.

💡 Improvements with More Time
Swagger/OpenAPI documentation at /docs

Role-based user system and registration

Search/filter notes by contact, keyword

Queued processing with BullMQ for async indexing

Unit tests with Jest + Supertest

Dockerized setup with Docker Compose