import { all, call, put, takeEvery } from 'redux-saga/effects';

// function fetchMovies() {
//     return fetch('https://ghibliapi.herokuapp.com/films')
//         .then(response => response.json())
//         .then(data => data)
// }

// export function* incrementFC() {
//     yield takeEvery('INCREMENT', incrementAsync)
//     yield takeEvery('GET_MOVIE_LIST', setMovieList)
// }

// // Our worker Saga: will perform the async increment task

// export function* incrementAsync() {
//     yield put({
//         type: 'INCREMENT',
//         payload: {
//             count: 20
//         }
//     })
// }

// export function* setMovieList(): any {
//     const movies = yield call(fetchMovies)

//     yield put({
//         type: 'GET_MOVIE_LIST',
//         payload: movies
//     })
// }

// export default function* rootSaga() {
//     yield all([incrementAsync(), setMovieList()])
// }
