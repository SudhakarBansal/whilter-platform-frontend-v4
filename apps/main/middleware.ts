import { middleware } from '@whilter/auth';

export default  middleware;
export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
