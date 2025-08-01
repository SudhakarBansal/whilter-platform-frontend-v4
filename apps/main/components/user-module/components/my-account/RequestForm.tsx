'use client';

import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { SelectElement, FormContainer } from '@whilter/forms';
import { SECTIONS } from '@whilter/auth';
import { Box } from '@mui/material';

import {
    requestOrgAccessValues,
    type RequestOrgAccess,
} from '@/model/userFormInitialValues';
import { joinOrganizationRequest } from '@/services/actions/userService';
import { useOrgAndRoleOptions } from '@/hooks/useRoleAndOrgHook';

export default function RequestForm() {
    const { data: session } = useSession();
    const { roleOptions, organizationOptions, loading: optionsLoading } = useOrgAndRoleOptions();

    const defaultName = useMemo(() => session?.user?.name || '', [session?.user?.name]);

    const methods = useForm<RequestOrgAccess>({
        defaultValues: {
            ...requestOrgAccessValues,
            name: defaultName,
        },
    });
    const { register, reset } = methods;

    const onSubmit = useCallback(
        async (data: RequestOrgAccess) => {
            debugger;
            try {
                console.log('Submitted values:', data);
                const message = await joinOrganizationRequest(
                    {
                        ...data,
                        name: data.name?.trim() || defaultName,
                    },
                    session?.user?.email
                );
                toast.success(message || 'Request submitted successfully');
            } catch (error: any) {
                toast.error(error?.message || 'Error submitting request');
            }
        },
        [defaultName, session?.user?.email]
    );

    return (
        <FormContainer formContext={methods} onSuccess={onSubmit}>

            <Box className="space-y-6">
                <Box>
                    <SelectElement
                        name="organizationName"
                        options={organizationOptions}
                        fullWidth
                        size="small"
                        label="Select Organization"

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

                <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        {...register('orgLevelAccess')}
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    Request Organization Level Access
                </label>

                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={optionsLoading}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Submit Request
                    </button>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </Box>
        </FormContainer>
    );
}
