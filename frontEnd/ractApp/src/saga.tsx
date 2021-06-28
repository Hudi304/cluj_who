import { all, fork, spawn } from 'redux-saga/effects';
import loginSaga from './pages/login/login.saga';
import accountSaga from './pages/account/account.saga';

export function* rootSaga() {
  // yield all[
  //     takeEvery(loginSaga), // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
  //     fork(accountSaga),
  // ];

  yield spawn(loginSaga);
  yield spawn(accountSaga);
}
