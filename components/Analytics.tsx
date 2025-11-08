
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-[#0F172A]">Farm Analytics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Yield History Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="text-lg font-semibold text-[#0F172A] mb-4">Yield History (tons/hectare)</h4>
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
              <Bar dataKey="yield" fill="#1F7A6B" name="Yield" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
           <h4 className="text-lg font-semibold text-[#0F172A] mb-4">Expense Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((entry, index) => (
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
            <h4 className="text-lg font-semibold text-[#0F172A] mb-4">Soil Analysis Insights</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Nitrogen (N):</span>
                    <span className="font-semibold text-red-500">Low</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Phosphorus (P):</span>
                    <span className="font-semibold text-green-600">Optimal</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Potassium (K):</span>
                    <span className="font-semibold text-yellow-500">Medium</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">pH Level:</span>
                    <span className="font-semibold text-green-600">6.8 (Slightly Acidic)</span>
                </div>
                 <p className="pt-4 text-xs text-gray-500">AI Recommendation: Apply a nitrogen-rich fertilizer. See AI Assistant for specific product suggestions.</p>
            </div>
       </div>

    </div>
  );
};

export default Analytics;
