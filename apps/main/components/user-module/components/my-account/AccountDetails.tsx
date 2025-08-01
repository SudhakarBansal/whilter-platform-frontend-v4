'use client';

import { useSession } from 'next-auth/react';
import { useMemo, useState, useCallback } from 'react';
import { PencilIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import RequestForm from './RequestForm';

export default function AccountDetails() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const defaultName = useMemo(
    () => session?.user?.name || '',
    [session?.user?.name]
  );

  const { register, watch} = useForm({
    defaultValues: { name: defaultName },
  });

  const name = watch('name');

  const handleStartEdit = useCallback(() => setIsEditing(true), []);

  return (
    <div className="w-full mx-auto bg-white text-black rounded-xl p-6 sm:p-8">
      <div className="bg-gray-100 p-4 rounded grid grid-cols-1 sm:grid-cols-3 gap-6 text-base font-medium mb-10">
        <div>
          <p className="text-gray-500 text-md">Name</p>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <input
                {...register('name')}
                type="text"
                className="border border-gray-300 text-md rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                autoFocus
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <>
                <p className="text-lg font-semibold break-words">
                  {name || defaultName || 'N/A'}
                </p>
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-md">Email</p>
          <p className="text-lg font-semibold break-words">
            {session?.user?.email || 'N/A'}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-md">Role</p>
          <p className="text-lg font-semibold text-indigo-600 break-words">
            {session?.user?.role || 'N/A'}
          </p>
        </div>
      </div>

      <RequestForm />
    </div>
  );
}
