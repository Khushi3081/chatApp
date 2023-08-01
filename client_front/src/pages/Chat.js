import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import "../assets/css/TextField.css"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { getChat, getMsg } from "../redux/features/messageSlice"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import moment from "moment"
import "../assets/css/Message.css"
function Chat() {
    const { id } = useParams()
    const receiverId = id
    const dispatch = useDispatch()
    const senderId = useSelector((state) => state.userReducer.token.userId)
    const chat = useSelector((state) => state.messageReducer)
    const offsetRef = useRef(5);
    const limit = 5;
    const chatWindow = useRef(null)
    const validationSchema = yup.object().shape({
        msg: yup.string().required("Empty Message can't be send"),
    })
    const messageContainerRef = useRef(null)
    const scrollToBottom = () => {
        if(messageContainerRef.current) {
            messageContainerRef.current?.scrollIntoView({ block:"end",behavior: "smooth" })
        }
    }
    useEffect(() => {
        const offset = offsetRef.current
        dispatch(getChat({ senderId, receiverId,offset }))
    }, [senderId,receiverId])
    
    useEffect(scrollToBottom,[])
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const submitData = (data) => {
        dispatch(getMsg({ data, senderId, receiverId }))
        reset()
        scrollToBottom()
    }
    const handleScroll = () =>{
        if ( chat.messageList.length === 0) return;
        const chatWindowElement = chatWindow.current;
        const scrolledToTop = chatWindowElement.scrollTop === 0;
        const scrolledUpToHeight = chatWindowElement.scrollHeight - chatWindowElement.clientHeight - chatWindowElement.scrollTop < 100;
          if(scrolledToTop || scrolledUpToHeight){
              offsetRef.current += limit
              const offset = offsetRef.current
                dispatch(getChat({ senderId, receiverId,offset }))
            }
    }

    return (
        <div>
            <h2>Get started</h2>
            <section className='msger'>
                <header className='msger-header'>
                    <div className='msger-header-title'>
                        <i className='fas fa-comment-alt'></i> SimpleChat
                    </div>
                    <div className='msger-header-options'>
                        <span>
                            <i className='fas fa-cog'></i>
                        </span>
                    </div>
                </header>
                <main ref={chatWindow} className='msger-chat' onScroll={handleScroll}>
                    {chat?.messageList?.length > 0 ? (
                        chat?.messageList?.map((e,index) => {
                            const time = moment(`${e.createdAt}`)
                                .utc()
                                .format("hh:mm:ss")
                            if (chat.res.senderId === e.senderId) {
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
                    <div ref={messageContainerRef} />

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
                    <div classNameName='error'>{errors.msg?.message}</div>
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

export default Chat
