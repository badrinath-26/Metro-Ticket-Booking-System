# Metro Ticket Booking System

**Metro Ticket Booking System** — A full-stack demo project built with **Spring Boot (Java)**, **PostgreSQL**, and **React**.  
This repo contains a simple Metro ticket booking application with JWT authentication, station management, and ticket booking features — perfect for a major project / portfolio demo.

---

## 🔥 Highlights
- Backend: Spring Boot + Spring Security (JWT) + JPA (Postgres)  
- Frontend: React (create-react-app) with protected routes and token-based auth  
- Auth: Register / Login with JWT access tokens  
- Features: CRUD for Stations (admin), Book Ticket, View/Delete Tickets, Booking history for logged-in user  
- Local dev-ready: CORS configured for `http://localhost:3000`

---

## 📁 Repo layout (expected)
```
/metro-backend      # Spring Boot app
  └─ src/main/java/...
  └─ src/main/resources/application.properties
/frontend           # React app
  └─ package.json
  └─ src/
README.md
```

---

## ✅ Prerequisites
- Java 17+ (or the version used in your pom.xml)
- Maven (or use the included `./mvnw`)
- Node.js 16+ and npm
- PostgreSQL (or run via Docker)
- Git

---

## 🛠 Backend — Setup & Run

### 1. Create Postgres DB (example)
```bash
# open psql or your DB client and run:
CREATE DATABASE metrodb;
CREATE USER metro_user WITH ENCRYPTED PASSWORD 'metro_pass';
GRANT ALL PRIVILEGES ON DATABASE metrodb TO metro_user;
```

### 2. Configure environment (recommended)  
**Option A: `application.properties` (development/demo)**  
Edit `metro-backend/src/main/resources/application.properties` to contain your DB and JWT values:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/metrodb
spring.datasource.username=metro_user
spring.datasource.password=metro_pass

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT - for demo only; move to env var in production
app.jwt.secret=yourSuperSecretForDemoOnlyChangeThis
app.jwt.expiration-ms=3600000

# CORS
app.cors.allowed-origins=http://localhost:3000
```

**Option B (better): pass secret via environment variable**
```bash
export JWT_SECRET="someVeryLongRandomSecret"
# then make your application read it via ${JWT_SECRET} in application.properties using placeholders
```

### 3. Run backend
From project root or backend folder:
```bash
cd metro-backend
./mvnw spring-boot:run
# or build jar then run
./mvnw clean package
java -jar target/*.jar
```

The server should be running on `http://localhost:8080` (default).

---

## 🖥 Frontend — Setup & Run

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Configure frontend base URL (if required)
If your frontend uses an env file, create `.env.local` in `frontend` (create-react-app uses `REACT_APP_` prefix):
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### 3. Run frontend
```bash
npm start
```
Open `http://localhost:3000` in your browser.

---

## 📡 API — Summary (example endpoints)

> These are the common endpoints used by the frontend. Adjust them according to your actual controller mappings.

**Auth**
- `POST /api/auth/register` — register a user  
- `POST /api/auth/login` — login, returns JWT  

**Stations**
- `GET /api/stations` — list all stations
- `GET /api/stations/{id}` — get station by id
- `POST /api/stations` — create station (admin)
- `PUT /api/stations/{id}` — update station (admin)
- `DELETE /api/stations/{id}` — delete station (admin)

**Tickets**
- `GET /api/tickets` — list tickets for logged-in user (or admin all tickets)
- `GET /api/tickets/{id}` — ticket by id
- `POST /api/tickets` — book a ticket
- `DELETE /api/tickets/{id}` — cancel ticket

---

## ▶️ Example curl flows

1. Login and save token:
```bash
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login   -H "Content-Type: application/json"   -d '{"username":"admin","password":"admin123"}' | jq -r .token)
```

2. Use token to call protected endpoint:
```bash
curl -s http://localhost:8080/api/stations   -H "Authorization: Bearer $TOKEN"
```

3. Book a ticket:
```bash
curl -X POST http://localhost:8080/api/tickets   -H "Authorization: Bearer $TOKEN"   -H "Content-Type: application/json"   -d '{"fromStationId":1,"toStationId":3,"passengerName":"Bob"}'
```

---

## 🔐 Notes about Authentication & Security
- For the **project demo / grading**, storing the JWT secret in `application.properties` and using `localStorage` on the frontend is acceptable.  
- For real-world apps you should:
  - Store secrets in environment variables / vault.
  - Use `httpOnly` cookies (or secure storage) and rotate refresh tokens.
  - Sanitize and validate inputs (`@Valid` DTOs) and add `@ControllerAdvice` for consistent error responses.

---

## 🧾 Recommended README additions
- **Project synopsis**: short problem statement and what your system solves.  
- **Features**: list of implemented features and what is left as future work.  
- **Tech stack**: bullet list of main frameworks and libs.  
- **How to run**: the steps above.  
- **Demo screenshots / GIFs**: place under `/docs` or in repo root and link them.  
- **API contract**: endpoints, request/response examples.  
- **Known issues / limitations**: be honest (e.g., `localStorage` usage, no refresh tokens).  
- **Contributors / authors**: your name.  
- **License**: MIT or your preferred license.

---

## 🚀 Optional next improvements
- Add refresh tokens and httpOnly cookies for login flow.
- Add role-based UI: admin panel to add stations.
- Add migrations (Flyway) instead of `ddl-auto=update`.
- Add integration tests.
- Add screenshots and a demo video.

---

## Author
Your Name — Y V BADRINATH REDDY

## License
MIT
