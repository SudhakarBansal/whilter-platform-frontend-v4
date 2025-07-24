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
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { TextFieldElement, FormContainer, SelectElement, PasswordElement } from '@whilter/forms';

interface AddUserProps {
    open: boolean
    onClose: () => void
}

export const AddUser = ({ open, onClose }: AddUserProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        organization: "",
        role: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        status: true,
    })

    const organizationOptions = [
        { id: 'default', label: 'Default' },
        { id: 'test1', label: 'Test 1' },
        { id: 'test2', label: 'Test 2' }
    ];

    const handleChange = (field: string) => (event: any) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            classes={{ paper: "bg-gradient-to-br from-blue-900 to-blue-800 text-white max-w-[550px] w-full" }}
        >
            <FormContainer>
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
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <Box>
                                    <Typography>Full Name</Typography>
                                    <TextFieldElement
                                        name="fullName"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="John Smith"
                                        size="small"
                                        autoComplete='off'
                                        required
                                    />
                                </Box>

                                <Box>
                                    <Typography>Email Address</Typography>
                                    <TextFieldElement
                                        name="emailAddress"
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
                                    <Typography>Organization</Typography>
                                    <SelectElement
                                        name="organization"
                                        options={organizationOptions}
                                        fullWidth
                                        size="small"
                                        label="Select Organization"
                                    />
                                </Box>
                                <Box>
                                    <Typography>Role</Typography>
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
                                    <Typography>Password</Typography>
                                    <PasswordElement
                                        name="password"
                                        label=""
                                        required
                                        fullWidth
                                        placeholder="••••••••••••••••••"
                                    />

                                </Box>


                                <Box>
                                    <Typography>Confirm Password</Typography>
                                    <PasswordElement
                                        name="confirmPassword"
                                        label=""
                                        required
                                        fullWidth
                                        placeholder="••••••••••••••••••"
                                    />

                                </Box>

                            </div>

                            <Box>
                                <Typography>Mobile Number</Typography>
                                <TextFieldElement
                                    name="mobileNumber"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="+91 9996979999"
                                    size="small"
                                    autoComplete='off'
                                    required
                                />
                            </Box>


                            <div className="space-y-1">
                                <Typography>Account Status</Typography>
                                <div className="flex items-center justify-between rounded border border-white/30 px-3 py-1 bg-white/5">
                                    <span className="text-white text-sm">
                                        {formData.status ? "Active" : "Inactive"}
                                    </span>
                                    <Switch
                                        checked={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
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
                        </form>
                    </DialogContent>
                </div>
            </FormContainer>
        </Dialog>
    )
}
