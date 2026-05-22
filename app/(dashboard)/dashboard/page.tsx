import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const tesOptions = [
  {
    key: 'skd',
    label: 'SKD',
    desc: 'Seleksi Kompetensi Dasar',
    icon: '📋',
    subtests: ['TWK', 'TIU', 'TKP'],
    color: 'bg-blue-50 border-blue-200',
    badge: 'free',
  },
  {
    key: 'skb-umum',
    label: 'SKB Umum',
    desc: 'Kompetensi Manajerial & Sosial',
    icon: '🏛️',
    subtests: ['Manajerial', 'Sosial Kultural'],
    color: 'bg-purple-50 border-purple-200',
    badge: 'premium',
  },
  {
    key: 'skb-teknis',
    label: 'SKB Teknis',
    desc: 'Kompetensi Teknis per Formasi',
    icon: '⚙️',
    subtests: ['Per Jabatan'],
    color: 'bg-orange-50 border-orange-200',
    badge: 'premium',
  },
]

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  const { data: recentSessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(3)

  const isPremium = profile?.plan === 'premium'

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Selamat datang, {profile?.full_name?.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Pilih jenis tes yang ingin kamu latih hari ini.
        </p>
      </div>

      {/* Free tryout banner */}
      {profile?.tryout_quota > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-green-800">
              🎁 Kamu punya {profile.tryout_quota}× Try Out gratis!
            </div>
            <div className="text-xs text-green-600 mt-0.5">
              Gunakan untuk simulasi SKD lengkap dengan timer resmi.
            </div>
          </div>
          <Link
            href="/dashboard/tryout"
            className="bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shrink-0"
          >
            Mulai Try Out
          </Link>
        </div>
      )}

      {/* Tes options */}
      <div>
        <h2 className="text-sm font-medium text-slate-700 mb-3">Pilih Jenis Tes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tesOptions.map(tes => {
            const isLocked = tes.badge === 'premium' && !isPremium
            return (
              <div
                key={tes.key}
                className={`border rounded-xl p-5 ${tes.color} ${isLocked ? 'opacity-60' : ''} relative`}
              >
                {isLocked && (
                  <div className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full border border-amber-200">
                    Premium
                  </div>
                )}
                <div className="text-2xl mb-3">{tes.icon}</div>
                <div className="font-semibold text-slate-900 mb-1">{tes.label}</div>
                <div className="text-xs text-slate-500 mb-3">{tes.desc}</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tes.subtests.map(sub => (
                    <span key={sub} className="text-xs bg-white/70 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                      {sub}
                    </span>
                  ))}
                </div>
                {isLocked ? (
                  <Link
                    href="/dashboard/upgrade"
                    className="w-full bg-amber-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-amber-600 transition-colors text-center block"
                  >
                    Upgrade untuk akses
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/latihan?tes=${tes.key}`}
                    className="w-full bg-slate-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-slate-700 transition-colors text-center block"
                  >
                    Mulai Latihan →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent activity */}
      {recentSessions && recentSessions.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-slate-700 mb-3">Sesi Terakhir</h2>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {recentSessions.map((session: any) => (
              <div key={session.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="text-sm font-medium text-slate-900">{session.subtes}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {new Date(session.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900">{session.score ?? '—'}</div>
                  <div className="text-xs text-slate-500">poin</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade CTA kalau free */}
      {!isPremium && (
        <div className="bg-slate-900 rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="text-white font-medium text-sm">Upgrade ke Premium</div>
            <div className="text-slate-400 text-xs mt-0.5">
              Akses unlimited latihan, Try Out, dan soal AI-generated — hanya Rp 7.000/bulan.
            </div>
          </div>
          <Link
            href="/dashboard/upgrade"
            className="bg-white text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0 ml-4"
          >
            Lihat Paket →
          </Link>
        </div>
      )}

    </div>
  )
}