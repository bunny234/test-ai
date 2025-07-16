import React from 'react';
import type { Pnl } from '../services/api';

interface Props {
  pnl: Pnl | null;
}

const PnlComponent: React.FC<Props> = ({ pnl }) => {
  return (
    <div>
      <h3>Total PnL</h3>
      <p>{pnl ? `$${pnl.totalPnl.toFixed(2)}` : 'Loading...'}</p>
    </div>
  );
};

export default PnlComponent;
