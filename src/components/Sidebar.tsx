import React from 'react'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb, BarChart2, X,
} from 'lucide-react'
import { useFinanceStore } from '../store/useFinanceStore'
import RoleSwitcher from './RoleSwitcher'

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions',  icon: ArrowLeftRight },
  { id: 'insights',     label: 'Insights',      icon: Lightbulb },
  { id: 'reports',      label: 'Reports',       icon: BarChart2 },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { activePage, setActivePage } = useFinanceStore()

  const handleNav = (id: string) => {
    setActivePage(id)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-56
          bg-dark-850 border-r border-white/[0.06]
          flex flex-col
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <div>
            <div className="font-serif text-xl text-gold-400 leading-none">FinFlow</div>
            <div className="text-[9px] uppercase tracking-[3px] text-slate-600 mt-1">
              Finance Dashboard
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-slate-500 hover:text-slate-300"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <p className="text-[9px] uppercase tracking-widest text-slate-600 px-2 mb-2">Menu</p>
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`nav-item w-full mb-0.5 ${activePage === id ? 'active' : ''}`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer: Role switcher */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <RoleSwitcher />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
