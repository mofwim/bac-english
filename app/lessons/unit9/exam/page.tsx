'use client';
import { unit9Exam } from '../../../data/unit9-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit9ExamPage() {
  return (
    <ExamPage
      unitId="unit9"
      unitNumber="Unit 9"
      unitTitle="Citizenship"
      sections={unit9Exam.sections as any}
      backHref="/lessons/unit9"
    />
  );
}