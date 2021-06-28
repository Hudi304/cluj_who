export const ACTIONS = {
  GET_MOVIE_LIST: 'GET_MOVIE_LIST',
  LOGIN: 'LOGIN '
};

export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  email: string;
  password: string;
}
