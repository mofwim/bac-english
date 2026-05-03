'use client';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { units } from './data/index';

export default function Home() {
  const { user, signOut, loading } = useAuth();

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">

        {/* رسالة النسخة التجريبية */}
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-2xl p-4 mb-4 text-center">
          <p className="text-yellow-400 text-xs font-bold mb-1">🚧 نسخة تجريبية مجانية</p>
          <p className="text-yellow-200 text-xs leading-relaxed">
            هذا التطبيق في مرحلة الإطلاق التجريبي — المحتوى الكامل لجميع الوحدات قادم قريباً.
            جرّب الآن مجاناً وشاركنا رأيك!
          </p>
        </div>

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
          <div className="bg-gray-900 rounded-2xl p-4 mb-6 border border-gray-800 flex items-center justify-between">
            {user ? (
              <>
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
              </>
            ) : (
              <>
                <div>
                  <p className="text-white text-sm font-bold">سجّل دخولك</p>
                  <p className="text-gray-400 text-xs">لحفظ تقدمك ومتابعة دراستك</p>
                </div>
                <Link
                  href="/auth"
                  className="text-xs text-purple-400 border border-purple-800 rounded-lg px-3 py-1 hover:border-purple-500 transition-colors"
                >
                  دخول / تسجيل
                </Link>
              </>
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