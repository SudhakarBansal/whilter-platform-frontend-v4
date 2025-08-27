export type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

import { baseBreadcrumbs } from "./baseBreadcrumbs";
import { ROUTE_LABELS } from "./breadcrumbsRoute";

export function buildBreadcrumbs(extra: BreadcrumbItem[]): BreadcrumbItem[] {
  return [...baseBreadcrumbs, ...extra];
}
