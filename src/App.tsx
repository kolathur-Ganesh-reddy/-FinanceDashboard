import React, { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { useFinanceStore } from './store/useFinanceStore'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import SummaryCard from './components/SummaryCard'
import {
  BalanceTrendChart,
  CategoryPieChart,
  IncomeExpenseBarChart,
  SpendingTrendChart,
} from './components/Charts'
import TransactionTable from './components/TransactionTable'
import Insights from './components/Insights'

const fmt = (n: number) =>
  '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

// ── Dashboard Page ──────────────────────────────
const DashboardPage: React.FC = () => {
  const { getTotalIncome, getTotalExpense, getBalance, getMonthlyStats } = useFinanceStore()

  const income = getTotalIncome()
  const expense = getTotalExpense()
  const balance = getBalance()
  const monthly = getMonthlyStats()

  const cur = monthly[monthly.length - 1] ?? { income: 0, expense: 0 }
  const prev = monthly[monthly.length - 2] ?? { income: 0, expense: 0 }
  const incPct = prev.income > 0 ? Math.round(((cur.income - prev.income) / prev.income) * 100) : 0
  const expPct = prev.expense > 0 ? Math.round(((cur.expense - prev.expense) / prev.expense) * 100) : 0

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Total Balance"
          value={fmt(balance)}
          change={`${balance >= 0 ? '+' : ''}${Math.round((balance / Math.max(income, 1)) * 100)}%`}
          changePositive={balance >= 0}
          icon={<Wallet size={18} />}
          accentColor="#d4a843"
          glowColor="#d4a843"
        />
        <SummaryCard
          label="Total Income"
          value={fmt(income)}
          change={`${incPct >= 0 ? '+' : ''}${incPct}%`}
          changePositive={incPct >= 0}
          icon={<TrendingUp size={18} />}
          accentColor="#3fb950"
          glowColor="#3fb950"
        />
        <SummaryCard
          label="Total Expenses"
          value={fmt(expense)}
          change={`${expPct >= 0 ? '+' : ''}${expPct}%`}
          changePositive={expPct <= 0}
          icon={<TrendingDown size={18} />}
          accentColor="#f85149"
          glowColor="#f85149"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <div>
          <CategoryPieChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-slate-300">Recent Transactions</h2>
          <button
            className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
            onClick={() => useFinanceStore.getState().setActivePage('transactions')}
          >
            View all →
          </button>
        </div>
        <TransactionTable />
      </div>
    </div>
  )
}

// ── Reports Page ────────────────────────────────
const ReportsPage: React.FC = () => (
  <div className="space-y-4 animate-fade-in">
    <IncomeExpenseBarChart />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SpendingTrendChart />
      <CategoryPieChart />
    </div>
  </div>
)

// ── Main App ─────────────────────────────────────
const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const activePage = useFinanceStore((s) => s.activePage)

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <DashboardPage />
      case 'transactions': return <TransactionTable />
      case 'insights':     return <Insights />
      case 'reports':      return <ReportsPage />
      default:             return <DashboardPage />
    }
  }

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — offset by sidebar on lg */}
      <div className="flex-1 flex flex-col lg:ml-56 min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-6 max-w-[1400px] w-full">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
