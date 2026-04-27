import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message, lesson } = await req.json();

    const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,     {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `أنت مدرس لغة إنجليزية متخصص بالبكالوريا السورية.

قواعد صارمة للرد:
1. اكتب التصحيح بالعربية الفصحى فقط.
٢. إذا احتجت ذكر الإجابة الصحيحة بالإنجليزي، ضعها في سطر مستقل هكذا:
الإجابة الصحيحة: [الجملة الإنجليزية]
٣. لا تخلط العربي والإنجليزي في نفس الجملة أبداً.
٤. كن مشجعاً وإيجابياً.
5. اكتب بـ ٢-٣ جمل فقط.

الدرس الحالي: ${lesson}
سؤال الطالب: ${message}`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();
    console.log('Gemini response:', JSON.stringify(data));
    
    if (!data.candidates) {
      return NextResponse.json({ reply: 'خطأ من Gemini: ' + JSON.stringify(data) });
    }
    
    const reply = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({ reply: 'صار خطأ: ' + error });
  }
}