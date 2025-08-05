export interface UserFormValues {
    name: string| null;
    email: string;
    role: string;
    password: string;
    organizationName: string;
    preferredSections: string[];
    status: boolean;
    orgLevelAccess: boolean;
  }

  export interface RequestOrgAccess {
    name:string;
    role: string;
    organizationName: string;
    preferredSections: string[];
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


  export const requestOrgAccessValues:RequestOrgAccess={
    name:"",
    role: "",
    organizationName: "",
    preferredSections: [],
    orgLevelAccess: false,
  }
  