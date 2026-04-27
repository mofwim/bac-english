'use client';
import Link from 'next/link';
import { unit2 } from '../../data/unit2';

export default function Unit2Page() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">

        <Link href="/" className="text-purple-400 text-sm mb-6 block">
          → العودة للرئيسية
        </Link>

        <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-2">
          Unit 2
        </p>
        <h1 className="text-2xl font-bold mb-1">Success</h1>
        <p className="text-gray-400 text-sm mb-8">
          اختر القسم الذي تريد دراسته
        </p>

        <div className="space-y-4">
          {unit2.sections.map((section) => (
            <Link
              key={section.id}
              href={`/lessons/unit2/${section.id}`}
            >
              <div className="bg-gray-900 hover:bg-gray-800 transition-colors rounded-2xl p-5 border border-gray-800 hover:border-purple-500 cursor-pointer mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold mb-1">
                      {section.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {section.questions.length} سؤال
                    </p>
                  </div>
                  <div className="text-xl">←</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}