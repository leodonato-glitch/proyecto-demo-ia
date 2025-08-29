import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Profile from './Profile';
import Users from './Users';
import Gallery from './Gallery';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'users':
        return <Users />;
      case 'gallery':
        return <Gallery />;
      default:
        return <Profile />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <main style={{ 
        flex: 1, 
        marginLeft: '280px',
        backgroundColor: 'var(--color-gray-light)',
        minHeight: '100vh'
      }}>
        <div style={{ 
          padding: '0',
          minHeight: '100vh'
        }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
