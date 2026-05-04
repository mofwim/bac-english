'use client';
import { use } from 'react';
import { unit10 } from '../../../data/unit10';
import SectionPage from '@/app/components/SectionPage';

export default function Unit10SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit10.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit10"
      unitNumber="Unit 10"
      unitTitle="Culture Shock"
      section={section}
      backHref="/lessons/unit10"
      nextHref="/lessons/unit10"
    />
  );
}