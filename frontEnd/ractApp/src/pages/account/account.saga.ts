import { all, call, put, takeEvery,take, takeLatest } from 'redux-saga/effects';
import { ACTIONS } from './account.types';

export function fetchMovies() {
  console.log('fetchMovies');
  return fetch('https://ghibliapi.herokuapp.com/films')
    .then(response => response.json())
    .then(data => data);
}


export function getMoviesFC(payload: any) : void{
  const response = fetch('https://ghibliapi.herokuapp.com/films')
    .then(response => {
      console.log("response.json()",response.json())
      return response
    })
    .then(data => {
      console.log("data",data)
      return data
    });
  console.log("response", response)
}


export function* sagaGenerators() {
  const { payload } = yield take(ACTIONS.GET_MOVIE_LIST);
  yield call(getMoviesFC, payload);
}

export default function* accountSaga() {
  yield all([sagaGenerators()]);
}

// export function* getMovieList(): any {
//   const response = yield call(fetchMovies);
//   console.log('getMovieList response :', response);
//   yield put({
//     type: ACTIONS.GET_MOVIE_LIST,
//     payload: response
//   });
// }


// export function* getMoviesFC() {
//   console.log('getMoviesFC');
//   yield takeEvery(ACTIONS.GET_MOVIE_LIST, getMovieList);
// }