'use client';
import { unit8Exam } from '../../../data/unit8-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit8ExamPage() {
  return (
    <ExamPage
      unitId="unit8"
      unitNumber="Unit 8"
      unitTitle="Human Body"
      sections={unit8Exam.sections as any}
      backHref="/lessons/unit8"
    />
  );
}