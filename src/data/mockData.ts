import { Transaction } from '../types'

export const mockTransactions: Transaction[] = [
  // March 2025
  { id: 1,  merchant: 'Salary — TechCorp',      amount: 85000, type: 'income',  category: 'Salary',        date: '2025-03-01' },
  { id: 2,  merchant: 'Zomato',                  amount: 1240,  type: 'expense', category: 'Food',          date: '2025-03-02' },
  { id: 3,  merchant: 'Netflix',                 amount: 799,   type: 'expense', category: 'Entertainment', date: '2025-03-03' },
  { id: 4,  merchant: 'Ola Cabs',                amount: 650,   type: 'expense', category: 'Travel',        date: '2025-03-04' },
  { id: 5,  merchant: 'Swiggy',                  amount: 890,   type: 'expense', category: 'Food',          date: '2025-03-05' },
  { id: 6,  merchant: 'Electricity Bill',        amount: 2200,  type: 'expense', category: 'Bills',         date: '2025-03-06' },
  { id: 7,  merchant: 'Amazon',                  amount: 3499,  type: 'expense', category: 'Shopping',      date: '2025-03-07' },
  { id: 8,  merchant: 'Freelance Project',       amount: 25000, type: 'income',  category: 'Freelance',     date: '2025-03-10' },
  { id: 9,  merchant: 'Apollo Pharmacy',         amount: 480,   type: 'expense', category: 'Health',        date: '2025-03-11' },
  { id: 10, merchant: 'PVR Cinemas',             amount: 800,   type: 'expense', category: 'Entertainment', date: '2025-03-12' },
  { id: 11, merchant: 'Flipkart',                amount: 4500,  type: 'expense', category: 'Shopping',      date: '2025-03-13' },
  { id: 12, merchant: 'Blinkit Groceries',       amount: 1850,  type: 'expense', category: 'Food',          date: '2025-03-15' },
  { id: 13, merchant: 'Airtel Bill',             amount: 799,   type: 'expense', category: 'Bills',         date: '2025-03-16' },
  { id: 14, merchant: 'Rapido Bike',             amount: 220,   type: 'expense', category: 'Travel',        date: '2025-03-18' },
  { id: 15, merchant: 'Cult.fit Gym',            amount: 2500,  type: 'expense', category: 'Health',        date: '2025-03-20' },

  // February 2025
  { id: 16, merchant: 'Salary — TechCorp',      amount: 85000, type: 'income',  category: 'Salary',        date: '2025-02-01' },
  { id: 17, merchant: 'Swiggy',                  amount: 1100,  type: 'expense', category: 'Food',          date: '2025-02-03' },
  { id: 18, merchant: 'Gym Membership',          amount: 2000,  type: 'expense', category: 'Health',        date: '2025-02-04' },
  { id: 19, merchant: 'Uber',                    amount: 450,   type: 'expense', category: 'Travel',        date: '2025-02-06' },
  { id: 20, merchant: 'Myntra',                  amount: 3200,  type: 'expense', category: 'Shopping',      date: '2025-02-08' },
  { id: 21, merchant: 'Freelance UI Design',     amount: 18000, type: 'income',  category: 'Freelance',     date: '2025-02-14' },
  { id: 22, merchant: 'Reliance Digital',        amount: 12000, type: 'expense', category: 'Shopping',      date: '2025-02-18' },
  { id: 23, merchant: 'Pizza Hut',               amount: 950,   type: 'expense', category: 'Food',          date: '2025-02-20' },
  { id: 24, merchant: 'JioCinema',               amount: 299,   type: 'expense', category: 'Entertainment', date: '2025-02-22' },
  { id: 25, merchant: 'Water Bill',              amount: 320,   type: 'expense', category: 'Bills',         date: '2025-02-25' },

  // January 2025
  { id: 26, merchant: 'Salary — TechCorp',      amount: 85000, type: 'income',  category: 'Salary',        date: '2025-01-01' },
  { id: 27, merchant: 'Bata Shoes',              amount: 4200,  type: 'expense', category: 'Shopping',      date: '2025-01-05' },
  { id: 28, merchant: 'Dominos',                 amount: 680,   type: 'expense', category: 'Food',          date: '2025-01-10' },
  { id: 29, merchant: 'BESCOM Bill',             amount: 2100,  type: 'expense', category: 'Bills',         date: '2025-01-12' },
  { id: 30, merchant: 'Freelance',               amount: 30000, type: 'income',  category: 'Freelance',     date: '2025-01-20' },
  { id: 31, merchant: 'PharmEasy',               amount: 650,   type: 'expense', category: 'Health',        date: '2025-01-22' },
  { id: 32, merchant: 'IndiGo Flight',           amount: 5800,  type: 'expense', category: 'Travel',        date: '2025-01-25' },
  { id: 33, merchant: 'BookMyShow',              amount: 420,   type: 'expense', category: 'Entertainment', date: '2025-01-27' },

  // December 2024
  { id: 34, merchant: 'Salary — TechCorp',      amount: 85000, type: 'income',  category: 'Salary',        date: '2024-12-01' },
  { id: 35, merchant: 'Freelance Consulting',    amount: 22000, type: 'income',  category: 'Freelance',     date: '2024-12-10' },
  { id: 36, merchant: 'Christmas Shopping',      amount: 8500,  type: 'expense', category: 'Shopping',      date: '2024-12-20' },
  { id: 37, merchant: 'Restaurant Dinner',       amount: 2200,  type: 'expense', category: 'Food',          date: '2024-12-24' },
  { id: 38, merchant: 'Electricity Bill',        amount: 2600,  type: 'expense', category: 'Bills',         date: '2024-12-05' },
  { id: 39, merchant: 'MakeMyTrip Hotel',        amount: 9500,  type: 'expense', category: 'Travel',        date: '2024-12-28' },

  // November 2024
  { id: 40, merchant: 'Salary — TechCorp',      amount: 85000, type: 'income',  category: 'Salary',        date: '2024-11-01' },
  { id: 41, merchant: 'Freelance App Dev',       amount: 35000, type: 'income',  category: 'Freelance',     date: '2024-11-15' },
  { id: 42, merchant: 'Diwali Shopping',         amount: 12000, type: 'expense', category: 'Shopping',      date: '2024-11-05' },
  { id: 43, merchant: 'Zomato Pro',              amount: 1500,  type: 'expense', category: 'Food',          date: '2024-11-10' },
  { id: 44, merchant: 'Health Checkup',          amount: 3500,  type: 'expense', category: 'Health',        date: '2024-11-18' },
  { id: 45, merchant: 'Ola Outstation',          amount: 2800,  type: 'expense', category: 'Travel',        date: '2024-11-22' },
]

export const CATEGORIES = [
  'Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Salary', 'Freelance', 'Other'
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  Food:          '#d4a843',
  Travel:        '#58a6ff',
  Bills:         '#bc8cff',
  Shopping:      '#f85149',
  Health:        '#3fb950',
  Entertainment: '#ec6dbe',
  Salary:        '#5cbddd',
  Freelance:     '#ff9f40',
  Other:         '#8b949e',
}
