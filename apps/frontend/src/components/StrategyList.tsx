import React from 'react';

interface Strategy {
  id?: number;
  symbol: string;
  condition: string;
  quantity: string;
  risk: string;
}

interface StrategyListProps {
  strategies: Strategy[];
  deleteStrategy: (id: number) => void;
  editStrategy: (strategy: Strategy) => void;
}

const StrategyList: React.FC<StrategyListProps> = ({ strategies, deleteStrategy, editStrategy }) => {
  return (
    <div>
      <h2>Strategies</h2>
      <ul>
        {strategies.map(strategy => (
          <li key={strategy.id}>
            <p><strong>Symbol:</strong> {strategy.symbol}</p>
            <p><strong>Condition:</strong> {strategy.condition}</p>
            <p><strong>Quantity:</strong> {strategy.quantity}</p>
            <p><strong>Risk Limit:</strong> {strategy.risk}</p>
            <button onClick={() => editStrategy(strategy)}>Edit</button>
            <button onClick={() => strategy.id && deleteStrategy(strategy.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategyList;
