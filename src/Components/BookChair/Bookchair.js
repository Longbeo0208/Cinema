
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import actSeat from '../../Redux/Action/actSeat'
import './Bookchair.scss'
import actCinema from '../../Redux/Action/actCinema'
import { useNavigate, useLocation } from 'react-router-dom'


function Bookchair(props) {

    const ticket = JSON.parse(sessionStorage.getItem("Ticket"))
    // const countSeat = JSON.parse(sessionStorage.getItem("SelectedSeats"))


    let showCode1 = ticket.showCode

    const time = ticket.time
    const thu = ticket.day
    const day = ticket.date
    const [combo, setCombo] = useState({})

    const location = useLocation()

    const nav = useNavigate();

    const [lsSeat, setLsSeat] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([]);

    const HandNext = () => {

        // const countTicket = ticket.singleSeat

        if (JSON.parse(sessionStorage.getItem("SelectedSeats")).length != Number(ticket.singleSeat) + Number((ticket.sumTicket - ticket.singleSeat)) * 2) {
            alert("Vui lòng đặt đúng số lượng vé")
        } else {
            sessionStorage.setItem('Combo', JSON.stringify(combo))

            nav('/bank')
        }


    }

    const HandSelect = (a, b, c) => {

        const seatCode = a + b;
        let coupleCode
        if (c) {
            coupleCode = a + c
        }
        const selectedSeats = sessionStorage.getItem("SelectedSeats");
        let updatedSeats = [];
        let listCoupleSeats = []
        let listSingleSeats = []
        if (selectedSeats) {

            updatedSeats = JSON.parse(selectedSeats);

            listCoupleSeats = updatedSeats.filter(o => {
                return o.startsWith('P')
            })
            listSingleSeats = updatedSeats.filter(p => {
                return !p.startsWith('P')
            })
            const seatIndex = updatedSeats.findIndex(seat => seat === seatCode);

            if (seatIndex !== -1) {
                // Ghế đã được chọn, xóa khỏi danh sách
                let arr = [...updatedSeats]
                if (coupleCode) {
                    updatedSeats = arr.filter(s => {

                        return s != seatCode && s != coupleCode
                    })
                } else {
                    updatedSeats.splice(seatIndex, 1);
                }
            } else {
                // Ghế chưa được chọn, thêm vào danh sách
                if (coupleCode && (listCoupleSeats.length / 2 < (ticket.sumTicket - ticket.singleSeat))) {
                    updatedSeats.push(seatCode, coupleCode);

                    listCoupleSeats.push(seatCode, coupleCode)
                } else if (!coupleCode && listSingleSeats.length < ticket.singleSeat) {

                    updatedSeats.push(seatCode)
                }
            }
        } else {
            // Danh sách chưa tồn tại, thêm ghế đầu tiên vào
            if (coupleCode && listCoupleSeats.length / 2 < (ticket.sumTicket - ticket.singleSeat)) {
                updatedSeats.push(seatCode, coupleCode);
                listCoupleSeats.push(seatCode, coupleCode)
            } else if (!coupleCode && listSingleSeats.length < ticket.singleSeat) {
                updatedSeats.push(seatCode)
            }

        }

        sessionStorage.setItem("SelectedSeats", JSON.stringify(updatedSeats));

        setSelectedSeats(updatedSeats);

    }

    useEffect(() => {
        props.Seat()
        props.Ticket()
        setCombo(location.state.combo)
        if (props.seatState.lsSingle != null) {
            setLsSeat([props.seatState.lsDouble, props.seatState.lsSingle])
        }

        props.SoldSeat(showCode1)

        // eslint-disable-next-line
    }, [props.seatState.lsSingle])



    const soal = props.soldState.lsSoldSeat.map((v, i) => {
        return v.SeatCode
    })



    return (
        <div className='Seat'>
            <div className='container'>

                <div className='SeatContent'>
                    <div className='seatLeft'>
                        <h1>Chọn Ghế : {selectedSeats.map((seat, index) => (
                            <span key={index}>{seat}, </span>
                        ))}</h1>
                        {
                            lsSeat.length > 0 && <div>
                                {
                                    lsSeat.map(ele => {
                                        return (
                                            <div>
                                                {Array(ele.height).fill(0).map((n, i) => {
                                                    if (ele && ele.rows && ele.rows[i]) {
                                                        let row = ele.rows[i]
                                                        return (
                                                            <div className='LsSEAT' key={i} >
                                                                <span style={{ width: "50px", visibility: row.seats.length === 0 ? 'hidden' : 'visible' }}>
                                                                    {row.physicalName}
                                                                </span>

                                                                {
                                                                    Array(ele.width).fill(0).map((m, i2) => {
                                                                        let bookedSeats = JSON.parse(sessionStorage.getItem('SelectedSeats'))
                                                                        let isShow = false;
                                                                        if (row.seats.length !== 0) {
                                                                            if (row.seats.filter(s => s.position.rowIndex === i && s.position.columnIndex === i2).length > 0) {
                                                                                isShow = true;
                                                                            }
                                                                        }

                                                                        return (
                                                                            <button
                                                                                className='btnSelect' key={i2} style={{
                                                                                    visibility: isShow ? 'visible' : 'hidden',
                                                                                    backgroundColor: `${bookedSeats && bookedSeats.some(seatGroup => seatGroup.split(', ').includes(row.physicalName + i2)) ? '#7DC71D' : (soal && soal.some(seatGroup => seatGroup.split(', ').includes(row.physicalName + i2)) ? '#E11C01' : '#DBDEE1')}`,
                                                                                }}
                                                                                disabled={soal && soal.some(seatGroup => seatGroup.split(', ').includes(row.physicalName + i2))}
                                                                                onClick={() => {
                                                                                    if (ele.description == 'Standard') {
                                                                                        HandSelect(row.physicalName, i2);
                                                                                    } else {
                                                                                        if (row.seats.filter(s => s.position.rowIndex === i && s.position.columnIndex === i2)[0]) {
                                                                                            let temp = row.seats.filter(s => s.position.rowIndex === i && s.position.columnIndex === i2)[0];
                                                                                            let index;
                                                                                            temp.seatsInGroup.forEach((k, ind) => {
                                                                                                if (k.columnIndex == i2) {
                                                                                                    index = ind;
                                                                                                }
                                                                                            });
                                                                                            if (index == 0) {
                                                                                                HandSelect(row.physicalName, i2, i2 + 1);
                                                                                            } else {
                                                                                                HandSelect(row.physicalName, i2 - 1, i2);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {row.physicalName}{i2}
                                                                            </button>

                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                })}

                                            </div>
                                        )
                                    })

                                }

                                <p className='title'>Màn Hình</p>
                                <div className='TV'>
                                    <span style={{ height: "5px", width: "50%", background: "#969b9f", fontSize: "10px" }}></span>
                                </div>
                                <div className='showTV'>
                                    <div>
                                        <span className='selectSeat'></span>
                                        <p className='seat'>Ghế đang chọn</p>
                                    </div>
                                    <div>
                                        <span className='selectSeat1'></span>
                                        <p className='seat'>Ghế đã bán</p>
                                    </div>
                                    <div>
                                        <span className='selectSeat2'></span>
                                        <p className='seat'>Ghế có thể chọn</p>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>

                    <div className='Booking'>
                        <div div className='lsBooking'>
                            <div className='img'>
                                <img src={ticket.imgMovie} alt='img' />

                            </div>
                            <div className='contentMovie'>
                                <h3>{ticket.nameMovie}</h3>
                                <p className='subName'>{ticket.subMovie}</p>
                                <p><span>Rạp : </span>  {ticket.nameTheater}</p>
                                <p><span>Suất Chiếu :</span> {time} | {thu}, {day}</p>
                                <p><span>Combo : </span>{Object.keys(combo).filter(n => {
                                    return n.startsWith('i')
                                }).map(k => {
                                    return <span1>{combo[k]}x {k} ,</span1>
                                })}</p>
                                <p><span>Ghế :</span> {selectedSeats.map((seat, index) => (
                                    <span1 key={index}>{seat} ,</span1>
                                ))}</p>
                                <h1>Tổng : <span>{ticket.sumPrices.toLocaleString()} VNĐ</span></h1>


                                <div className='btnNext'>

                                    <button onClick={() => { HandNext() }}>Tiếp Tục</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >


    )
}

const mapStateToProps = (globalState) => {
    return {

        seatState: globalState.seatManage,
        soldState: globalState.soldSeatManage,
        cinemaState: globalState.cinemaManage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Seat: () => {
            dispatch({
                type: actSeat.GET_SEAT
            })
        },
        SoldSeat: (showCode1) => {
            dispatch({
                type: actSeat.GET_SOLD_SEAT,
                payload: showCode1
            })
        },
        Ticket: () => {
            dispatch({
                type: actCinema.GET_MOVIE
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookchair)
