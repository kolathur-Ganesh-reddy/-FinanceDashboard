# FinFlow — Finance Dashboard

A clean, interactive finance dashboard built with React, TypeScript, Vite, Tailwind CSS, Recharts, and Zustand.

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | React 18 + TypeScript + Vite      |
| Styling     | Tailwind CSS v3                   |
| Charts      | Recharts                          |
| State       | Zustand (with localStorage persist)|
| Icons       | Lucide React                      |
| Font        | DM Sans + DM Serif Display        |

---

## Features

### Dashboard Overview
- Summary cards: Total Balance, Income, Expenses with month-over-month % change
- Balance trend chart (Area — 6M / 1Y toggle)
- Spending breakdown Pie chart by category
- Recent transactions table

### Transactions
- Full table with search, filter (All / Income / Expense), and sort (by date or amount)
- Color-coded amounts: green for income, red for expense
- **Admin only**: Add Transaction button + Delete per row

### Role-Based UI
- Switch between **Viewer** and **Admin** in the sidebar
- Viewer: read-only — no add/delete controls visible
- Admin: full control — Add Transaction modal + Delete buttons

### Insights
- Top spending category
- Monthly expense % change vs prior month
- Savings rate with progress bar
- Income growth, avg transaction, net cash flow
- Visual monthly income vs expense bars
- Category spending breakdown bars

### Reports
- Grouped bar chart: income vs expenses (6M)
- Spending trend area chart
- Category pie chart

### Extras
- Export CSV (downloads filtered transactions)
- Data persistence via Zustand + localStorage
- Fully responsive (mobile hamburger menu)
- Dark theme throughout
- Smooth animations (fade-in, slide-up, scale-in)

---

## Project Structure

```
src/
 ├── components/
 │    ├── SummaryCard.tsx       # Stat card with icon + change %
 │    ├── Charts.tsx            # All Recharts components
 │    ├── TransactionTable.tsx  # Searchable, filterable table
 │    ├── AddTransactionModal.tsx # Admin-only form modal
 │    ├── RoleSwitcher.tsx      # Viewer / Admin toggle
 │    ├── Insights.tsx          # Insights + bar breakdowns
 │    ├── Sidebar.tsx           # Navigation sidebar
 │    └── Topbar.tsx            # Top header bar
 │
 ├── store/
 │    └── useFinanceStore.ts    # Zustand store (state + computed)
 │
 ├── data/
 │    └── mockData.ts           # 45 mock transactions (6 months)
 │
 ├── types/
 │    └── index.ts              # TypeScript types
 │
 ├── App.tsx                    # Page routing + layout
 ├── main.tsx                   # Entry point
 └── index.css                  # Tailwind + global styles
```

---

## How to Run

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## Design Decisions

- **Dark luxury theme** — deep navy/charcoal with gold accents. Finance apps benefit from dark backgrounds that keep charts readable and numbers prominent.
- **Zustand over Redux** — lighter boilerplate, integrated localStorage persistence with `persist` middleware, computed getters as store functions.
- **Recharts** — composable and React-native. Custom tooltips via render props keep the dark-theme styling consistent.
- **Role-based UI** — simulated on the frontend via Zustand state. Role persists across page refreshes via localStorage.
- **TypeScript throughout** — strict mode enabled, all data shapes typed via `src/types/index.ts`.
- **Component separation** — each component has a single responsibility. `useFinanceStore` handles all data logic; components just read and display.

---

## Screenshots

Open the app after running `npm run dev` to see:

1. **Dashboard** — summary cards + charts + recent transactions
2. **Transactions** — full filterable/sortable table (Admin adds/deletes)
3. **Insights** — insight cards + monthly bars + category breakdown
4. **Reports** — combined charts view

---

## Role Demo

1. Default role is **Viewer** — the table and dashboard are read-only.
2. Switch to **Admin** in the sidebar footer → "Add Transaction" button appears in the toolbar.
3. Click it to open the modal and add a transaction — it appears instantly at the top.
4. Hover any row in Admin mode to reveal the Delete button.
