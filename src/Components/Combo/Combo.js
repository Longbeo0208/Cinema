import React, { useEffect, useState } from 'react'
import './Combo.scss'
import { connect } from 'react-redux'
import actCombo from '../../Redux/Action/actCombo'
import actCinema from '../../Redux/Action/actCinema'
import { useNavigate } from 'react-router-dom'

function Combo(props) {

    const ticket = JSON.parse(sessionStorage.getItem("Ticket"))
    const time = ticket.time
    const thu = ticket.day
    const day = ticket.date

    const [prices, SetPrices] = useState({})
    const [counts, setCounts] = useState({});
    const nav = useNavigate();

    const sumPrice = Object.keys(counts).reduce((p, n, index) => p + counts[n] * prices[n], 0)


    useEffect(() => {
        if (props.comboState.lsCombo.ticket) {
            props.comboState.lsCombo.ticket.forEach((n, i) => {
                SetPrices(pre => ({
                    ...pre,
                    [n.name]: n.displayPrice
                }))
            });

            props.comboState.lsCombo.consession[0].concessionItems.forEach((n, i) => {
                SetPrices(pre => ({
                    ...pre,
                    [n.description]: n.displayPrice
                }))
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.comboState.lsCombo.ticket])

    const Up = (name) => {

        setCounts(prevCounts => ({
            ...prevCounts,
            [name]: (prevCounts[name] || 0) + 1 //vị trí mình click giá trị được tăng 1 {0:1}
        }));
    };

    const Down = (name) => {
        if (counts[name] > 0) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [name]: (prevCounts[name] || 0) - 1
            }));
        }

    };

    //Combo 
    const Increment = (description) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [description]: (prevCounts[description] || 0) + 1 //vị trí mình click giá trị được tăng 1 {0:1}
        }));
    }

    const Decrement = (description) => {
        if (counts[description] > 0) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [description]: (prevCounts[description] || 0) - 1
            }));
        }
    };
    const TotalTicket = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    // Calculate the sum for index 2
    // const sumCouple = Object.keys(counts)
    //     .reduce((sum, key, index) => {
    //         if (index === 2) {
    //             return sum + counts[key];
    //         }
    //         return sum;
    //     }, 0)
    //     .toLocaleString();

    const limitedCounts = Object.keys(counts).filter(n => {
        return !n.startsWith('i')
    })
    const sumSingle = limitedCounts.filter(n => {
        return !n.startsWith('G')
    }).reduce((sum, key) => sum + counts[key], 0).toLocaleString()
    const sumLimited = limitedCounts.reduce((sum, key) => sum + counts[key], 0).toLocaleString();



    const HandNext = (sumSingle, sumLimited, sumPrice) => {
        if (Object.values(counts).length === 0) {
            alert("Vui lòng chọn vé");
        } else {
            const firstThreeTypes = Object.keys(counts).slice(0, 3);
            const ticketCount1 = firstThreeTypes.reduce((total, type) => {
                return total + counts[type];
            }, 0); // tính giá trị của ticketCount1 ở đây

            if (ticketCount1 < 0 || ticketCount1 > 8) {
                alert("Vui lòng chỉ được chọn 8 vé");
            } else {
                const ticketCount = {
                    ...ticket,
                    singleSeat: sumSingle,
                    sumTicket: sumLimited,
                    sumPrices: sumPrice,
                    totalTicket: ticketCount1
                }
                sessionStorage.setItem("Ticket", JSON.stringify(ticketCount));
                nav('/bookchair', { state: { combo: counts } });
            }
        }
    }

    useEffect(() => {
        props.Combo()
        props.Ticket()
        // eslint-disable-next-line
    }, [])




    return (
        <div className='Combo'>

            <div className='container'>
                <div className='ComboTicket'>
                    <div className='ChooseTicket'>
                        <h3>CHỌN VÉ / THỨC ĂN</h3>

                        <table className='Ticket'>
                            <thead>
                                <tr>
                                    <th>Loại Vé</th>
                                    <th>Số Lượng</th>
                                    <th>Gía (VNĐ)</th>
                                    <th>Tổng (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.comboState.lsCombo.ticket?.map((v, i) => {

                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div>
                                                        <h2>{v.name}</h2>
                                                        <p>{v.description}</p>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div class="input-group plus-minus-input">
                                                        <div class="input-group-button">
                                                            <button onClick={() => { Down(v.name) }} type="button" class="button hollow circle" data-quantity="minus" data-field="quantity">
                                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>

                                                        <input
                                                            class="input-group-field"
                                                            value={counts[v.name] || 0} //giá trị số lượng vé của loại vé tương ứng
                                                            type='number'
                                                            onChange={(e) => {
                                                                const newValue = parseInt(e.target.value) || 0; //lấy giá trị mới của ô input thông qua e.target.value. Sử dụng parseInt để chuyển giá trị đó thành số nguyên
                                                                setCounts(prevCounts => ({
                                                                    ...prevCounts,
                                                                    [v.name]: newValue
                                                                })); //cập nhật giá trị của loại vé tương ứng bằng giá trị mới newValue.
                                                            }}
                                                        />
                                                        <div class="input-group-button">
                                                            <button onClick={() => { Up(v.name) }} type="button" class="button hollow circle" data-quantity="plus" data-field="quantity">
                                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{v.displayPrice.toLocaleString()}</td>
                                                <td>{TotalTicket((counts[v.name] || 0) * v.displayPrice).toLocaleString()} đ </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>

                        <table className='Ticket'>
                            <thead>
                                <tr>
                                    <th>Combo</th>
                                    <th>Số Lượng</th>
                                    <th>Gía (VNĐ)</th>
                                    <th>Tổng (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.comboState.lsCombo.consession?.map((v, i) => {

                                        return v.concessionItems.map((v1, i1) => {

                                            return (
                                                <tr key={i1}>
                                                    <td>
                                                        <div className='cbTicket'>
                                                            <img src={v1.imageUrl} width='100' alt='ing' />
                                                            <div className='cbTicketleft'>
                                                                <h5>{v1.description}</h5>
                                                                <p>{v1.extendedDescription}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div class="input-group plus-minus-input">
                                                            <div class="input-group-button">
                                                                <button type="button" onClick={() => { Decrement(v1.description) }} class="button hollow circle" data-quantity="minus" data-field="quantity">
                                                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                            <input
                                                                class="input-group-field"
                                                                value={counts[v1.description] || 0} //giá trị số lượng vé của loại vé tương ứng
                                                                type='number'
                                                                onChange={(e) => {
                                                                    const newValue = parseInt(e.target.value) || 0;//lấy giá trị mới của ô input thông qua e.target.value. Sử dụng parseInt để chuyển giá trị đó thành số nguyên
                                                                    setCounts(prevCounts => ({
                                                                        ...prevCounts,
                                                                        [v1.description]: newValue
                                                                    })); //cập nhật giá trị của loại vé tương ứng bằng giá trị mới newValue.
                                                                }}
                                                            />
                                                            <div class="input-group-button">
                                                                <button type="button" onClick={() => { Increment(v1.description) }} class="button hollow circle" data-quantity="plus" data-field="quantity">
                                                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>{v1.displayPrice.toLocaleString()}</td>
                                                    <td>{TotalTicket((counts[v1.description] || 0) * v1.displayPrice).toLocaleString()} đ </td>

                                                </tr>
                                            )
                                        })

                                    })
                                }
                            </tbody>

                        </table>
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

                                <p><span>Vé :</span>
                                    {
                                        props.comboState.lsCombo.ticket?.map((v, i) => {
                                            const QTticket = counts[v.name] || 0
                                            if (QTticket > 0) {
                                                return (
                                                    <div key={["v" + i]}>
                                                        {QTticket} x {v.name}
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })
                                    }
                                </p>
                                <p><span>Combo : </span>
                                    {
                                        props.comboState.lsCombo.consession?.map((v, i) => {
                                            return v.concessionItems.map((v1, i1) => {
                                                const QTcombo = counts[v1.description] || 0
                                                if (QTcombo > 0) {
                                                    return (
                                                        <div key={["c" + i1]}>
                                                            {QTcombo} x {v1.description}
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })
                                        })
                                    }

                                </p>
                                <p><span>Ghế : </span> </p>
                                <h1>Tổng : <span>
                                    {
                                        Object.keys(counts).reduce((p, n, index) => {
                                            return p + counts[n] * prices[n]
                                        }, 0).toLocaleString()
                                    } VNĐ</span></h1>

                                <div className='btnNext'>
                                    <button onClick={() => { HandNext(sumSingle, sumLimited, sumPrice) }}>Tiếp Tục</button>
                                </div>
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
        comboState: globalState.comboManage,
        cinemaState: globalState.cinemaManage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Combo: () => {
            dispatch({
                type: actCombo.GET_COMBO
            })
        },
        Ticket: () => {
            dispatch({
                type: actCinema.GET_MOVIE
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Combo)
