// Skeleton Components
const OrganizationCardSkeleton = () => (
  <div className="mb-5 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center p-6 sm:p-5 border border-gray-700 rounded-lg bg-gray-600 shadow-sm animate-pulse"
      >
        {/* Logo Skeleton */}
        <div className="flex-shrink-0 self-center sm:self-auto">
          <div className="w-20 h-20 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-gray-700 rounded"></div>
        </div>

        {/* Organization Info Skeleton */}
        <div className="flex-1 text-center sm:text-left min-w-0 space-y-2">
          {/* Title skeleton */}
          <div className="h-4 sm:h-5 bg-gray-700 rounded w-3/4 mx-auto sm:mx-0"></div>
          {/* Description skeleton */}
          <div className="space-y-1">
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-5/6 mx-auto sm:mx-0"></div>
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="flex-shrink-0 self-center sm:self-auto w-full sm:w-auto">
          <div className="h-8 bg-gray-700 rounded w-full sm:w-16"></div>
        </div>
      </div>
    ))}
  </div>
);

const PaginationSkeleton = () => (
  <div className="flex justify-between items-center mt-6">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-32"></div>
    </div>
    <div className="flex space-x-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-8 w-8 bg-gray-700 rounded"></div>
      ))}
    </div>
  </div>
);

// Loading fallback component
export function OrganizationPageSkeleton() {
  return (
    <>
      <OrganizationCardSkeleton />
      <PaginationSkeleton />
    </>
  );
}
