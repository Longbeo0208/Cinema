import actDetail from "../Action/actDetail";


const initialState = {

    lsMovieDetail: []

}

const rdcDetail = (state = initialState, { type, payload }) => {
    switch (type) {
        case actDetail.SET_MOVIEDETAIL:

            return {
                ...state,
                lsMovieDetail: payload,
            }


        default:
            return state
    }
}
export default rdcDetail