import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTranslations } from '../contexts/LanguageContext';

const yieldData = [
  { name: '2021', yield: 7.2 },
  { name: '2022', yield: 6.8 },
  { name: '2023', yield: 8.1 },
  { name: '2024 (Pred)', yield: 8.5 },
];

const expenseData = [
  { name: 'Fertilizer', value: 400 },
  { name: 'Seeds', value: 300 },
  { name: 'Labor', value: 250 },
  { name: 'Equipment', value: 200 },
];

const COLORS = ['#1F7A6B', '#3AA6FF', '#F2B705', '#F87171'];

const Analytics: React.FC = () => {
  const { t } = useTranslations();
  
  const translatedExpenseData = [
      { name: t('analytics_expense_fertilizer'), value: 400 },
      { name: t('analytics_expense_seeds'), value: 300 },
      { name: t('analytics_expense_labor'), value: 250 },
      { name: t('analytics_expense_equipment'), value: 200 },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-[#0F172A]">{t('analytics_title')}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Yield History Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="text-lg font-semibold text-[#0F172A] mb-4">{t('analytics_yield_title')}</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={yieldData}
              margin={{
                top: 5,
                right: 20,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend wrapperStyle={{fontSize: "14px"}}/>
              <Bar dataKey="yield" fill="#1F7A6B" name={t('analytics_yield_legend')} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
           <h4 className="text-lg font-semibold text-[#0F172A] mb-4">{t('analytics_expense_title')}</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={translatedExpenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {translatedExpenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend wrapperStyle={{fontSize: "14px"}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* More analytics cards can be added here */}
       <div className="bg-white p-6 rounded-2xl shadow-md">
            <h4 className="text-lg font-semibold text-[#0F172A] mb-4">{t('analytics_soil_title')}</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">{t('analytics_soil_nitrogen')}</span>
                    <span className="font-semibold text-red-500">{t('analytics_soil_low')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{t('analytics_soil_phosphorus')}</span>
                    <span className="font-semibold text-green-600">{t('analytics_soil_optimal')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{t('analytics_soil_potassium')}</span>
                    <span className="font-semibold text-yellow-500">{t('analytics_soil_medium')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{t('analytics_soil_ph')}</span>
                    <span className="font-semibold text-green-600">{t('analytics_soil_ph_value')}</span>
                </div>
                 <p className="pt-4 text-xs text-gray-500">{t('analytics_soil_recommendation')}</p>
            </div>
       </div>

    </div>
  );
};

export default Analytics;