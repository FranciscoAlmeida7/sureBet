import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon, X } from 'lucide-react';

const Calculator = ({ isOpen, onOpenChange }) => {
  const [totalInvestment, setTotalInvestment] = useState(100);
  const [odds2Way, setOdds2Way] = useState(['', '']);
  const [odds3Way, setOdds3Way] = useState(['', '', '']);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('2-way');

  const handleOddsChange = (index, value, way) => {
    if (way === '2-way') {
      const newOdds = [...odds2Way];
      newOdds[index] = value;
      setOdds2Way(newOdds);
    } else {
      const newOdds = [...odds3Way];
      newOdds[index] = value;
      setOdds3Way(newOdds);
    }
  };

  const calculate = () => {
    const odds = activeTab === '2-way' ? odds2Way : odds3Way;
    const parsedOdds = odds.map(o => parseFloat(o)).filter(o => !isNaN(o) && o > 0);

    if (parsedOdds.length !== odds.length) {
      setResult({ error: 'Por favor, insira odds válidas para todos os resultados.' });
      return;
    }

    const impliedProbs = parsedOdds.map(o => 1 / o);
    const totalProb = impliedProbs.reduce((sum, p) => sum + p, 0);

    if (totalProb >= 1) {
      setResult({ error: 'As odds inseridas não constituem uma surebet.', profit: (1 - totalProb) * 100 });
      return;
    }

    const stakes = impliedProbs.map(p => (p / totalProb) * totalInvestment);
    const totalStake = stakes.reduce((sum, s) => sum + s, 0);
    const profit = (totalInvestment / totalProb) - totalInvestment;
    const profitPercentage = (profit / totalStake) * 100;

    setResult({
      stakes,
      profit: profit.toFixed(2),
      profitPercentage: profitPercentage.toFixed(2),
      error: null,
    });
  };

  useEffect(() => {
    setResult(null);
    if (activeTab === '2-way') {
      setOdds3Way(['', '', '']);
    } else {
      setOdds2Way(['', '']);
    }
  }, [activeTab, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900/80 backdrop-blur-lg border-purple-500/30 text-white sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CalculatorIcon className="text-purple-400" />
            Calculadora de Surebet
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Calcule o investimento e o lucro para suas apostas de arbitragem.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="2-way" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">2 Vias</TabsTrigger>
            <TabsTrigger value="3-way" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">3 Vias</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <Label htmlFor="total-investment" className="text-gray-300">Investimento Total (R$)</Label>
            <Input
              id="total-investment"
              type="number"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(Number(e.target.value))}
              className="bg-white/10 border-white/20 mt-1"
              placeholder="100"
            />
          </div>
          <TabsContent value="2-way" className="mt-4 space-y-4">
            {odds2Way.map((odd, index) => (
              <div key={index}>
                <Label htmlFor={`odd-2way-${index}`} className="text-gray-300">Odd {index + 1}</Label>
                <Input
                  id={`odd-2way-${index}`}
                  type="number"
                  step="0.01"
                  value={odd}
                  onChange={(e) => handleOddsChange(index, e.target.value, '2-way')}
                  className="bg-white/10 border-white/20 mt-1"
                  placeholder={`Ex: 2.10`}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="3-way" className="mt-4 space-y-4">
            {odds3Way.map((odd, index) => (
              <div key={index}>
                <Label htmlFor={`odd-3way-${index}`} className="text-gray-300">Odd {index + 1}</Label>
                <Input
                  id={`odd-3way-${index}`}
                  type="number"
                  step="0.01"
                  value={odd}
                  onChange={(e) => handleOddsChange(index, e.target.value, '3-way')}
                  className="bg-white/10 border-white/20 mt-1"
                  placeholder={`Ex: 3.40`}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <Button onClick={calculate} className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white">
          Calcular Surebet
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
            {result.error ? (
              <p className="text-red-400 text-center">{result.error}
                {result.profit && ` (Margem: ${result.profit.toFixed(2)}%)`}
              </p>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-center text-green-400 mb-4">Resultado da Surebet</h3>
                <div className="space-y-2">
                  {result.stakes.map((stake, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-300">Aposta na Odd {index + 1}:</span>
                      <span className="font-semibold text-white">R$ {stake.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/20 my-2"></div>
                  <div className="flex justify-between items-center text-green-400">
                    <span className="font-bold">Lucro Garantido:</span>
                    <span className="font-bold">R$ {result.profit}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-400">
                    <span className="font-bold">Margem de Lucro:</span>
                    <span className="font-bold">{result.profitPercentage}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Calculator;