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
        setMessage('تم إنشاء الحساب بنجاح!');
        router.push('/');
      }
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://bac-english-6jae.vercel.app/',
      },
    });
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
            {isLogin ? 'أهلاً بعودتك — سجّل دخولك لمتابعة دراستك' : 'انضم إلى طلاب البكالوريا'}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-4">

          {/* زر Google */}
          <button
            onClick={handleGoogle}
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

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-xs">أو</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* البريد الإلكتروني */}
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