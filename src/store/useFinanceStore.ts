import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Transaction, Role, FilterType, SortField, SortDir, Category, TransactionType } from '../types'
import { mockTransactions } from '../data/mockData'

interface FinanceState {
  // Data
  transactions: Transaction[]

  // Role
  role: Role
  setRole: (role: Role) => void

  // Filters & sort
  filter: FilterType
  search: string
  sortField: SortField
  sortDir: SortDir
  setFilter: (filter: FilterType) => void
  setSearch: (search: string) => void
  setSortField: (field: SortField) => void
  setSortDir: (dir: SortDir) => void
  toggleSort: (field: SortField) => void

  // Active page
  activePage: string
  setActivePage: (page: string) => void

  // CRUD
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: number) => void
  updateTransaction: (tx: Transaction) => void

  // Computed getters (functions)
  getFilteredTransactions: () => Transaction[]
  getTotalIncome: () => number
  getTotalExpense: () => number
  getBalance: () => number
  getMonthlyStats: () => { month: string; income: number; expense: number; balance: number }[]
  getCategoryBreakdown: () => { name: string; value: number; color: string }[]
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'viewer',
      filter: 'all',
      search: '',
      sortField: 'date',
      sortDir: 'desc',
      activePage: 'dashboard',

      setRole: (role) => set({ role }),
      setFilter: (filter) => set({ filter }),
      setSearch: (search) => set({ search }),
      setSortField: (sortField) => set({ sortField }),
      setSortDir: (sortDir) => set({ sortDir }),
      setActivePage: (activePage) => set({ activePage }),

      toggleSort: (field) => {
        const { sortField, sortDir } = get()
        if (sortField === field) {
          set({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' })
        } else {
          set({ sortField: field, sortDir: 'desc' })
        }
      },

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            { ...tx, id: Date.now() },
            ...state.transactions,
          ],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (tx) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === tx.id ? tx : t)),
        })),

      getFilteredTransactions: () => {
        const { transactions, filter, search, sortField, sortDir } = get()
        let txs = [...transactions]

        if (filter !== 'all') txs = txs.filter((t) => t.type === filter)

        if (search.trim()) {
          const q = search.toLowerCase()
          txs = txs.filter(
            (t) =>
              t.merchant.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q) ||
              String(t.amount).includes(q)
          )
        }

        txs.sort((a, b) => {
          let cmp = 0
          if (sortField === 'date') cmp = a.date.localeCompare(b.date)
          else cmp = a.amount - b.amount
          return sortDir === 'asc' ? cmp : -cmp
        })

        return txs
      },

      getTotalIncome: () =>
        get().transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),

      getTotalExpense: () =>
        get().transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),

      getBalance: () => get().getTotalIncome() - get().getTotalExpense(),

      getMonthlyStats: () => {
        const { transactions } = get()
        const map: Record<string, { income: number; expense: number }> = {}

        transactions.forEach((t) => {
          const key = t.date.slice(0, 7) // YYYY-MM
          if (!map[key]) map[key] = { income: 0, expense: 0 }
          if (t.type === 'income') map[key].income += t.amount
          else map[key].expense += t.amount
        })

        return Object.entries(map)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, val]) => {
            const [y, m] = key.split('-')
            const label = new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString('en-IN', {
              month: 'short',
            })
            return {
              month: label,
              income: val.income,
              expense: val.expense,
              balance: val.income - val.expense,
            }
          })
      },

      getCategoryBreakdown: () => {
        const { transactions } = get()
        const map: Record<string, number> = {}
        const COLORS: Record<string, string> = {
          Food: '#d4a843', Travel: '#58a6ff', Bills: '#bc8cff',
          Shopping: '#f85149', Health: '#3fb950', Entertainment: '#ec6dbe',
          Salary: '#5cbddd', Freelance: '#ff9f40', Other: '#8b949e',
        }
        transactions
          .filter((t) => t.type === 'expense')
          .forEach((t) => {
            map[t.category] = (map[t.category] || 0) + t.amount
          })
        return Object.entries(map)
          .sort(([, a], [, b]) => b - a)
          .map(([name, value]) => ({ name, value, color: COLORS[name] || '#8b949e' }))
      },
    }),
    {
      name: 'finflow-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
      }),
    }
  )
)

// Convenience type export for form use
export type { Role, FilterType, SortField, SortDir, Category, TransactionType }
