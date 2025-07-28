"use client"
import React, { useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    Switch,
    Box,
    Stack
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { Controller } from "react-hook-form"
import { TextFieldElement, FormContainer, SelectElement, PasswordElement, MultiSelectElement } from '@whilter/forms';
import { userFormInitialValues, type UserFormValues } from "@/utils/data/userFormInitialValues"
import type { AddUserProps } from "@/types/addUser.types"
import type { RegisterCredentials } from "@/services/user/user.types"
import { registerUser } from "@/services/user/userService"
import encryptPassword from "@/utils/password-encryption"
import { toast } from "sonner"


export const AddUser = ({ open, onClose }: AddUserProps) => {

    const organizationOptions = [
        { id: 'default', label: 'Default' },
        { id: 'test1', label: 'Test 1' },
        { id: 'test2', label: 'Test 2' }
    ];

    const preferredSectionOptions = [
        { id: 'MEDIA_TOOLS', label: 'Media Tools' },
        { id: 'CHARP_AI', label: 'Charp AI' },
        { id: 'MARKETPLACE', label: 'Marketplace' },
        { id: 'DASHBOARD', label: 'Dashboard' }
    ];


    const handleSubmit = async (data: UserFormValues) => {

        const encryptedPassword = encryptPassword(data.password);
        try {
            const payload: RegisterCredentials = {
                name: data.name,
                email: data.email,
                password: encryptedPassword,
                role: data.role,
                organizationName: data.organizationName,
                preferredSections: data.preferredSections,
                status: data.status,
                orgLevelAccess: false
            };

            const message = await registerUser(payload);
            toast.success(message || "User registered successfully");
            onClose();
        } catch (error: any) {
            const errorMessage = error?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    };


    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            classes={{ paper: "bg-gradient-to-br from-blue-600 to-blue-400 text-white max-w-[550px] w-full" }}
        >
            <FormContainer<UserFormValues>
                defaultValues={userFormInitialValues}
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
                                        defaultValue={"Default"}
                                    />
                                </Box>
                                <Box>
                                    <SelectElement
                                        name="role"
                                        options={organizationOptions}
                                        fullWidth
                                        size="small"
                                        label="Select Role"
                                    />
                                </Box>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Box>
                                    <PasswordElement
                                        name="password"
                                        label="Password"
                                        required
                                        fullWidth
                                        placeholder="••••••••••••••••••"
                                    />

                                </Box>


                                <Box>
                                    <MultiSelectElement
                                        name="preferredSections"
                                        options={preferredSectionOptions}
                                        fullWidth
                                        size="small"
                                        label="Select Section"
                                        showChips= {true}
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
