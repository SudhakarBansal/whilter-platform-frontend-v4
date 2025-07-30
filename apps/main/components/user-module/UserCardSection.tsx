"use client";


import { useEffect, useState } from "react";
import { allUsers } from "@/services/user/userService";
import { UserCard } from "./UserCard";
import type { User } from "@/services/user/user.types"

interface UserCardSectionProps {
  onEditUser: (userId: string) => void;
}

export const UserCardSection = ({ onEditUser }: UserCardSectionProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await allUsers();
        setUsers(fetchedUsers);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={(id) => {
            setUsers((prev) => prev.filter((u) => u.id !== id));
          }}
          onEdit={ onEditUser }
        />
      ))}
    </div>
  )
}

