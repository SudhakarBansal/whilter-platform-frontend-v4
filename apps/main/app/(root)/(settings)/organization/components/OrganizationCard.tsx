"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";
import { toast } from "sonner";
import { deleteOrganization } from "@/services/actions/organizationService";
import type { Organization } from "@/types/organization.types";
import { DialogSection } from "@whilter/ui-kit/components";
import { Edit2, Trash2 } from "lucide-react";

interface OrganizationProps {
  organizations: Organization[];
}

const OrganizationCard = ({ organizations }: OrganizationProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    organization: Organization | null;
  }>({
    open: false,
    organization: null,
  });

  const router = useRouter();

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
    setDeletingId(org.id);
    const loadingToastId = toast.loading(`Deleting ${org.name}...`);

    try {
      const response = await deleteOrganization(org.id);

      if (response) {
        toast.success(`${org.name} deleted successfully!`);
        router.refresh();
      }
    } catch (error: any) {
      console.error("Error deleting organization:", error);
      toast.error(`Error deleting ${org.name}: ${error.message}`);
    } finally {
      toast.dismiss(loadingToastId);
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, organization: deleteDialog.organization });
    // Clear organization data after dialog animation completes
    setTimeout(() => {
      setDeleteDialog({ open: false, organization: null });
    }, 300); // Adjust timing based on your dialog's animation duration
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {organizations.map((org: Organization) => (
          <div
            key={org.id}
            className="relative group flex flex-col sm:flex-row border border-gray-300 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Action Icons - positioned at top right */}
            <div className="absolute top-3 right-3 flex gap-1 transition-opacity duration-200 z-10">
              <button
                onClick={() => router.push(`/organization/edit/${org.id}`)}
                className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-transparent hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm"
                title="Edit organization"
              >
                <Edit2 size={16} color="blue" />
              </button>
              <button
                onClick={() => handleDeleteClick(org)}
                disabled={deletingId === org.id}
                className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-transparent hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title={
                  deletingId === org.id ? "Deleting..." : "Delete organization"
                }
              >
                {deletingId === org.id ? (
                  <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                ) : (
                  <Trash2 size={16} color="red" />
                )}
              </button>
            </div>

            <div className="flex-shrink-0 self-center p-4 sm:p-4">
              <img
                src={org.logoUrl || "https://placehold.co/400"}
                alt={`${org.name} logo`}
                className="w-52 h-52 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain rounded mx-auto sm:mx-0"
              />
            </div>

            <div className="flex-1 flex flex-col p-4 pt-0 sm:pt-4 sm:pl-2 min-w-0">
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words text-center sm:text-left pr-16 sm:pr-0">
                  {org.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3 text-center sm:text-left">
                  {org.description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
