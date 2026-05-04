'use client';
import { use } from 'react';
import { unit9 } from '../../../data/unit9';
import SectionPage from '@/app/components/SectionPage';

export default function Unit9SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit9.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit9"
      unitNumber="Unit 9"
      unitTitle="Citizenship"
      section={section}
      backHref="/lessons/unit9"
      nextHref="/lessons/unit9"
    />
  );
}