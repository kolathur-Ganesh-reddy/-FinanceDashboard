export type TransactionType = 'income' | 'expense'

export type Category =
  | 'Food'
  | 'Travel'
  | 'Bills'
  | 'Shopping'
  | 'Health'
  | 'Entertainment'
  | 'Salary'
  | 'Freelance'
  | 'Other'

export type Role = 'viewer' | 'admin'

export type SortField = 'date' | 'amount'
export type SortDir = 'asc' | 'desc'
export type FilterType = 'all' | TransactionType

export interface Transaction {
  id: number
  merchant: string
  amount: number
  type: TransactionType
  category: Category
  date: string // YYYY-MM-DD
}

export interface MonthlyStats {
  month: string   // e.g. "Jan"
  income: number
  expense: number
  balance: number
}
