export interface UserFormTemplate {
  name: string;
  email: string;
  password: string;
  gender: string;
  termsAccepted: boolean;
}

export const userFormTemplate: UserFormTemplate = {
  name: '',
  email: '',
  password: '',
  gender: '',
  termsAccepted: false,
};