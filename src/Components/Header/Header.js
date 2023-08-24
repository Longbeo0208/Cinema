import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import Home from "../Home/Home";
import { connect } from "react-redux";
import actUser from "../../Redux/Action/actUser";
import { useEffect } from "react";
// import { type } from "@testing-library/user-event/dist/type";

function Header(props) {

    const nav = useNavigate()
    const email = localStorage.getItem("Email")

    useEffect(() => {
        props.User()
    }, [email])

    const Logout = () => {
        localStorage.clear()
        nav("/")

    }

    const Login = () => {
        nav("/login")
    }

    const userName = props.userState.lsUser.find(n => n.Email === email)

    return (
        <div className="Header">

            <div className="header">
                <div className="container">
                    <div className="header-content">
                        <Link to="/" component={<Home />}><img src="https://www.galaxycine.vn/website/images/galaxy-logo.png" alt="logo" /></Link>
                        <div className="header-input">
                            <input type="text" placeholder="Tìm tên phim, diễn viên" />
                        </div>
                        <div className="header-actions">
                            {
                                userName ? <button onClick={Logout}>Đăng Xuất</button> : <button onClick={Login}>Đăng Nhập</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <li><Link to="/movie">MUA VÉ</Link></li>
                <li className="bor-left"><Link>PHIM</Link></li>
                <li className="bor-left"><Link>GÓC ĐIỆN ẢNH</Link></li>
                <li className="bor-left"><Link>SỰ KIỆN</Link></li>
                <li className="bor-left"><Link>RẠP/GIÁ RẺ</Link></li>
                <li className="bor-left"><Link>HỖ TRỢ</Link></li>
                <li className="bor-left">
                    {userName ? <Link to="history">{userName.Name}</Link> : <Link to="history">Thành viên</Link>}
                </li>
            </div>

        </div>
    );
}

const mapStateToProps = (globalState) => {
    return {
        userState: globalState.userManage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        User: () => {
            dispatch({
                type: actUser.GET_USER
            })
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);