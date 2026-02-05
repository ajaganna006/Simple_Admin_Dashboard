import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { ArrowUpRight, Activity, Users, DollarSign, Layers } from 'lucide-react'; // Added 'Layers' here

const data = [
  { name: '00:00', requests: 400, matches: 380 },
  { name: '04:00', requests: 300, matches: 290 },
  { name: '08:00', requests: 800, matches: 750 },
  { name: '12:00', requests: 1200, matches: 1150 },
  { name: '16:00', requests: 1000, matches: 980 },
  { name: '20:00', requests: 1400, matches: 1350 },
];

const Dashboard = () => {
  const { services, users, systemHealth } = useContext(AppContext);

  const stats = [
    { title: 'Active Services', value: services.filter(s => s.active).length, icon: Layers, color: 'text-blue-400' },
    { title: 'Total Requests (24h)', value: '14.2k', icon: Activity, color: 'text-green-400' },
    { title: 'Registered Users', value: users.length, icon: Users, color: 'text-purple-400' },
    { title: 'Revenue', value: '$42,500', icon: DollarSign, color: 'text-pink-400' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold">System Overview</h2>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <stat.icon className={`${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Traffic Flow (UI Capture Layer)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" fillOpacity={1} fill="url(#colorRequests)" name="Inbound Requests" />
                <Area type="monotone" dataKey="matches" stroke="#10b981" fillOpacity={1} fill="url(#colorMatches)" name="Successful Matches" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Orchestrator Health</h3>
          <div className="space-y-4">
            <div className="p-4 bg-dark rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">API Latency</span>
                <span className="text-green-400">24ms</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-dark rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Match Engine Load</span>
                <span className="text-yellow-400">78%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
             <div className="p-4 bg-dark rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Database Connections</span>
                <span className="text-primary">450/500</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;