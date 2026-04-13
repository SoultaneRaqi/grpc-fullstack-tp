# 🚀 Full Stack Web Application

**React · Node.js · MySQL · gRPC · Docker**

A modern full stack web application built with a **microservices architecture**, using **gRPC** instead of traditional REST for high-performance, strongly-typed communication between services. The entire system runs in a single `docker-compose up --build`.

---

## 🧠 Architecture

```
[ React Frontend ]
       ↓  grpc-web (HTTP/1.1)
[ Envoy Proxy ]
       ↓  gRPC (HTTP/2)
[ Node.js Backend ]
       ↓  SQL
[ MySQL Database ]
```

| Service | Technology | Port |
|---|---|---|
| Frontend | React + Vite | `localhost:5173` |
| Proxy | Envoy | internal |
| Backend | Node.js (gRPC server) | internal |
| Database | MySQL | internal |

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js (gRPC) |
| Communication | gRPC + Protocol Buffers |
| Proxy | Envoy |
| Database | MySQL |
| DevOps | Docker + Docker Compose |

---

## 📂 Project Structure

```
/
├── backend/            # Node.js gRPC server
├── db/                 # SQL initialization script
├── envoy/              # Envoy proxy configuration
├── frontend/           # React application (Vite)
├── proto/              # .proto contract files
├── docker-compose.yml  # Service orchestration
├── .env                # Environment variables
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

> Protocol Buffer compiled files are already included. No need to install `protoc`.

### Run the project

```bash
docker-compose up --build
```

Wait for all services to start. MySQL may take a few seconds to initialize.

### Open the app

```
http://localhost:5173
```

---

## 🔥 Features

- Microservices architecture with clean separation of concerns
- gRPC communication — strongly typed via `.proto` contracts
- Fully Dockerized — one command to run everything
- CRUD operations: list products, create product
- Persistent MySQL storage via Docker volumes
- Envoy proxy bridges the browser's lack of native gRPC support

---

## 🔄 gRPC Request Flow

1. User interacts with React UI
2. Frontend sends request using `grpc-web`
3. Envoy translates HTTP/1.1 → gRPC (HTTP/2)
4. Backend processes the request
5. Backend queries MySQL
6. Response travels back through Envoy to the frontend

---

## ⚠️ Troubleshooting

**Port already in use**
```bash
sudo lsof -i :5173
sudo kill -9 <PID>
```

**Reset containers and volumes**
```bash
docker-compose down -v
docker-compose up --build
```

**Database not initializing**

Wait a few seconds after startup, then check logs:
```bash
docker-compose logs db
```

---

## 📌 Environment Variables

Create a `.env` file at the project root:

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=password
DB_NAME=app_db
```

---

## 📈 Possible Improvements

- [ ] Update & Delete UI
- [ ] Authentication (JWT)
- [ ] API Gateway instead of Envoy only
- [ ] CI/CD pipeline
- [ ] Cloud deployment (AWS / VPS)
- [ ] Logging & monitoring (Prometheus, Grafana)

---

## 👨‍💻 Author

**Soultane Raqi** — Full Stack Developer Student

---

## 🎯 Conclusion

This project demonstrates advanced full stack skills — microservices architecture, gRPC in a web context, and production-grade containerization with Docker. It goes beyond standard academic requirements and reflects real-world practices.

⭐ If you found this project useful, consider improving and scaling it further!