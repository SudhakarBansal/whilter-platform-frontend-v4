'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { SelectElement, FormContainer } from '@whilter/forms';
import { SECTIONS } from '@whilter/auth';
import { Box, Button } from '@mui/material';
import { requestOrgAccessValues, type RequestOrgAccess } from '@/model/userFormInitialValues';
import { joinOrganizationRequest } from '@/services/actions/userService';
import { useOrgAndRoleOptions } from '@/hooks/useRoleAndOrgHook';
import { Role } from '@whilter/auth';


export default function RequestForm() {
    const { data: session } = useSession();
    const { roleOptions, organizationOptions, loading: optionsLoading } = useOrgAndRoleOptions();

    const defaultName = useMemo(() => session?.user?.name || '', [session]);
    const isSuperAdmin = session?.user?.role === Role.SUPER_ADMIN;

    const methods = useForm<RequestOrgAccess>({
        defaultValues: {
            ...requestOrgAccessValues,
            name: defaultName,
        },
    });

    const { register, reset, getValues } = methods;

    // useEffect(() => {
    //     if (!session?.user || !organizationOptions.length || !roleOptions.length) return;

    //     const defaultOrg = organizationOptions.find(opt => opt.label === session.user.organization);
    //     const defaultRole = roleOptions.find(opt => opt.label === session.user.role);

    //     reset({
    //         ...requestOrgAccessValues,
    //         name: defaultName,
    //         role: defaultRole?.value ?? '',
    //         organizationName: defaultOrg?.value ?? '',
    //         preferredSections: session.user.section ?? [],
    //         orgLevelAccess: false,
    //     });
    // }, [session, organizationOptions, roleOptions, reset, defaultName]);


    const onSubmit = async (data: RequestOrgAccess) => {
        try {
            const payload = {
                ...data,
                name: data.name?.trim() || defaultName,
                organizationName: data.organizationName,
                role: data.role,
            };

            const message = await joinOrganizationRequest(payload, session?.user?.email);
            toast.success(message || 'Request submitted successfully');
        } catch (error: any) {
            toast.error(error?.message || 'Error submitting request');
        }
    };

    return (
        <FormContainer formContext={methods} onSuccess={onSubmit}>
            <Box className="space-y-10 mt-12">
                {!isSuperAdmin ? (
                    <>
                        <SelectElement
                            name="organizationName"
                            options={organizationOptions}
                            fullWidth
                            size="small"
                            label="Select Organization"
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'red',
                                },
                            }}
                        />

                        <SelectElement
                            name="role"
                            options={roleOptions}
                            fullWidth
                            size="small"
                            label="Select Role"
                        />
                    </>
                ) : (
                    <>
                        <div className="w-full sm:flex sm:items-center sm:justify-between flex-col sm:flex-row gap-2">
                            <div className="text-sm text-gray-600">
                                <strong>Organization Id</strong>: {session?.user?.organization}
                            </div>
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Sections
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {Object.values(SECTIONS).map((section) => (
                            <label key={section} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    value={section}
                                    {...register('preferredSections')}
                                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                {section.replaceAll('_', ' ')}
                            </label>
                        ))}
                    </div>
                </div>

                {!isSuperAdmin && (
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <input
                            type="checkbox"
                            {...register('orgLevelAccess')}
                            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Request Organization Level Access
                    </label>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-2">
                    <Button type="button" onClick={() => reset()} variant="outlinePrimary">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={optionsLoading} variant="flatPrimary">
                        Submit Request
                    </Button>
                </div>

            </Box>
        </FormContainer>
    );
}
