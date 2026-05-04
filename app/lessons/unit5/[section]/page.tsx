'use client';
import { use } from 'react';
import { unit5 } from '../../../data/unit5';
import SectionPage from '@/app/components/SectionPage';

export default function Unit5SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit5.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit5"
      unitNumber="Unit 5"
      unitTitle="Civil Rights"
      section={section}
      backHref="/lessons/unit5"
      nextHref="/lessons/unit5"
    />
  );
}