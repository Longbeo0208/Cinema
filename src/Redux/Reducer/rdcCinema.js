import actCinema from "../Action/actCinema";

const initialState = {
    lsMovie: [],
    lsTheater: [],
    lsTitle: [],
    rate: "",
    day: ""
}

const rdcCinema = (state = initialState, { type, payload }) => {
    switch (type) {
        case actCinema.SET_MOVIE:

            return {
                ...state,
                lsMovie: payload,
            }

        case actCinema.SET_SELECTION_CINEMA: {

            return {
                ...state,
                lsTheater: payload,
            }
        }

        case actCinema.SET_SELECTION_THEATER: {

            return {
                ...state,
                lsTitle: payload,
            }
        }

        case actCinema.SET_SELECTION_RATE: {
            let temp = state.lsTheater.find(element => {
                return element.id === payload
            })

            return {
                ...state,
                rate: temp
            }
        }

        case actCinema.SET_SELCTION_DAY: {
            let temp = state.lsTitle.find(element => {
                return element.id === payload
            })

            return {
                ...state,
                day: temp
            }
        }

        default:
            return state;
    }
}

export default rdcCinema