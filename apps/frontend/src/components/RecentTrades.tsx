import React from 'react';
import type { Trade } from '../services/api';

interface Props {
  trades: Trade[];
}

const RecentTrades: React.FC<Props> = ({ trades }) => {
  return (
    <div>
      <h3>Recent Trades</h3>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.symbol}</td>
              <td>{trade.quantity}</td>
              <td>{trade.price}</td>
              <td>{new Date(trade.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTrades;
