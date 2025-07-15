import React from 'react';

const StrategyList = ({ strategies, deleteStrategy, editStrategy }) => {
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
            <button onClick={() => deleteStrategy(strategy.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategyList;
