"use client";
import type { User } from "@/services/service-types";
import { useState } from "react";
import { Trash2, Pencil, Building2, Users, Shield } from "lucide-react";
import clsx from "clsx";
import UserEdit from "./user-edit";
import { Dialog } from "@mui/material";
import { DeleteUser } from "./user-delete";
import { type OptionType } from "../page";

interface UserCardProps {
  user: User;
  organizationList: OptionType[];
  rolesList: OptionType[];
  onDelete?: (id: string) => void;
  onEdit?: (userId: string) => void;
  key: any;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

const avatarColors = ["bg-blue-500"];

const getAvatarColor = (name: string) => {
  name = name.toUpperCase();
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

export const UserCard = ({ user, key, onDelete, organizationList, rolesList}: UserCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const onClose = () =>
    setIsDialogOpen(false);

  return (
    <div
      key={key}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-[1.06] min-w-[300px]"
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div
              className={clsx(
                "w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                getAvatarColor(user.name)
              )}
            >
              {getInitials(user.name)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={clsx(
                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                    user.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  )}
                >
                  {user.status ? "Active" : "Inactive"}
                </span>
                {user.orgLevelAccess && (
                  <span className="relative group">
                    <Shield size={12} className="text-blue-500">
                      <title>Organization Level Access</title>
                    </Shield>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="Edit user"
              onClick={handleEdit}
            >
              <Pencil size={14} />
            </button>
            <button
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete user"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 size={14} />
            </button>
            <DeleteUser
              open={confirmOpen}
              userId={user.id}
              userName={user.name}
              onDelete={() => onDelete?.(user.id)}
              onClose={() => setConfirmOpen(false)}
            />
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <div className="text-sm text-gray-600 truncate">{user.email}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 size={12} className="text-gray-400 flex-shrink-0" />
            <span
              className={`truncate max-w-[140px] ${!user.organizationName ? "text-gray-400 italic" : ""
                }`}
            >
              {user.organizationName || "No Organization"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 truncate max-w-[140px]">
              <Users size={12} className="text-gray-400" />
              <span className="truncate">{user.role}</span>
            </div>
          </div>
        </div>
        <Dialog
          open={isDialogOpen}
          onClose={onClose}
          maxWidth="sm"
          fullWidth
          classes={{
            paper:
              "bg-gradient-to-br from-blue-600 to-blue-400 text-white max-w-[550px] w-full",
          }}
        >
          <UserEdit userId={user.id} onClose={onClose} organizationList={organizationList} rolesList={rolesList} />
        </Dialog>
      </div>
    </div>
  );
};
