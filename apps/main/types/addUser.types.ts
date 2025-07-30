import  type { UserFormValues } from "@/model/userFormInitialValues";

export interface AddUserProps {
    open: boolean
    onClose: () => void
    userId?: string  
    handleSubmit?: (data: UserFormValues) => Promise<void>;
    defaultValues?: UserFormValues;
    isEditMode?: boolean;
}

  