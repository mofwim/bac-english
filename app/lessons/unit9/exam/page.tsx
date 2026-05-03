'use client';
import { useState } from 'react';
import Link from 'next/link';
import { unit9Exam } from '../../../data/unit9-exam';

type AnswerState = { userAnswer: string; submitted: boolean; aiFeedback: string; loading: boolean; };

export default function Unit9ExamPage() {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [translated, setTranslated] = useState<Record<string, boolean>>({});
  const [showModel, setShowModel] = useState<Record<string, boolean>>({});
  const [selectedMCQ, setSelectedMCQ] = useState<Record<string, string>>({});

  const updateAnswer = (id: string, field: keyof AnswerState, value: string | boolean) => {
    setAnswers(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const submitAnswer = async (questionId: string, question: string, userAnswer: string, modelAnswer: string) => {
    updateAnswer(questionId, 'loading', true);
    updateAnswer(questionId, 'submitted', true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Student answer: "${userAnswer}"\nModel answer: "${modelAnswer}"\nQuestion: "${question}"\n\nCorrect the student's answer in Arabic. Be encouraging. Keep it to 2-3 sentences. If correct say so clearly. If wrong explain why and give the correct answer.`,
          lesson: 'Bac English Exam Practice Unit 9'
        }),
      });
      const data = await response.json();
      updateAnswer(questionId, 'aiFeedback', data.reply || 'تحقق من إجابتك مع النموذج أدناه.');
    } catch { updateAnswer(questionId, 'aiFeedback', 'تحقق من إجابتك مع النموذج أدناه.'); }
    updateAnswer(questionId, 'loading', false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Link href="/lessons/unit9" className="text-purple-400 text-sm mb-6 block">→ العودة للوحدة التاسعة</Link>
        <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-1">Unit 9 — تدرّب على الامتحان</p>
        <h1 className="text-xl font-bold mb-2">نمط الامتحان الحقيقي</h1>
        <p className="text-gray-400 text-sm mb-8">أجب عن الأسئلة — الـ AI يصحح إجابتك فوراً</p>
        {unit9Exam.sections.map((section) => (
          <div key={section.id} className="mb-10">
            <div className="bg-purple-900 rounded-2xl p-4 mb-4">
              <h2 className="text-base font-bold text-purple-200">{section.title}</h2>
            </div>
            {'summary' in section && section.summary && (
              <div className="bg-gray-900 rounded-2xl p-5 mb-4 border border-gray-800">
                <p className="text-purple-400 text-xs font-bold mb-3">📖 ملخص النص</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{section.summary.arabic}</p>
                <p className="text-purple-400 text-xs font-bold mb-2">مقاطع مهمة:</p>
                <div className="space-y-2">
                  {section.summary.keyPassages.map((passage, i) => (
                    <p key={i} className="text-white text-xs font-mono bg-gray-800 rounded-xl p-3 border-r-2 border-purple-500" dir="ltr">"{passage}"</p>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-4">
              {section.questions.map((q, idx) => (
                <div key={q.id} className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-purple-400 text-xs font-bold">سؤال {idx + 1}</span>
                    <span className="text-gray-500 text-xs">{q.marks} درجات</span>
                  </div>
                  <p className="text-white font-bold text-sm leading-relaxed mb-2">{q.question}</p>
                  {translated[q.id] && <p className="text-gray-400 text-sm italic mb-3">{q.translation}</p>}
                  {!translated[q.id] && (
                    <button onClick={() => setTranslated(prev => ({ ...prev, [q.id]: true }))} className="text-xs text-gray-500 border border-gray-700 rounded-lg px-3 py-1 mb-3 hover:border-gray-500 transition-colors">🌐 ترجمة</button>
                  )}
                  {q.type === 'mcq' && 'options' in q && (
                    <div className="space-y-2 mt-3">
                      {Object.entries(q.options).map(([key, value]) => {
                        const isSelected = selectedMCQ[q.id] === key;
                        const isCorrect = key === q.correctAnswer;
                        const hasAnswered = !!selectedMCQ[q.id];
                        let btnClass = "w-full text-right p-3 rounded-xl text-sm border transition-colors ";
                        if (!hasAnswered) btnClass += "border-gray-700 bg-gray-800 hover:border-purple-500";
                        else if (isCorrect) btnClass += "border-green-500 bg-green-900/20 text-green-300";
                        else if (isSelected && !isCorrect) btnClass += "border-red-500 bg-red-900/20 text-red-300";
                        else btnClass += "border-gray-700 bg-gray-800 opacity-50";
                        return (
                          <button key={key} onClick={() => !hasAnswered && setSelectedMCQ(prev => ({ ...prev, [q.id]: key }))} className={btnClass} disabled={hasAnswered}>
                            <span className="font-bold ml-2">{key.toUpperCase()})</span> {value}
                          </button>
                        );
                      })}
                      {selectedMCQ[q.id] && (
                        <div className={`mt-3 p-3 rounded-xl text-sm ${selectedMCQ[q.id] === q.correctAnswer ? 'bg-green-900/20 text-green-300 border border-green-500' : 'bg-red-900/20 text-red-300 border border-red-500'}`}>
                          {'explanation' in q && <p>{q.explanation}</p>}
                        </div>
                      )}
                    </div>
                  )}
                  {q.type !== 'mcq' && (
                    <div className="mt-3">
                      <textarea
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white resize-none min-h-[80px] focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="اكتب إجابتك هنا..."
                        value={answers[q.id]?.userAnswer || ''}
                        onChange={(e) => updateAnswer(q.id, 'userAnswer', e.target.value)}
                        disabled={answers[q.id]?.submitted}
                        dir={q.type === 'translateToEnglish' ? 'ltr' : 'rtl'}
                      />
                      {!answers[q.id]?.submitted && (
                        <button onClick={() => submitAnswer(q.id, q.question, answers[q.id]?.userAnswer || '', 'modelAnswer' in q ? q.modelAnswer : '')} disabled={!answers[q.id]?.userAnswer} className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 rounded-xl text-sm font-bold transition-colors">✓ تحقق من إجابتي</button>
                      )}
                      {answers[q.id]?.loading && (
                        <div className="mt-3 p-3 bg-gray-800 rounded-xl">
                          <p className="text-purple-400 text-xs font-bold mb-1">AI يصحح...</p>
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}} />
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}} />
                          </div>
                        </div>
                      )}
                      {answers[q.id]?.aiFeedback && !answers[q.id]?.loading && (
                        <div className="mt-3 p-3 bg-gray-800 rounded-xl border border-purple-800">
                          <p className="text-purple-400 text-xs font-bold mb-2">تصحيح AI</p>
                          <p className="text-gray-200 text-sm leading-relaxed">{answers[q.id].aiFeedback}</p>
                        </div>
                      )}
                      {answers[q.id]?.submitted && (
                        <button onClick={() => setShowModel(prev => ({ ...prev, [q.id]: !prev[q.id] }))} className="w-full mt-2 py-2 border border-gray-700 rounded-xl text-xs text-gray-400 hover:border-gray-500 transition-colors">
                          {showModel[q.id] ? 'إخفاء النموذج' : '📋 عرض الإجابة النموذجية'}
                        </button>
                      )}
                      {showModel[q.id] && 'modelAnswer' in q && (
                        <div className="mt-2 p-3 bg-gray-800 rounded-xl border border-green-800">
                          <p className="text-green-400 text-xs font-bold mb-2">الإجابة النموذجية</p>
                          <p className="text-white text-sm leading-relaxed" dir="ltr">{q.modelAnswer}</p>
                          {'arabicModelAnswer' in q && q.arabicModelAnswer && <p className="text-gray-400 text-xs mt-2 leading-relaxed">{q.arabicModelAnswer}</p>}
                          {'explanation' in q && q.explanation && <p className="text-purple-300 text-xs mt-2 leading-relaxed border-t border-gray-700 pt-2">💡 {q.explanation}</p>}
                        </div>
                      )}
                      {q.type === 'composition' && 'writingTips' in q && (
                        <div className="mt-3 p-3 bg-gray-800 rounded-xl border border-yellow-800">
                          <p className="text-yellow-400 text-xs font-bold mb-2">💡 نصائح الكتابة</p>
                          <ul className="space-y-1">
                            {q.writingTips.map((tip, i) => <li key={i} className="text-gray-300 text-xs">← {tip}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}