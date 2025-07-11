'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: '500px' }}>
        Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
      </Typography>
      <Link href="/" passHref>
        <Button
          variant="flatPrimary"
          startIcon={<Home />}
          size="large"
        >
          Go Home
        </Button>
      </Link>
    </Box>
  );
}