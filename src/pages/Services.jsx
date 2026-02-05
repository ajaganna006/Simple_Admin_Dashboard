import React from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { ToggleLeft, ToggleRight, SlidersHorizontal } from 'lucide-react';

const Services = () => {
  const { services, toggleService, algorithmSettings, setAlgorithmSettings } = useContext(AppContext);

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold">Service Configuration</h2>
        <p className="text-gray-400 mt-2">Manage UI Capture Layer Availability & Intelligence Pipeline Weights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* UI Capture Layer Controls */}
        <div className="bg-card p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="text-primary" />
            <h3 className="text-xl font-semibold">Active Modules</h3>
          </div>
          
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 bg-dark rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {service.icon === 'car' && '🚗'}
                    {service.icon === 'utensils' && '🍔'}
                    {service.icon === 'ambulance' && '🚑'}
                    {service.icon === 'box' && '📦'}
                  </span>
                  <div>
                    <h4 className="font-bold">{service.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${service.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {service.active ? 'Receiving Requests' : 'Disabled'}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleService(service.id)}
                  className="text-primary focus:outline-none"
                >
                  {service.active ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Pipeline Controls */}
        <div className="bg-card p-6 rounded-xl border border-gray-800">
           <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="text-secondary" />
            <h3 className="text-xl font-semibold">Matching Engine Logic</h3>
          </div>
          <p className="text-sm text-gray-400 mb-6">Adjust how the Multi-Service Intelligence Pipeline prioritizes providers.</p>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium">Provider Score Weight</label>
                <span className="text-primary">{algorithmSettings.scoreWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={algorithmSettings.scoreWeight}
                onChange={(e) => setAlgorithmSettings({...algorithmSettings, scoreWeight: e.target.value})}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium">Distance Weight</label>
                <span className="text-primary">{algorithmSettings.distanceWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={algorithmSettings.distanceWeight}
                onChange={(e) => setAlgorithmSettings({...algorithmSettings, distanceWeight: e.target.value})}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

             <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium">Price Competitiveness</label>
                <span className="text-primary">{algorithmSettings.priceWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={algorithmSettings.priceWeight}
                onChange={(e) => setAlgorithmSettings({...algorithmSettings, priceWeight: e.target.value})}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;