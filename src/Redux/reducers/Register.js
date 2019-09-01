const initialState ={
    Register: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

const Register = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER_PENDING':
            return{
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
            case 'REGISTER_USER_REJECTED':
                return{
                    ...state,
                    isLoading: false,
                    isRejected: true,
                    error: action.payload.data
                }
                case 'REGISTER_USER_FULFILLED':
                    console.log('ini console', action.payload.data)
                    // localStorage.setItem('token', 'bearer '+ action.payload.data.result.token )
                    // localStorage.setItem('id', action.payload.data.result.id_ktp)
                    // localStorage.setItem('level', action.payload.data.result.level_user)
                    return{
                        ...state,
                        isLoading: false,
                        isFulfilled: true,
                        Register: action.payload.data,
                        

                    }
        default:
            return state
    }
}

export default Register