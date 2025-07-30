"use client"
import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
    IconButton,
    Switch,
    Box
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { Controller, useForm } from "react-hook-form"
import { TextFieldElement, FormContainer, SelectElement, PasswordElement, MultiSelectElement } from '@whilter/forms';
import { userFormInitialValues, type UserFormValues } from "@/model/userFormInitialValues"
import type { AddUserProps } from "@/types/addUser.types"
import type { RegisterCredentials } from "../../services/service-types"
import { registerUser, getUserById, updateUser, getRoleList } from "../../services/actions/userService"
import { getOrganizationList } from "@/services/actions/organization"
import encryptPassword from "@/utils/password-encryption"
import { toast } from "sonner"


export const AddUser = ({ open, onClose, userId }: AddUserProps) => {

    const [loading, setLoading] = useState(false);
    const [organizationOptions, setOrganizationOptions] = useState<{ label: string; value: string }[]>([]);
    const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const methods = useForm<UserFormValues>({ defaultValues: userFormInitialValues });

    const preferredSectionOptions = [
        { id: 'MEDIA_TOOLS', label: 'Media Tools' },
        { id: 'charp-ai', label: 'Charp AI' },
        { id: 'MARKETPLACE', label: 'Marketplace' },
        { id: 'Dashboard', label: 'Dashboard' }
    ];


    // const handleSubmit = async (data: UserFormValues) => {
    //     try {
    //         setLoading(true);

    //         const encryptedPassword = encryptPassword(data.password);
    //         const payload: RegisterCredentials = {
    //             name: data.name,
    //             email: data.email,
    //             password: encryptedPassword,
    //             role: data.role,
    //             organizationName: data.organizationName,
    //             preferredSections: data.preferredSections,
    //             status: data.status,
    //             orgLevelAccess: data.orgLevelAccess ?? false
    //         };

    //         if (userId) {
    //             const updatePayload = {
    //                 ...payload,
    //                 password: undefined,
    //             };
    //             const message = await updateUser(userId, updatePayload);
    //             toast.success(message || "User updated successfully");
    //         } else {
    //             const message = await registerUser(payload);
    //             toast.success(message || "User registered successfully");
    //         }

    //         onClose();
    //     } catch (error: any) {
    //         const errorMessage = error?.message || "Operation failed. Please try again.";
    //         toast.error(errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (data: UserFormValues) => {
        try {
            setLoading(true);

            const basePayload: RegisterCredentials = {
                name: data.name,
                email: data.email,
                role: data.role,
                organizationName: data.organizationName,
                preferredSections: data.preferredSections,
                status: data.status,
                orgLevelAccess: data.orgLevelAccess ?? false
            };

            if (userId) {
                const message = await updateUser(userId, basePayload);
                toast.success(message || "User updated successfully");
            } else {
                const encryptedPassword = encryptPassword(data.password);
                const message = await registerUser({
                    ...basePayload,
                    password: encryptedPassword,
                });
                toast.success(message || "User registered successfully");
            }

            onClose();
        } catch (error: any) {
            const errorMessage = error?.message || "Operation failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    const fetchOrganizations = async () => {
        try {
            const data = await getOrganizationList();
            const formattedOptions = data.map((org: any) => ({
                id: org.name,
                label: org.name,
            }));
            setOrganizationOptions(formattedOptions);
        } catch (err) {
            console.error("Failed to fetch organizations", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const data = await getRoleList();
            const formattedOptions = data.map((org: any) => ({
                id: org.name,
                label: org.name,
            }));
            setRoleOptions(formattedOptions);
        } catch (err) {
            console.error("Failed to fetch organizations", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const userData = await getUserById(userId);
            methods.reset({
                name: userData.name,
                email: userData.email,
                role: userData.role,
                organizationName: userData.organizationName,
                preferredSections: userData.preferredSections,
                status: userData.status,
                orgLevelAccess: userData.orgLevelAccess
            });
        } catch (err) {
            toast.error("Failed to load user");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrganizations();
        fetchUser();
        fetchRoles();
    }, [userId]);


    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            classes={{ paper: "bg-gradient-to-br from-blue-600 to-blue-400 text-white max-w-[550px] w-full" }}
        >
            <FormContainer
                formContext={methods}
                onSuccess={handleSubmit}
            >
                <div className="relative p-6">
                    {/* Close Button */}
                    <IconButton onClick={onClose} className="absolute top-4 right-4 z-10" sx={{ color: "white" }}>
                        <CloseIcon />
                    </IconButton>

                    {/* Header */}
                    <DialogTitle className="text-center pt-2 pb-4" sx={{ color: "white" }}>
                        <Typography variant="h5" className="font-semibold text-white">
                            Register New User
                        </Typography>
                        <Typography variant="body2" className="text-blue-100 mt-2">
                            Fill in the details below to create a new user account.
                        </Typography>
                    </DialogTitle>

                    {/* Form Content */}
                    <DialogContent className="px-0">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <Box>
                                    <TextFieldElement
                                        name="name"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="John Smith"
                                        size="small"
                                        autoComplete='off'
                                        required
                                        label="Full Name"
                                    />
                                </Box>

                                <Box>
                                    <TextFieldElement
                                        name="email"
                                        label="Email Address"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="john.smith@gmail.com"
                                        size="small"
                                        autoComplete='off'
                                        required
                                    />
                                </Box>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Box>
                                    <SelectElement
                                        name="organizationName"
                                        options={organizationOptions}
                                        fullWidth
                                        size="small"
                                        label="Select Organization"
                                    // defaultValue={organizationOptions[0]?.value || ''}
                                    />
                                </Box>
                                <Box>
                                    <SelectElement
                                        name="role"
                                        options={roleOptions}
                                        fullWidth
                                        size="small"
                                        label="Select Role"
                                    />
                                </Box>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {!userId && (
                                    <Box>
                                        <PasswordElement
                                            name="password"
                                            label="Password"
                                            required
                                            fullWidth
                                            placeholder="••••••••••••••••••"
                                        />
                                    </Box>
                                )}

                                <Box>
                                    <MultiSelectElement
                                        name="preferredSections"
                                        options={preferredSectionOptions}
                                        fullWidth
                                        size="small"
                                        label="Select Section"
                                        showChips={true}
                                    />

                                </Box>

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Box>
                                    <Typography>Account Status</Typography>
                                    <Controller
                                        name="status"
                                        render={({ field }) => (
                                            <div className="flex items-center justify-between rounded border border-white/30 px-3 py-1 bg-white/5">
                                                <span className="text-white text-sm">
                                                    {field.value ? "Active" : "Inactive"}
                                                </span>
                                                <Switch
                                                    {...field}
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    sx={{
                                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                                            color: "#ffffff",
                                                        },
                                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                            backgroundColor: "#3b82f6",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                </Box>
                                <Box>
                                    <Typography>Organization Access</Typography>
                                    <Controller
                                        name="orgLevelAccess"
                                        render={({ field }) => (
                                            <div className="flex items-center justify-between rounded border border-white/30 px-3 py-1 bg-white/5">
                                                <span className="text-white text-sm">
                                                    {field.value ? "Active" : "Inactive"}
                                                </span>
                                                <Switch
                                                    {...field}
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    sx={{
                                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                                            color: "#ffffff",
                                                        },
                                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                            backgroundColor: "#3b82f6",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                </Box>
                            </div>


                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outlinePrimary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="flatPrimary"
                                >
                                    Register
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </div>
            </FormContainer>
        </Dialog>
    )
}
