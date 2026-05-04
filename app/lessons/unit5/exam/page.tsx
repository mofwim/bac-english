'use client';
import { unit5Exam } from '../../../data/unit5-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit5ExamPage() {
  return (
    <ExamPage
      unitId="unit5"
      unitNumber="Unit 5"
      unitTitle="Civil Rights"
      sections={unit5Exam.sections as any}
      backHref="/lessons/unit5"
    />
  );
}