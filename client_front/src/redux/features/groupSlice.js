import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    groupList: [],
    groupUser: {},
}

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        addGroup(state, action) {
            return action.payload
        },
        setGroup(state, action) {
            const data = { ...current(state) }
            data.groupList = action.payload
            return { ...data }
        },
        getgroupUser() {},
        setgroupUser(state, action) {
            const data = { ...current(state) }
            data.groupUser = action.payload
            return { ...data }
        },
        getMsg(state, action) {
            return action.payload
        },
        setMsg(state, action) {
            console.log(action.payload)
        },
        getGroupChat(state, action) {
            return action.payload
        },
        setGroupChat(state, action) {
            const data = { ...current(state) }
            data.groupList = action.payload
            return { ...data }
        },
    },
})
export const {
    addGroup,
    setGroup,
    getgroupUser,
    setgroupUser,
    getMsg,
    setMsg,
    getGroupChat,
    setGroupChat,
} = groupSlice.actions
export default groupSlice.reducer
