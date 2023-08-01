import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useSelector } from "react-redux"

function Public() {
    const user = useSelector((state) => state.userReducer.token)
    return (
        <div>
            {user?.token ? (
                user.roleId === 1 ? (
                    <Navigate to='/admin'></Navigate>
                ) : (
                    <Navigate to='/user'></Navigate>
                )
            ) : (
                <Outlet />
            )}
        </div>
    )
}

export default Public
