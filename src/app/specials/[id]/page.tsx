import { specials } from '@/data/specials';
import SpecialPreviewClient from './SpecialPreviewClient';

export function generateStaticParams() {
  return specials.map(s => ({ id: s.slug }));
}

export default function SpecialPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  return <SpecialPreviewClient paramsPromise={params} />;
}
