import { baseBreadcrumbs } from './breadcrumbs';
import { getToolBySlug } from '@/lib/getToolBySlug';

export function buildToolBreadcrumbs(toolSlug: string, subPage?: string) {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return [];

  const breadcrumbs = [
    ...baseBreadcrumbs,
    { label: 'Media Tools', href: '/' },
    { label: tool.title, href: `/${toolSlug}` },
  ];

  if (subPage === 'new') {
    breadcrumbs.push({ label: 'New Project', href: `/${toolSlug}/new` });
  }

  return breadcrumbs;
}