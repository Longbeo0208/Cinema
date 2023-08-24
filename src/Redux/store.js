import { applyMiddleware, combineReducers, createStore } from "redux";
import rdcCinema from "./Reducer/rdcCinema";
import saga from "redux-saga" //Saga
import middleResa from "./Saga/middleResa" //saga
import rdcCombo from "./Reducer/rdcCombo";
import rdcSeat from "./Reducer/rdcSeat";
import rdcBank from "./Reducer/rdcBank";
import rdcUser from "./Reducer/rdcUser";
import rdcHistory from "./Reducer/rdcHistory";
import rdcHome from "./Reducer/rdcHome";
import rdcDetail from "./Reducer/rdcDetail";

const middle = saga(); //Saga

const globalState = combineReducers({
    cinemaManage: rdcCinema,
    comboManage: rdcCombo,
    seatManage: rdcSeat,
    soldSeatManage: rdcSeat,
    bankManage: rdcBank,
    userManage: rdcUser,
    historyManage: rdcHistory,
    homeManage: rdcHome,
    movieDetailManage: rdcDetail,
})

const store = createStore(
    globalState,
    applyMiddleware(middle)

)

export default store

middle.run(middleResa)