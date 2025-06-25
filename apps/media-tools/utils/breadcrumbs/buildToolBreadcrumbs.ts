import { baseBreadcrumbs } from './breadcrumbs';
import { getToolBySlug } from '@/lib/getToolBySlug';

export function buildToolBreadcrumbs(slug: string) {
  const tool = getToolBySlug(slug);
  return [
    ...baseBreadcrumbs,
    { label: 'Media Tools', href: '/' },
    ...(tool ? [{ label: tool.title, href: tool.href }] : []),
  ];
}