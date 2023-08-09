import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    groupList: [],
    groupUser: {},
    searchList: [],
}

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        addGroup(action) {
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
        getMsg(action) {
            return action.payload
        },
        setMsg(action) {},
        getGroupChat(action) {
            return action.payload
        },
        setGroupChat(state, action) {
            const data = { ...current(state) }
            data.groupList = action.payload
            return { ...data }
        },
        getSearchValue(state, action) {
            const res = action.payload
            return { res, ...state }
        },
        setSearchValue(state, action) {
            const data = { ...current(state) }
            data.searchList = action.payload
            return data
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
    getSearchValue,
    setSearchValue,
} = groupSlice.actions
export default groupSlice.reducer
