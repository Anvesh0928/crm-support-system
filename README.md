# Customer Support IVR & CRM System

A full-stack MERN application for managing customer support calls, tickets, call queues, and agent presence in real time.

---

## Why I Built This

I wanted to dive deep into how real-world customer support platforms work behind the scenes. Most CRM projects online focus on basic CRUD operations, but actual support desks deal with complex real-time problems—incoming calls, routing queues, agent availability, and AI resolution.

I built this project to learn how to architect a complete support workflow from scratch. To keep the project practical without requiring expensive telephony hardware, I implemented a **Provider-Based Architecture**. This allows the entire CRM to run in local development using a built-in Mock Telephony Provider, while keeping the door open to swap in real providers like Exotel or OpenAI later by changing a single environment variable.

---

## Features

- **Provider-Based Telephony**: Swappable provider interface so the CRM can run fully locally without external phone hardware.
- **Mock Telephony Simulator**: A developer panel inside the CRM to trigger incoming calls, missed calls, call ends, and AI responses.
- **Real-Time Workspace**: Live updates for agent presence, incoming call popups, and ticket creation using Socket.IO.
- **Queue Management**: Automatic skill-based call distribution and wait time tracking for incoming customer calls.
- **Agent Panel**: Dedicated view for support agents to manage active calls, take notes, and update their availability status.
- **Supervisor Dashboard**: Monitor active calls, agent performance, queue wait times, and call recordings.
- **Mock AI Layer**: Automated intent detection (refund queries, balance checks, human agent escalations).

---

## Tech Stack

### Backend
- **Node.js & Express**: RESTful API server.
- **TypeScript**: Strict type checking across domain modules.
- **MongoDB & Mongoose**: Customer, call log, ticket, and analytics storage.
- **Redis & ioredis**: In-memory caching, agent presence tracking, and Socket.IO Pub/Sub adapter.
- **Socket.IO**: Real-time WebSocket event gateway.
- **Zod**: Runtime environment variable and payload validation.

### Frontend
- **React**: Interactive SPA built with clean, modular components.
- **Vanilla CSS**: Custom styling with named CSS colors, clean glassmorphism, and responsive layouts.
- **Lucide React**: Clean UI iconography.

### Infrastructure & Tools
- **Docker & Docker Compose**: Single-command local setup for MongoDB 7.0 and Redis 7.2.
- **Vite**: Frontend dev server and bundler.

---

## Project Structure

```text
Customer Support IVR System/
├── client/                     # React Frontend SPA
│   ├── src/
│   │   ├── components/         # UI Primitives, Layouts, & Developer Simulator
│   │   ├── pages/              # CRM Pages (Dashboard, Agent, Supervisor, Queue, etc.)
│   │   ├── services/           # Axios REST API & Socket.IO Clients
│   │   └── types/              # Frontend TypeScript Interfaces
├── src/                        # Backend Node.js Service
│   ├── api/                    # Express Controllers, Repositories, & Routes
│   ├── providers/              # Provider Abstraction (Interfaces, Mock Provider, & Factory)
│   ├── modules/                # Core Business Logic (Agents, Auth, Calls, Queue, Tickets)
│   ├── sockets/                # Socket.IO Gateway & Handlers
│   ├── config/                 # Environment, Database, & Logger Configs
│   └── server.ts               # HTTP & WebSocket Server Entrypoint
├── docker-compose.yml          # Local MongoDB & Redis Containers
├── .env.example                # Environment Variable Template
└── package.json                # Project Dependencies & Scripts
```

---

## Current Status

- ✅ **Mock Telephony Provider**: Fully functional local call simulation, queueing, agent assignment, and recording generation.
- ✅ **Real-Time CRM**: 9 React pages with Socket.IO live updates working end-to-end.
- ⏳ **Exotel Provider**: Interface prepared; ready to be integrated when live Exotel API keys are available.
- ⏳ **OpenAI Realtime API**: Voice orchestrator interface set up for future WebSocket stream connection.

---

## Future Plans

As this project evolves, I plan to:
1. Integrate live Exotel webhooks for real phone numbers.
2. Connect OpenAI's Realtime Voice API for real-time speech-to-speech AI support calls.
3. Add sentiment trend charts to the supervisor analytics page.
4. Add automated test coverage with Jest and Supertest.

---

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Docker Desktop** (for MongoDB & Redis)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/customer-support-ivr-system.git
cd customer-support-ivr-system
```

### 2. Start Local Databases
```bash
docker-compose up -d
```
*This starts MongoDB on port 27017 and Redis on port 6379.*

### 3. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(The default values are configured for local development using the Mock Provider.)*

### 5. Run Development Servers
Start the backend server:
```bash
npm run dev
```

In a new terminal, start the React frontend:
```bash
cd client
npm run dev
```

Open your browser at `http://localhost:5173`. You will see the floating **Dev Telephony Simulator** button in the lower-right corner to test incoming calls right away!

---

## Author

Created with ❤️ while learning and building software. Feel free to open an issue or reach out if you have any questions or feedback!
