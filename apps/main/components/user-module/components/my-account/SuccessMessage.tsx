'use client';

import { Button } from '@mui/material';
import { CheckCircle } from 'lucide-react';

interface Props {
  onEdit: () => void;
}

export default function SuccessMessage({ onEdit }: Props) {
  return (
    <div className="text-center p-6 bg-green-50 rounded-xl">
      <div className="flex justify-center mb-4">
        <CheckCircle className="text-green-600 w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Request Submitted</h2>
      <p className="text-gray-700 mb-6">
        Your request has been sent. You’ll be notified once it’s reviewed.
      </p>
      <Button onClick={onEdit} variant="flatPrimary" color="primary">
        Edit Request
      </Button>
    </div>
  );
}
