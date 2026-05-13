import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Button } from './ui/Button';

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Risk Limit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {strategies.map(strategy => (
            <TableRow key={strategy.id}>
              <TableCell>{strategy.symbol}</TableCell>
              <TableCell>{strategy.condition}</TableCell>
              <TableCell>{strategy.quantity}</TableCell>
              <TableCell>{strategy.risk}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => editStrategy(strategy)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => strategy.id && deleteStrategy(strategy.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StrategyList;
