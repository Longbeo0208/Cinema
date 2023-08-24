import { call, put, takeEvery } from 'redux-saga/effects'
import actCinema from '../Action/actCinema'
import actCombo from '../Action/actCombo';
import actSeat from '../Action/actSeat';
import actBank from '../Action/actBank';
import actUser from '../Action/actUser';
import actHistory from '../Action/actHistory';
import actHome from '../Action/actHome';




async function MovieID(id) {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/movie/${id}`)

    let data = await res.json();

    return data
}

function* TheaterID({ type, payload }) {

    let data = yield call(MovieID, payload)

    yield put({
        type: actCinema.SET_SELECTION_CINEMA,
        payload: data
    })

}

async function CinemaID(id) {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/cinemas/${id}`)

    let data = await res.json();

    return data
}

function* Theater({ type, payload }) {

    let data = yield call(CinemaID, payload)

    yield put({
        type: actCinema.SET_SELECTION_THEATER,
        payload: data
    })

}

async function ComboID() {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/booking/detail")

    let data = await res.json();


    return data
}

function* Combo(params) {

    let data = yield call(ComboID)

    yield put({
        type: actCombo.SET_COMBO,
        payload: data
    })

}

function* Seat(params) {

    let data = yield call(ComboID)

    yield put({
        type: actSeat.SET_SEAT,
        payload: data
    })

}

async function MovieAPI() {

    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/booking")

    let data = await res.json();

    return data

}

function* GetMovie() {

    let data = yield call(MovieAPI)

    yield put({
        type: actCinema.SET_MOVIE,
        payload: data
    })

}

async function BankAPI() {

    let res = await fetch("https://teachingserver.org/U2FsdGVkX1883sCL7DKVAzDmqMVns8wjDnnVDiJ+8QOGVlVOd0FC7A==/Bank/Bank")

    let data = await res.json();

    return data

}


function* Bank(params) {

    let data = yield call(BankAPI)

    yield put({
        type: actBank.SET_BANK,
        payload: data
    })

}


async function UserAPI() {

    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user")

    let data = await res.json();

    return data

}

function* User(params) {

    let data = yield call(UserAPI)

    yield put({
        type: actUser.SET_USER,
        payload: data
    })

}

async function HistoryAPI(email) {


    console.log(email);
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/TicketByEmail/${email}`)

    let data = await res.json();

    return data;


}

function* History({ type, payload }) {

    let data = yield call(HistoryAPI, payload)

    yield put({
        type: actHistory.SET_HISTORY,
        payload: data
    })

}


async function SelectionSeatAPI(showCode1) {

    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/TicketByShowCode/${showCode1}`)

    let data = await res.json();

    return data;


}

function* SelectionSeat({ type, payload }) {

    let data = yield call(SelectionSeatAPI, payload)

    yield put({
        type: actSeat.SET_SOLD_SEAT,
        payload: data
    })

}

async function HomeAPI() {

    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/nowAndSoon")

    let data = await res.json();

    return data;


}

function* Home({ type, payload }) {

    let data = yield call(HomeAPI, payload)

    yield put({
        type: actHome.SET_HOME,
        payload: data
    })

}

async function MovieDetailAPI(movieDetail) {


    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/movieById/${movieDetail}`)

    let data = await res.json();

    return data;


}

function* MovieDetail({ type, payload }) {

    let data = yield call(MovieDetailAPI, payload)

    yield put({
        type: actHome.SET_MOVIEDETAIL,
        payload: data
    })

}


function* mySaga() {
    yield takeEvery(actCinema.GET_MOVIE, GetMovie)
    yield takeEvery(actCinema.GET_SELECTION_CINEMA, TheaterID)
    yield takeEvery(actCinema.GET_SELECTION_THEATER, Theater)
    yield takeEvery(actCombo.GET_COMBO, Combo)
    yield takeEvery(actSeat.GET_SEAT, Seat)
    yield takeEvery(actSeat.GET_SOLD_SEAT, SelectionSeat)
    yield takeEvery(actBank.GET_BANK, Bank)
    yield takeEvery(actUser.GET_USER, User)
    yield takeEvery(actHistory.GET_HISTORY, History)
    yield takeEvery(actHome.GET_HOME, Home)
    yield takeEvery(actHome.GET_MOVIEDETAIL, MovieDetail)

}

export default mySaga