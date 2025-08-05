'use client'
import React, { useState, useEffect } from 'react'
import UserForm from './user-form';
import { useRouter } from 'next/navigation';
import { Dialog } from '@mui/material';
import encryptPassword from '@/utils/password-encryption';
import { getUserById, updateUser } from '@/services/actions/userService';
import { toast } from 'sonner';

interface UserEditProps {
  organizationList?: any;
  rolesList?: any;
  userId: any;
  onClose:any;
}

const defaultValues = {
  name: "",
  email: "",
  role: "",
  organizationName: "",
  preferredSections: [],
  status: false,
  orgLevelAccess: false,
  password: ""
};


const UserEdit = ({
  organizationList,
  rolesList,
  userId,
  onClose
  
}: UserEditProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [initialValues, setInitialValues] = useState(defaultValues);

  console.log("userId",userId);


  const preferredSectionOptions = [
    { id: "MEDIA_TOOLS", label: "Media Tools" },
    { id: "charp-ai", label: "Charp AI" },
    { id: "MARKETPLACE", label: "Marketplace" },
    { id: "Dashboard", label: "Dashboard" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      const encryptedPassword = encryptPassword(data.password);
      const payload = {
        ...data,
        password: encryptedPassword
      };
      const { password, ...updateData } = data;
      const response = await updateUser(data.email, updateData);

      if (response) {
        toast.success("User updated successfully");
        onClose();
        router.refresh();
      }
    }
    catch (error: any) {
      toast.error("Failed to Update user");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await getUserById(userId);
      if (response) {
        setInitialValues({
          name: response.name,
          email: response.email,
          role: response.role,
          organizationName: response.organizationName,
          preferredSections: response.preferredSections,
          status: response.status,
          orgLevelAccess: response.orgLevelAccess ?? false,
          password: "",
        });
      }
    } catch (err) {
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => { fetchUser() }, [userId]);

  console.log("initialValues",initialValues);

  return (
    <div>
        <UserForm
          defaultValues={initialValues}
          onSubmit={handleSubmit}
          onClose={onClose}
          isEdit={true}
          organizationOptions={organizationList}
          roleOptions={rolesList}
          preferredSectionOptions={preferredSectionOptions}
        />
    </div>
  )
}

export default UserEdit
