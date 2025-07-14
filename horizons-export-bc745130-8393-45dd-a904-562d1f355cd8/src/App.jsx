import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import BookmakerManager from '@/components/BookmakerManager';
import SurebetOpportunities from '@/components/SurebetOpportunities';
import SettingsPanel from '@/components/SettingsPanel';
import Calculator from '@/components/Calculator';

function App() {
  const [bookmakers, setBookmakers] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [surebets, setSurebets] = useState([]);
  const [newBookmaker, setNewBookmaker] = useState('');
  const [scanInterval, setScanInterval] = useState(30);
  const [totalProfit, setTotalProfit] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const mockBookmakers = [
    { id: 1, name: 'Bet365', url: 'bet365.com', status: 'active', lastScan: new Date() },
    { id: 2, name: 'Betfair', url: 'betfair.com', status: 'active', lastScan: new Date() },
    { id: 3, name: 'Pinnacle', url: 'pinnacle.com', status: 'active', lastScan: new Date() }
  ];

  const mockSurebets = [
    {
      id: 1,
      match: 'Sada Cruzeiro vs Minas Tênis Clube',
      sport: 'Vôlei',
      profit: 3.5,
      investment: 1000,
      bookmaker1: { name: 'Bet365', outcome: 'Casa', odds: 1.85 },
      bookmaker2: { name: 'Betfair', outcome: 'Fora', odds: 2.25 },
      expiresIn: '12:15'
    },
    {
      id: 2,
      match: 'LA Lakers vs Boston Celtics',
      sport: 'Basquetebol',
      profit: 5.1,
      investment: 1000,
      bookmaker1: { name: 'Pinnacle', outcome: 'Lakers -5.5', odds: 1.90 },
      bookmaker2: { name: 'Bet365', outcome: 'Celtics +5.5', odds: 2.20 },
      expiresIn: '2h 30m'
    },
    {
      id: 3,
      match: 'Novak Djokovic vs Carlos Alcaraz',
      sport: 'Tênis',
      profit: 2.9,
      investment: 1000,
      bookmaker1: { name: 'Betfair', outcome: 'Djokovic 2-0', odds: 2.50 },
      bookmaker2: { name: 'Pinnacle', outcome: 'Alcaraz +1.5 sets', odds: 1.80 },
      expiresIn: '45:00'
    },
    {
      id: 4,
      match: 'Faze Clan vs NAVI',
      sport: 'CS:GO',
      profit: 6.2,
      investment: 1000,
      bookmaker1: { name: 'Bet365', outcome: 'Faze -1.5 Maps', odds: 2.30 },
      bookmaker2: { name: 'Betfair', outcome: 'NAVI +1.5 Maps', odds: 1.95 },
      expiresIn: '01:10:00'
    }
  ];

  useEffect(() => {
    setBookmakers(mockBookmakers);
    setSurebets(mockSurebets);
    const initialProfit = mockSurebets.reduce((sum, bet) => sum + (bet.investment * bet.profit / 100), 0);
    setTotalProfit(initialProfit);
  }, []);

  const addBookmaker = () => {
    if (!newBookmaker.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma URL válida da casa de apostas",
        variant: "destructive"
      });
      return;
    }

    const newId = bookmakers.length > 0 ? Math.max(...bookmakers.map(b => b.id)) + 1 : 1;
    const bookmaker = {
      id: newId,
      name: newBookmaker.split('.')[0].charAt(0).toUpperCase() + newBookmaker.split('.')[0].slice(1),
      url: newBookmaker,
      status: 'active',
      lastScan: new Date()
    };

    setBookmakers([...bookmakers, bookmaker]);
    setNewBookmaker('');
    
    toast({
      title: "Casa de apostas adicionada!",
      description: `${bookmaker.name} foi adicionada ao sistema de monitoramento`
    });
  };

  const removeBookmaker = (id) => {
    const bookmakerToRemove = bookmakers.find(b => b.id === id);
    setBookmakers(bookmakers.filter(b => b.id !== id));
    toast({
      title: "Casa de apostas removida",
      description: `${bookmakerToRemove.name} foi removida do monitoramento`
    });
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      toast({
        title: "Escaneamento iniciado!",
        description: `Monitorando ${bookmakers.length} casas de apostas a cada ${scanInterval} segundos`
      });
    } else {
      toast({
        title: "Escaneamento pausado",
        description: "O monitoramento foi pausado"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <Helmet>
        <title>SureBet Scanner - Vôlei, Basquete, Tênis & CS:GO</title>
        <meta name="description" content="Aplicativo avançado para detectar surebets em Vôlei, Basquetebol, Tênis e CS:GO. Monitore odds e maximize seus lucros." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Header />
        <StatsCards 
          totalProfit={totalProfit}
          activeSurebets={surebets.length}
          monitoredBookmakers={bookmakers.length}
          averageMargin={surebets.length > 0 ? surebets.reduce((acc, s) => acc + s.profit, 0) / surebets.length : 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BookmakerManager
            bookmakers={bookmakers}
            isScanning={isScanning}
            newBookmaker={newBookmaker}
            setNewBookmaker={setNewBookmaker}
            addBookmaker={addBookmaker}
            removeBookmaker={removeBookmaker}
            toggleScanning={toggleScanning}
          />
          <SurebetOpportunities
            surebets={surebets}
            openCalculator={() => setIsCalculatorOpen(true)}
          />
        </div>

        <SettingsPanel 
          scanInterval={scanInterval}
          setScanInterval={setScanInterval}
        />
      </div>
      
      <Calculator isOpen={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />
      <Toaster />
    </div>
  );
}

export default App;