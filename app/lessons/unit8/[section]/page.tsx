'use client';
import { use } from 'react';
import { unit8 } from '../../../data/unit8';
import SectionPage from '@/app/components/SectionPage';

export default function Unit8SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit8.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit8"
      unitNumber="Unit 8"
      unitTitle="Human Body"
      section={section}
      backHref="/lessons/unit8"
      nextHref="/lessons/unit8"
    />
  );
}