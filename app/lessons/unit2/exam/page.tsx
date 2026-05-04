'use client';
import { unit2Exam } from '../../../data/unit2-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit2ExamPage() {
  return (
    <ExamPage
      unitId="unit2"
      unitNumber="Unit 2"
      unitTitle="Success"
      sections={unit2Exam.sections as any}
      backHref="/lessons/unit2"
    />
  );
}