'use client';
import { unit6Exam } from '../../../data/unit6-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit6ExamPage() {
  return (
    <ExamPage
      unitId="unit6"
      unitNumber="Unit 6"
      unitTitle="United Nations"
      sections={unit6Exam.sections as any}
      backHref="/lessons/unit6"
    />
  );
}