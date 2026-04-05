import React from 'react'
import { Shield, Eye } from 'lucide-react'
import { useFinanceStore } from '../store/useFinanceStore'
import { Role } from '../types'

const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useFinanceStore()

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 px-1">Role</p>
      <div className="flex bg-dark-900 rounded-xl p-1 gap-1 border border-white/[0.05]">
        {(['viewer', 'admin'] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all capitalize ${
              role === r
                ? r === 'admin'
                  ? 'bg-gold-500/15 text-gold-400 border border-gold-500/30'
                  : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {r === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
            {r}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-600 mt-2 px-1 leading-relaxed">
        {role === 'admin'
          ? 'Admin: full access — add, delete, manage'
          : 'Viewer: read-only access'}
      </p>
    </div>
  )
}

export default RoleSwitcher
