"use client";

import { users } from "@/utils/data/users.data";
import { UserCard } from "./UserCard";


export const UserTableSection = () => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-800/60 border-b border-slate-700/50">
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

