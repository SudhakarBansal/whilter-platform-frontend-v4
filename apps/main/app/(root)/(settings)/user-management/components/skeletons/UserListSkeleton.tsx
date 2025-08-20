// Skeleton for user card
const UserCardSkeleton = () => (
    <div className="dark:bg-gray-800 rounded-lg shadow p-4 w-64 animate-pulse">
      {/* Avatar + Name + Status */}
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="ml-3 flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>
      </div>
  
      {/* Email */}
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-3"></div>
  
      {/* Organization */}
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-28 mb-3"></div>
  
      {/* Role */}
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
    </div>
  );
  
  // Skeleton for pagination (already good, just themed)
  const PaginationSkeleton = () => (
    <div className="flex justify-between items-center mt-6">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-32"></div>
      </div>
      <div className="flex space-x-2 animate-pulse">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  );
  
  // Loading fallback component
  export function UserListSkeleton() {
    return (
      <div className="!my-0">
        <div className="my-7">
          <PaginationSkeleton />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  