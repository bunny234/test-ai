import React from 'react';
import type { Pnl } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface Props {
  pnl: Pnl | null;
}

const PnlComponent: React.FC<Props> = ({ pnl }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total PnL</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{pnl ? `$${pnl.totalPnl.toFixed(2)}` : 'Loading...'}</p>
      </CardContent>
    </Card>
  );
};

export default PnlComponent;
