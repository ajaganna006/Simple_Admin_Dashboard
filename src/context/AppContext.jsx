import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. UI Capture Layer & Database State
  const [services, setServices] = useState([
    { id: 1, name: 'Ride Share', active: true, icon: 'car' },
    { id: 2, name: 'Food Delivery', active: true, icon: 'utensils' },
    { id: 3, name: 'Emergency Med', active: true, icon: 'ambulance' },
    { id: 4, name: 'Logistics', active: false, icon: 'box' },
  ]);

  // 2. Database Records (Users)
  const [users, setUsers] = useState([
    { id: 101, name: 'Alice Johnson', role: 'Customer', status: 'Active', score: 85 },
    { id: 102, name: 'Bob Smith', role: 'Provider', status: 'Active', score: 92 },
    { id: 103, name: 'Charlie Davis', role: 'Provider', status: 'Suspended', score: 45 },
  ]);

  // 3. Orchestrator & Intelligence Pipeline Logic
  const [systemHealth, setSystemHealth] = useState('Operational'); // Operational, Degraded, Down
  const [algorithmSettings, setAlgorithmSettings] = useState({
    distanceWeight: 50, // 0-100
    priceWeight: 50,    // 0-100
    scoreWeight: 80     // 0-100
  });

  // Actions
  const toggleService = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const updateUserStatus = (id, newStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <AppContext.Provider value={{
      services,
      toggleService,
      users,
      updateUserStatus,
      systemHealth,
      algorithmSettings,
      setAlgorithmSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};