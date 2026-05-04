'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { saveProgress, getProgress } from '@/lib/progress';

type Question = {
  id: string;
  sentence: string;
  question: string;
  translation: string;
  answer: string;
};

type Section = {
  id: string;
  title: string;
  questions: Question[];
};

type Props = {
  unitId: string;
  unitNumber: string;
  unitTitle: string;
  section: Section | undefined;
  backHref: string;
  nextHref: string;
};

export default function SectionPage({
  unitId,
  unitNumber,
  unitTitle,
  section,
  backHref,
  nextHref,
}: Props) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [translated, setTranslated] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !section) return;
    getProgress(user.id, unitId, section.id).then((savedQuestions) => {
      const revealedMap: Record<string, boolean> = {};
      savedQuestions.forEach((qId) => { revealedMap[qId] = true; });
      setRevealed(revealedMap);
    });
  }, [user, unitId, section]);

  const handleReveal = async (questionId: string) => {
    setRevealed(prev => ({ ...prev, [questionId]: true }));
    if (user && section) {
      await saveProgress(user.id, unitId, section.id, questionId);
    }
  };

  if (!section) {
    return (
      <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-400">القسم غير موجود.</p>
          <Link href={backHref} className="text-purple-400 text-sm mt-4 block">→ العودة</Link>
        </div>
      </main>
    );
  }

  const completedCount = Object.values(revealed).filter(Boolean).length;
  const totalCount = section.questions.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">

        <Link href={backHref} className="text-purple-400 text-sm mb-6 block">
          → العودة
        </Link>

        <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-1">
          {unitNumber}
        </p>
        <h1 className="text-xl font-bold mb-4">{section.title}</h1>

        {user ? (
          <div className="bg-green-900/20 border border-green-800 rounded-xl p-3 mb-4 text-center">
            <p className="text-green-400 text-xs">✓ تقدمك يُحفظ تلقائياً</p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 mb-4 flex items-center justify-between">
            <p className="text-gray-400 text-xs">سجّل دخولك لحفظ تقدمك</p>
            <Link href="/auth" className="text-purple-400 text-xs border border-purple-800 rounded-lg px-2 py-1">دخول</Link>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{completedCount} من {totalCount} سؤال</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {section.questions.map((q) => (
            <div
              key={q.id}
              className={`bg-gray-900 rounded-2xl p-5 border transition-colors duration-300 ${
                revealed[q.id] ? 'border-purple-500' : 'border-gray-800'
              }`}
            >
              <p className="text-white text-sm mb-3 leading-relaxed font-mono bg-gray-800 rounded-xl p-3 border-r-2 border-gray-700" dir="ltr">
                "{q.sentence}"
              </p>
              <p className="text-white font-bold text-lg leading-relaxed mb-1">{q.question}</p>
              {translated[q.id] && (
                <p className="text-gray-400 text-base italic mb-3">{q.translation}</p>
              )}
              <div className="flex gap-3 mt-4">
                {!translated[q.id] && (
                  <button
                    onClick={() => setTranslated(prev => ({ ...prev, [q.id]: true }))}
                    className="flex-1 py-2 rounded-xl text-sm font-bold border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors"
                  >
                    🌐 ترجمة
                  </button>
                )}
                {!revealed[q.id] && (
                  <button
                    onClick={() => handleReveal(q.id)}
                    className="flex-1 py-2 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                  >
                    ✓ الجواب
                  </button>
                )}
              </div>
              {revealed[q.id] && (
                <div className="mt-4 bg-gray-800 rounded-xl p-4 border border-purple-800">
                  <p className="text-xs text-purple-400 font-bold mb-2">الجواب</p>
                  <p className="text-gray-200 text-base leading-relaxed whitespace-pre-line">{q.answer}</p>
                  <p className="text-green-400 text-xs mt-3">✓ تمت المراجعة</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {completedCount === totalCount && totalCount > 0 && (
          <div className="mt-8 bg-gray-900 rounded-2xl p-6 border border-green-500 text-center">
            <p className="text-3xl mb-3">🎯</p>
            <p className="text-green-400 font-bold text-lg mb-1">أحسنت — أكملت هذا القسم</p>
            <p className="text-gray-400 text-sm mb-4">فتحت جميع الأجوبة في هذا القسم</p>
            <Link
              href={nextHref}
              className="inline-block bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold py-2 px-6 rounded-xl transition-colors"
            >
              → القسم التالي
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}