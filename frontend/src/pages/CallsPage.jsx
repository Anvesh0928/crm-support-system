// ==========================================
// CALLS PAGE COMPONENT (CallsPage.jsx)
// ==========================================
// Displays call overview cards, search box, filters, and call logs table.

import React, { useState } from 'react';
import { Search, PhoneCall, PhoneIncoming, PhoneMissed, Bot } from 'lucide-react';
import CallsTable from '../components/CallsTable';
import CallDetails from '../components/CallDetails';
import { DUMMY_CALLS } from '../data/mockCalls';

export default function CallsPage() {
  const [calls] = useState(DUMMY_CALLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCall, setSelectedCall] = useState(null);

  // Filter call records based on Search + Type Filter + Status Filter
  const filteredCalls = calls.filter((call) => {
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = call.customerName ? call.customerName.toLowerCase().includes(q) : false;
    const phoneMatch = call.phone ? call.phone.toLowerCase().includes(q) : false;
    const searchMatches = q === '' || nameMatch || phoneMatch;

    const typeMatches = typeFilter === 'All' || call.type === typeFilter;
    const statusMatches = statusFilter === 'All' || call.status === statusFilter;

    return searchMatches && typeMatches && statusMatches;
  });

  // Calculate top 4 summary card numbers based on dummy records
  const totalCallsCount = calls.length; // 9
  const answeredCount = calls.filter(c => c.status === 'Answered' || c.status === 'Resolved').length;
  const missedCount = calls.filter(c => c.status === 'Missed').length;
  const aiResolvedCount = calls.filter(c => c.handledBy === 'AI' && c.status === 'Resolved').length;

  const summaryCards = [
    { title: 'Total Calls', value: totalCallsCount, icon: PhoneCall, colorClass: 'icon-blue' },
    { title: 'Answered', value: answeredCount, icon: PhoneIncoming, colorClass: 'icon-purple' },
    { title: 'Missed', value: missedCount, icon: PhoneMissed, colorClass: 'icon-amber' },
    { title: 'AI Resolved', value: aiResolvedCount, icon: Bot, colorClass: 'icon-emerald' }
  ];

  // If a call detail is selected, render CallDetails view
  if (selectedCall) {
    return <CallDetails call={selectedCall} onBack={() => setSelectedCall(null)} />;
  }

  return (
    <div className="calls-page">
      {/* Top Header */}
      <div className="page-title-section">
        <h1 className="page-title">Calls</h1>
        <p className="page-subtitle">View and manage customer call history.</p>
      </div>

      {/* 4 Summary Cards */}
      <div className="stats-grid">
        {summaryCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div key={idx} className="stat-card">
              <div className="stat-info">
                <span className="stat-label">{card.title}</span>
                <span className="stat-value">{card.value}</span>
              </div>
              <div className={`stat-icon-wrapper ${card.colorClass}`}>
                <IconComp size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters Section */}
      <div className="calls-controls-bar">
        {/* Search Box */}
        <div className="search-box-large">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by customer or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters Group */}
        <div className="filters-group">
          {/* Call Type Filter */}
          <div className="filter-item">
            <label className="filter-label">Call Type:</label>
            <select
              className="input-field select-field filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Incoming">Incoming</option>
              <option value="Outgoing">Outgoing</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-item">
            <label className="filter-label">Status:</label>
            <select
              className="input-field select-field filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Answered">Answered</option>
              <option value="Missed">Missed</option>
              <option value="Resolved">Resolved</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calls Table Section */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <CallsTable calls={filteredCalls} onSelectCall={setSelectedCall} />
      </div>
    </div>
  );
}
