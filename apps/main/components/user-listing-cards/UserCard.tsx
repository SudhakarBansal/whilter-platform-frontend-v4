import { type User } from "@whilter/ui-kit/types"
import { Trash2, Pencil } from "lucide-react"
import clsx from "clsx"

interface Props {
  user: User
}

const statusStyles: Record<User["status"], string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  Banned: "bg-red-500/20 text-red-400 border-red-500/30",
  Pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Suspended: "bg-orange-500/20 text-orange-400 border-orange-500/30",
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
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-blue-500",
  "from-teal-500 to-emerald-500",
]

const getAvatarGradient = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

export const UserCard = ({ user }: Props) => {
  return (
    <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-all duration-300 group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div
            className={clsx(
              "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shadow-lg",
              getAvatarGradient(user.fullName),
            )}
          >
            {getInitials(user.fullName)}
          </div>
          <div className="font-semibold text-slate-200 group-hover:text-white transition-colors">{user.fullName}</div>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-400 group-hover:text-slate-300 transition-colors">{user.email}</td>
      <td className="px-6 py-4 text-slate-400 group-hover:text-slate-300 transition-colors">{user.username}</td>
      <td className="px-6 py-4">
        <span
          className={clsx(
            "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm",
            statusStyles[user.status],
          )}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 text-slate-400 group-hover:text-slate-300 transition-colors">{user.role}</td>
      <td className="px-6 py-4 text-slate-400 group-hover:text-slate-300 transition-colors">{user.joinedDate}</td>
      <td className="px-6 py-4 text-slate-400 group-hover:text-slate-300 transition-colors">{user.lastActive}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            className="p-2.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200 backdrop-blur-sm"
            title="Edit user"
          >
            <Pencil size={16} />
          </button>
          <button
            className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 backdrop-blur-sm"
            title="Delete user"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
