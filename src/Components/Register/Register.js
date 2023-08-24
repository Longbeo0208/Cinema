import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";

function Register() {
    const nav = useNavigate()

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [Role, setRole] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [roleErr, setRoleErr] = useState("")

    const Register = () => {

        const re = /^[a-z][\w-\.]*@([a-z0-9-]+\.)+[a-z-]{2,4}$/;
        const text = /^[\p{L}\s]+$/u;
        if (re.test(Email) === false) {
            setEmailErr("Email không hợp lệ")
            return
        }
        else {
            setEmailErr("")
            if (text.test(Name) === false) {
                setNameErr("Name không hợp lệ")
                return
            }
            else {
                setNameErr("")
                if (Password.length < 8) {
                    setPasswordErr("Password trên 8 kí tự")
                    return
                }
                else {
                    setPasswordErr("")
                    if (Role === "") {
                        setRoleErr("Vui lòng nhập role")
                        return
                    }
                }
            }
        }
        const requesRegister = {

            Email: Email,
            Name: Name,
            Password: Password,
            Role: Role
        }
        fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user", {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(requesRegister)
        }).then(res => {
            if (res.status === 200) {
                alert("Đăng kí thành công")
                nav('/login')
            } else {
                alert("Tài khoản của bạn đã được đăng kí")
            }
        })
    }
    return (
        <div className="Register">
            <div className="register">
                <div className="register-content">
                    <h1>ĐĂNG KÝ</h1>
                    <input value={Email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                    {emailErr && <span className="error" id="EmailError">{emailErr}</span>}
                    <input value={Name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' />
                    {nameErr && <span className="error" id="EmailError">{nameErr}</span>}
                    <input value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' type='password' />
                    {passwordErr && <span className="error" id="EmailError">{passwordErr}</span>}
                    <input value={Role} onChange={(e) => { setRole(e.target.value) }} placeholder='Role' />
                    {roleErr && <span className="error" id="EmailError">{roleErr}</span>}
                    <p>Tôi đã đọc và đồng ý với <Link>CHÍNH SÁCH </Link> của chương trình.</p>
                    <button onClick={Register}>Đăng Ký</button>

                </div>
            </div>
        </div>
    );
}

export default Register;