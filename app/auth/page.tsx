'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    setMessage('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage('خطأ في تسجيل الدخول — تحقق من البريد وكلمة المرور');
      } else {
        router.push('/');
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage('خطأ في إنشاء الحساب — ' + error.message);
      } else {
        setMessage('تم إنشاء الحساب — تحقق من بريدك الإلكتروني للتأكيد');
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-2">
            BAC ENGLISH
          </p>
          <h1 className="text-2xl font-bold mb-2">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'أهلاً بعودتك — سجّل دخولك لمتابعة دراستك' : 'انضم إلى آلاف طلاب البكالوريا'}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-4">

          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              dir="ltr"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              dir="ltr"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-xl text-sm ${message.includes('خطأ') ? 'bg-red-900/20 text-red-300 border border-red-800' : 'bg-green-900/20 text-green-300 border border-green-800'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleAuth}
            disabled={loading || !email || !password}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 rounded-xl text-sm font-bold transition-colors"
          >
            {loading ? 'جاري التحميل...' : isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
          </button>

          <button
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            className="w-full py-2 text-gray-400 text-sm hover:text-white transition-colors"
          >
            {isLogin ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : 'لديك حساب؟ سجّل دخولك'}
          </button>

        </div>

      </div>
    </main>
  );
}