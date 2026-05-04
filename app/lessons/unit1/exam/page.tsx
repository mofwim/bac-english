'use client';
import { unit1Exam } from '../../../data/unit1-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit1ExamPage() {
  return (
    <ExamPage
      unitId="unit1"
      unitNumber="Unit 1"
      unitTitle="Life Choices"
      sections={unit1Exam.sections as any}
      backHref="/lessons/unit1"
    />
  );
}