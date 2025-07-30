'use client';

import { Typography, Button ,Box} from '@mui/material';
import { ShieldAlert } from 'lucide-react';
import { ReactNode } from 'react';

export type LinkComponentProps = {
  href: string;
  children: ReactNode;
  passHref?: boolean;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
};

export interface UnAuthorizedProps {
  LinkComponent: React.ElementType;
  homeUrl?: string;
  message?: string;
}

export function UnAuthorized({
  LinkComponent,
  homeUrl = '/',
  message = "You don't have permission to view this page.",
}: UnAuthorizedProps) {
    
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        p: 4,
      }}
    >

      <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', mb: 2 }}>
        401
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: '500px' }}>
        You don't have permission to view this page. Please contact your administrator or try a different section.
      </Typography>
      <LinkComponent href={homeUrl} passHref>
        <Button
          variant="flatPrimary"
          startIcon={<ShieldAlert />}
          size="large"
        >
          Back to Home
        </Button>
      </LinkComponent>
    </Box>
  );
}
