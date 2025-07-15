import React, { useState, useEffect } from 'react';
import './App.css';
import StrategyForm from './StrategyForm';
import StrategyList from './StrategyList';

function App() {
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    const storedStrategies = JSON.parse(localStorage.getItem('strategies'));
    if (storedStrategies) {
      setStrategies(storedStrategies);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('strategies', JSON.stringify(strategies));
  }, [strategies]);

  const [editing, setEditing] = useState(null);

  const addStrategy = (strategy) => {
    setStrategies([...strategies, { ...strategy, id: Date.now() }]);
  };

  const deleteStrategy = (id) => {
    setStrategies(strategies.filter(strategy => strategy.id !== id));
  };

  const editStrategy = (strategy) => {
    setEditing(strategy);
  };

  const updateStrategy = (updatedStrategy) => {
    setStrategies(
      strategies.map(strategy =>
        strategy.id === updatedStrategy.id ? updatedStrategy : strategy
      )
    );
    setEditing(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading Strategy Configuration</h1>
      </header>
      <main>
        <StrategyForm
          addStrategy={addStrategy}
          editing={editing}
          updateStrategy={updateStrategy}
          setEditing={setEditing}
        />
        <StrategyList
          strategies={strategies}
          deleteStrategy={deleteStrategy}
          editStrategy={editStrategy}
        />
      </main>
    </div>
  );
}

export default App;
