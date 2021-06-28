import { LoginData, User } from "./login.types"



export const login = (user:LoginData, history:History) =>{
    return{
        type:"LOGIN",
        payload:{account: user,
                history: history}
    }
}


// export function decrement() {
//     return {
//         type: "DECREMENT",
//         payload: 2
//     }
//   }
  
// export function increment() {
//     return {
//         type: "INCREMENT",
//         payload: 1
//     }
// }
  
// export function getMovieList(){
//     return {
//         type: "GET_MOVIE_LIST",
//         payload: 1
//     }
// }

// export function login(loginDataArg : LoginData){
//     return {
//       type: ACTIONS.LOGIN,
//       payload:{ loginData : loginDataArg}
//     }
// }



  
