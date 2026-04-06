'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const askAI = async (question: string) => {
    setShowChat(true);
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: question }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: question,
        lesson: 'Revision of Tenses - Present Simple, Past Simple, Present Perfect'
      }),
    });

    const data = await res.json();
    setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <p className="text-purple-400 text-sm mb-1">الوحدة الأولى</p>
        <h1 className="text-2xl font-bold mb-1">Life Choices</h1>
        <p className="text-gray-400 text-sm mb-8">Grammar: Revision of Tenses</p>

        {/* Lesson Card */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-4">
          <h2 className="text-lg font-bold text-purple-400 mb-3">📚 الشرح</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            في اللغة الإنجليزية عندنا 3 أزمنة أساسية لازم تعرفها للبكالوريا:
          </p>

          <div className="space-y-3">
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-green-400 font-bold mb-1">Present Simple</p>
              <p className="text-gray-300 text-sm">للعادات والحقائق</p>
              <p className="text-white mt-2">She <span className="text-yellow-400">goes</span> to school every day.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-blue-400 font-bold mb-1">Past Simple</p>
              <p className="text-gray-300 text-sm">لأحداث انتهت بالماضي</p>
              <p className="text-white mt-2">She <span className="text-yellow-400">went</span> to school yesterday.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-red-400 font-bold mb-1">Present Perfect</p>
              <p className="text-gray-300 text-sm">لأحداث ماضية مرتبطة بالحاضر</p>
              <p className="text-white mt-2">She <span className="text-yellow-400">has gone</span> to school.</p>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => askAI('اشرح لي Present Simple بطريقة أسهل')}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-3 text-sm text-right transition-colors"
          >
            🤔 اشرح Present Simple أكثر
          </button>
          <button
            onClick={() => askAI('ما الفرق بين Past Simple و Present Perfect؟')}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-3 text-sm text-right transition-colors"
          >
            🔄 الفرق بين الزمنين
          </button>
          <button
            onClick={() => askAI('اعطني تمرين على الأزمنة الثلاثة')}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-3 text-sm text-right transition-colors"
          >
            ✏️ عطني تمرين
          </button>
          <button
            onClick={() => askAI('ما هي أكثر الأخطاء الشائعة في هذا الدرس؟')}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-3 text-sm text-right transition-colors"
          >
            ⚠️ الأخطاء الشائعة
          </button>
        </div>

        {/* Chat */}
        {showChat && (
          <div className="bg-gray-900 rounded-2xl p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-2xl p-3 max-w-xs text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-700 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-gray-700 rounded-2xl p-3 text-sm text-gray-400">
                  المدرس يفكر... ⏳
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}