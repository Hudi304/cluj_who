export const ACTIONS = {
  GET_MOVIE_LIST: 'GET_MOVIE_LIST'
};

export interface FormObj {
  firstName: string;
  middleName: string;
  lastName: string;

  email: string;
  phoneNumber: string;
  fax: string;

  address: string;
  city: string;
  state: string;

  zipCode: string;
  country: string;

  oldPassword: string;
  newPassword: string;
  reNewpassword: string;
}

export const fromObjInit: FormObj = {
  firstName: '',
  middleName: '',
  lastName: '',

  email: '',
  phoneNumber: '',
  fax: '',

  address: '',
  city: '',
  state: '',

  zipCode: '',
  country: '',

  oldPassword: '',
  newPassword: '',
  reNewpassword: ''
};
