'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function UnAuthorized() {
      const homeUrl = process.env.NEXT_PUBLIC_MAIN_URL || '/'
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
      <Link href={homeUrl} passHref>
        <Button
          variant="flatPrimary"
          startIcon={<ShieldAlert />}
          size="large"
        >
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}
