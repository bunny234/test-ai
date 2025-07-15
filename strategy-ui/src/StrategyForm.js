import React, { useState, useEffect } from 'react';

const StrategyForm = ({ addStrategy, editing, updateStrategy, setEditing }) => {
  const [strategy, setStrategy] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStrategy(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!strategy.symbol || !strategy.condition || !strategy.quantity || !strategy.risk) return;
    if (editing) {
      updateStrategy(strategy);
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
