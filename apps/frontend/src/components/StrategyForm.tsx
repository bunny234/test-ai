import React, { useState, useEffect } from 'react';

interface Strategy {
  id?: number;
  symbol: string;
  condition: string;
  quantity: string;
  risk: string;
}

interface StrategyFormProps {
  addStrategy: (strategy: Strategy) => void;
  editing: Strategy | null;
  updateStrategy: (strategy: Strategy) => void;
  setEditing: (strategy: Strategy | null) => void;
}

const StrategyForm: React.FC<StrategyFormProps> = ({ addStrategy, editing, updateStrategy, setEditing }) => {
  const [strategy, setStrategy] = useState<Strategy>({
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
      updateStrategy(strategy);
    } else {
      addStrategy({ ...strategy, id: Date.now() });
    }
    setStrategy({
      symbol: '',
      condition: '',
      quantity: '',
      risk: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="symbol"
        value={strategy.symbol}
        onChange={handleChange}
        placeholder="Symbol"
      />
      <input
        type="text"
        name="condition"
        value={strategy.condition}
        onChange={handleChange}
        placeholder="Entry/Exit Condition (JSON)"
      />
      <input
        type="number"
        name="quantity"
        value={strategy.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <input
        type="number"
        name="risk"
        value={strategy.risk}
        onChange={handleChange}
        placeholder="Risk Limit"
      />
      <button type="submit">{editing ? 'Update Strategy' : 'Add Strategy'}</button>
      {editing && <button onClick={() => setEditing(null)}>Cancel</button>}
    </form>
  );
};

export default StrategyForm;
