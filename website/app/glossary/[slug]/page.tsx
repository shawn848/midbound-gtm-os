import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [{ slug: 'removed' }];
}

export default function GlossarySlugRemoved() {
  notFound();
}
