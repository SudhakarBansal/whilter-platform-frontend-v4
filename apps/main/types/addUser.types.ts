import { type UserFormValues } from "@/utils/data/userFormInitialValues"; 

export interface AddUserProps {
    open: boolean
    onClose: () => void
    userId?: string
    handleSubmit: (data: UserFormValues) => Promise<void>;   
}