import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface Strategy {
  id?: number;
  symbol: string;
  condition: string;
  quantity: string;
  risk: string;
}

interface StrategyFormProps {
  addStrategy: (strategy: Omit<Strategy, 'id'>) => void;
  editing: Strategy | null;
  updateStrategy: (strategy: Strategy) => void;
  setEditing: (strategy: Strategy | null) => void;
}

const StrategyForm: React.FC<StrategyFormProps> = ({ addStrategy, editing, updateStrategy, setEditing }) => {
  const [strategy, setStrategy] = useState<Omit<Strategy, 'id'>>({
    symbol: '',
    condition: '',
    quantity: '',
    risk: ''
  });

  useEffect(() => {
    if (editing) {
      setStrategy(editing);
    } else {
      setStrategy({
        symbol: '',
        condition: '',
        quantity: '',
        risk: ''
      });
    }
  }, [editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStrategy(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!strategy.symbol || !strategy.condition || !strategy.quantity || !strategy.risk) return;
    if (editing) {
      updateStrategy(strategy as Strategy);
    } else {
      addStrategy(strategy);
    }
    setStrategy({
      symbol: '',
      condition: '',
      quantity: '',
      risk: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? 'Edit Strategy' : 'Add Strategy'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                name="symbol"
                value={strategy.symbol}
                onChange={handleChange}
                placeholder="e.g. NIFTY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={strategy.quantity}
                onChange={handleChange}
                placeholder="e.g. 10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition">Entry/Exit Condition (JSON)</Label>
            <Input
              id="condition"
              name="condition"
              value={strategy.condition}
              onChange={handleChange}
              placeholder='e.g. {"type": "indicator", "name": "SMA", "period": 14}'
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="risk">Risk Limit</Label>
            <Input
              id="risk"
              name="risk"
              type="number"
              value={strategy.risk}
              onChange={handleChange}
              placeholder="e.g. 1000"
            />
          </div>
          <div className="flex space-x-2">
            <Button type="submit">{editing ? 'Update Strategy' : 'Add Strategy'}</Button>
            {editing && <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StrategyForm;
