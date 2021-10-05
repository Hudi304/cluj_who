
export const login = (user: any, history: History) => {
    return {
        type: 'LOGIN',
        payload: { account: user, history: history }
    }
}
