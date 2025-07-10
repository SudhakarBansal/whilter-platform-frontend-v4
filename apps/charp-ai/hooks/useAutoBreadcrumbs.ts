import { usePathname } from "next/navigation";
import { ROUTE_LABELS } from "../utils/breadcrumbsRoute";
import { buildBreadcrumbs } from "../utils/buildBreadcrumbs";
import type { BreadcrumbItem } from "../utils/buildBreadcrumbs";

export function useAutoBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const dynamicBreadcrumbs: BreadcrumbItem[] = [];

  let accumulatedPath = "";
  segments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    const label = ROUTE_LABELS[accumulatedPath]?.label ?? decodeURIComponent(segment);

    dynamicBreadcrumbs.push({
      label,
      href: accumulatedPath,
      isCurrent: index === segments.length - 1,
    });
  });

  return buildBreadcrumbs(dynamicBreadcrumbs);
}
