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
                  text: `أنت مدرس لغة إنجليزية متخصص بالبكالوريا السورية. تشرح بالعربي وتعطي أمثلة بالإنجليزي. لما الطالب يغلط تقول: قريب جداً خلينا نحاول مرة ثانية. الدرس الحالي: ${lesson}. سؤال الطالب: ${message}`
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