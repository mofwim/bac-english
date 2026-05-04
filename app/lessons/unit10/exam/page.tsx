'use client';
import { unit10Exam } from '../../../data/unit10-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit10ExamPage() {
  return (
    <ExamPage
      unitId="unit10"
      unitNumber="Unit 10"
      unitTitle="Culture Shock"
      sections={unit10Exam.sections as any}
      backHref="/lessons/unit10"
    />
  );
}