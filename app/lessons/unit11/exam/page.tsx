'use client';
import { unit11Exam } from '../../../data/unit11-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit11ExamPage() {
  return (
    <ExamPage
      unitId="unit11"
      unitNumber="Unit 11"
      unitTitle="Artificial Intelligence"
      sections={unit11Exam.sections as any}
      backHref="/lessons/unit11"
    />
  );
}