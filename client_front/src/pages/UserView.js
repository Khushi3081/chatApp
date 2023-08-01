import React, { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import TextField from "../components/TextField"
import { persistor } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { getChatUser } from "../redux/features/messageSlice"
import "../assets/css/Admin.css"
import { addGroup } from "../redux/features/messageSlice"
import { getgroupUser } from "../redux/features/groupSlice"

function UserView() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState([])
    const [error, setError] = useState()
    useEffect(() => {
        dispatch(getChatUser())
        dispatch(getgroupUser())
    }, [])
    const userList = useSelector((state) => state.messageReducer.userList)
    const groupList = useSelector((state) => state.groupReducer.groupUser)
    const senderId = useSelector((state) => state.userReducer.token.userId)
    const logOut = () => {
        localStorage.removeItem("accessToken")
        persistor.pause()
        persistor.flush().then(() => {
            return persistor.purge()
        })
        window.location.pathname = "/login"
    }
    const handleChange = (index) => {
        let ids = [...userId]
        if (ids.includes(index)) {
            const id = ids.filter((el) => el !== index)
            setUserId(id)
        } else {
            ids.push(index)
            setUserId(ids)
        }
    }
    const createGroup = () => {
        if (userId.length > 2) {
            dispatch(addGroup(userId))
            setError("")
        } else {
            setError("Group is not created with only two members")
        }
    }
    const checkUser = (id) => {
        const data = groupList.filter((e) => e.id === id)
        const res = data[0]?.users?.some((e) => e.id === senderId)
        if (res === false) {
            setError(
                "You are not a member of this group, so you can not join this group"
            )
        } else {
            setError("")
            navigate(`/groupChat/${id}`)
        }
    }
    return (
        <div>
            UserView
            <div>
                <h2>Get started Chat</h2>
            </div>
            <div>
                <table id='customers'>
                    {userList?.map((e) => {
                        return (
                            <>
                                <tbody>
                                    <tr>
                                        <td>{e.id}</td>
                                        <td>{e.firstName}</td>
                                        <td>{e.email}</td>
                                        <td>
                                            <input
                                                type='button'
                                                value='Start-chat'
                                                onClick={() =>
                                                    navigate(`/chat/${e.id}`)
                                                }
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                type='checkbox'
                                                name='groupchat'
                                                value='clicked'
                                                onChange={() =>
                                                    handleChange(e.id)
                                                }
                                            ></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    })}
                    {groupList?.length > 0
                        ? groupList?.map((e) => {
                              return (
                                  <>
                                      <tbody>
                                          <tr>
                                              <td>{e.id}</td>
                                              <td>{e.groupName}</td>
                                              <td>
                                                  <input
                                                      type='button'
                                                      value='Start-chat'
                                                      onClick={() =>
                                                          checkUser(e.id)
                                                      }
                                                  ></input>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </>
                              )
                          })
                        : null}
                </table>
                <tr className='error'>{error}</tr>
            </div>
            <TextField
                type='button'
                name='chat'
                label='Create-group'
                value='Create-group'
                handle={createGroup}
            ></TextField>
            <TextField
                type='button'
                name='chat'
                label='Logout'
                value='Logout'
                handle={logOut}
            ></TextField>
        </div>
    )
}

export default UserView
