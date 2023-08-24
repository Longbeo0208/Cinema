import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import actCinema from '../../Redux/Action/actCinema'
import './Theater.scss'
import { useNavigate } from 'react-router-dom'


function Theater(props) {
    useEffect(() => {
        props.Cinema()
        // eslint-disable-next-line
    }, [])

    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const nav = useNavigate();

    const HandleClick = (id, nameTheater) => {

        const HandleTheater = {
            nameTheater: nameTheater

        }

        sessionStorage.setItem("Ticket", JSON.stringify(HandleTheater))

        props.Movie(id);
        setSelectedMovieId(id);


    }

    const ticket = JSON.parse(sessionStorage.getItem("Ticket"))

    const HandleClickRate = (idDay, imageLandscape, name, subName, imagePortrait) => {


        props.Day(idDay);

        const HandleTicket = {
            ...ticket,
            idMovie: idDay,
            imgMovie: imageLandscape,
            nameMovie: name,
            subMovie: subName,
            ImagePortrait: imagePortrait
        }
        sessionStorage.setItem("Ticket", JSON.stringify(HandleTicket))
    }

    const HandClickTicket = (dayOfWeekLabel, showDate, showTime, id, screenName) => {



        const HandleRate = {
            ...ticket,
            day: dayOfWeekLabel,
            date: showDate,
            time: showTime,
            showCode: id,
            TheaterName: screenName
        }

        sessionStorage.setItem("Ticket", JSON.stringify(HandleRate))


        nav('/combo')
    }

    const HandClickMovie = () => {
        nav('/movie')
    }

    const HandClickTheater = () => {
        nav('/theater')
    }


    const lsMovieNow = props.cinemaState.lsMovie.cinemas

    return (
        <div className='Theater'>

            <div className='container'>

                <div className="Navbar">
                    <button onClick={() => { HandClickMovie() }} className='btnClick'>Theo Phim</button>
                    <button onClick={() => { HandClickTheater() }} className='btnClick'>Theo Rạp</button>
                </div>

                <div className='TheaterCinema'>

                    <div className='LsCinema'>
                        <table className='lstheater' border={1} style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className='movieContent'>Chọn Rạp</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    lsMovieNow?.map((v, i) => {
                                        let id = v.code

                                        return (
                                            <tr key={i}>
                                                {
                                                    <td className='Theater' style={{ backgroundColor: `${id === selectedMovieId ? "rgb(210, 207, 207)" : ""}` }} onClick={() => HandleClick(id, v.name)}>
                                                        <div className='titleMovie'>
                                                            <h3>{v.name}</h3>
                                                        </div>
                                                    </td>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='LsCinema'>
                        <table className='lsmovie' border={1} style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className='movieContent'>Chọn Phim</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    props.cinemaState.lsTitle.map((v, i) => {


                                        let id = v.id
                                        return (
                                            <tr key={i}>
                                                {

                                                    <td className='boxMovie' style={{ backgroundColor: `${id === props.cinemaState.day.id ? "rgb(210, 207, 207)" : ""}` }} onClick={() => HandleClickRate(id, v.imageLandscape, v.name, v.subName, v.imagePortrait)}>
                                                        <img src={v.imageLandscape} width="200px" alt='img' />
                                                        <div className='titleMovie'>
                                                            <h3>{v.name}</h3>
                                                        </div>
                                                    </td>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='LsCinema'>
                        <table className='lsrate' border={1} style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className='movieContent'>Chọn Suất</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    props.cinemaState.day.dates?.map((v, i) => {
                                        let sub = v.bundles.find(v => v.caption === "sub")
                                        let longtieng = v.bundles.find(v => v.caption === "voice")

                                        return (
                                            <tr key={i} >
                                                <td className='Rate'>
                                                    <p className='Rateday'>{v.dayOfWeekLabel} , {v.showDate}</p>
                                                    <div className='showtimes'>
                                                        <p className='Sub'>{longtieng?.version ? "2D" : ""}  {longtieng?.caption ? " - L.Tiếng" : ""}</p>
                                                        <div className='time'>
                                                            {longtieng?.sessions.map((n3, i3) => {
                                                                return <button onClick={() => { HandClickTicket(v.dayOfWeekLabel, v.showDate, n3.showTime, n3.id, n3.screenName) }} className='btnTime' key={i3}>{n3.showTime}</button>
                                                            })}
                                                        </div>
                                                    </div>

                                                    <div className='showtimes'>
                                                        <p className='Sub'>{sub?.version ? "2D" : ""}  {sub?.caption ? " - Phụ đề" : ""}</p>
                                                        <div className='time'>
                                                            {sub?.sessions.map((n3, i3) => {

                                                                return <button onClick={() => { HandClickTicket(v.dayOfWeekLabel, v.showDate, n3.showTime, n3.id, n3.screenName) }} className='btnTime' key={i3}>{n3.showTime}</button>

                                                            })}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (globalState) => {
    return {
        cinemaState: globalState.cinemaManage
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        Cinema: () => {
            dispatch({
                type: actCinema.GET_MOVIE
            })
        },
        Movie: (id) => {
            dispatch({
                type: actCinema.GET_SELECTION_THEATER,
                payload: id
            })
        },
        Day: (idDay) => {
            dispatch({
                type: actCinema.SET_SELCTION_DAY,
                payload: idDay
            })

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theater)
