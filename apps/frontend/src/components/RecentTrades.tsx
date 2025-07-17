import React from 'react';
import type { Trade } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

interface Props {
  trades: Trade[];
}

const RecentTrades: React.FC<Props> = ({ trades }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <TableCell>{trade.symbol}</TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>{trade.price}</TableCell>
                <TableCell>{new Date(trade.timestamp).toLocaleString()}</TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTrades;
