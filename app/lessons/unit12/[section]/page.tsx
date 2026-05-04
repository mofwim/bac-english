'use client';
import { use } from 'react';
import { unit12 } from '../../../data/unit12';
import SectionPage from '@/app/components/SectionPage';

export default function Unit12SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = use(params);
  const section = unit12.sections.find((s) => s.id === sectionId);

  return (
    <SectionPage
      unitId="unit12"
      unitNumber="Unit 12"
      unitTitle="Digital Literacy"
      section={section}
      backHref="/lessons/unit12"
      nextHref="/lessons/unit12"
    />
  );
}