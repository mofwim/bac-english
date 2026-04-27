'use client';
import { useState, use } from 'react';
import Link from 'next/link';
import { unit1 } from '../../../data/unit1';

export default function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [translated, setTranslated] = useState<Record<string, boolean>>({});

  const { section: sectionId } = use(params);
  const section = unit1.sections.find((s) => s.id === sectionId);
  if (!section) {
    return (
      <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-400">القسم غير موجود.</p>
          <Link href="/lessons/unit1" className="text-purple-400 text-sm mt-4 block">
            → العودة
          </Link>
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

        {/* العودة */}
        <Link href="/lessons/unit1" className="text-purple-400 text-sm mb-6 block">
          → العودة للوحدة الأولى
        </Link>

        {/* العنوان */}
        <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-1">
          Unit 1
        </p>
        <h1 className="text-xl font-bold mb-6">{section.title}</h1>

        {/* شريط التقدم */}
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

        {/* الأسئلة */}
        <div className="space-y-6">
          {section.questions.map((q) => (
            <div
              key={q.id}
              className={`bg-gray-900 rounded-2xl p-5 border transition-colors duration-300 ${
                revealed[q.id]
                  ? 'border-purple-500'
                  : 'border-gray-800'
              }`}
            >
              {/* الجملة من الكتاب */}
<p className="text-white text-sm mb-4 leading-relaxed font-mono bg-gray-800 rounded-xl p-3 border-r-4 border-purple-500">
  "{q.sentence}"
</p>

{/* السؤال */}
<p className="text-white font-bold text-lg leading-relaxed mb-1">
  {q.question}
</p>

{/* الترجمة */}
{translated[q.id] && (
  <p className="text-gray-300 text-base italic mb-3">
    {q.translation}
  </p>
)}

              {/* الأزرار */}
              <div className="flex gap-3 mt-4">
                {!translated[q.id] && (
                  <button
                    onClick={() =>
                      setTranslated((prev) => ({ ...prev, [q.id]: true }))
                    }
                    className="flex-1 py-2 rounded-xl text-sm font-bold border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors"
                  >
                    🌐 ترجمة
                  </button>
                )}
                {!revealed[q.id] && (
                  <button
                    onClick={() =>
                      setRevealed((prev) => ({ ...prev, [q.id]: true }))
                    }
                    className="flex-1 py-2 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                  >
                    ✓ الجواب
                  </button>
                )}
              </div>

              {/* الجواب */}
              {revealed[q.id] && (
                <div className="mt-4 bg-gray-800 rounded-xl p-4 border border-purple-800 animate-fade-in">
                  <p className="text-xs text-purple-400 font-bold mb-2">
                    الجواب
                  </p>
                  <p className="text-gray-200 text-base leading-relaxed">
                    {q.answer}
                  </p>
                  <p className="text-green-400 text-xs mt-3">✓ تمت المراجعة</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* اكتمال القسم */}
        {completedCount === totalCount && totalCount > 0 && (
          <div className="mt-8 bg-gray-900 rounded-2xl p-6 border border-green-500 text-center">
            <p className="text-3xl mb-3">🎯</p>
            <p className="text-green-400 font-bold text-lg mb-1">
              أحسنت — أكملت هذا القسم
            </p>
            <p className="text-gray-400 text-sm mb-4">
              فتحت جميع الأجوبة في هذا القسم
            </p>
            <Link
              href="/lessons/unit1"
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