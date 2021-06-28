import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ACTIONS } from './account.types';

export function fetchMovies() {
  console.log('fetchMovies');
  return fetch('https://ghibliapi.herokuapp.com/films')
    .then(response => response.json())
    .then(data => data);
}

export function* getMoviesFC() {
  console.log('getMoviesFC');
  yield takeEvery(ACTIONS.GET_MOVIE_LIST, getMovieList);
}

export function* getMovieList(): any {
  const response = yield call(fetchMovies);
  console.log('getMovieList response :', response);
  yield put({
    type: ACTIONS.GET_MOVIE_LIST,
    payload: response
  });
}

export default function* accountSaga() {
  yield all([getMovieList()]);
}
