import React, { useEffect } from "react"
import "../assets/css/TextField.css"
import * as yup from "yup"
import moment from "moment"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import {
    getGroupChat,
    getMsg,
    getgroupUser,
} from "../redux/features/groupSlice"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import "../assets/css/Message.css"
function GroupChat() {
    const { id } = useParams()
    const groupId = id
    const dispatch = useDispatch()
    const senderId = useSelector((state) => state.userReducer.token.userId)
    const chat = useSelector((state) => state?.groupReducer?.groupUser)
    const groupChat = useSelector((state) => state?.groupReducer?.groupList)
    console.log(groupChat)
    const data = chat?.filter((e) => e.id == groupId)
    const validationSchema = yup.object().shape({
        msg: yup.string().required("Empty Message can't be send"),
    })
    const groupedUserId =
        data &&
        data[0]?.users.map((ele) => {
            return ele.id
        })
    useEffect(() => {
        dispatch(getgroupUser())
        dispatch(getGroupChat({ groupedUserId, groupId }))
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const submitData = (data) => {
        dispatch(getMsg({ data, senderId, groupId }))
        window.location.reload()
    }
    return (
        <div>
            <h2>Get started</h2>
            <section className='msger'>
                <header className='msger-header'>
                    <div className='msger-header-title'>
                        <i className='fas fa-comment-alt'></i> SimpleChat
                        <p style={{ display: "flex", flexDirection: "row" }}>
                            {data &&
                                data[0]?.users.map((ele) => {
                                    return ele.firstName + ","
                                })}
                        </p>
                    </div>
                    <div className='msger-header-options'>
                        <span>
                            <i className='fas fa-cog'></i>
                        </span>
                    </div>
                </header>

                <main className='msger-chat'>
                    {groupChat?.length > 0 ? (
                        groupChat?.map((e) => {
                            const time = moment(`${e.createdAt}`)
                                .utc()
                                .format("hh:mm:ss")
                            if (senderId === e.senderId) {
                                return (
                                    <div className='msg right-msg'>
                                        <div
                                            className='msg-img'
                                            style={{
                                                backgroundImage:
                                                    "https://image.flaticon.com/icons/svg/327/327779.svg",
                                            }}
                                        ></div>
                                        <div className='msg-bubble'>
                                            <div className='msg-info'>
                                                <div class='msg-info-name'>
                                                    {e.user.firstName}
                                                </div>
                                                <div className='msg-info-time'>
                                                    {time}
                                                </div>
                                            </div>

                                            <div className='msg-text'>
                                                {e.messageBody}
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='msg left-msg'>
                                        <div
                                            className='msg-img'
                                            style={{
                                                backgroundImage:
                                                    "https://image.flaticon.com/icons/svg/145/145867.svg",
                                            }}
                                        ></div>

                                        <div className='msg-bubble'>
                                            <div className='msg-info'>
                                                <div class='msg-info-name'>
                                                    {e.user.firstName}
                                                </div>
                                                <p className='msg-info-time'>
                                                    {time}
                                                </p>
                                            </div>

                                            <div className='msg-text'>
                                                {e?.messageBody}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    ) : (
                        <h2>Chat not started yet</h2>
                    )}
                </main>

                <form
                    className='msger-inputarea'
                    onSubmit={handleSubmit(submitData)}
                    method='POST'
                >
                    <input
                        placeholder='Enter your message...'
                        name='msg'
                        type='text'
                        className='msger-input'
                        {...register("msg")}
                    ></input>
                    <div className='error'>{errors.msg?.message}</div>
                    <input
                        label='Send'
                        name='Submit'
                        value='Send'
                        type='submit'
                        className='msger-send-btn'
                    ></input>
                </form>
            </section>
        </div>
    )
}

export default GroupChat
