import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    message: "",
    messageList: [],
    userList: [],
    groupList: [],
    isLoading: false,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        getMsg(state, action) {
            return action.payload
        },
        setUserMsg(state, action) {
            const data = { ...current(state) }
            data.message = action.payload
            return { ...data }
        },
        getChatUser() {},
        setChatUser(state, action) {
            const data = { ...current(state) }
            data.userList = action.payload
            return data
        },
        getChat(state, action) {
            const res = action.payload
            return { res, ...state }
        },
        setChat(state, action) {
            const data = { ...current(state) }
            data.messageList = action.payload
            data.isLoading = false
            return data
        },
        addGroup(state, action) {
            return action.payload
        },
        setGroup(state, action) {
            const data = { ...current(state) }
            data.groupList = action.payload
            return { ...data }
        },
        addFile(state, action) {
            return action.payload
        },
    },
})
export const {
    getMsg,
    setUserMsg,
    getChatUser,
    setChatUser,
    getChat,
    setChat,
    addGroup,
    setGroup,
    addFile,
} = messageSlice.actions
export default messageSlice.reducer
