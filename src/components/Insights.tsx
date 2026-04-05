import React from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Award, Target, Zap } from 'lucide-react'
import { useFinanceStore } from '../store/useFinanceStore'

const fmt = (n: number) => '₹' + Math.abs(n).toLocaleString('en-IN')

const Insights: React.FC = () => {
  const { getMonthlyStats, getCategoryBreakdown, getTotalExpense, transactions } =
    useFinanceStore()

  const monthly = getMonthlyStats()
  const cats = getCategoryBreakdown()
  const totalExpense = getTotalExpense()

  const cur = monthly[monthly.length - 1] ?? { income: 0, expense: 0, balance: 0 }
  const prev = monthly[monthly.length - 2] ?? { income: 0, expense: 0, balance: 0 }

  const expPct = prev.expense > 0 ? Math.round(((cur.expense - prev.expense) / prev.expense) * 100) : 0
  const incPct = prev.income > 0 ? Math.round(((cur.income - prev.income) / prev.income) * 100) : 0
  const savingsRate = cur.income > 0 ? Math.round(((cur.income - cur.expense) / cur.income) * 100) : 0
  const topCat = cats[0] ?? { name: 'N/A', value: 0, color: '#8b949e' }
  const avgExpense =
    transactions.filter((t) => t.type === 'expense').length > 0
      ? Math.round(totalExpense / transactions.filter((t) => t.type === 'expense').length)
      : 0

  const insights = [
    {
      icon: <Award size={18} />,
      label: 'Top Spending Category',
      value: topCat.name,
      sub: `${fmt(topCat.value)} total spent`,
      accent: topCat.color,
      pill: 'Highest area',
      pillColor: 'bg-amber-500/15 text-amber-400',
    },
    {
      icon: <TrendingUp size={18} />,
      label: 'Monthly Expense Change',
      value: `${expPct >= 0 ? '+' : ''}${expPct}%`,
      sub: `vs previous month`,
      accent: expPct > 10 ? '#f85149' : expPct < 0 ? '#3fb950' : '#58a6ff',
      pill: expPct > 10 ? '⚠ Spending up' : expPct < 0 ? '✓ Spending down' : 'Stable',
      pillColor:
        expPct > 10
          ? 'bg-red-500/15 text-red-400'
          : expPct < 0
          ? 'bg-emerald-500/15 text-emerald-400'
          : 'bg-blue-500/15 text-blue-400',
    },
    {
      icon: <Target size={18} />,
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: 'of income saved this month',
      accent: savingsRate > 30 ? '#3fb950' : savingsRate > 15 ? '#d4a843' : '#f85149',
      pill: savingsRate > 30 ? 'Excellent!' : savingsRate > 15 ? 'Good' : 'Needs attention',
      pillColor:
        savingsRate > 30
          ? 'bg-emerald-500/15 text-emerald-400'
          : savingsRate > 15
          ? 'bg-gold-500/15 text-gold-400'
          : 'bg-red-500/15 text-red-400',
      progress: Math.min(savingsRate, 100),
      progressColor: savingsRate > 30 ? '#3fb950' : savingsRate > 15 ? '#d4a843' : '#f85149',
    },
    {
      icon: <Zap size={18} />,
      label: 'Income Growth',
      value: `${incPct >= 0 ? '+' : ''}${incPct}%`,
      sub: 'vs previous month',
      accent: incPct >= 0 ? '#3fb950' : '#f85149',
      pill: incPct >= 0 ? 'Growing' : 'Dipped',
      pillColor: incPct >= 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400',
    },
    {
      icon: <TrendingDown size={18} />,
      label: 'Avg Transaction',
      value: fmt(avgExpense),
      sub: `per expense (${transactions.filter((t) => t.type === 'expense').length} total)`,
      accent: '#bc8cff',
      pill: 'Expense avg',
      pillColor: 'bg-purple-500/15 text-purple-400',
    },
    {
      icon: <AlertTriangle size={18} />,
      label: 'Net Cash Flow',
      value: fmt(Math.abs(cur.income - cur.expense)),
      sub: `${cur.income - cur.expense >= 0 ? 'positive' : 'negative'} this month`,
      accent: cur.income - cur.expense >= 0 ? '#3fb950' : '#f85149',
      pill: cur.income - cur.expense >= 0 ? 'In the green' : 'Deficit',
      pillColor:
        cur.income - cur.expense >= 0
          ? 'bg-emerald-500/15 text-emerald-400'
          : 'bg-red-500/15 text-red-400',
    },
  ]

  return (
    <div className="animate-slide-up space-y-8">
      {/* Insight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((ins, i) => (
          <div key={i} className="card p-5 hover:-translate-y-0.5 transition-transform duration-200">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${ins.accent}22`, color: ins.accent }}
            >
              {ins.icon}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{ins.label}</p>
            <p className="text-2xl font-semibold text-slate-100 mb-1" style={{ color: ins.accent }}>
              {ins.value}
            </p>
            <p className="text-xs text-slate-500 mb-3">{ins.sub}</p>

            {/* Optional progress bar */}
            {'progress' in ins && ins.progress !== undefined && (
              <div className="mb-3">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${ins.progress}%`, background: ins.progressColor }}
                  />
                </div>
              </div>
            )}

            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ins.pillColor}`}>
              {ins.pill}
            </span>
          </div>
        ))}
      </div>

      {/* Monthly breakdown bars */}
      <div className="card p-5">
        <h3 className="text-sm font-medium text-slate-200 mb-5">Monthly Income vs Expenses</h3>
        <div className="space-y-5">
          {monthly.slice(-6).map((m) => {
            const maxVal = Math.max(...monthly.map((x) => Math.max(x.income, x.expense)), 1)
            const incW = Math.round((m.income / maxVal) * 100)
            const expW = Math.round((m.expense / maxVal) * 100)
            return (
              <div key={m.month}>
                <p className="text-xs text-slate-500 mb-2 font-medium">{m.month}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-emerald-400 w-6">Inc</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500/70 transition-all duration-500"
                        style={{ width: `${incW}%` }}
                      />
                    </div>
                    <span className="text-xs text-emerald-400 w-24 text-right tabular-nums">
                      {fmt(m.income)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-red-400 w-6">Exp</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-red-500/70 transition-all duration-500"
                        style={{ width: `${expW}%` }}
                      />
                    </div>
                    <span className="text-xs text-red-400 w-24 text-right tabular-nums">
                      {fmt(m.expense)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Category spending breakdown */}
      <div className="card p-5">
        <h3 className="text-sm font-medium text-slate-200 mb-5">Category Spending Breakdown</h3>
        <div className="space-y-3">
          {cats.map((cat) => {
            const maxVal = cats.length > 0 ? cats[0].value : 1
            const w = Math.round((cat.value / maxVal) * 100)
            return (
              <div key={cat.name} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: cat.color }} />
                <span className="text-xs text-slate-400 w-24 flex-shrink-0">{cat.name}</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${w}%`, background: cat.color }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-300 w-24 text-right tabular-nums">
                  {fmt(cat.value)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Insights
