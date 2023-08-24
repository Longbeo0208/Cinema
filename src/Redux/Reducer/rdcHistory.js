import actHistory from "../Action/actHistory";

const initialState = {
    lsHistory: []
}

const rdcHistory = (state = initialState, { type, payload }) => {
    switch (type) {
        case actHistory.SET_HISTORY:

            return {
                ...state,
                lsHistory: payload
            }
        default:
            return state
    }
}

export default rdcHistory