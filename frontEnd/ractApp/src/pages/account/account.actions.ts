import { LoginData } from "../login/login.types"
import { ACTIONS } from "./account.types"


export const getMovieListAct = () => {
  return {
    type: ACTIONS.GET_MOVIE_LIST,
    payload:{ pageSize: "30"}
  }
}

