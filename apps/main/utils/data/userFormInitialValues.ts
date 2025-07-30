export interface UserFormValues {
    name: string;
    email: string;
    role: string;
    password: string;
    organizationName: string;
    preferredSections: string[];
    status: boolean;
    orgLevelAccess: boolean;
  }
  
  export const userFormInitialValues: UserFormValues = {
    name: "",
    email: "",
    role: "",
    password: "",
    organizationName: "",
    preferredSections: [],
    status: false,
    orgLevelAccess: false,
  };
  