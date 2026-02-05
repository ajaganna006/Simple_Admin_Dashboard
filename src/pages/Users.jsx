import React, { useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { Search, Ban, Check } from 'lucide-react';

const Users = () => {
  const { users, updateUserStatus } = useContext(AppContext);
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(filter.toLowerCase()) || 
    u.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">User Records (Database)</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search database..." 
            className="bg-dark border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:border-primary focus:outline-none"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Reputation Score</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="p-4 font-mono text-gray-500">#{user.id}</td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs bg-gray-700 text-white">{user.role}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-700 h-1.5 rounded-full">
                      <div className={`h-1.5 rounded-full ${user.score > 80 ? 'bg-green-500' : user.score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${user.score}%` }}></div>
                    </div>
                    <span className="text-sm">{user.score}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`flex items-center gap-2 ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  {user.status === 'Active' ? (
                    <button 
                      onClick={() => updateUserStatus(user.id, 'Suspended')}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Ban User"
                    >
                      <Ban size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => updateUserStatus(user.id, 'Active')}
                      className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                      title="Reactivate User"
                    >
                      <Check size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
