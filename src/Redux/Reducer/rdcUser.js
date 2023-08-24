import actUser from "../Action/actUser";



const initialState = {
    lsUser: [],

}

const rdcUser = (state = initialState, { type, payload }) => {
    switch (type) {
        case actUser.SET_USER:
            return {
                ...state,
                lsUser: payload
            }

        default:
            return state
    }
}

export default rdcUser