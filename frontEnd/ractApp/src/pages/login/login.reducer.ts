interface Actions {
    type: string;
    payload: number;
}

const loginDefaultState = {
    count: 0,
    movieList: []
};

export const LoginReducer = (state = loginDefaultState, action: any) => {
    switch (action.type) {
        case 'INCREMENT':
            // console.log(state.count)
            return { ...state, count: state.count + action.payload };
        case 'DECREMENT':
            return { ...state, count: state.count - action.payload };
        case 'GET_MOVIE_LIST':
            return { ...state, movieList: action.payload };
        default:
            return state;
  }
};
