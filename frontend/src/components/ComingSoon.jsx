// ==========================================
// COMING SOON PLACEHOLDER (ComingSoon.jsx)
// ==========================================
// Shown when non-dashboard sidebar menu items are clicked.

import React from 'react';
import { Clock } from 'lucide-react';

export default function ComingSoon({ title }) {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-icon">
        <Clock size={32} />
      </div>
      <h2 className="coming-soon-title">{title}</h2>
      <p className="coming-soon-desc">Coming soon</p>
    </div>
  );
}
