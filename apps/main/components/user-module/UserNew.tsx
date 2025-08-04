"use client";
import { useEffect, useState } from "react";
import { UserListing } from "./UserListing";
import { UserFormDialog } from "./components/UserFormDialog";
import { CircularProgress, Pagination } from "@mui/material";
import type { User } from "@/services/service-types";
import { getPaginatedUsersWithFilters } from "@/services/actions/userService";
import {  type UserFiltersState } from "./components/UserFilters";

interface UserNewProps {
  onEditUser: (userId: string) => void;
  open: boolean;
  onClose: () => void;
  userId?: string;
}

export const UserNew = ({
  onEditUser,
  open,
  onClose,
  userId
}: UserNewProps) => {
  const [users, setUsers] = useState<User[]>([]);
  
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0
  });
  const [filters, setFilters] = useState<UserFiltersState>({
    role: '',
    status: true,
    organizationName: '',
    email: '',
    preferredSection: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      // setLoading(true);
      const response = await getPaginatedUsersWithFilters({
        page: pagination.page,
        size: pagination.size,
        ...filters,
      });
      setUsers(response.content);
      setPagination(prev => ({
        ...prev,
        totalPages: response.totalPages,
        totalElements: response.totalElements
      }));
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchUsers();
    
  }, [pagination.page, filters]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (newFilters: Partial<UserFiltersState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  const handleSuccess = () => {
    onClose();
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-4">
      <UserListing
        users={users}
        onDelete={(id) => {
          const newUsers = users.filter(u => u.id !== id);
          setUsers(newUsers);
        }}
        onEdit={onEditUser}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={pagination.totalPages}
            page={pagination.page + 1}
            onChange={(_, page) => handlePageChange(page - 1)}
            color="primary"
          />
        </div>
      )}
      
      <UserFormDialog
        open={open}
        onClose={onClose}
        userId={userId}
        onSuccess={handleSuccess}
      />
    </div>
  );
};