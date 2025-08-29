import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

// Componente interno que puede usar useAuth
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading">
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--color-gray-medium)',
            borderTop: '4px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Cargando aplicación...
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Login />;
};

// Componente principal App
const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AuthProvider>
  );
};

export default App;
