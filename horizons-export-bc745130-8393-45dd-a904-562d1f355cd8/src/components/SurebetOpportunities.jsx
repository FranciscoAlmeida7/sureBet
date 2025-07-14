import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calculator, AlertTriangle, Clock, Gamepad2, Vibrate as Volleyball, Dribbble, Tally4 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sportIcons = {
  'Vôlei': <Volleyball className="h-5 w-5 text-yellow-400" />,
  'Basquetebol': <Dribbble className="h-5 w-5 text-orange-400" />,
  'Tênis': <Tally4 className="h-5 w-5 text-lime-400" />,
  'CS:GO': <Gamepad2 className="h-5 w-5 text-cyan-400" />,
};

const SurebetCard = ({ surebet }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg"
  >
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="font-semibold text-white">{surebet.match}</h3>
        <p className="text-sm text-gray-300 flex items-center gap-2">
          {sportIcons[surebet.sport] || null}
          {surebet.sport}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-green-400">+{surebet.profit}%</p>
        <p className="text-sm text-gray-400 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {surebet.expiresIn}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 bg-white/5 rounded-lg">
        <p className="text-xs text-gray-400">{surebet.bookmaker1.name}</p>
        <p className="font-semibold text-white">{surebet.bookmaker1.outcome}</p>
        <p className="text-blue-400 font-bold">{surebet.bookmaker1.odds}</p>
      </div>
      <div className="p-3 bg-white/5 rounded-lg">
        <p className="text-xs text-gray-400">{surebet.bookmaker2.name}</p>
        <p className="font-semibold text-white">{surebet.bookmaker2.outcome}</p>
        <p className="text-blue-400 font-bold">{surebet.bookmaker2.odds}</p>
      </div>
    </div>

    <div className="mt-3 pt-3 border-t border-white/10">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Investimento sugerido:</span>
        <span className="font-semibold text-white">R$ {surebet.investment}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Lucro estimado:</span>
        <span className="font-semibold text-green-400">R$ {(surebet.investment * surebet.profit / 100).toFixed(2)}</span>
      </div>
    </div>
  </motion.div>
);

const SurebetOpportunities = ({ surebets, openCalculator }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-green-400" />
          Oportunidades de Surebet
        </h2>
        <Button onClick={openCalculator} className="bg-purple-500 hover:bg-purple-600 text-white">
          <Calculator className="h-4 w-4 mr-2" />
          Calcular
        </Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        <AnimatePresence>
          {surebets.map((surebet) => (
            <SurebetCard key={surebet.id} surebet={surebet} />
          ))}
        </AnimatePresence>
      </div>

      {surebets.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Nenhuma oportunidade de surebet encontrada</p>
          <p className="text-sm text-gray-500 mt-2">Continue monitorando para novas oportunidades</p>
        </div>
      )}
    </motion.div>
  );
};

export default SurebetOpportunities;