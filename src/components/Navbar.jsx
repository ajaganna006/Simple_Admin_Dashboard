import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const Navbar = () => {
  const { systemHealth } = useContext(AppContext);

  return (
    <div className="h-20 bg-card/50 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search requests, logs, or users..." 
          className="w-full bg-dark border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* System Health Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-dark rounded-full border border-gray-700">
          <span className={`w-2 h-2 rounded-full ${systemHealth === 'Operational' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="text-xs font-mono text-gray-400">ORCHESTRATOR: {systemHealth.toUpperCase()}</span>
        </div>

        <div className="relative cursor-pointer hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"></span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold">
          AD
        </div>
      </div>
    </div>
  );
};

export default Navbar;