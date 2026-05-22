'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Topbar({ profile }: { profile: any }) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      <div className="text-sm text-slate-500">
        Halo, <span className="font-medium text-slate-900">{profile?.full_name || 'Pejuang ASN'}</span> 👋
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        Keluar
      </button>
    </header>
  )
}