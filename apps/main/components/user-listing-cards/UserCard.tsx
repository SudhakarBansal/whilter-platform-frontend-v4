import { type User } from "@whilter/ui-kit/types"
import { Trash2, Pencil, Building2, Users, Shield } from "lucide-react"
import clsx from "clsx"
import { deleteUser } from "@/services/user/userService"

interface Props {
  user: User
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const avatarColors = [
  // "bg-red-500",
  // "bg-green-500",
  "bg-blue-500",
  // "bg-purple-500",
  // "bg-orange-500",
  // "bg-teal-500",
  // "bg-pink-500",
  // "bg-indigo-500",
]

const getAvatarColor = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

export const UserCard = ({ user }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-[1.06] min-w-[300px]">
    <div className="p-4 h-full flex flex-col">
      {/* Header with avatar, name and actions */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm",
              getAvatarColor(user.name),
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
                  user.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600",
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
  
        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit user"
          >
            <Pencil size={14} />
          </button>
          <button
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete user"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
  
      {/* User details */}
      <div className="space-y-3 flex-1">
        <div className="text-sm text-gray-600 truncate">{user.email}</div>
  
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 size={12} className="text-gray-400 flex-shrink-0" />
          <span className="truncate max-w-[140px]">{user.organizationName}</span>
        </div>
  
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600 truncate max-w-[140px]">
            <Users size={12} className="text-gray-400" />
            <span className="truncate">{user.role}</span>
          </div>
          {/* <span className="text-blue-600 font-medium text-xs bg-blue-50 px-2 py-1 rounded">
            {user.preferredSections}
          </span> */}
        </div>
      </div>
    </div>
  </div>
  
  )
}
