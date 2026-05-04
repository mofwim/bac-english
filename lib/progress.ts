import { supabase } from './supabase'

// حفظ سؤال تم فتحه
export async function saveProgress(
  userId: string,
  unitId: string,
  sectionId: string,
  questionId: string
) {
  const { error } = await supabase
    .from('progress')
    .upsert({
      user_id: userId,
      unit_id: unitId,
      section_id: sectionId,
      question_id: questionId,
      revealed: true,
    }, {
      onConflict: 'user_id,unit_id,section_id,question_id'
    })

  if (error) console.error('Error saving progress:', error)
}

// جلب تقدم الطالب لوحدة معينة
export async function getProgress(
  userId: string,
  unitId: string,
  sectionId: string
) {
  const { data, error } = await supabase
    .from('progress')
    .select('question_id')
    .eq('user_id', userId)
    .eq('unit_id', unitId)
    .eq('section_id', sectionId)
    .eq('revealed', true)

  if (error) {
    console.error('Error getting progress:', error)
    return []
  }

  return data.map(row => row.question_id)
}

// جلب نسبة إكمال كل وحدة
export async function getUnitCompletion(
  userId: string,
  unitId: string
) {
  const { data, error } = await supabase
    .from('progress')
    .select('question_id')
    .eq('user_id', userId)
    .eq('unit_id', unitId)
    .eq('revealed', true)

  if (error) return 0
  return data.length
}

// حفظ إجابة امتحان
export async function saveExamResult(
  userId: string,
  unitId: string,
  sectionId: string,
  questionId: string,
  userAnswer: string,
  aiFeedback: string
) {
  const { error } = await supabase
    .from('exam_results')
    .upsert({
      user_id: userId,
      unit_id: unitId,
      section_id: sectionId,
      question_id: questionId,
      user_answer: userAnswer,
      ai_feedback: aiFeedback,
    }, {
      onConflict: 'user_id,unit_id,section_id,question_id'
    })

  if (error) console.error('Error saving exam result:', error)
}

// جلب إجابات امتحان سابقة
export async function getExamResults(
  userId: string,
  unitId: string,
  sectionId: string
) {
  const { data, error } = await supabase
    .from('exam_results')
    .select('question_id, user_answer, ai_feedback')
    .eq('user_id', userId)
    .eq('unit_id', unitId)
    .eq('section_id', sectionId)

  if (error) return []
  return data
}