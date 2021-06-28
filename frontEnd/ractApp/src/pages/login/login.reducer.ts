/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from './login.types';

interface Action {
  type: string;
  payload: { use: User };
}

const defaultState = {
  isLogged: false,
  account: {
    email: '',
    password: ''
  }
};

export const LoginReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLogged: true, account: action.payload };
    case 'LOGOUT':
      return { ...state, isLogged: false };
    default:
      return state;
  }
};
