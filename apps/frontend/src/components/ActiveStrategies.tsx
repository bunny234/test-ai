import React from 'react';
import { Strategy } from '../services/api';

interface Props {
  strategies: Strategy[];
}

const ActiveStrategies: React.FC<Props> = ({ strategies }) => {
  return (
    <div>
      <h3>Active Strategies</h3>
      <ul>
        {strategies.map((strategy) => (
          <li key={strategy.id}>
            {strategy.name} - {strategy.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveStrategies;
