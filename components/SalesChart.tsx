
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SalesSummary } from '../types';

interface SalesChartProps {
  data: SalesSummary[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[400px]">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Status Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="count"
              nameKey="status"
              label={({ value }) => `${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[400px]">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Pipeline Volume</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="status" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#64748b' }}
              interval={0}
            />
            <YAxis 
              allowDecimals={false} 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#64748b' }} 
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar 
              dataKey="count" 
              radius={[6, 6, 0, 0]}
              label={{ position: 'top', fill: '#475569', fontSize: 12, fontWeight: 600 }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
