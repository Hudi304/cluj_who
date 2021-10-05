import { LoginData } from '../login/login.types'
import { ACTIONS, FormObj } from './account.types'

export const getMovieListAct = () => {
    return {
        type: ACTIONS.GET_MOVIE_LIST,
        payload: { pageSize: '30' }
    }
}

export const saveChanges = (formData: FormObj) => {
    return {
        type: 'SAVE_CHANGES',
        payload: formData
    }
}
