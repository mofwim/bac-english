'use client';
import { use } from 'react';
import { unit2 } from '../../../data/unit2';
import SectionPage from '@/app/components/SectionPage';

export default function Unit2SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit2.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit2"
      unitNumber="Unit 2"
      unitTitle="Success"
      section={section}
      backHref="/lessons/unit2"
      nextHref="/lessons/unit2"
    />
  );
}