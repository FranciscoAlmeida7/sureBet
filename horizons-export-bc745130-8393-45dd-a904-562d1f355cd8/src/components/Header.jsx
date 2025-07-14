import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
        SureBet Scanner
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Análise de Vôlei, Basquetebol, Tênis & CS:GO para arbitragem em tempo real
      </p>
    </motion.div>
  );
};

export default Header;