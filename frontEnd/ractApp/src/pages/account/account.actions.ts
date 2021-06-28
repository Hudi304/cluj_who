import { LoginData } from "../login/login.types"
import { ACTIONS } from "./account.types"

export const increment = (counter:number) => {
  return {
    type: "INCREMENT",
    payload:{count:counter}
  }
}

export const decrement = (counter:number) => {
  return {
    type: "DECREMENT",
    payload:{count:counter}
  }
}

export const getMovieListAct = () => {
  return {
    type: ACTIONS.GET_MOVIE_LIST,
    payload:{ pageSize: "30"}
  }
}

