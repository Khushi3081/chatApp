import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

function Private() {
    const user = useSelector((state) => state.userReducer
    .token)

    return (
        <div>{user.token ? <Outlet /> : <Navigate to='/login'></Navigate>}</div>
    )
}

export default Private
