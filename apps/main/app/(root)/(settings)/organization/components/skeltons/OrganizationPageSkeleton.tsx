// Skeleton Components
const OrganizationCardSkeleton = () => (
  <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row border border-gray-700 rounded-xl bg-gray-600 shadow-sm overflow-hidden animate-pulse"
      >
        {/* Logo Skeleton */}
        <div className="flex-shrink-0 self-center p-4 sm:p-4">
          <div className="w-52 h-52 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-700 rounded mx-auto sm:mx-0"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 flex flex-col p-4 pt-0 sm:pt-4 sm:pl-2 min-w-0">
          <div className="flex-1 mb-4">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2 mx-auto sm:mx-0"></div>
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto sm:mx-0"></div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-row justify-center sm:justify-start gap-2">
            <div className="h-8 bg-gray-700 rounded w-16"></div>
            <div className="h-8 bg-gray-700 rounded w-16"></div>
          </div>
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
    <div className="!my-0">
      <div className="my-7">
        <PaginationSkeleton />
      </div>
      <OrganizationCardSkeleton />
    </div>
  );
}
