'use client';
import { use } from 'react';
import { unit6 } from '../../../data/unit6';
import SectionPage from '@/app/components/SectionPage';

export default function Unit6SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit6.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit6"
      unitNumber="Unit 6"
      unitTitle="United Nations"
      section={section}
      backHref="/lessons/unit6"
      nextHref="/lessons/unit6"
    />
  );
}