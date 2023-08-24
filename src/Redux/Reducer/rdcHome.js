import actHome from "../Action/actHome";


const initialState = {
    lsHome: [],
    lsMovieDetail: []

}

const rdcHome = (state = initialState, { type, payload }) => {
    switch (type) {
        case actHome.SET_HOME:

            return {
                ...state,
                lsHome: payload,
            }

        case actHome.SET_MOVIEDETAIL:

            return {
                ...state,
                lsMovieDetail: payload,
            }

        default:
            return state
    }
}
export default rdcHome