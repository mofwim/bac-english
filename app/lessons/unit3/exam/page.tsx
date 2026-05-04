'use client';
import { unit3Exam } from '../../../data/unit3-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit3ExamPage() {
  return (
    <ExamPage
      unitId="unit3"
      unitNumber="Unit 3"
      unitTitle="Medicine"
      sections={unit3Exam.sections as any}
      backHref="/lessons/unit3"
    />
  );
}