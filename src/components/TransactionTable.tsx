import React, { useState } from 'react'
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react'
import { useFinanceStore } from '../store/useFinanceStore'
import { Transaction } from '../types'
import AddTransactionModal from './AddTransactionModal'

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')

const TransactionTable: React.FC = () => {
  const {
    filter, search, sortField, sortDir,
    role, setFilter, setSearch, toggleSort,
    deleteTransaction, getFilteredTransactions,
  } = useFinanceStore()

  const [showModal, setShowModal] = useState(false)
  const transactions = getFilteredTransactions()

  const SortIcon = ({ field }: { field: 'date' | 'amount' }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="text-slate-600" />
    return sortDir === 'asc'
      ? <ArrowUp size={12} className="text-gold-400" />
      : <ArrowDown size={12} className="text-gold-400" />
  }

  return (
    <div className="animate-slide-up">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            className="input-base pl-8"
            placeholder="Search merchant, category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter buttons */}
        {(['all', 'income', 'expense'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-2 rounded-xl border transition-all capitalize ${
              filter === f
                ? 'bg-gold-500/10 border-gold-500/40 text-gold-400'
                : 'border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
            }`}
          >
            {f}
          </button>
        ))}

        {/* Admin: Add button */}
        {role === 'admin' && (
          <button className="btn-primary ml-auto" onClick={() => setShowModal(true)}>
            <Plus size={14} /> Add Transaction
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <Search size={32} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No transactions found</p>
            <p className="text-xs mt-1 text-slate-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium px-4 py-3">
                    Merchant
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium px-4 py-3">
                    Category
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium px-4 py-3">
                    Type
                  </th>
                  <th
                    className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium px-4 py-3 cursor-pointer hover:text-slate-300"
                    onClick={() => toggleSort('amount')}
                  >
                    <span className="flex items-center justify-end gap-1">
                      Amount <SortIcon field="amount" />
                    </span>
                  </th>
                  <th
                    className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium px-4 py-3 cursor-pointer hover:text-slate-300"
                    onClick={() => toggleSort('date')}
                  >
                    <span className="flex items-center justify-end gap-1">
                      Date <SortIcon field="date" />
                    </span>
                  </th>
                  {role === 'admin' && (
                    <th className="text-xs uppercase tracking-wider text-slate-500 font-medium px-4 py-3" />
                  )}
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} isAdmin={role === 'admin'} onDelete={deleteTransaction} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 mt-2 text-right">
        {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
      </p>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

const TransactionRow: React.FC<{
  tx: Transaction
  isAdmin: boolean
  onDelete: (id: number) => void
}> = ({ tx, isAdmin, onDelete }) => {
  const dateStr = new Date(tx.date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <tr className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group">
      <td className="px-4 py-3">
        <span className="font-medium text-slate-200">{tx.merchant}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-400">
          {tx.category}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`badge ${tx.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
          {tx.type}
        </span>
      </td>
      <td className={`px-4 py-3 text-right font-medium tabular-nums ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
        {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
      </td>
      <td className="px-4 py-3 text-right text-slate-500 text-xs">{dateStr}</td>
      {isAdmin && (
        <td className="px-4 py-3 text-right">
          <button
            onClick={() => onDelete(tx.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <Trash2 size={13} />
          </button>
        </td>
      )}
    </tr>
  )
}

export default TransactionTable
