'use client';
import { unit12Exam } from '../../../data/unit12-exam';
import ExamPage from '@/app/components/ExamPage';

export default function Unit12ExamPage() {
  return (
    <ExamPage
      unitId="unit12"
      unitNumber="Unit 12"
      unitTitle="Digital Literacy"
      sections={unit12Exam.sections as any}
      backHref="/lessons/unit12"
    />
  );
}