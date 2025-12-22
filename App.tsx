
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Student } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<Student | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('olympiad_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local storage error:", e);
      localStorage.removeItem('olympiad_user');
    }
    // Set ready almost immediately to prevent hanging
    setIsReady(true);
  }, []);

  const handleLogin = (student: Student) => {
    setUser(student);
    localStorage.setItem('olympiad_user', JSON.stringify(student));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('olympiad_user');
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#010409] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010409]">
      {user ? (
        <Dashboard student={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </div>
  );
};

export default App;
