'use client';
import { use } from 'react';
import { unit1 } from '../../../data/unit1';
import SectionPage from '@/app/components/SectionPage';

export default function Unit1SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit1.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit1"
      unitNumber="Unit 1"
      unitTitle="Life Choices"
      section={section}
      backHref="/lessons/unit1"
      nextHref="/lessons/unit1"
    />
  );
}