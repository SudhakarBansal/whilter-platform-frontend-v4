'use client';

import { Typography, Button } from '@mui/material';
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
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
      <h1 className="text-6xl font-bold mb-4 text-primary">401</h1>
      <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
      <p className="text-base text-gray-600 max-w-md mb-6">{message}</p>

      <LinkComponent href={homeUrl}>
        <Button
          variant="flatPrimary"
          startIcon={<ShieldAlert size={20} />}
          size="large"
          className="!bg-primary !text-white hover:!bg-primary/90 normal-case"
        >
          Back to Home
        </Button>
      </LinkComponent>
    </div>
  );
}
