import actCombo from "../Action/actCombo";

const initialState = {
    lsCombo: []

}


const rdcCombo = (state = initialState, { type, payload }) => {
    switch (type) {
        case actCombo.SET_COMBO:

            return {
                ...state,
                lsCombo: payload
            }

        default:
            return state;
    }
}

export default rdcCombo