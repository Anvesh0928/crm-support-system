# AstroBharatAI AI Customer Support

AstroBharatAI AI Customer Support is designed to become a modern, AI-powered customer engagement platform tailored for astrology consultations, customer inquiry routing, and automated voice support. It aims to streamline customer communication by unifying phone calls, chat messages, ticket management, and appointment bookings into a single dashboard. Currently, it provides a simple, clean, and interactive foundation featuring a working dashboard and a persistent Customers management module.

---

### Currently Working

* **Login Page**: Simple demo authentication interface.
* **Dashboard Overview**: Header, sidebar navigation, 4 summary metric cards, and 5 recent call logs.
* **Navigation Sidebar**: Left sidebar with 10 menu items and active tab highlighting.
* **Customers Module**: Full customer list table displaying Name, Phone, Email, Language, Total Calls, Last Contact, Status, and Actions.
* **Customer Search**: Real-time filtering of customer records by name or phone number.
* **Add Customer Form**: Modal form to add new customers with validation and instant list update.
* **Local Data Persistence**: Customer additions persist automatically in browser `localStorage` across page refreshes.
* **Customer Profile View**: Detailed profile view with basic details, summary cards, activity timeline, and sub-tabs (`Overview` active).
* **"Coming Soon" Placeholders**: Graceful placeholder screens for inactive sidebar tabs and sub-tabs.

---

### Planned Later

* Real AI Voice & Call Handling
* Interactive Voice Response (IVR) System
* Real Database Integration (e.g., MongoDB)
* WhatsApp API Integration
* Support Ticket Automation & Management
* Astrology Consultation Booking System
* Payment Gateway Integration
* Real-time Analytics & CRM Sync

---

## 2. Current Project Status

* **Current Stage**: Early Development / Frontend & Backend Foundation (MVP Baseline).
* **What is Working**: Authentication flow, Dashboard overview, Customers list, Add customer form, Search filtering, Customer profile details, and browser local storage persistence.
* **What is Incomplete**: Real backend database persistence, external service integrations, non-dashboard sidebar modules.
* **What is Planned Next**: Calls module and Ticket management baseline.

### Feature Status Table

| Feature / Module | Status | Details |
| :--- | :--- | :--- |
| **Login Page** | Working | Simple demo sign-in screen |
| **Dashboard Page** | Working | Overview cards & recent calls list |
| **Customers Module** | Working | Full list, search, add customer, profile view |
| **Local Data Persistence**| Working | Browser `localStorage` retains added customers on refresh |
| **Calls Module** | Planned | Displays "Coming soon" screen |
| **Tickets Module** | Planned | Displays "Coming soon" screen |
| **Bookings Module** | Planned | Displays "Coming soon" screen |
| **Payments Module** | Planned | Displays "Coming soon" screen |
| **WhatsApp Module** | Planned | Displays "Coming soon" screen |
| **AI Knowledge Base** | Planned | Displays "Coming soon" screen |
| **Agents Module** | Planned | Displays "Coming soon" screen |
| **Settings Module** | Planned | Displays "Coming soon" screen |
| **AI Voice / IVR** | Planned | Not yet implemented |

---

## 3. Tech Stack

| Technology | Role | Why It Is Used |
| :--- | :--- | :--- |
| **React 18** | Frontend Framework | Enables building interactive, component-based user interfaces smoothly. |
| **JavaScript (ES6+)** | Programming Language | Universal web scripting language used for both React frontend and Node.js backend. |
| **Vanilla CSS** | Styling Solution | Custom CSS tokens in `index.css` provide full control over customer-support aesthetics. |
| **Node.js + Express** | Backend Framework | Lightweight server environment to handle REST API endpoints on port 5000. |
| **Browser `localStorage`**| Data Storage | Simple, built-in browser storage that keeps added customer data saved across page refreshes. |
| **React State** | Simple Auth / Routing | Controls login session state and page views without heavy third-party routing libraries. |
| **Vite 5** | Build Tool & Dev Server | Ultra-fast development server and modern JavaScript bundler for React. |
| **npm** | Package Manager | Standard package manager used to install and manage project dependencies. |

---

## 4. Folder Structure

```text
ivr calling support/
├── backend/
│   ├── node_modules/           # Installed backend packages
│   ├── package.json            # Backend scripts and dependencies
│   ├── package-lock.json       # Locked backend dependency versions
│   └── server.js               # Express server API endpoints & dummy data
│
├── frontend/
│   ├── node_modules/           # Installed frontend packages
│   ├── index.html              # HTML entry point with Plus Jakarta Sans font
│   ├── package.json            # Frontend scripts (dev, build, preview)
│   ├── package-lock.json       # Locked frontend dependency versions
│   ├── vite.config.js          # Vite bundler configuration
│   └── src/
│       ├── main.jsx            # React root mount point
│       ├── App.jsx             # Main app container managing Login vs Dashboard state
│       ├── index.css           # Global customer-support design system & component styles
│       │
│       ├── components/         # Reusable UI components
│       │   ├── Header.jsx      # Top header bar (Search, Notifications, Profile, Logout)
│       │   ├── Sidebar.jsx     # Left sidebar with 10 menu navigation items
│       │   ├── StatsCards.jsx  # 4 metric overview cards
│       │   ├── RecentCalls.jsx # Recent call records table
│       │   ├── CustomerTable.jsx# Customer list table with actions
│       │   ├── AddCustomerModal.jsx# Form popup dialog to add new customers
│       │   ├── CustomerProfile.jsx# Detailed customer profile view with activity history
│       │   └── ComingSoon.jsx  # Placeholder component for inactive menu tabs
│       │
│       └── pages/              # Main application page containers
│           ├── LoginPage.jsx   # Login page component
│           ├── DashboardPage.jsx# Main dashboard controller layout
│           └── CustomersPage.jsx# Customers module controller page
│
└── README.md                   # Project documentation & beginner guide
```

---

## 5. Important Files

| File | What It Does |
| :--- | :--- |
| **`backend/server.js`** | Express REST server providing `GET /api/dashboard`, `GET /api/customers`, and `POST /api/customers`. |
| **`frontend/src/App.jsx`** | Top-level React component that controls authentication state (Login vs Dashboard view). |
| **`frontend/src/pages/DashboardPage.jsx`** | Core dashboard controller managing sidebar tab state and loading backend statistics. |
| **`frontend/src/pages/CustomersPage.jsx`** | Customers module controller managing list rendering, real-time search, add modal, and local storage. |
| **`frontend/src/components/CustomerTable.jsx`** | Renders the customer list table with columns, badges, and action buttons. |
| **`frontend/src/components/AddCustomerModal.jsx`** | Popup form dialog to create new customer records. |
| **`frontend/src/components/CustomerProfile.jsx`** | Displays basic details, metric summaries, activity timeline, and sub-tabs for a customer. |
| **`frontend/src/components/Sidebar.jsx`** | Renders the left menu with 10 navigation items and active button highlights. |
| **`frontend/src/index.css`** | Contains all CSS rules, variables, card styles, tables, modals, and responsive layouts. |

---

## 6. How the Application Works

```text
User opens app in browser (http://localhost:5173)
  ↓
LoginPage.jsx (Click "Sign In")
  ↓
App.jsx sets user state -> renders DashboardPage.jsx
  ↓
DashboardPage.jsx displays Sidebar.jsx & Header.jsx
  ↓
[Option A]: Active Tab = "Dashboard"
  → Displays StatsCards.jsx (4 cards) & RecentCalls.jsx (5 call logs)
  ↓
[Option B]: Active Tab = "Customers"
  → Displays CustomersPage.jsx
      ├── Search Box (Filters customers in real time)
      ├── Table (Clicking row opens CustomerProfile.jsx)
      └── "+ Add Customer" Button (Opens AddCustomerModal.jsx)
  ↓
[Option C]: Active Tab = Any other menu item
  → Displays ComingSoon.jsx ("Coming soon" placeholder screen)
```

---

## 7. Customers Module

The Customers module allows managing AstroBharatAI customer contacts:

1. **Customer List**: Displays customers in a clean table showing Name, Phone, Email, Language, Total Calls, Last Contact, Status, and Action.
2. **Real-time Search**: Type in the search box ("Search customer by name or phone...") to filter the list instantly.
3. **Add Customer**:
   - Click `+ Add Customer` to open a pop-up modal.
   - Enter `Full Name`, `Phone Number`, `Email`, and select `Preferred Language` (`Hindi`, `English`, `Hinglish`).
   - Click **Save Customer**.
   - The new customer is added to state, saved to browser `localStorage`, sent to the Express backend, and a green success message appears.
4. **Customer Profile**:
   - Click any customer row or **"View Profile"**.
   - Displays **Basic Information**, **Customer Summary**, and **Recent Activity Timeline**.
   - Sub-tabs (`Overview`, `Calls`, `Tickets`, `Bookings`, `Payments`, `WhatsApp`) allow viewing overview details or "Coming soon" screens.
   - Click **"← Back to Customers"** to return to the list.
5. **Browser Refresh Persistence**:
   - Data is stored in browser `localStorage`. When you press refresh (`F5`), all added customers remain in the list.

---

## 8. Customer Data Structure

Each customer object adheres to the following structure:

```js
{
  id: 1723482000000,          // Unique numeric ID (Timestamp)
  name: "Rahul Sharma",       // Customer full name (String)
  phone: "+91 9876543210",    // Phone number (String)
  email: "rahul@example.com", // Email address (String)
  language: "Hindi",         // Preferred language (Hindi / English / Hinglish)
  status: "Active",           // Account status (Active / Inactive)
  totalCalls: 5,              // Total completed call count (Number)
  openTickets: 1,             // Number of pending support tickets (Number)
  bookings: 2,                // Number of astrology consultation bookings (Number)
  payments: "₹4,999",         // Total payment amount processed (String)
  lastContact: "Today",       // Last contact timestamp description (String)
  createdAt: "2026-01-15"     // Account registration date YYYY-MM-DD (String)
}
```

*Note: Customer records are persisted in browser `localStorage` under the key `'astrobharatai_customers'`.*

---

## 9. How to Install the Project

### Step 1: Install Backend Dependencies
Open your terminal, navigate into the `backend` folder, and run:
```bash
cd backend
npm install
```
*What this command does:* Downloads and installs the required backend npm packages (`express`, `cors`) specified in `backend/package.json`.

### Step 2: Install Frontend Dependencies
Open a terminal, navigate into the `frontend` folder, and run:
```bash
cd frontend
npm install
```
*What this command does:* Downloads and installs the required frontend npm packages (`react`, `react-dom`, `lucide-react`, `vite`, `@vitejs/plugin-react`) specified in `frontend/package.json`.

---

## 10. How to Run the Project

You need to start both the backend server and frontend development server.

### 1. Start Backend Server
In your first terminal window:
```bash
cd backend
npm start
```
- **Backend URL**: `http://localhost:5000`

### 2. Start Frontend App
In your second terminal window:
```bash
cd frontend
npm run dev
```
- **Frontend URL**: `http://localhost:5173`

### Stopping the Servers
To stop either server, press `Ctrl + C` in its terminal window.

### What if a Port is Already in Use (`EADDRINUSE`)?
If port 5000 or 5173 is already in use by a background process:
- Close any existing running terminal processes.
- Alternatively on Windows PowerShell, terminate node tasks using:
  ```powershell
  Stop-Process -Name "node" -Force
  ```

---

## 11. Environment Variables

**No environment variables are currently required.**

The project uses default configuration ports (`5000` for backend, `5173` for frontend) directly in the code without requiring a `.env` file at this stage.

---

## 12. Available Scripts

### Backend Scripts (`backend/package.json`)

* **`npm start`**: Runs `node server.js` to launch the Express backend API server.
* **`npm run dev`**: Runs `node --watch server.js` to launch the server with auto-restart on file changes.

### Frontend Scripts (`frontend/package.json`)

* **`npm run dev`**: Launches the Vite development server on `http://localhost:5173`.
* **`npm run build`**: Compiles and bundles the React application for production into the `frontend/dist` directory.
* **`npm run preview`**: Serves the built production bundle locally for previewing.

---

## 13. How to Make a Small Change

Here is a simple example showing how to change the Customers page title:

1. **Locate the file**: Open `frontend/src/pages/CustomersPage.jsx`.
2. **Find the UI element**: Look for line 160:
   ```jsx
   <h1 className="page-title">Customers</h1>
   ```
3. **Make your edit**: Change `"Customers"` to `"Customer Directory"`:
   ```jsx
   <h1 className="page-title">Customer Directory</h1>
   ```
4. **Save the file**: Press `Ctrl + S`.
5. **View in browser**: Vite will automatically update the page at `http://localhost:5173`.

---

## 14. How to Add a New Page

To add a new page (e.g., a simple *Reports* page) following the project structure:

1. **Create the Page component**: Create `frontend/src/pages/ReportsPage.jsx`:
   ```jsx
   import React from 'react';
   export default function ReportsPage() {
     return <div><h1>Reports Module</h1><p>Coming soon!</p></div>;
   }
   ```
2. **Add item to Sidebar menu**: Open `frontend/src/components/Sidebar.jsx` and add `{ id: 'Reports', label: 'Reports', icon: LayoutDashboard }` to the `menuItems` array.
3. **Render page in Dashboard controller**: Open `frontend/src/pages/DashboardPage.jsx`, import `ReportsPage`, and add a conditional branch:
   ```jsx
   {activeTab === 'Reports' && <ReportsPage />}
   ```
4. **Test in browser**: Click **Reports** in the sidebar to verify it displays.

---

## 15. How Data Currently Works

```text
1. Default customer records exist in `INITIAL_CUSTOMERS` array inside CustomersPage.jsx.
   ↓
2. On page load, CustomersPage.jsx checks browser `localStorage.getItem('astrobharatai_customers')`.
   ↓
3. If saved data exists, it loads that data into React state (`customers`).
   ↓
4. CustomerTable.jsx receives `customers` prop and renders each row.
   ↓
5. When user submits AddCustomerModal.jsx:
   - React state is updated (`[newCustomer, ...customers]`).
   - Updated array is saved to browser `localStorage`.
   - POST request is sent to Express API (`http://localhost:5000/api/customers`).
   ↓
6. Clicking a customer sets `selectedCustomer` state, opening CustomerProfile.jsx.
```

---

## 16. Common Errors & Troubleshooting

### Error 1: `npm install` fails
- **Cause**: Corrupted npm cache or internet connection issue.
- **Fix**: Run `npm cache clean --force` and retry `npm install`.

### Error 2: `Error: listen EADDRINUSE: address already in use :::5000`
- **Cause**: Node backend server is already running in another terminal.
- **Fix**: Stop the running process in the other terminal or run `Stop-Process -Name "node" -Force` in PowerShell.

### Error 3: Browser shows blank page or React errors
- **Cause**: Syntax error or unhandled variable in JSX code.
- **Fix**: Press `F12` in browser to open Developer Tools Console, check the error message line number, and fix the syntax error.

### Error 4: Changes are not showing up in browser
- **Cause**: Browser cache or Vite dev server disconnected.
- **Fix**: Hard refresh browser using `Ctrl + Shift + R` or restart `npm run dev`.

---

## 17. Development Rules

1. Keep code beginner-friendly and clearly commented.
2. Do not over-engineer or add complex state libraries prematurely.
3. Build one small feature at a time.
4. Do not change working features unnecessarily.
5. Test the application (build & run) after every change.
6. Do not add unnecessary npm dependencies.
7. Keep components simple, focused, and reusable.
8. Keep business logic clear and separate from presentation.
9. Never hard-code passwords, API keys, or private credentials.
10. Do not implement future features before they are requested.

---

## 18. Future Roadmap

> ⚠️ **Note**: All items below are planned future phases and are **NOT YET IMPLEMENTED**.

### Phase 1 (Baseline Modules)
* [x] Customers Module Baseline
* [x] Customer Profile View
* [ ] Calls Log Detail View
* [ ] Full Call History

### Phase 2 (Voice & IVR Integration)
* [ ] IVR Flow Builder
* [ ] AI Voice Agent Engine
* [ ] Call Audio Recording Player
* [ ] Automated Call Summary Generation

### Phase 3 (Support & Ticketing)
* [ ] Support Ticket Management
* [ ] Human Agent Handoff System
* [ ] Agent Console Interface

### Phase 4 (Omnichannel & Services)
* [ ] WhatsApp API Integration
* [ ] Astrology Puja & Consultation Booking System
* [ ] Payment Gateway Integration

### Phase 5 (Analytics & Automation)
* [ ] Call Analytics Dashboard
* [ ] Lead Scoring Algorithm
* [ ] Automated Customer Follow-up & Reactivation

---

## 19. Testing Checklist

Use this simple checklist to verify current working functionality:

- [ ] Backend starts cleanly using `npm start` on port 5000.
- [ ] Frontend starts cleanly using `npm run dev` on port 5173.
- [ ] Application loads Login page at `http://localhost:5173`.
- [ ] Clicking "Sign In" opens Dashboard page.
- [ ] Dashboard displays 4 summary cards and 5 recent call logs.
- [ ] Clicking **Sidebar → Customers** opens Customers page.
- [ ] Search box filters customer table rows by name and phone number.
- [ ] Clicking **"+ Add Customer"** opens modal form.
- [ ] Submitting form adds new customer to table and displays green success banner.
- [ ] Refreshing page (`F5`) retains newly added customer records.
- [ ] Clicking a customer row opens Customer Profile page with Overview details.
- [ ] Clicking **"← Back to Customers"** returns to Customer list.

---

## 20. Beginner Glossary

* **Frontend**: The user interface (buttons, forms, pages) visible in the web browser.
* **Backend**: The server application running behind the scenes that manages APIs and data logic.
* **API (Application Programming Interface)**: A set of web URLs allowing frontend and backend to talk to each other.
* **Database**: A specialized system used to store and organize application data permanently.
* **Component**: A self-contained, reusable piece of UI code in React (e.g. a Header or Table).
* **Route**: A URL path pointing to a specific screen or resource in an application.
* **State**: Data stored inside a React component that can change over time based on user actions.
* **`localStorage`**: A built-in feature of web browsers that allows web apps to save simple key-value data directly on the user's computer.
