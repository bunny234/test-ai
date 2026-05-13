import React, { useState, useEffect } from 'react';
import { getActiveStrategies, getRecentTrades, getTotalPnl, getOpenPositions, setDhanAccessToken } from '../services/api';
import type { Strategy, Trade, Pnl, Position } from '../services/api';
import Chart from './Chart';
import ActiveStrategies from './ActiveStrategies';
import RecentTrades from './RecentTrades';
import PnlComponent from './Pnl';
import OpenPositions from './OpenPositions';
import { Button } from './ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Card } from './ui/Card';

const Dashboard: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [pnl, setPnl] = useState<Pnl | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [symbolFilter, setSymbolFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [strategiesData, tradesData, pnlData, positionsData] = await Promise.all([
        getActiveStrategies(),
        getRecentTrades(symbolFilter, dateFilter),
        getTotalPnl(),
        getOpenPositions(symbolFilter),
      ]);
      setStrategies(strategiesData);
      setTrades(tradesData);
      setPnl(pnlData);
      setPositions(positionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = () => {
    fetchData();
  };

  const handleSetToken = async () => {
    try {
      await setDhanAccessToken({ accessToken: 'my-dummy-token' });
      alert('Dhan token set successfully!');
    } catch (error) {
      console.error('Error setting Dhan token:', error);
      alert('Failed to set Dhan token.');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Button onClick={handleSetToken}>Set Dhan Token</Button>
      </div>
      <div className="flex space-x-4">
        <Select onValueChange={setSymbolFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Symbol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NIFTY">NIFTY</SelectItem>
            <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
          </SelectContent>
        </Select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
        <Button onClick={handleFilterChange}>Filter</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <ActiveStrategies strategies={strategies} />
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <RecentTrades trades={trades} />
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <PnlComponent pnl={pnl} />
        </Card>
        <Card className="hover:shadow-lg transition-shadow col-span-1 md:col-span-2 lg:col-span-3">
          <OpenPositions positions={positions} />
        </Card>
        <Card className="hover:shadow-lg transition-shadow col-span-1 md:col-span-2 lg:col-span-3">
          <Chart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
