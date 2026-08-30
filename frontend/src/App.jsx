// ==========================================
// MAIN APP COMPONENT (App.jsx)
// ==========================================
// Manages role-based authentication state (Admin vs Agent views).

import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  // Authentication state storing user email, role ('admin' | 'agent'), and display name
  const [user, setUser] = useState(null);

  // Handler when user submits login form with role
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Handler when user clicks logout button
  const handleLogout = () => {
    setUser(null);
  };

  // If user is not logged in, show Login Page with role options
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // If user is logged in, show Dashboard Page with role context
  return (
    <DashboardPage
      user={user}
      onLogout={handleLogout}
    />
  );
}
