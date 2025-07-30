import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    useTheme,
  } from "@mui/material";
  import { type ConfirmDialogProps } from "@whilter/ui-kit/types";
  
  export const  DialogSection: React.FC<ConfirmDialogProps> = ({
    open,
    title = "Confirm",
    message,
    confirmLabel = "Yes",
    cancelLabel = "No",
    onConfirm,
    onCancel,
  }) => {
    const theme = useTheme();
  
    return (
      <Dialog
        open={open}
        onClose={onCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
            sx: {
              borderRadius: 2,
            //   px: 3,
            //   py: 2,
              boxShadow: 24, 
            },
          }}
      >
        <div className="bg-white text-center">
        <DialogTitle>
          <Typography className="text-lg font-semibold text-red-600" variant="h6">
            {title}
          </Typography>
        </DialogTitle>
  
        <DialogContent>
        <Typography
          variant="body2"
          className="text-gray-700 text-md"
        >
          {message}
        </Typography>
      </DialogContent>
  
        <DialogActions sx={{ px: 2, pb: 2, justifyContent: "flex-end" }}>
          <Button onClick={onCancel} variant="outlinePrimary" color="inherit" size="small" sx={{ minWidth: 60, px: 2 }}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} variant="flatPrimary" color="error" autoFocus size="small" sx={{ minWidth: 60, px: 2 }}>
            {confirmLabel}
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    );
  };
  