import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {
    const nav = useNavigate()

    useEffect(() => {
        let userName = localStorage.getItem("Email")
        if (!userName) {
            nav('/login')
        }
    })
    return (
        <div>
            {
                props.children
            }
        </div>
    )
}
