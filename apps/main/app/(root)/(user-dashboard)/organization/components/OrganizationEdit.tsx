import { getOrganizationById } from "@/services/actions/organizationService";
import { OrganizationForm } from "./organization-form";

export async function OrganizationEdit({ id }: { id: string }) {
  try {
    const organizationData = await getOrganizationById(id);
    const initialValues = {
      id: organizationData.id,
      name: organizationData.name,
      description: organizationData.description,
      logoUrl: organizationData.logoUrl,
    };

    return <OrganizationForm initialValues={initialValues} isEditing={true} />;
  } catch (error) {
    console.error("Error fetching organization:", error);
    return (
      <div style={{ color: "red" }}>
        Failed to load organization data. Please try again later.
      </div>
    );
  }
}
