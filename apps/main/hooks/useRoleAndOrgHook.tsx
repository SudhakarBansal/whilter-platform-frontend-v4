
import { useState, useEffect } from 'react';
import { getRoleList } from '@/services/actions/rolesServices';
import { getOrganizationList } from '@/services/actions/organizationService';
import { toast } from 'sonner';

export function useOrgAndRoleOptions(shouldFetch = true) {
  const [loading, setLoading] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [organizationOptions, setOrganizationOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const [orgs, roles] = await Promise.all([
          getOrganizationList(),
          getRoleList(),
        ]);

    
         setOrganizationOptions(orgs.map((org:any) => ({
          id: org.name,
          label: org.name
        })));
        setRoleOptions(
          roles.map((role: any) => ({
            id: role.name,
            label: role.name,
          }))
        );
      } catch (err) {
        toast.error('Failed to load options');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [shouldFetch]);

  return {
    roleOptions,
    organizationOptions,
    loading,
  };
}
