'use client';
import { use } from 'react';
import { unit7 } from '../../../data/unit7';
import SectionPage from '@/app/components/SectionPage';

export default function Unit7SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit7.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit7"
      unitNumber="Unit 7"
      unitTitle="Microorganisms"
      section={section}
      backHref="/lessons/unit7"
      nextHref="/lessons/unit7"
    />
  );
}