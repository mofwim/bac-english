'use client';
import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "My brother usually ________ coffee in the morning.",
    options: ["drink", "drinks", "drank", "has drunk"],
    correct: 1,
    explanation: "Present Simple مع he/she/it نضيف s للفعل. الكلمة الدالة: usually"
  },
  {
    id: 2,
    question: "I ________ my grandparents last weekend.",
    options: ["visit", "visits", "visited", "have visited"],
    correct: 2,
    explanation: "Past Simple لأن الحدث انتهى. الكلمة الدالة: last weekend"
  },
  {
    id: 3,
    question: "They ________ their homework yet.",
    options: ["don't finish", "didn't finish", "haven't finished", "hasn't finished"],
    correct: 2,
    explanation: "Present Perfect مع yet. الكلمة الدالة: yet"
  },
  {
    id: 4,
    question: "She ________ in Damascus since 2010.",
    options: ["lives", "lived", "has lived", "is living"],
    correct: 2,
    explanation: "Present Perfect مع since. الكلمة الدالة: since"
  },
  {
    id: 5,
    question: "We ________ to Palmyra in 2015.",
    options: ["go", "have gone", "went", "goes"],
    correct: 2,
    explanation: "Past Simple لأن الوقت محدد. الكلمة الدالة: in 2015"
  },
];

export default function GrammarLesson() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [aiReply, setAiReply] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const q = questions[current];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === q.correct) setScore(s => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
      setAiReply('');
    }
  };

  const askAI = async () => {
    setLoadingAi(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `اشرح لي هاد السؤال: "${q.question}" والجواب الصح هو: "${q.options[q.correct]}"`,
        lesson: 'Revision of Tenses - Unit 1 Life Choices'
      }),
    });
    const data = await res.json();
    setAiReply(data.reply);
    setLoadingAi(false);
  };

  if (finished) {
    return (
      <main className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center" dir="rtl">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {score >= 4 ? '🎉' : score >= 3 ? '👍' : '💪'}
          </div>
          <h1 className="text-2xl font-bold mb-2">انتهى الاختبار!</h1>
          <p className="text-gray-400 mb-6">نتيجتك</p>
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <p className="text-5xl font-bold text-purple-400">{score}/{questions.length}</p>
            <p className="text-gray-400 mt-2">
              {score >= 4 ? 'ممتاز! أنت جاهز للامتحان 🌟' : 
               score >= 3 ? 'كويس! راجع الأزمنة مرة ثانية' : 
               'تحتاج مراجعة أكثر، ما تقلق'}
            </p>
          </div>
          <button
            onClick={() => { setCurrent(0); setSelected(null); setShowResult(false); setScore(0); setFinished(false); setAiReply(''); }}
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-2xl p-4 font-bold transition-colors"
          >
            🔄 حاول مرة ثانية
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <p className="text-purple-400 text-sm mb-1">Unit 1 - Life Choices</p>
        <h1 className="text-xl font-bold mb-1">Grammar: Revision of Tenses</h1>

        {/* Progress */}
        <div className="flex gap-2 mb-6 mt-3">
          {questions.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i < current ? 'bg-purple-500' : i === current ? 'bg-purple-300' : 'bg-gray-700'}`} />
          ))}
        </div>

        {/* Question */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-4">
          <p className="text-gray-400 text-sm mb-3">سؤال {current + 1} من {questions.length}</p>
          <p className="text-lg font-medium leading-relaxed mb-6 text-right">{q.question}</p>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full text-right p-4 rounded-xl border-2 transition-all font-medium
                  ${selected === null ? 'border-gray-700 hover:border-purple-500 bg-gray-800' :
                    i === q.correct ? 'border-green-500 bg-green-500/20 text-green-400' :
                    selected === i ? 'border-red-500 bg-red-500/20 text-red-400' :
                    'border-gray-700 bg-gray-800 opacity-50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <div className={`rounded-2xl p-4 mb-4 ${selected === q.correct ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
            <p className="font-bold mb-1">
              {selected === q.correct ? '✅ ممتاز! إجابة صحيحة' : '❌ قريب! الإجابة الصحيحة: ' + q.options[q.correct]}
            </p>
            <p className="text-gray-300 text-sm">{q.explanation}</p>
          </div>
        )}

        {/* AI Help */}
        {showResult && !aiReply && (
          <button
            onClick={askAI}
            disabled={loadingAi}
            className="w-full bg-gray-800 hover:bg-gray-700 rounded-2xl p-3 mb-4 text-sm transition-colors"
          >
            {loadingAi ? '⏳ المدرس يشرح...' : '🤖 اشرح لي أكثر'}
          </button>
        )}

        {aiReply && (
          <div className="bg-gray-900 rounded-2xl p-4 mb-4 text-sm text-gray-300 leading-relaxed">
            {aiReply}
          </div>
        )}

        {/* Next */}
        {showResult && (
          <button
            onClick={handleNext}
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-2xl p-4 font-bold transition-colors"
          >
            {current + 1 >= questions.length ? '🏁 شوف نتيجتك' : 'السؤال التالي ←'}
          </button>
        )}

      </div>
    </main>
  );
}