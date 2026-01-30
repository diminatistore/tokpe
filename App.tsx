
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductManager from './components/ProductManager';
import AIAnalyst from './components/AIAnalyst';
import OrderList from './components/OrderList';
import SmartStock from './components/SmartStock';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    activeTab: 'dashboard',
    isLoading: false,
    history: [
      { role: 'assistant', content: 'Halo! Saya AI TokPee. Ada yang bisa saya bantu dengan manajemen tokomu atau riset produk hari ini?' }
    ]
  });

  const setActiveTab = (tab: AppState['activeTab']) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        activeTab={state.activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="flex-1 flex flex-col min-w-0">
        <Header activeTab={state.activeTab} />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {state.activeTab === 'dashboard' && <Dashboard />}
          {state.activeTab === 'products' && <ProductManager />}
          {state.activeTab === 'orders' && <OrderList />}
          {state.activeTab === 'smart-stock' && <SmartStock />}
          {state.activeTab === 'ai-research' && (
            <AIAnalyst 
              history={state.history} 
              setHistory={(h) => setState(prev => ({ ...prev, history: h }))} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
