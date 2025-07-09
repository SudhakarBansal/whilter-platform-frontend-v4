// import { usePathname } from "next/navigation";
// import { baseBreadcrumbs } from "./baseBreadcrumbs";

// // ✅ Type for each breadcrumb item
// export type BreadcrumbItem = {
//   label: string;
//   href: string;
//   isCurrent?: boolean;
// };

// // ✅ Type for route configuration
// type RouteConfig = {
//   label: string;
//   dynamicSegments?: Record<string, string>; // Optional dynamic label mapping
// };

// // ✅ Mapping of static and dynamic routes
// const ROUTE_LABELS: Record<string, RouteConfig> = {
//   "/": { label: "Dashboard" },
//   "/campaigns": { label: "Campaigns" },
//   "/campaigns/new": { label: "New Campaign" },
//   "/brands": { label: "Brands" },
//   "/brands/new": { label: "New Brand" },
//   // Add additional static routes here
// };

// /**
//  * Builds a breadcrumb trail based on current pathname
//  */
// export function useAutoBreadcrumbs(): BreadcrumbItem[] {
//   const pathname = usePathname(); // e.g. /brands/new
//   const segments = pathname.split("/").filter(Boolean); // ['brands', 'new']

//   const breadcrumbs: BreadcrumbItem[] = [...baseBreadcrumbs];
//   let accumulatedPath = "";

//   segments.forEach((segment, index) => {
//     accumulatedPath += `/${segment}`;

//     const config = ROUTE_LABELS[accumulatedPath];

//     if (config) {
//       // Static route matched
//       breadcrumbs.push({
//         label: config.label,
//         href: accumulatedPath,
//         isCurrent: index === segments.length - 1,
//       });
//     } else {
//       // Handle dynamic segments like /brands/:id
//       const parentPath = accumulatedPath.substring(0, accumulatedPath.lastIndexOf("/"));
//       const parentConfig = ROUTE_LABELS[parentPath];

//       if (parentConfig?.dynamicSegments?.[segment]) {
//         breadcrumbs.push({
//           label: parentConfig.dynamicSegments[segment],
//           href: accumulatedPath,
//           isCurrent: index === segments.length - 1,
//         });
//       } else {
//         breadcrumbs.push({
//           label: `Item ${segment}`,
//           href: accumulatedPath,
//           isCurrent: index === segments.length - 1,
//         });
//       }
//     }
//   });

//   return breadcrumbs;
// }

// /**
//  * Appends extra custom breadcrumbs to the base list
//  */
// export function buildBreadcrumbs(extra: BreadcrumbItem[] = []): BreadcrumbItem[] {
//   return [...baseBreadcrumbs, ...extra];
// }
