import React from 'react';
import DashboardCard from './DashboardCard';
import { SunIcon, WalletIcon, AlertIcon, LeafIcon } from './IconComponents';
import type { Page, Transaction } from '../types';
import { useTranslations } from '../contexts/LanguageContext';

const mockTransactions: Transaction[] = [
  { id: '1', type: 'Credit', amount: 350.00, description: 'Maize Sale - Buyer Corp', date: '2024-07-20', status: 'Completed' },
  { id: '2', type: 'Debit', amount: 45.50, description: 'Fertilizer Purchase', date: '2024-07-19', status: 'Completed' },
  { id: '3', type: 'Credit', amount: 25.00, description: 'Microloan Disbursement', date: '2024-07-18', status: 'Completed' },
  { id: '4', type: 'Debit', amount: 12.75, description: 'Seed Purchase', date: '2024-07-17', status: 'Completed' },
];

const StatusBadge: React.FC<{ status: 'Completed' | 'Pending' | 'Failed' }> = ({ status }) => {
    const { t } = useTranslations();
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        Completed: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Failed: "bg-red-100 text-red-800",
    };
    const statusText = {
      Completed: t('status_completed'),
      Pending: t('status_pending'),
      Failed: t('status_failed'),
    }
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{statusText[status]}</span>;
}

const Dashboard: React.FC<{setActivePage: (page: Page) => void}> = ({setActivePage}) => {
  const { t } = useTranslations();
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#0F172A]">{t('dashboard_quick_actions')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => setActivePage('assistant')} className="bg-[#1F7A6B] text-white p-4 rounded-2xl shadow-md hover:bg-teal-800 transition-colors flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold">{t('dashboard_action_ask')}</span>
                <span className="text-xs mt-1">{t('dashboard_action_ask_desc')}</span>
            </button>
            <button onClick={() => setActivePage('assistant')} className="bg-[#F2B705] text-[#0F172A] p-4 rounded-2xl shadow-md hover:bg-amber-500 transition-colors flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold">{t('dashboard_action_upload')}</span>
                <span className="text-xs mt-1">{t('dashboard_action_upload_desc')}</span>
            </button>
            <button onClick={() => setActivePage('finance')} className="bg-[#3AA6FF] text-white p-4 rounded-2xl shadow-md hover:bg-blue-600 transition-colors flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold">{t('dashboard_action_loan')}</span>
                <span className="text-xs mt-1">{t('dashboard_action_loan_desc')}</span>
            </button>
            <button onClick={() => setActivePage('finance')} className="bg-white text-[#0F172A] p-4 rounded-2xl shadow-md hover:bg-gray-100 transition-colors flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold">{t('dashboard_action_receive')}</span>
                <span className="text-xs mt-1">{t('dashboard_action_receive_desc')}</span>
            </button>
        </div>
      </div>
    
      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<SunIcon className="w-6 h-6 text-yellow-600" />}
          title={t('dashboard_card_weather_title')}
          value={t('dashboard_card_weather_value')}
          description={t('dashboard_card_weather_desc')}
          colorClass="bg-yellow-100"
        />
        <DashboardCard
          icon={<WalletIcon className="w-6 h-6 text-green-600" />}
          title={t('dashboard_card_balance_title')}
          value="$1,250.75"
          description={t('dashboard_card_balance_desc')}
          colorClass="bg-green-100"
        />
        <DashboardCard
          icon={<AlertIcon className="w-6 h-6 text-red-600" />}
          title={t('dashboard_card_alerts_title')}
          value={t('dashboard_card_alerts_value')}
          description={t('dashboard_card_alerts_desc')}
          colorClass="bg-red-100"
        />
        <DashboardCard
          icon={<LeafIcon className="w-6 h-6 text-blue-600" />}
          title={t('dashboard_card_yield_title')}
          value={t('dashboard_card_yield_value')}
          description={t('dashboard_card_yield_desc')}
          colorClass="bg-blue-100"
        />
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#0F172A]">{t('dashboard_transactions_title')}</h3>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-[#F7FAFC]">
                <tr>
                  <th scope="col" className="px-6 py-3">{t('table_header_description')}</th>
                  <th scope="col" className="px-6 py-3">{t('table_header_amount')}</th>
                  <th scope="col" className="px-6 py-3">{t('table_header_date')}</th>
                  <th scope="col" className="px-6 py-3">{t('table_header_status')}</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-[#0F172A] whitespace-nowrap">{tx.description}</td>
                    <td className={`px-6 py-4 font-semibold ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'Credit' ? '+' : '-'} ${tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                    <td className="px-6 py-4"><StatusBadge status={tx.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;