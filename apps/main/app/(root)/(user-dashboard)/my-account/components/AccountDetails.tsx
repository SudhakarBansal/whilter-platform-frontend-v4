"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { PencilIcon, LockIcon } from "lucide-react";
import { useMemo, useState } from "react";
import RequestForm from "./RequestForm";
import { Role } from "@whilter/auth";
import { ChangePasswordModal } from "./ChangePasswordModal";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: string;
  organization: string;
  section: string[];
  userId: string;
  active: boolean;
  exp: number;
}

export default function AccountDetails() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const sessionUser = session?.user as SessionUser | undefined;

  const defaultName = useMemo(
    () => sessionUser?.name || "",
    [sessionUser?.name],
  );
  const { register, watch } = useForm({ defaultValues: { name: defaultName } });

  const name = watch("name");
  const isSuperAdmin = sessionUser?.role === Role.SUPER_ADMIN;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white text-black rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Account Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name */}
        <div>
          <p className="text-gray-600 text-sm mb-1">Name</p>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                {...register("name")}
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <>
                <p className="text-base font-semibold break-words">
                  {name || defaultName || "N/A"}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Edit Name"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
        {/* Email */}
        <div>
          <p className="text-gray-600 text-sm mb-1">Email</p>
          <p className="text-base font-semibold break-words">
            {sessionUser?.email || "N/A"}
          </p>
        </div>
        {/* Role */}
        <div>
          <p className="text-gray-600 text-sm mb-1">Role</p>
          <p className="text-base font-semibold text-indigo-600 break-words">
            {sessionUser?.role || "N/A"}
          </p>
        </div>
        {/* Change Password */}
        <div>
          <p className="text-gray-600 text-sm mb-1">Password</p>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-100 px-3 py-1 rounded-md transition"
            type="button"
          >
            <LockIcon className="w-4 h-4" />
            Change Password
          </button>
        </div>
      </div>

      {isSuperAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div>
            <p className="text-gray-600 text-sm mb-1">Organization</p>
            <p className="text-base font-semibold break-words">
              {sessionUser?.organization || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Preferred Sections</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {sessionUser?.section && sessionUser.section.length > 0 ? (
                sessionUser.section.map((s: string) => (
                  <span
                    key={s}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {s.replaceAll("_", " ")}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">N/A</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!isSuperAdmin && (
        <div className="mt-8">
          <RequestForm />
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        showPasswordModal={showPasswordModal}
        setShowPasswordModal={setShowPasswordModal}
      />
    </div>
  );
}
