import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface SummaryCardProps {
  label: string
  value: string
  change: string
  changePositive: boolean
  icon: React.ReactNode
  accentColor: string
  glowColor: string
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  change,
  changePositive,
  icon,
  accentColor,
  glowColor,
}) => {
  return (
    <div className="card p-5 relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200 animate-slide-up">
      {/* Glow blob */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl pointer-events-none"
        style={{ background: glowColor }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${glowColor}22` }}
      >
        <span style={{ color: accentColor }}>{icon}</span>
      </div>

      <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      <p className="font-serif text-3xl font-normal leading-none mb-3" style={{ color: accentColor }}>
        {value}
      </p>

      <div className="flex items-center gap-1.5">
        {changePositive ? (
          <TrendingUp size={13} className="text-emerald-400" />
        ) : (
          <TrendingDown size={13} className="text-red-400" />
        )}
        <span className={`text-xs font-medium ${changePositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {change}
        </span>
        <span className="text-xs text-slate-600">vs last month</span>
      </div>
    </div>
  )
}

export default SummaryCard
