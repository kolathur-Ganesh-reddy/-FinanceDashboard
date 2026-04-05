import React from 'react'
import { Menu, Download, Shield, Eye } from 'lucide-react'
import { useFinanceStore } from '../store/useFinanceStore'

const PAGE_TITLES: Record<string, string> = {
  dashboard:    'Dashboard',
  transactions: 'Transactions',
  insights:     'Insights',
  reports:      'Reports',
}

interface TopbarProps {
  onMenuClick: () => void
}

const exportCSV = (transactions: ReturnType<typeof useFinanceStore.getState>['transactions']) => {
  const header = 'Date,Merchant,Category,Type,Amount\n'
  const rows = transactions
    .map((t) => `${t.date},"${t.merchant}",${t.category},${t.type},${t.type === 'income' ? '+' : '-'}${t.amount}`)
    .join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'finflow-transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { activePage, role, transactions } = useFinanceStore()

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <header className="h-16 bg-dark-850 border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
        >
          <Menu size={18} />
        </button>
        <h1 className="font-serif text-lg text-slate-200">{PAGE_TITLES[activePage] ?? 'FinFlow'}</h1>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:block text-xs text-slate-600 bg-dark-900 border border-white/[0.05] px-3 py-1.5 rounded-full">
          {today}
        </span>

        {/* Role badge */}
        <span
          className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${
            role === 'admin'
              ? 'bg-gold-500/10 border-gold-500/30 text-gold-400'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
          }`}
        >
          {role === 'admin' ? <Shield size={11} /> : <Eye size={11} />}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>

        <button
          onClick={() => exportCSV(transactions)}
          className="btn-ghost text-xs py-1.5"
          title="Export CSV"
        >
          <Download size={13} />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-purple-500 flex items-center justify-center text-xs font-bold text-dark-900 ml-1">
          AJ
        </div>
      </div>
    </header>
  )
}

export default Topbar
