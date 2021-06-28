/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, take, call } from '@redux-saga/core/effects';
import { takeEvery } from 'redux-saga/effects'
import axios from 'axios';

import * as action from './login.actions';

export function loginFC(payload: any): void {
  const { account, history } = payload;
  axios.post('http://127.0.0.1:3030/login', account)
    .then(res => {
      console.log('Login status:', res.statusText);
      if (res.statusText == 'Logged in') {
        history.push('./account');
        alert('Successful Login');
      }
    })
    .catch(err => {
      alert(err.response.statusText);
    });
}

export function* sagaGenerators() {
  const { payload } = yield take(action.login);
  yield call(loginFC, payload);
}

function login(action: any) {
    loginFC(action.payload)
}



export default function* loginSaga(): any {
    yield takeEvery("LOGIN",login ) //? pot sa fac call-ul de cate ori vreau
//   yield all([sagaGenerators()]); //? pot sa fac un singur call
    //? OK cauta ce si de ce 
}

// import axios from 'axios';
// import { all, call, put, takeEvery } from 'redux-saga/effects';
// import accountSaga from '../account/account.saga';
// import { useHistory } from 'react-router';
// import { LoginData } from './login.types';

// const history = useHistory();

// export function* incrementFC() {
//   yield takeEvery('INCREMENT', incrementAsync);
//   // yield takeEvery('GET_MOVIE_LIST', setMovieList)
// }

// export function* incrementAsync() {
//   yield put({
//     type: 'INCREMENT',
//     payload: {
//       count: 20
//     }
//   });
// }

// function redirect(path: string) {
//   history.push(path);
// }

// export function* handleLoginSubmit(loginData: LoginData) {
//   axios
//     .post('http://127.0.0.1:3030/login', loginData)
//     .then(resp => {
//       alert('Succes Login');
//       sessionStorage.setItem('token', resp.data);
//       redirect('/account');
//     })
//     .catch(err => {
//       alert(err.response.statusText);
//     });
// }

// export function* loginSaga() {
//   yield call(handleLoginSubmit, { username: 'Itachi', password: '1234' });
// }

// export default function* rootSaga() {
//   yield all([loginSaga(), accountSaga()]);
// }

// function fetchMovies() {
//   return fetch('https://ghibliapi.herokuapp.com/films')
//     .then(response => response.json())
//     .then(data => data);
// }

// export function* setMovieList(): any {
//   const movies = yield call(fetchMovies);
//   yield put({
//     type: 'GET_MOVIE_LIST',
//     payload: movies
//   });
// }
