import React from 'react';
import { Sidebar, CRMPage } from './Sidebar';
import { TopHeader } from './TopHeader';
import { User } from '../../types';

interface Props {
  activePage: CRMPage;
  setActivePage: (page: CRMPage) => void;
  currentUser: User | null;
  onLogout: () => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ activePage, setActivePage, currentUser, onLogout, children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <TopHeader currentUser={currentUser} onLogout={onLogout} />
        <main style={{ padding: '16px', flex: 1 }}>{children}</main>
      </div>
    </div>
  );
};
