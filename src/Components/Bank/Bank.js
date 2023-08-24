import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import actBank from '../../Redux/Action/actBank'
import './Bank.scss'
import { useNavigate } from 'react-router-dom'


const formatShowtime = (showtimeString, dayOfWeekString) => {
    const [day, month, year] = dayOfWeekString.split('/').map(Number);
    const [hours, minutes] = showtimeString.split(':').map(Number);
    const showtimeDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const formattedShowtime = showtimeDate.toISOString();
    // State to track the success status

    return formattedShowtime;
}

function Bank(props) {


    const ticket = JSON.parse(sessionStorage.getItem("Ticket"))
    const time = ticket.time
    const thu = ticket.day
    const day = ticket.date

    const [selectedBankId, setSelectedBankId] = useState(null);

    const [seatSelect, setSeatSelect] = useState("");

    const email = localStorage.getItem("Email")

    const combo = JSON.parse(sessionStorage.getItem("Combo"))
    const nav = useNavigate()

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [cvv, setCVV] = useState('');

    const [cardNumberErr, setCardNumberErr] = useState("")
    const [cardNameErr, setCardNameErr] = useState("")
    const [expireDateErr, setExpireDateErr] = useState("")
    const [cvvErr, setCVVErr] = useState("")


    const handlePayment = (selectedBankId, cardNumber, cardName, expireDate, cvv) => {
        const text = /^[\p{L}\s]+$/u;
        if (cardNumber.length < 16) {
            setCardNumberErr("Card Number phải đủ 16 chữ số")
            return
        } else {
            setCardNumberErr("")
            if (text.test(cardName) === false) {
                setCardNameErr("Card Name không hợp lệ")
                return
            } else {
                setCardNameErr("")
                if (expireDate.length < 4) {
                    setExpireDateErr("Nhập đúng hạn trên thẻ ngân hàng")
                    return
                } else {
                    setExpireDateErr("")
                    if (cvv.length < 3) {
                        setCVVErr("Nhập đúng mã bảo mật ngân hàng")
                        return
                    }
                }
            }
        }

        const combo1 = sessionStorage.getItem("Combo")
        const comboObject = JSON.parse(combo1);


        const formattedCombo = Object.keys(comboObject)
            .map(key => `${key}: ${comboObject[key]}`)
            .join(', ');

        const showTime = formatShowtime(ticket.time, ticket.date);

        const paymentInfo = {
            BankId: selectedBankId,
            CardNumber: cardNumber,
            CardName: cardName,
            ExpireDate: expireDate,
            CVV: cvv,
            Price: ticket.sumPrices,
            ShowCode: ticket.showCode,
            Email: email,
            CinemaName: ticket.nameTheater,
            TheaterName: ticket.TheaterName,
            FilmName: ticket.nameMovie,
            ImageLandscape: ticket.imgMovie,
            ImagePortrait: ticket.ImagePortrait,
            Combo: formattedCombo,
            SeatCode: seatSelect,
            ShowTime: showTime
        };

        const payment = {
            ...paymentInfo
        }

        sessionStorage.setItem('Payment', JSON.stringify(paymentInfo))

        fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/Ticket", {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',

            },
            method: "POST",
            body: JSON.stringify(payment)
        }).then(res => {
            if (res.status === 200) {
                alert("Thanh toán thành công ")
                nav('/history')
            } else {
                alert('Thanh toán không thành công vui lòng kiểm tra lại thông tin bank');
            }
        })
        // Sau khi lưu dữ liệu vào sessionStorage, bạn có thể thực hiện các xử lý khác ở đây (ví dụ: chuyển hướng, gửi dữ liệu lên server, ...)
    };

    useEffect(() => {
        props.Bank()
        const selectedSeats = sessionStorage.getItem("SelectedSeats");
        // eslint-disable-next-line
        if (selectedSeats) {
            const selectedSeatsArray = JSON.parse(selectedSeats);
            if (Array.isArray(selectedSeatsArray)) {
                setSeatSelect(selectedSeatsArray.join(', '));
            } else {
                setSeatSelect("No seats selected");
            }
        } else {
            setSeatSelect("No seats selected");
        }
    }, [])

    const HandleClick = (idBank) => {
        setSelectedBankId(idBank);
        props.SelectBank(idBank)

    }


    return (
        <div className='Bank'>
            <div className='container'>
                <div className='Payment'>
                    <div className='formBank'>
                        <h1>VUI LÒNG THANH TOÁN</h1>
                        <div className='BankLeft'>
                            <div className='BankSide'>
                                <input className='inputContent ' type="number" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                                {cardNumberErr && <p className="error" id="CardNumberError">{cardNumberErr}</p>}<br />
                                <input className='inputContent' type="CardName" placeholder="Card Name" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                                {cardNameErr && <p className="error" id="CardNameError">{cardNameErr}</p>}<br />
                                <input className='inputContent ' type="ExpireDate" placeholder="Expire Date" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                                {expireDateErr && <p className="error" id="ExpireDateError">{expireDateErr}</p>}<br />
                                <input className='inputContent ' type="password" placeholder="CVV" value={cvv} onChange={(e) => setCVV(e.target.value)} />
                                {cvvErr && <p className="error" id="CVVError">{cvvErr}</p>}
                                <div className='bankContent'>
                                    {
                                        props.bankState.lsBank.map((v, i) => {
                                            let id = v.Id
                                            return (

                                                <div key={i} className='bankTitle'>
                                                    <input type="radio" checked={selectedBankId === id} onClick={() => HandleClick(id)} />
                                                    <img src={v.Logo} width='30' alt='img' />
                                                    <span>{v.Name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button className='btnPayment' onClick={() => handlePayment(selectedBankId, cardNumber, cardName, expireDate, cvv)}>Thanh Toán</button>
                            </div>
                        </div>
                    </div>
                    <div className='Booking'>
                        <div div className='lsBooking'>
                            <div className='img'>
                                <img src={ticket.imgMovie} alt='img' />
                            </div>
                            <div className='contentMovie'>
                                <h3>{ticket.nameMovie}</h3>
                                <p className='subName'>{ticket.subMovie}</p>
                                <p><span>Rạp : </span>  {ticket.nameTheater} | {ticket.TheaterName}</p>
                                <p><span>Suất Chiếu :</span> {time} | {thu}, {day}</p>
                                <p><span>Combo : </span>{Object.keys(combo).filter(n => {
                                    return n.startsWith('i')
                                }).map(k => {
                                    return <span1>{combo[k]}x {k} ,</span1>
                                })}</p>
                                <p><span>Ghế : </span>{seatSelect}</p>
                                <h1>Tổng : <span>{ticket.sumPrices.toLocaleString()} VNĐ</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (globalState) => {
    return {
        bankState: globalState.bankManage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Bank: () => {
            dispatch({
                type: actBank.GET_BANK
            })
        },
        SelectBank: (idBank) => {
            dispatch({
                type: actBank.SET_SELECT_BANK,
                payload: idBank
            })

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bank)


