import React from 'react';
import { motion } from 'framer-motion';

const SettingsPanel = ({ scanInterval, setScanInterval }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Configurações de Escaneamento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Intervalo de Escaneamento (segundos)
          </label>
          <input
            type="number"
            value={scanInterval}
            onChange={(e) => setScanInterval(Number(e.target.value))}
            min="10"
            max="300"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Margem Mínima (%)
          </label>
          <input
            type="number"
            defaultValue="2"
            step="0.1"
            min="0.1"
            max="10"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Investimento Máximo (R$)
          </label>
          <input
            type="number"
            defaultValue="5000"
            step="100"
            min="100"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;