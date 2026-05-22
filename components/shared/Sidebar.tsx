'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Profile } from '@/types'

const navItems = [
  { href: '/dashboard',         label: 'Beranda',    icon: '🏠' },
  { href: '/dashboard/latihan', label: 'Latihan',    icon: '📚' },
  { href: '/dashboard/tryout',  label: 'Try Out',    icon: '🎯' },
  { href: '/dashboard/progress',label: 'Progress',   icon: '📊' },
  { href: '/dashboard/upgrade', label: 'Upgrade',    icon: '⚡' },
]

export default function Sidebar({ profile }: { profile: any }) {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">L</div>
          <span className="font-semibold text-slate-900 text-sm">Luminiora</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              pathname === item.href
                ? 'bg-slate-900 text-white font-medium'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Plan badge */}
      <div className="p-3 border-t border-slate-100">
        <div className={cn(
          'rounded-lg px-3 py-2.5 text-xs font-medium',
          profile?.plan === 'premium'
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-slate-100 text-slate-600'
        )}>
          {profile?.plan === 'premium' ? '⭐ Premium aktif' : '🆓 Akun gratis'}
        </div>
      </div>
    </aside>
  )
}