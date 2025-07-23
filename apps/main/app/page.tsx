import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions, Role } from '@whilter/auth';
import { ALL_ROUTE_CONFIGS } from '@whilter/auth/src/config';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  // If no session exists, redirect to login page
  // if (!session) {
  //   return redirect('/'); 
  // }


  // if (!(session.user as any)?.role) {
  //   return redirect('/');
  // }

  // // Ensure role is correctly typed
  // const role = (session.user as { role: Role }).role;

  // // Find the first matching route for the user's role
  // const matchedRoute = Object.entries(ALL_ROUTE_CONFIGS).find(
  //   ([, config]) => config.allowedRoles.includes(role)
  // );

  // // Redirect to matched route or fallback
  // if (matchedRoute) {
  //   return redirect(matchedRoute[1].redirectAfterLogin || '/');
  // }

  return <div>No route assigned for your role.</div>;
}