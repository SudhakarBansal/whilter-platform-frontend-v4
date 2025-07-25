export interface UserFormValues {
    name: string;
    email: string;
    role: string;
    organizationName: string;
    preferredSection: string;
    status: boolean;
    orgLevelAccess: boolean;
  }
  
  export const userFormInitialValues: UserFormValues = {
    name: "",
    email: "",
    role: "",
    organizationName: "",
    preferredSection: "",
    status: false,
    orgLevelAccess: false,
  };
  