import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useFinanceStore } from '../store/useFinanceStore'
import { Category, TransactionType } from '../types'
import { CATEGORIES } from '../data/mockData'

interface Props {
  onClose: () => void
}

const AddTransactionModal: React.FC<Props> = ({ onClose }) => {
  const addTransaction = useFinanceStore((s) => s.addTransaction)
  const [form, setForm] = useState({
    merchant: '',
    amount: '',
    category: 'Food' as Category,
    type: 'expense' as TransactionType,
    date: new Date().toISOString().slice(0, 10),
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.merchant.trim()) return setError('Merchant name is required')
    const amount = parseFloat(form.amount)
    if (!amount || amount <= 0) return setError('Enter a valid amount')
    if (!form.date) return setError('Date is required')

    addTransaction({
      merchant: form.merchant.trim(),
      amount,
      category: form.category,
      type: form.type,
      date: form.date,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="card w-full max-w-md p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-slate-200">New Transaction</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5">Merchant</label>
              <input
                type="text"
                className="input-base"
                placeholder="e.g. Zomato"
                value={form.merchant}
                onChange={(e) => { setForm((f) => ({ ...f, merchant: e.target.value })); setError('') }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5">Amount (₹)</label>
              <input
                type="number"
                className="input-base"
                placeholder="0.00"
                min="1"
                value={form.amount}
                onChange={(e) => { setForm((f) => ({ ...f, amount: e.target.value })); setError('') }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5">Type</label>
              <select
                className="input-base"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as TransactionType }))}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5">Category</label>
              <select
                className="input-base"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5">Date</label>
              <input
                type="date"
                className="input-base"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTransactionModal
