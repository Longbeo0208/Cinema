
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    localStorage.setItem("Email", email)

    const [emailErr, setEmailErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const nav = useNavigate()

    const handleLogin = () => {

        const re = /^[a-z][\w-\.]*@([a-z0-9-]+\.)+[a-z-]{2,4}$/;
        if (re.test(email) === false) {
            setEmailErr("Email không hợp lệ")
            return
        } else {
            setEmailErr("")
            if (password.length < 8) {
                setPasswordErr("Password trên 8 kí tự")
                return
            }
        }
        const requesLogin = {
            Email: email,
            Password: password
        }

        fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/Login", {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(requesLogin)
        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem("Email", email)
                const Ticket = sessionStorage.getItem("Ticket")
                if (!Ticket) {
                    alert("Đăng nhập thành công")
                    nav("/")
                }
                else {
                    nav("/combo")
                }
            }
            else {
                alert("Đăng nhập không thành công")
            }
        })
    }

    return (
        <div className="Login">
            <div className="login">
                <div className="login-content">
                    <h1>ĐĂNG NHẬP</h1>
                    <p>Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận thêm nhiều ưu đãi từ chương trình thành viên Cinema.</p>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    {emailErr && <p className="error" id="EmailError">{emailErr}</p>}
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordErr && <p className="error" id="EmailError">{passwordErr}</p>}
                    <p><Link>Quên mật khẩu?</Link></p>
                    <button onClick={handleLogin}>Đăng nhập</button>

                    <Link to="/register">ĐĂNG KÝ</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

