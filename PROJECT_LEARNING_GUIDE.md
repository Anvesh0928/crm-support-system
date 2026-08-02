# Junior Developer Codebase Guide & Mentorship Walkthrough

Welcome to the **AI Customer Support CRM** codebase! This project was built with a single primary goal: **To teach clean, production-ready MERN stack software engineering in a way that is clear and approachable for developers with less than one year of experience.**

---

## 🎯 Code Philosophy & Mentorship Rules

When reading or modifying code in this repository, keep these rules in mind:

1. **Clarity Over Cleverness**: If there are two ways to write a feature, we always choose the simpler, more readable one—even if it takes a few more lines of code.
2. **No One-Liner Tricks**: We avoid nested ternary operators, cryptic functional one-liners, or obscure JavaScript/TypeScript syntax.
3. **Beginner-Friendly Comments**: Every important function explains **WHY** a step is necessary, not just *what* it does.
4. **Explicit Variable Names**: Variables are named clearly (`customer`, `availableAgent`, `callDuration`) rather than using single letters or vague terms (`c`, `temp`, `data1`).
5. **Simple Architecture**: Business logic is cleanly separated:
   - **Routes**: Define HTTP paths (`/api/v1/customers`).
   - **Controllers**: Read incoming HTTP request bodies and send HTTP responses.
   - **Services**: Contain the core business rules.
   - **Repositories**: Encapsulate Mongoose database queries.

---

## 📁 Key File Locations

### Backend (`src/`)
- `src/server.ts`: Starting point for the server. Connects to MongoDB, starts Express, and boots up Socket.IO.
- `src/app.ts`: Express application setup where middleware and API routes are mounted.
- `src/api/controllers/`: Express controllers that handle HTTP requests.
- `src/api/services/`: Service classes containing business logic.
- `src/api/repositories/`: Repository classes managing database queries.
- `src/database/models/`: Mongoose schemas for MongoDB collections (`Customer`, `Agent`, `Call`, `Ticket`).
- `src/sockets/`: Real-time Socket.IO event handlers and rooms.
- `src/integrations/exotel/`: Exotel telephony webhooks and REST API client.
- `src/ai-voice/`: OpenAI Realtime API voice session manager and tool execution.

### Frontend (`client/src/`)
- `client/src/App.tsx`: Main React component managing global navigation and state.
- `client/src/pages/`: The 9 CRM pages (`DashboardPage`, `IncomingCallsPage`, `CustomerProfilePage`, `CallHistoryPage`, `AgentPanelPage`, `QueuePage`, `AnalyticsPage`, `SupervisorDashboardPage`, `SettingsPage`).
- `client/src/components/ui/`: Reusable UI components (`Button`, `Card`, `Badge`, `Modal`, `Table`).

---

## 💡 How a Request Flows Through the System

When a frontend user clicks a button (e.g. creating a support ticket):

1. **React Page (`pages/DashboardPage.tsx`)**: Calls `ApiService.createTicket(data)`.
2. **HTTP Request**: Sent to Express backend endpoint `POST /api/v1/tickets`.
3. **Route (`api/routes/ticket.routes.ts`)**: Validates the input schema and calls `TicketController.createTicket`.
4. **Controller (`api/controllers/ticket.controller.ts`)**: Reads `req.body` and calls `TicketService.createTicket`.
5. **Service (`modules/tickets/application/ticket.service.ts`)**: Runs business logic (e.g. generating a unique ticket number) and calls `TicketModel.create()`.
6. **Response**: The created ticket object is returned to the React frontend, which updates state in real time.

---

## 🚀 Tips for Junior Developers

- **Don't hesitate to add comments**: If a line of code takes you a minute to figure out, add a comment explaining it for the next developer!
- **Use `async/await`**: Never use `.then()` promise chains—`async/await` reads top-to-bottom like regular synchronous code.
- **Keep functions under 40 lines**: If a function is getting too long, split it into smaller helper functions.
