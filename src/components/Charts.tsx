import React, { useState } from 'react'
import {
   XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
  Area, AreaChart, 
} from 'recharts'
import { useFinanceStore } from '../store/useFinanceStore'

const fmt = (n: number) =>
  '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

// ──────────────────────────────────────────────
// Balance Trend (Line / Area)
// ──────────────────────────────────────────────
export const BalanceTrendChart: React.FC = () => {
  const getMonthlyStats = useFinanceStore((s) => s.getMonthlyStats)
  const [period, setPeriod] = useState<'6m' | '1y'>('6m')
  const allData = getMonthlyStats()
  const data = period === '6m' ? allData.slice(-6) : allData

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="card px-3 py-2 text-xs space-y-1">
        <p className="text-slate-400 font-medium">{label}</p>
        <p className="text-gold-400">{fmt(payload[0]?.value ?? 0)}</p>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-slate-200">Balance Over Time</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly running balance</p>
        </div>
        <div className="flex bg-dark-900 rounded-lg p-0.5 gap-0.5">
          {(['6m', '1y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1.5 rounded-md transition-all ${
                period === p
                  ? 'bg-dark-800 text-slate-200'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {p === '6m' ? '6M' : '1Y'}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4a843" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#d4a843" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: '#6e7681', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6e7681', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} width={48} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="balance" stroke="#d4a843" strokeWidth={2} fill="url(#balanceGrad)" dot={{ fill: '#d4a843', r: 3 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────────────────────────────────────
// Category Pie Chart
// ──────────────────────────────────────────────
export const CategoryPieChart: React.FC = () => {
  const getCategoryBreakdown = useFinanceStore((s) => s.getCategoryBreakdown)
  const data = getCategoryBreakdown()
  const total = data.reduce((s, d) => s + d.value, 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null
    const d = payload[0]
    return (
      <div className="card px-3 py-2 text-xs space-y-0.5">
        <p className="text-slate-300 font-medium">{d.name}</p>
        <p style={{ color: d.payload.color }}>{fmt(d.value)}</p>
        <p className="text-slate-500">{Math.round((d.value / total) * 100)}%</p>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <div className="mb-5">
        <h3 className="text-sm font-medium text-slate-200">Spending Breakdown</h3>
        <p className="text-xs text-slate-500 mt-0.5">By category</p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={75} innerRadius={40} dataKey="value" paddingAngle={2}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-1.5 mt-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: d.color }} />
            <span className="text-xs text-slate-400 truncate">{d.name}</span>
            <span className="text-xs text-slate-600 ml-auto">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Income vs Expenses Bar Chart
// ──────────────────────────────────────────────
export const IncomeExpenseBarChart: React.FC = () => {
  const getMonthlyStats = useFinanceStore((s) => s.getMonthlyStats)
  const data = getMonthlyStats().slice(-6)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="card px-3 py-2 text-xs space-y-1">
        <p className="text-slate-400 font-medium">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {fmt(p.value)}</p>
        ))}
      </div>
    )
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-slate-200">Income vs Expenses</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly comparison (6M)</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-sm bg-emerald-500/70" />Income
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-sm bg-red-500/70" />Expenses
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barCategoryGap="30%" margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: '#6e7681', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6e7681', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} width={48} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" name="Income" fill="rgba(63,185,80,0.7)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expenses" fill="rgba(248,81,73,0.7)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────────────────────────────────────
// Spending Trend Line Chart
// ──────────────────────────────────────────────
export const SpendingTrendChart: React.FC = () => {
  const getMonthlyStats = useFinanceStore((s) => s.getMonthlyStats)
  const data = getMonthlyStats()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="card px-3 py-2 text-xs space-y-0.5">
        <p className="text-slate-400 font-medium">{label}</p>
        <p className="text-red-400">{fmt(payload[0]?.value ?? 0)}</p>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <div className="mb-5">
        <h3 className="text-sm font-medium text-slate-200">Spending Trend</h3>
        <p className="text-xs text-slate-500 mt-0.5">Monthly expense history</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f85149" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f85149" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: '#6e7681', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6e7681', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} width={48} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="expense" stroke="#f85149" strokeWidth={2} fill="url(#expenseGrad)" dot={{ fill: '#f85149', r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
