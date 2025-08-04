'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import { getOrganizationList } from '@/services/actions/organizationService';
import { getRoleList } from '@/services/actions/rolesServices';
import  type { Option ,Role,Organization} from '@/types/roles.types';

export function useOrgAndRoleOptions(shouldFetch = true) {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [organizationOptions, setOrganizationOptions] = useState<Option[]>([]);
  const [roleOptions, setRoleOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (!shouldFetch || status !== 'authenticated') return;

    const fetchOptions = async () => {
      try {
        setLoading(true);

        const [orgs, roles]: [Organization[], Role[]] = await Promise.all([
          getOrganizationList(),
          getRoleList(),
        ]);

        setOrganizationOptions(orgs.map((org) => ({
          label: org.name,
          value: org.name, 
        })));

        setRoleOptions(roles.map((role) => ({
          label: role.name,
          value: role.name, 
        })));
      } catch (err) {
        toast.error('Failed to load organization/role options');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [shouldFetch, status]);

  return useMemo(
    () => ({ organizationOptions, roleOptions, loading }),
    [organizationOptions, roleOptions, loading]
  );
}
