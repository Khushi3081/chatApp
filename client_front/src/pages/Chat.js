import React, { createRef, useEffect, useRef, useState } from "react"
import "../assets/css/TextField.css"
import { useDispatch, useSelector } from "react-redux"
import {
    addFile,
    clearSearchValue,
    getChat,
    getMsg,
    getSearchValue,
} from "../redux/features/messageSlice"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import moment from "moment"
import "../assets/css/Message.css"
function Chat() {
    const [search, setSearch] = useState()
    const { id } = useParams()
    const receiverId = id
    const dispatch = useDispatch()
    const senderId = useSelector((state) => state.userReducer.token.userId)
    const chat = useSelector((state) => state.messageReducer)
    const offsetRef = useRef(5)
    const limit = 5
    const chatWindow = createRef(null)
    const messageContainerRef = useRef(null)
    const previousScrollHeightRef = useRef(0)
    const [loading, setLoading] = useState(false)
    const loadMoreMessages = () => {
        setLoading(true)
        setTimeout(() => {
            const offset = offsetRef.current
            dispatch(getChat({ senderId, receiverId, offset }))
            offsetRef.current += limit
            setLoading(false)
        }, 800)
    }

    useEffect(() => {
        if (chat.messageList.length > 5) {
            const newScrollHeight = chatWindow.current.scrollHeight
            chatWindow.current.scrollTop =
                newScrollHeight - previousScrollHeightRef.current
            previousScrollHeightRef.current = newScrollHeight
        } else {
            chatWindow.current.scrollTop = chatWindow.current.scrollHeight
        }
    }, [chat])
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm()

    const submitData = (data) => {
        if (data.msg === "" && data.file.length === 0) {
            setError("fieldRequired", {
                type: "manual",
                message: "You have to send either text-message or media file",
            })
            return
        }
        if (!errors.fieldRequired?.message && data.msg !== "") {
            dispatch(getMsg({ data, senderId, receiverId }))

            reset()
        } else if (!errors?.fieldRequired?.message && data?.file[0] !== "") {
            const file = data.file[0]
            const info = new FormData()
            info.append("senderId", senderId)
            info.append("receiverId", receiverId)
            info.append("file", file)
            dispatch(addFile(info))
            reset()
        }
    }
    const handleScroll = () => {
        const { clientHeight, scrollHeight, scrollTop } = chatWindow.current
        if (scrollTop === 0 && !loading) {
            loadMoreMessages()
        }
    }
    const handleSearch = (e) => {
        const search = e.target.value
        setSearch(search)
        dispatch(getSearchValue({ search, senderId, receiverId }))
    }
    const highLight = (message) => {
        const parts = []
        let startIndex = 0
        const lowerCaseMessage = message.toLowerCase()
        const searchTermIndex = lowerCaseMessage.indexOf(
            search?.toLowerCase(),
            startIndex
        )

        if (searchTermIndex !== -1 && message.includes(search)) {
            const beforeSearch = message.substring(0, searchTermIndex)
            const term = message.substring(
                searchTermIndex,
                searchTermIndex + search.length
            )
            const afterSearch = message.substring(
                searchTermIndex + search.length
            )
            parts.push(
                <span>
                    {beforeSearch}
                    <span style={{ backgroundColor: "yellow" }}>{term}</span>
                    {afterSearch}
                </span>
            )
            return parts
        }
        return message
    }

    let count = 0
    if (search?.length >= 3) {
        chat.messageList.map((message) => {
            const msg = message?.messageBody
            if (msg?.includes(search) === true) {
                count++
            }
            return count
        })
    }
    return (
        <div>
            <h2>Get started</h2>
            <section className='msger'>
                <header className='msger-header'>
                    <div className='msger-header-title'>
                        <i className='fas fa-comment-alt'></i>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "20px",
                                    marginRight: "1rem",
                                }}
                            >
                                SimpleChat
                            </div>

                            <div
                                style={{
                                    marginRight: "1rem",
                                }}
                            >
                                <input
                                    type='text'
                                    name='text'
                                    placeholder='Search chat here...'
                                    onChange={handleSearch}
                                ></input>
                            </div>
                            <div style={{ fontSize: "1.3rem" }}>
                                Matched Ocuurences :{" "}
                                {search ? chat.searchList.data : 0}
                            </div>
                        </div>
                    </div>
                    <div className='msger-header-options'>
                        <span>
                            <i className='fas fa-cog'></i>
                        </span>
                    </div>
                </header>
                <main
                    ref={chatWindow}
                    className='msger-chat'
                    onScroll={handleScroll}
                >
                    {chat?.messageList?.length > 0 ? (
                        chat?.messageList?.map((e, index) => {
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
                                            {e.messageBody ? (
                                                search?.length >= 3 ? (
                                                    <div className='msg-text'>
                                                        {highLight(
                                                            e.messageBody
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className='msg-text'>
                                                        {e.messageBody}
                                                    </div>
                                                )
                                            ) : (
                                                <>
                                                    {e.filePath.includes(
                                                        "webm" || "mp3" || "mp4"
                                                    ) ? (
                                                        <video
                                                            controls
                                                            style={{
                                                                height: "150px",
                                                                width: "250px",
                                                            }}
                                                        >
                                                            <source
                                                                src={`/${e?.filePath
                                                                    ?.split("/")
                                                                    .pop()}`}
                                                                type='video/webm'
                                                            />
                                                        </video>
                                                    ) : (
                                                        <img
                                                            src={`/${e?.filePath
                                                                ?.split("/")
                                                                .pop()}`}
                                                            alt={e.fileName}
                                                            style={{
                                                                height: "70px",
                                                                width: "80px",
                                                            }}
                                                        ></img>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <>
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

                                                {e.messageBody ? (
                                                    search?.length >= 3 ? (
                                                        <div className='msg-text'>
                                                            {highLight(
                                                                e.messageBody
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className='msg-text'>
                                                            {e.messageBody}
                                                        </div>
                                                    )
                                                ) : (
                                                    <>
                                                        {e.filePath.includes(
                                                            "webm" ||
                                                                "mp3" ||
                                                                "mp4"
                                                        ) ? (
                                                            <video
                                                                controls
                                                                style={{
                                                                    height: "150px",
                                                                    width: "250px",
                                                                }}
                                                            >
                                                                <source
                                                                    src={`/${e?.filePath
                                                                        ?.split(
                                                                            "/"
                                                                        )
                                                                        .pop()}`}
                                                                    type='video/webm'
                                                                />
                                                            </video>
                                                        ) : (
                                                            <img
                                                                src={`/${e?.filePath
                                                                    ?.split("/")
                                                                    .pop()}`}
                                                                alt={e.fileName}
                                                                style={{
                                                                    height: "70px",
                                                                    width: "80px",
                                                                }}
                                                            ></img>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        })
                    ) : (
                        <h2>Chat not started yet</h2>
                    )}
                    <div ref={messageContainerRef} />
                </main>
                <form
                    id='form-style'
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
                        onChange={() => {
                            clearErrors("fieldRequired")
                        }}
                    ></input>
                    <input
                        name='file'
                        type='file'
                        className='msger-input'
                        {...register("file")}
                    ></input>
                    <input
                        label='Send'
                        name='Submit'
                        value='Send'
                        type='submit'
                        className='msger-send-btn'
                    ></input>
                </form>
                <div className='error'>{errors.fieldRequired?.message}</div>
            </section>
        </div>
    )
}

export default Chat
