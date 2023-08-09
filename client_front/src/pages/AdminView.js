import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    deleteUser,
    editUserState,
    fetchusers,
} from "../redux/features/userSlice"
import "../assets/css/Admin.css"
import { useNavigate } from "react-router-dom"
import { persistor } from "../redux/store"
function AdminView() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchusers())
    }, [])
    const user = useSelector((state) => state.userReducer.userList)
        const logOut = () => {
            localStorage.removeItem("accessToken")
            persistor.pause()
            persistor.flush().then(() => {
                return persistor.purge()
            })
            window.location.pathname = "/login"
        }
    return (
        <div>
            <h3>AdminView</h3>
            <table id='customers'>
                <thead classNameName='thead-dark'>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>FirstName</th>
                        <th scope='col'>LastName</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone No</th>
                        <th scope='col'>Date of Birth</th>
                        <th scope='col'>Gender</th>
                        <th scope='col'>isActive</th>
                        <th scope='col'>User-role</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                {user?.map((e) => {
                    return (
                        <tbody>
                            <td>{e.id}</td>
                            <td>{e.firstName}</td>
                            <td>{e.lastName}</td>
                            <td>{e.email}</td>
                            <td>{e.phoneNo}</td>
                            <td>{e.dateOfBirth}</td>
                            <td>{e.gender}</td>
                            {e.roleId === 1 ? (
                                <td>Activate</td>
                            ) : (
                                <td>
                                    <button
                                        onClick={() => {
                                            dispatch(
                                                editUserState({
                                                    id: e.id,
                                                    isActive: e.isActive,
                                                })
                                            )
                                        }}
                                    >
                                        {e.isActive.toString()}
                                    </button>
                                </td>
                            )}
                            <td>{e?.Role?.name}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        navigate("/", {
                                            state: { id: e.id },
                                        })
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(deleteUser(e.id))
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tbody>
                    )
                })}
                <button onClick={() => navigate("/", { state: { id: 1 } })}>
                    Add
                </button>
                <button onClick={logOut}>Logout</button>
            </table>
        </div>
    )
}

export default AdminView
