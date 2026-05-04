'use client';
import { use } from 'react';
import { unit11 } from '../../../data/unit11';
import SectionPage from '@/app/components/SectionPage';

export default function Unit11SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit11.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit11"
      unitNumber="Unit 11"
      unitTitle="Artificial Intelligence"
      section={section}
      backHref="/lessons/unit11"
      nextHref="/lessons/unit11"
    />
  );
}