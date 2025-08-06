'use client';
import { useState } from 'react';
import UserForm from './user-form';
import { useRouter } from 'next/navigation';
import { Dialog } from '@mui/material';
import encryptPassword from '@/utils/password-encryption';
import { registerUser } from '@/services/actions/userService';
import { toast } from 'sonner';

interface UserNewProps {
  organizationList: any;
  rolesList: any;
  onClose: any;
}

const UserNew = ({ organizationList, rolesList, onClose }: UserNewProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const defaultValues = {
    name: "",
    email: "",
    role: "",
    organizationName: "",
    preferredSections: [],
    status: false,
    orgLevelAccess: false,
    password: ""
  }

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      const encryptedPassword = encryptPassword(data.password);
      const payload = {
        ...data,
        password: encryptedPassword
      };
      const response = await registerUser(payload);
      if (response) {
        toast.success("User registered successfully");
        onClose();
        router.refresh();
      }
    }
    catch (error: any) {
      toast.error("Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  const preferredSectionOptions = [
    { id: "MEDIA_TOOLS", label: "Media Tools" },
    { id: "charp-ai", label: "Charp AI" },
    { id: "MARKETPLACE", label: "Marketplace" },
    { id: "Dashboard", label: "Dashboard" },
  ];

  return (
    <UserForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onClose={onClose}
      organizationOptions={organizationList}
      roleOptions={rolesList}
      preferredSectionOptions={preferredSectionOptions}
      isEdit={true}
    />
  )
}

export default UserNew;
