import React, { useEffect } from 'react'
import './History.scss'
import { connect } from 'react-redux'
import actHistory from '../../Redux/Action/actHistory'

function History(props) {

    const email = localStorage.getItem("Email")

    useEffect(() => {
        props.History(email)
        sessionStorage.clear()
    }, [email])

    return (
        <div className='History'>

            <div className='container'>
                <div className='InfoTicket'>
                    <h1>THÔNG TIN ĐẶT VÉ</h1>
                    <div className='historyTicket'>
                        <div className='historyContent'>
                            <table border={1} style={{ borderCollapse: "collapse" }} className='lsInfo'>
                                <thead>
                                    <tr>
                                        <th>Ngày / Giờ</th>
                                        <th>Số Giao Dịch</th>
                                        <th>Mã Vé</th>
                                        <th>Rạp</th>
                                        <th>Phim</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.historyState.lsHistory.map((v, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{new Date(v.ShowTime).toLocaleString()}</td>
                                                    <td>{v.ShowCode}</td>
                                                    <td>{v.Id}</td>
                                                    <td>{v.CinemaName}</td>
                                                    <td>{v.FilmName}</td>
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

        </div>
    )
}

const mapStateToProps = (globalState) => {
    return {
        historyState: globalState.historyManage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        History: (email) => {
            dispatch({
                type: actHistory.GET_HISTORY,
                payload: email
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)


