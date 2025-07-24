
'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface UnauthorizedDialogProps {
  open: boolean;
  serviceName: string;
  onClose: () => void;
}

export const UnauthorizedDialog: React.FC<UnauthorizedDialogProps> = ({
  open,
  serviceName,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Access Denied</DialogTitle>
      <DialogContent>
        <Typography>
          You don't have permission to access <strong>{serviceName}</strong>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};