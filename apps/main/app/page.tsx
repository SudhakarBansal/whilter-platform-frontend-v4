import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions, Role } from '@whilter/auth';
import { ALL_ROUTE_CONFIGS } from '@whilter/auth/src/config';

export default async function Home() {

  return  <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">No route assigned for your role.</h1>
        <p className="text-gray-600">
          Please contact your administrator to configure access permissions.
        </p>
      </div>
    </div>
}