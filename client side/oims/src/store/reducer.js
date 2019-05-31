

const initialState = {
    isAuthenticated: false,
    offender: null
}
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case "ON_AUTHENTICATED":
            return {
                ...state,
                isAuthenticated: action.token != null ? true : false
            }
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false
            }
        case "GET_USER_INFO":
            return {
                ...state,
                offender: action.value

            }
    }
    return state
}


export default reducer