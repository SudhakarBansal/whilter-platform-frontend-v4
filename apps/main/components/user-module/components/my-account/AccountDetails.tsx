'use client';

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { PencilIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import RequestForm from './RequestForm';
import { Role } from '@whilter/auth';


export default function AccountDetails() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const defaultName = useMemo(() => session?.user?.name || '', [session?.user?.name]);
  const { register, watch } = useForm({ defaultValues: { name: defaultName } });

  const name = watch('name');
  const isSuperAdmin = session?.user?.role === Role.SUPER_ADMIN;

  return (
  <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 bg-white text-black rounded-xl shadow-md">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>
      <p className="text-gray-600 text-sm mb-1">Name</p>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <input
            {...register('name')}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p className="text-base font-semibold break-words">
              {name || defaultName || 'N/A'}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
    <div>
      <p className="text-gray-600 text-sm mb-1">Email</p>
      <p className="text-base font-semibold break-words">
        {session?.user?.email || 'N/A'}
      </p>
    </div>
    <div>
      <p className="text-gray-600 text-sm mb-1">Role</p>
      <p className="text-base font-semibold text-indigo-600 break-words">
        {session?.user?.role || 'N/A'}
      </p>
    </div>
  </div>

  {isSuperAdmin && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div>
        <p className="text-gray-600 text-sm mb-1">Organization</p>
        <p className="text-base font-semibold break-words">
          {session?.user?.organization || 'N/A'}
        </p>
      </div>

      <div className="sm:col-span-2 lg:col-span-1">
        <p className="text-gray-600 text-sm mb-1">Preferred Sections</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {session?.user?.section?.length > 0 ? (
            session.user.section.map((s: string) => (
              <span
                key={s}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {s.replaceAll('_', ' ')}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">N/A</p>
          )}
        </div>
      </div>
    </div>
  )}

  {!isSuperAdmin && <RequestForm />}
</div>

  );
}
