// Base interface for creating organizations (API payload)
export interface CreateOrganizationRequest {
    name: string;
    description: string | null;
    logoUrl: string | File | null; // Can accept File for API submission
}

// Interface for fetched organizations (with required ID)
export interface Organization {
    id: string; // Required for fetched organizations
    name: string;
    description: string | null;
    logoUrl: string | null; // Always string or null when fetched from API
}

// Type for form data submission (extends CreateOrganizationRequest)
export interface OrganizationSubmissionData extends CreateOrganizationRequest {
    id?: string; // Optional for creation, required for updates
}