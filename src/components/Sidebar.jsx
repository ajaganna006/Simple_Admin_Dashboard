import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Layers, Users, Settings, Activity } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Services (UI Layer)', path: '/services', icon: Layers },
  { name: 'Users (Database)', path: '/users', icon: Users },
  { name: 'System Health', path: '/health', icon: Activity },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r border-gray-800 flex flex-col p-6">
      <h1 className="text-2xl font-bold text-primary mb-10 flex items-center gap-2">
        <span className="text-3xl">⚡</span> ServiceLink
      </h1>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;