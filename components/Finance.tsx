
import React, { useState } from 'react';
import type { Transaction } from '../types';
import DashboardCard from './DashboardCard';
import { WalletIcon } from './IconComponents';

const mockTransactions: Transaction[] = [
  { id: '1', type: 'Credit', amount: 350.00, description: 'Maize Sale - Buyer Corp', date: '2024-07-20', status: 'Completed' },
  { id: '2', type: 'Debit', amount: 45.50, description: 'Fertilizer Purchase', date: '2024-07-19', status: 'Completed' },
  { id: '3', type: 'Credit', amount: 25.00, description: 'Microloan Disbursement', date: '2024-07-18', status: 'Completed' },
  { id: '4', type: 'Debit', amount: 12.75, description: 'Seed Purchase', date: '2024-07-17', status: 'Completed' },
  { id: '5', type: 'Debit', amount: 150.00, description: 'Sent to Family', date: '2024-07-16', status: 'Completed' },
  { id: '6', type: 'Credit', amount: 500.00, description: 'Crop Sale - Local Market', date: '2024-07-15', status: 'Completed' },
];

const StatusBadge: React.FC<{ status: 'Completed' | 'Pending' | 'Failed' }> = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        Completed: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Failed: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const Finance: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'send' | 'request'>('send');

    return (
        <div className="space-y-8">
            <DashboardCard
                icon={<WalletIcon className="w-8 h-8 text-green-600" />}
                title="USDC Wallet Balance"
                value="$1,250.75"
                description="Available for payments and loans"
                colorClass="bg-green-100"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Actions Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md">
                    <div className="flex border-b border-gray-200">
                        <button onClick={() => setActiveTab('send')} className={`py-2 px-4 text-sm font-semibold transition-colors ${activeTab === 'send' ? 'text-[#1F7A6B] border-b-2 border-[#1F7A6B]' : 'text-gray-500'}`}>
                            Send USDC
                        </button>
                        <button onClick={() => setActiveTab('request')} className={`py-2 px-4 text-sm font-semibold transition-colors ${activeTab === 'request' ? 'text-[#1F7A6B] border-b-2 border-[#1F7A6B]' : 'text-gray-500'}`}>
                            Request Loan
                        </button>
                    </div>
                    {activeTab === 'send' && (
                        <form className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Address</label>
                                <input type="text" id="recipient" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1F7A6B] focus:border-[#1F7A6B] sm:text-sm" placeholder="0x..."/>
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (USDC)</label>
                                <input type="number" id="amount" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1F7A6B] focus:border-[#1F7A6B] sm:text-sm" placeholder="100.00"/>
                            </div>
                            <button type="submit" className="w-full bg-[#1F7A6B] text-white py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium hover:bg-teal-800 transition-colors">
                                Send Payment
                            </button>
                        </form>
                    )}
                     {activeTab === 'request' && (
                        <div className="mt-6 space-y-4">
                            <p className="text-sm text-gray-600">Request a microloan for your farming needs. Our AI will assess your request based on your farming history and yield predictions.</p>
                             <div>
                                <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700">Loan Amount (USDC)</label>
                                <input type="number" id="loan-amount" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1F7A6B] focus:border-[#1F7A6B] sm:text-sm" placeholder="500.00"/>
                            </div>
                            <button type="submit" className="w-full bg-[#3AA6FF] text-white py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium hover:bg-blue-600 transition-colors">
                                Submit Loan Request
                            </button>
                        </div>
                    )}
                </div>

                {/* Transaction History */}
                <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-[#0F172A] p-2">Full Transaction History</h3>
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-[#F7FAFC] sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {mockTransactions.map((tx) => (
                                    <tr key={tx.id} className="bg-white hover:bg-gray-50">
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

export default Finance;
