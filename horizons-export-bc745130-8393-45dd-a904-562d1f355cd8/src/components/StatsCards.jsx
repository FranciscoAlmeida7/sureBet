import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Search, Percent } from 'lucide-react';

const StatCard = ({ icon, title, value, color, delay }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 backdrop-blur-lg border border-${color}-500/30 rounded-xl p-6`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${color}-300 text-sm font-medium`}>{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <IconComponent className={`h-8 w-8 text-${color}-400`} />
      </div>
    </motion.div>
  );
};

const StatsCards = ({ totalProfit, activeSurebets, monitoredBookmakers, averageMargin }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={DollarSign}
        title="Lucro Total"
        value={`R$ ${totalProfit.toFixed(2)}`}
        color="green"
        delay={0.1}
      />
      <StatCard
        icon={TrendingUp}
        title="Surebets Ativas"
        value={activeSurebets}
        color="blue"
        delay={0.2}
      />
      <StatCard
        icon={Search}
        title="Casas Monitoradas"
        value={monitoredBookmakers}
        color="purple"
        delay={0.3}
      />
      <StatCard
        icon={Percent}
        title="Margem Média"
        value={`${averageMargin.toFixed(1)}%`}
        color="orange"
        delay={0.4}
      />
    </div>
  );
};

export default StatsCards;