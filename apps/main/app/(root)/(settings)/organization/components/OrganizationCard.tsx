import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";

// Mock organization data for testing
const mockOrganizations = [
  {
    id: 1,
    name: "Acme Corp",
    description:
      "Acme Corp specializes in innovative technologrvices worldwide.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Tech Solutions",
    description: "Tech Solutions helps businigration, and automation services.",
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "Innovation Labs",
    description:
      "Innovd emerging technologies to drive the future of business.",
    logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=80&h=80&fit=crop&crop=center",
  },
];

const OrganizationCard = () => {
  return (
    <div className="mb-5 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockOrganizations.map((org) => (
        <div
          key={org.id}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center p-6 sm:p-5 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Logo */}
          <div className="flex-shrink-0 self-center sm:self-auto">
            <img
              src={org.logo}
              alt={`${org.name} logo`}
              className="w-20 h-20 sm:w-14 sm:h-14 md:w-20 md:h-20 object-cover rounded"
            />
          </div>

          {/* Organization Info */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <h3 className="text-base sm:text-lg text-black font-semibold mb-1 truncate">
              {org.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-snug mb-2 line-clamp-2 sm:line-clamp-3">
              {org.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0 self-center sm:self-auto w-full sm:w-auto">
            <ActionButton
              variant="outlinePrimary"
              size="small"
              href={`/organization/edit/${org.id}`}
              className="w-full sm:w-auto text-center"
            >
              Edit
            </ActionButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationCard;
