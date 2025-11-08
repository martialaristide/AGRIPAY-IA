import React from 'react';
import { WalletIcon } from './IconComponents';
import { useTranslations } from '../contexts/LanguageContext';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const { t, setLanguage, language } = useTranslations();

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between flex-shrink-0">
      <h2 className="text-2xl font-bold text-[#0F172A]">{pageTitle}</h2>
      
      <div className="flex items-center space-x-4">
        {/* Search Bar - hidden on small screens */}
        <div className="hidden md:block relative">
          <input 
            type="text" 
            placeholder={t('header_search_placeholder')}
            className="bg-[#F7FAFC] border border-gray-200 rounded-lg py-2 px-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A6B]"
          />
        </div>
        
        {/* Language Switcher */}
        <div>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
            className="bg-[#F7FAFC] border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A6B]"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Wallet Status */}
        <div className="flex items-center space-x-2 p-2 rounded-lg bg-teal-50">
          <WalletIcon className="w-6 h-6 text-[#1F7A6B]" />
          <div className="hidden sm:block">
            <span className="text-sm font-semibold text-[#0F172A]">1,250.75</span>
            <span className="text-xs text-gray-500 ml-1">USDC</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
            <img 
              src="https://picsum.photos/id/237/200/200"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden lg:block">
                <p className="text-sm font-semibold text-[#0F172A]">Jean</p>
                <p className="text-xs text-gray-500">{t('header_user_role')}</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;