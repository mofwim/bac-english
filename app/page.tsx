'use client';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { units } from './data/index';

export default function Home() {
  const { user, signOut, loading } = useAuth();

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">

        {/* رسالة النسخة التجريبية
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-2xl p-4 mb-4 text-center">
          <p className="text-yellow-400 text-xs font-bold mb-1">🚧 نسخة تجريبية مجانية</p>
          <p className="text-yellow-200 text-xs leading-relaxed">
            هذا التطبيق في مرحلة الإطلاق التجريبي — المحتوى الكامل لجميع الوحدات قادم قريباً.
            جرّب الآن مجاناً وشاركنا رأيك!
          </p>
        </div>*/}

        {/* زر واتساب */}
        
        <a href="https://wa.me/31687657884?text=مرحباً%2C%20جربت%20تطبيق%20Bac%20English%20وأريد%20أشاركك%20رأيي..."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 transition-colors rounded-2xl p-4 mb-4 text-center"
        >
          <span className="text-xl">💬</span>
          <div>
            <p className="text-white text-sm font-bold">شاركنا رأيك</p>
            <p className="text-green-200 text-xs">رأيك يساعدنا نحسّن التطبيق</p>
          </div>
        </a>

    {/* زر تسجيل الدخول */}
    {!loading && (
      <div className="mb-6">
        {user ? (
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-bold">مرحباً 👋</p>
              <p className="text-gray-400 text-xs">{user.email}</p>
            </div>
            <button
              onClick={signOut}
              className="text-xs text-red-400 border border-red-800 rounded-lg px-3 py-1 hover:border-red-500 transition-colors"
            >
              تسجيل خروج
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={async () => {
                const { supabase } = await import('@/lib/supabase');
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: { redirectTo: 'https://bac-english-6jae.vercel.app/' },
                });
              }}
              className="w-full py-3 bg-white text-gray-900 rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"/>
                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z"/>
              </svg>
              متابعة بحساب Google
            </button>
            <Link
              href="/auth"
              className="w-full py-3 border border-gray-700 rounded-xl text-sm text-gray-300 hover:border-gray-500 transition-colors flex items-center justify-center"
            >
              تسجيل بالبريد الإلكتروني
            </Link>
          </div>
        )}
      </div>
    )}
        {/* الرأس */}
        <div className="mb-10 text-center">
          <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-2">
            Bac English
          </p>
          <h1 className="text-3xl font-bold mb-2">إنجليزي البكالوريا</h1>
          <p className="text-gray-400 text-sm">تعلّم عميق مبني على منهجك الرسمي</p>
        </div>

        {/* الوحدات */}
        <div className="space-y-4">
          {units.map((unit) => (
            <div key={unit.id} className="relative">
              {unit.free ? (
                <Link href={`/lessons/${unit.id}`}>
                  <div className="bg-gray-900 hover:bg-gray-800 transition-colors rounded-2xl p-5 border border-gray-800 hover:border-purple-500 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-400 text-xs font-bold mb-1">
                          {unit.title} — مجاني
                        </p>
                        <h2 className="text-lg font-bold">{unit.subtitle}</h2>
                        <p className="text-gray-400 text-sm mt-1">{unit.sections} أقسام</p>
                      </div>
                      <div className="text-2xl">📖</div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 opacity-60 cursor-not-allowed">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs font-bold mb-1">{unit.title} — قريباً</p>
                      <h2 className="text-lg font-bold text-gray-400">{unit.subtitle}</h2>
                      <p className="text-gray-500 text-sm mt-1">{unit.sections} أقسام</p>
                    </div>
                    <div className="text-2xl">🔒</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* الفلسفة */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <p className="text-purple-400 text-xs font-bold mb-2">فلسفة التعلم</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            ليس المهم أن تُكمل — المهم أن تفهم.
            جملة واحدة تفهمها بعمق أفضل من صفحة كاملة تحفظها.
          </p>
        </div>

      </div>
    </main>
  );
}