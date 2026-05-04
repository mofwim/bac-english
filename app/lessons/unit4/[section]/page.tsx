'use client';
import { use } from 'react';
import { unit4 } from '../../../data/unit4';
import SectionPage from '@/app/components/SectionPage';

export default function Unit4SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit4.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit4"
      unitNumber="Unit 4"
      unitTitle="Engineering"
      section={section}
      backHref="/lessons/unit4"
      nextHref="/lessons/unit4"
    />
  );
}