import React from 'react';
import { Position } from '../services/api';

interface Props {
  positions: Position[];
}

const OpenPositions: React.FC<Props> = ({ positions }) => {
  return (
    <div>
      <h3>Open Positions</h3>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Average Price</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id}>
              <td>{position.symbol}</td>
              <td>{position.quantity}</td>
              <td>{position.averagePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenPositions;
