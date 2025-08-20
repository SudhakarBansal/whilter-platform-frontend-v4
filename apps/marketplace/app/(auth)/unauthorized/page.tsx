import { UnAuthorized } from '@whilter/ui-kit/components';
import NextLink from "next/link";

export default function UnauthorizedPage() {
  const homeUrl = process.env.NEXT_PUBLIC_MAIN_URL || '/'
  return (
    <UnAuthorized 
      LinkComponent={NextLink}
      homeUrl={homeUrl} 
    />
  );
}


