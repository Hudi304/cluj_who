/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import axios from 'axios'
import { take, call } from '@redux-saga/core/effects'
import { takeEvery } from 'redux-saga/effects'
import * as action from './login.actions'
import { URL } from './login.types'

export function loginFC(payload: any): void {
  const { account, history } = payload;
  axios
    .post(`${URL}/login`, account)
    .then(res => {
      // console.log('Login status:', res.statusText);
      if (res.statusText == 'Logged in') {
        history.push('./account')
        alert('Successful Login')
      }
    })
    .catch(err => {
      alert(err.response.statusText);
    });
}

export function* sagaGenerators() {
  const { payload } = yield take(action.login);
  yield call(loginFC, payload)
}

function login(action: any) {
  loginFC(action.payload)
}

export default function* loginSaga(): any {
  yield takeEvery('LOGIN', login) //? pot sa fac call-ul de cate ori vreau
  //   yield all([sagaGenerators()]); //? pot sa fac un singur call
  //? OK cauta ce si de ce
}
