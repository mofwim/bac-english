'use client';
import { unit4Exam } from '../../../data/unit4-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit4ExamPage() {
  return (
    <ExamPage
      unitId="unit4"
      unitNumber="Unit 4"
      unitTitle="Engineering"
      sections={unit4Exam.sections as any}
      backHref="/lessons/unit4"
    />
  );
}