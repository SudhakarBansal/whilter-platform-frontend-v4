"use client";
import React, { useState } from "react";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";
import { toast } from "sonner";
import { deleteOrganization } from "@/services/actions/organizationService";
import type { Organization } from "@/types/organization.types";
import { DialogSection } from "@whilter/ui-kit/components";

interface OrganizationProps {
  organizations: Organization[];
  onOrganizationDeleted?: () => void; // Callback to refresh the list after deletion
}

const OrganizationCard = ({
  organizations,
  onOrganizationDeleted,
}: OrganizationProps) => {
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    organization: Organization | null;
  }>({
    open: false,
    organization: null,
  });

  const handleDeleteClick = (org: Organization) => {
    setDeleteDialog({
      open: true,
      organization: org,
    });
  };

  const handleDeleteConfirm = async () => {
    const org = deleteDialog.organization;
    if (!org) return;

    setDeleteDialog({ open: false, organization: null });
    setDeletingIds((prev) => new Set(prev).add(org.id));
    const loadingToastId = toast.loading(`Deleting ${org.name}...`);

    try {
      // Call the delete service
      const response = await deleteOrganization(org.id);

      if (response) {
        toast.success(`${org.name} deleted successfully!`);
      }

      // Call the callback to refresh the list
      if (onOrganizationDeleted) {
        onOrganizationDeleted();
      }
    } catch (error: any) {
      console.error("Error deleting organization:", error);
      toast.error(`Error deleting ${org.name}: ${error.message}`);
    } finally {
      toast.dismiss(loadingToastId);
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(org.id);
        return newSet;
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, organization: null });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {organizations.map((org: Organization) => (
          <div
            key={org.id}
            className="flex flex-col sm:flex-row border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Logo - Top on mobile, Left on larger screens */}
            <div className="flex-shrink-0 self-center p-4 sm:p-4">
              <img
                src={org.logoUrl || "https://placehold.co/400"}
                alt={`${org.name} logo`}
                className="w-52 h-52 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded mx-auto sm:mx-0"
              />
            </div>

            {/* Content - Below logo on mobile, Right side on larger screens */}
            <div className="flex-1 flex flex-col p-4 pt-0 sm:pt-4 sm:pl-2 min-w-0">
              {/* Organization Info */}
              <div className="flex-1 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words text-center sm:text-left">
                  {org.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3 text-center sm:text-left">
                  {org.description || "No description available"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row justify-center sm:justify-start gap-2">
                <ActionButton
                  variant="outlinePrimary"
                  size="small"
                  href={`/organization/edit/${org.id}`}
                >
                  Edit
                </ActionButton>
                <ActionButton
                  variant="outlineSecondary"
                  size="small"
                  onClick={() => handleDeleteClick(org)}
                  disabled={deletingIds.has(org.id)}
                  className="flex-1 text-center justify-center text-red-600 border-red-300 hover:border-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  {deletingIds.has(org.id) ? "Deleting..." : "Delete"}
                </ActionButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog using DialogSection */}
      <DialogSection
        open={deleteDialog.open}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${deleteDialog.organization?.name}"? This action will permanently remove all data associated with this organization.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default OrganizationCard;
