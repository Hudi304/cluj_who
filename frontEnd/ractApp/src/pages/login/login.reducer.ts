

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from "./login.types"

interface Action{
    type:string,
    payload:{use:User}
}

const defaultState={
    isLogged : false,
    account:{
        email:"",
        password:""
    }
}

export const LoginReducer = (state = defaultState, action:Action)=>{
        switch (action.type){
            case "LOGIN":
                return {...state, isLogged: true,account : action.payload}
            case "LOGOUT":
                return {...state, isLogged:false}
            default:
                return state
        }
}









// interface Actions {
//     type: string;
//     payload: any;
// }

// const loginDefaultState = {
//     count: 0,
//     movieList: []
// };

// export function LoginReducer (state = loginDefaultState, action: Actions){
//     switch (action.type) {
//         case 'INCREMENT':
//             console.log(state.count)
//             return { ...state, count: state.count + action.payload }
//         case 'DECREMENT':
//             return { ...state, count: state.count - action.payload }
//         case 'GET_MOVIE_LIST':
//             return { ...state, movieList: action.payload }
//         case 'LOGIN':
//             return { ...state, movieList: action.payload }
//         default:
//             return state;
//   }
// }
