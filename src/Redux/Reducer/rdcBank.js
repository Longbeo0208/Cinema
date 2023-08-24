import actBank from "../Action/actBank";


const initialState = {
    lsBank: [],
    bank: "",
    lsBankId: []
}

const rdcBank = (state = initialState, { type, payload }) => {
    switch (type) {
        case actBank.SET_BANK:

            return {
                ...state,
                lsBank: payload,
            }

        case actBank.SET_SELECT_BANK: {
            let temp = state.lsBank.find(element => {
                return element.id === payload
            })

            return {
                ...state,
                bank: temp
            }
        }



        default:
            return state
    }

}

export default rdcBank