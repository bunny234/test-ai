import React, { useState, useEffect } from 'react';
import { getActiveStrategies, getRecentTrades, getTotalPnl, getOpenPositions, setDhanAccessToken } from '../services/api';
import type { Strategy, Trade, Pnl, Position } from '../services/api';
import Chart from './Chart';
import ActiveStrategies from './ActiveStrategies';
import RecentTrades from './RecentTrades';
import PnlComponent from './Pnl';
import OpenPositions from './OpenPositions';
import './Dashboard.css';

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
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleSetToken}>Set Dhan Token</button>
      <div>
        <input
          type="text"
          placeholder="Symbol"
          value={symbolFilter}
          onChange={(e) => setSymbolFilter(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <button onClick={handleFilterChange}>Filter</button>
      </div>
      <div className="dashboard-grid">
        <ActiveStrategies strategies={strategies} />
        <RecentTrades trades={trades} />
        <PnlComponent pnl={pnl} />
        <OpenPositions positions={positions} />
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
