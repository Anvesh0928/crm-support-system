// ==========================================
// AGENTS PAGE COMPONENT (AgentsPage.jsx)
// ==========================================
// Displays agents list, + Add Agent modal form, and Agent Details view.

import React, { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import AgentsTable from '../components/AgentsTable';
import AgentDetails from '../components/AgentDetails';
import AddAgentModal from '../components/AddAgentModal';
import { DUMMY_AGENTS } from '../data/mockAgents';

export default function AgentsPage() {
  const [agents, setAgents] = useState(DUMMY_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle creating a new agent
  const handleSaveAgent = (newAgentData) => {
    const nextNum = agents.length + 1;
    const formattedNum = nextNum < 10 ? `00${nextNum}` : `0${nextNum}`;
    const newAgentObj = {
      id: `AG-${formattedNum}`,
      ...newAgentData
    };

    setAgents([newAgentObj, ...agents]);
    setIsModalOpen(false);
    setSuccessMessage(`Agent "${newAgentObj.id}" created successfully!`);

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // If an agent is selected, render AgentDetails view
  if (selectedAgent) {
    return (
      <AgentDetails
        agent={selectedAgent}
        onBack={() => setSelectedAgent(null)}
      />
    );
  }

  return (
    <div className="agents-page">
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="toast-success">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="customers-header">
        <div>
          <h1 className="page-title">Agents</h1>
          <p className="page-subtitle">View and manage customer support team agents.</p>
        </div>

        <button
          className="btn-primary-action"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={18} style={{ marginRight: '6px' }} />
          + Add Agent
        </button>
      </div>

      {/* Agents List Table */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <AgentsTable
          agents={agents}
          onSelectAgent={setSelectedAgent}
        />
      </div>

      {/* Modal Dialog for Adding Agent */}
      <AddAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAgent}
      />
    </div>
  );
}
