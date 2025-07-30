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

   if (subPage === 'models') {
    breadcrumbs.push({ label: 'Models', href: `/${toolSlug}/admin/models` });
  }
  if (subPage === 'modelsNew') {
    breadcrumbs.push({ label: 'Models', href: `/${toolSlug}/admin/models` });
    breadcrumbs.push({ label: 'Add New Model', href: `/${toolSlug}/admin/models/new` });
  }

  return breadcrumbs;
}