import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StrategyForm from './components/StrategyForm';
import StrategyList from './components/StrategyList';
import Layout from './components/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import './App.css';

interface Strategy {
  id?: number;
  symbol: string;
  condition: string;
  quantity: string;
  risk: string;
}

const App: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [editing, setEditing] = useState<Strategy | null>(null);

  const addStrategy = (strategy: Omit<Strategy, 'id'>) => {
    const newStrategy = { ...strategy, id: Date.now() };
    setStrategies([...strategies, newStrategy]);
  };

  const updateStrategy = (updatedStrategy: Strategy) => {
    setStrategies(strategies.map(strategy => (strategy.id === updatedStrategy.id ? updatedStrategy : strategy)));
    setEditing(null);
  };

  const deleteStrategy = (id: number) => {
    setStrategies(strategies.filter(strategy => strategy.id !== id));
  };

  const editStrategy = (strategy: Strategy) => {
    setEditing(strategy);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/strategies"
              element={
                <ProtectedRoute>
                  <div className="container mx-auto p-4">
                    <StrategyList strategies={strategies} deleteStrategy={deleteStrategy} editStrategy={editStrategy} />
                    <StrategyForm
                      addStrategy={addStrategy}
                      editing={editing}
                      updateStrategy={updateStrategy}
                      setEditing={setEditing}
                    />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
