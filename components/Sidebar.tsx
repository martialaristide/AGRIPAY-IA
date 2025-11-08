import React from 'react';
import type { Page } from '../types';
import { DashboardIcon, AssistantIcon, FinanceIcon, AnalyticsIcon, LeafIcon } from './IconComponents';
import { useTranslations } from '../contexts/LanguageContext';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive
        ? 'bg-[#1F7A6B] text-white shadow-lg'
        : 'text-gray-500 hover:bg-teal-50 hover:text-[#1F7A6B]'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-4 font-semibold text-sm">{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { t } = useTranslations();
  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0 p-4 hidden md:flex md:flex-col justify-between">
      <div>
        <div className="flex items-center justify-center p-4 mb-6">
           <LeafIcon className="w-10 h-10 text-[#1F7A6B]" />
           <h1 className="text-2xl font-bold ml-2 text-[#0F172A]">AgriPay <span className="text-[#1F7A6B]">AI</span></h1>
        </div>
        <nav>
          <ul>
            <NavItem
              icon={<DashboardIcon />}
              label={t('sidebar_dashboard')}
              isActive={activePage === 'dashboard'}
              onClick={() => setActivePage('dashboard')}
            />
            <NavItem
              icon={<AssistantIcon />}
              label={t('sidebar_assistant')}
              isActive={activePage === 'assistant'}
              onClick={() => setActivePage('assistant')}
            />
            <NavItem
              icon={<FinanceIcon />}
              label={t('sidebar_finance')}
              isActive={activePage === 'finance'}
              onClick={() => setActivePage('finance')}
            />
            <NavItem
              icon={<AnalyticsIcon />}
              label={t('sidebar_analytics')}
              isActive={activePage === 'analytics'}
              onClick={() => setActivePage('analytics')}
            />
          </ul>
        </nav>
      </div>
      <div className="p-4 rounded-lg bg-teal-50 text-center">
        <h4 className="font-bold text-sm text-[#1F7A6B]">{t('sidebar_pro_title')}</h4>
        <p className="text-xs text-gray-500 mt-1">{t('sidebar_pro_description')}</p>
        <button className="bg-[#1F7A6B] text-white text-xs font-bold py-2 px-4 rounded-lg mt-3 w-full hover:bg-teal-800 transition-colors">
            {t('sidebar_pro_button')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;