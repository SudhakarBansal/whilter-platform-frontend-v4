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
            PaperProps={{
                sx: {
                    background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
                    color: "white",
                    width: "500px",
                    maxWidth: "500px",
                },
            }}
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
                                    <Typography >Full Name</Typography>
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
                                        variant="standard"
                                    />
                                </Box>

                            </div>



                            {/* Organization and User Role */}
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
                                    <PasswordElement
                                        name="password"
                                        label="Password"
                                        required
                                        fullWidth
                                        placeholder="••••••••••••••••••"
                                        iconColor="default"
                                        // sx={{
                                        //     "& .MuiFilledInput-root": {
                                        //         backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        //         color: "white",
                                        //         "&:hover": {
                                        //             backgroundColor: "rgba(255, 255, 255, 0.15)",
                                        //         },
                                        //         "&.Mui-focused": {
                                        //             backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        //         },
                                        //     },
                                        //     "& .MuiInputLabel-root": {
                                        //         color: "rgba(255, 255, 255, 0.8)",
                                        //     },
                                        //     "& .MuiInputLabel-root.Mui-focused": {
                                        //         color: "white",
                                        //     },
                                        //     "& .MuiFilledInput-input::placeholder": {
                                        //         color: "rgba(255, 255, 255, 0.6)",
                                        //         opacity: 1,
                                        //     },
                                        // }}
                                        variant="filled"
                                    />

                                </Box>

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••••••••"
                                    value={formData.password}
                                    onChange={handleChange("password")}
                                    variant="filled"
                                    sx={{
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                            },
                                            "&.Mui-focused": {
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "rgba(255, 255, 255, 0.8)",
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "white",
                                        },
                                        "& .MuiFilledInput-input::placeholder": {
                                            color: "rgba(255, 255, 255, 0.6)",
                                            opacity: 1,
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "white" }}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {/* <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange("confirmPassword")}
                                    variant="filled"
                                    sx={{
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                            },
                                            "&.Mui-focused": {
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "rgba(255, 255, 255, 0.8)",
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "white",
                                        },
                                        "& .MuiFilledInput-input::placeholder": {
                                            color: "rgba(255, 255, 255, 0.6)",
                                            opacity: 1,
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" sx={{ color: "white" }}>
                                                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                /> */}
                            </div>

                            {/* Mobile Number */}
                            <TextField
                                fullWidth
                                label="Mobile Number"
                                placeholder="+91 830 796 8900"
                                value={formData.mobileNumber}
                                onChange={handleChange("mobileNumber")}
                                variant="filled"
                                sx={{
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "rgba(255, 255, 255, 0.8)",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "white",
                                    },
                                    "& .MuiFilledInput-input::placeholder": {
                                        color: "rgba(255, 255, 255, 0.6)",
                                        opacity: 1,
                                    },
                                }}
                            />

                            {/* Account Status */}
                            <div className="space-y-3 pt-2">
                                <Typography variant="subtitle2" className="text-white font-medium">
                                    ACCOUNT STATUS
                                </Typography>
                                <div className="flex items-center justify-between">
                                    <Typography variant="body2" className="text-blue-100">
                                        Active
                                    </Typography>
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

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-blue-400">
                                <Button
                                    variant="text"
                                    onClick={onClose}
                                    sx={{
                                        px: 3,
                                        py: 1.5,
                                        textTransform: "none",
                                        color: "rgba(255, 255, 255, 0.8)",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    // variant="contained"
                                    sx={{
                                        px: 3,
                                        py: 1.5,
                                        textTransform: "none",
                                        backgroundColor: "#3b82f6",
                                        "&:hover": {
                                            backgroundColor: "#2563eb",
                                        },
                                    }}
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
