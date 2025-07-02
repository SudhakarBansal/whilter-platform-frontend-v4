import { baseBreadcrumbs } from "./baseBreadcrumbs";

export function buildBreadcrumbs(extra: { label: string; href: string }[]) {
  return [...baseBreadcrumbs, ...extra];
}