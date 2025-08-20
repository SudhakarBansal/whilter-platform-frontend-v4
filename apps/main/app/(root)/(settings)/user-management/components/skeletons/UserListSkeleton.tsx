const UserCardSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative group flex flex-col border border-gray-700 rounded-xl bg-gray-600 shadow-sm overflow-hidden animate-pulse min-h-[180px] p-4"
        >
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-gray-700"></div>
            <div className="ml-3 flex-1">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
  
          <div className="h-3 bg-gray-700 rounded w-40 mb-3"></div>
          <div className="h-3 bg-gray-700 rounded w-28 mb-3"></div>
          <div className="h-3 bg-gray-700 rounded w-32"></div>
        </div>
      ))}
    </div>
  );
  

const PaginationSkeleton = () => (
    <div className="flex justify-between items-center mt-6">
        <div className="animate-pulse">
            <div className="h-5 bg-gray-700 rounded w-32"></div>
        </div>
        <div className="flex space-x-2 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-8 w-8 bg-gray-700 rounded"></div>
            ))}
        </div>
    </div>
);

export function UserListSkeleton() {
    return (
        <div className="!my-0">
            <div className="my-7">
                <PaginationSkeleton />
            </div>
            <UserCardSkeleton />

        </div>

    );
}
