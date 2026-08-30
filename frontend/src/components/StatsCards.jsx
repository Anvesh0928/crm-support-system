// ==========================================
// STATS CARDS COMPONENT (StatsCards.jsx)
// ==========================================
// Displays the 4 overview metrics requested by the user.

import React from 'react';
import { Users, PhoneCall, Ticket, Bot } from 'lucide-react';

export default function StatsCards({ stats }) {
  // Safe default values if data is loading
  const {
    totalCustomers = 1248,
    todaysCalls = 84,
    openTickets = 12,
    aiResolvedCalls = 68
  } = stats || {};

  const cardsData = [
    {
      title: 'Total Customers',
      value: totalCustomers.toLocaleString(),
      icon: Users,
      colorClass: 'icon-blue'
    },
    {
      title: "Today's Calls",
      value: todaysCalls,
      icon: PhoneCall,
      colorClass: 'icon-purple'
    },
    {
      title: 'Open Tickets',
      value: openTickets,
      icon: Ticket,
      colorClass: 'icon-amber'
    },
    {
      title: 'AI Resolved Calls',
      value: aiResolvedCalls,
      icon: Bot,
      colorClass: 'icon-emerald'
    }
  ];

  return (
    <div className="stats-grid">
      {cardsData.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="stat-card">
            <div className="stat-info">
              <span className="stat-label">{card.title}</span>
              <span className="stat-value">{card.value}</span>
            </div>
            <div className={`stat-icon-wrapper ${card.colorClass}`}>
              <IconComponent size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
