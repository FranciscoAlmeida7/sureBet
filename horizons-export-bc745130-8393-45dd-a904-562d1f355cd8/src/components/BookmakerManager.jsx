import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookmakerManager = ({
  bookmakers,
  isScanning,
  newBookmaker,
  setNewBookmaker,
  addBookmaker,
  removeBookmaker,
  toggleScanning,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Search className="h-6 w-6 text-blue-400" />
          Casas de Apostas
        </h2>
        <Button
          onClick={toggleScanning}
          className={`${isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          {isScanning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isScanning ? 'Pausar' : 'Iniciar'}
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newBookmaker}
          onChange={(e) => setNewBookmaker(e.target.value)}
          placeholder="Digite a URL da casa de apostas..."
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addBookmaker()}
        />
        <Button onClick={addBookmaker} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        <AnimatePresence>
          {bookmakers.map((bookmaker) => (
            <motion.div
              key={bookmaker.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <div>
                  <p className="font-semibold text-white">{bookmaker.name}</p>
                  <p className="text-sm text-gray-400">{bookmaker.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {bookmaker.lastScan.toLocaleTimeString()}
                </span>
                <Button
                  onClick={() => removeBookmaker(bookmaker.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BookmakerManager;