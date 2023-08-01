import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useSelector } from "react-redux"

function Exception() {
    const user = useSelector((state) => state.userReducer.token)
    return (
        <div>
            {user?.token ? (
                user.roleId !== 1 ? (
                    <Navigate to='/user'></Navigate>
                ) : (
                    <Outlet />
                )
            ) : (
                <Outlet />
            )}
        </div>
    )
}

export default Exception
