'use client';
import { use } from 'react';
import { unit3 } from '../../../data/unit3';
import SectionPage from '@/app/components/SectionPage';

export default function Unit3SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit3.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit3"
      unitNumber="Unit 3"
      unitTitle="Medicine"
      section={section}
      backHref="/lessons/unit3"
      nextHref="/lessons/unit3"
    />
  );
}