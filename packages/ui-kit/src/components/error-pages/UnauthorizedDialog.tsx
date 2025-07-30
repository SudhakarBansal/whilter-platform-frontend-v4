
'use client';
import { Button } from "@mui/material";

export interface UnAuthorizedDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
}


export const UnAuthorizedDialog: React.FC<UnAuthorizedDialogProps> = ({
    open,
    title,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 text-center">
                <h2 className="text-lg font-semibold text-red-600 mb-2">Access Denied</h2>
                <p className="text-gray-700 text-sm mb-4">
                    You currently do not have permission to access <strong>{title}</strong>.
                    Please contact your administrator.
                </p>
                <Button
                    variant="flatPrimary"
                    onClick={() => onClose()}>
                    Close
                </Button>
            </div>
        </div>
    );
};