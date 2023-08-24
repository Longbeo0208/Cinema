import actSeat from "../Action/actSeat";


const initialState = {
    lsSeat: [],
    lsSingle: [],
    lsDouble: [],
    lsSoldSeat: []
}

const rdcSeat = (state = initialState, { type, payload }) => {
    switch (type) {
        case actSeat.SET_SEAT:

            return {
                ...state,
                lsSeat: payload,
                lsSingle: payload.seatPlan.seatLayoutData.areas[0],
                lsDouble: payload.seatPlan.seatLayoutData.areas[1]
            }

        case actSeat.SET_SOLD_SEAT:
            return {
                ...state,
                lsSoldSeat: payload
            }

        default:
            return state
    }
}

export default rdcSeat