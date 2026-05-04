'use client';
import { unit7Exam } from '../../../data/unit7-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit7ExamPage() {
  return (
    <ExamPage
      unitId="unit7"
      unitNumber="Unit 7"
      unitTitle="Microorganisms"
      sections={unit7Exam.sections as any}
      backHref="/lessons/unit7"
    />
  );
}