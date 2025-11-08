import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import Finance from './components/Finance';
import Analytics from './components/Analytics';
import type { Page } from './types';
import { LanguageProvider, useTranslations } from './contexts/LanguageContext';

const MainApp: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const { t } = useTranslations();

  const pageTitles: Record<Page, string> = {
    dashboard: t('page_title_dashboard'),
    assistant: t('page_title_assistant'),
    finance: t('page_title_finance'),
    analytics: t('page_title_analytics'),
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'assistant':
        return <AIAssistant />;
      case 'finance':
        return <Finance />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F7FAFC] text-[#0F172A]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageTitle={pageTitles[activePage]} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F7FAFC] p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};


const App: React.FC = () => (
  <LanguageProvider>
    <MainApp />
  </LanguageProvider>
);


export default App;