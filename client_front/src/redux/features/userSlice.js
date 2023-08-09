import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    userList: [],
    updateItem: {},
    token: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchusers() {},
        setData(state, action) {
            const data = { ...current(state) }
            data.userList = action.payload
            return data
        },
        editUserState(action) {
            return action.payload
        },
        updateUserState(state, action) {
            const data = { ...current(state) }
            const dataOne = action.payload
            const res = data.userList.map((item) => {
                if (item.id === action.payload.id) {
                    item = dataOne
                }
                return item
            })
            data.userList = res
            return {
                ...data,
            }
        },
        editUser(action) {
            return action.payload
        },
        updateUser(state, action) {
            const data = { ...current(state) }
            data.updateItem = action.payload
            return { ...data }
        },
        deleteUserData(state, action) {
            const data = { ...current(state) }
            data.userList = action.payload
            return { ...data }
        },
        deleteUser(action) {
            return action.payload
        },
        updateUserData(action) {
            return action.payload
        },
        updateData(state, action) {
            const data = { ...current(state) }
            const {
                id,
                firstName,
                lastName,
                email,
                phoneNo,
                dateOfBirth,
                gender,
                password,
                isActive,
                roleId,
            } = action.payload
            const updateData = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNo: phoneNo,
                dateOfBirth: dateOfBirth,
                gender: gender,
                password: password,
                roleId: roleId,
                isActive: isActive,
            }
            const res = data.userList.map((item) => {
                if (item.id === action.payload.id) {
                    item = updateData
                }
                return item
            })
            data.userList = res
            return {
                ...data,
            }
        },

        setToken(state, action) {
            const data = { ...current(state) }
            data.token = action.payload
            localStorage.setItem("accessToken", action.payload.token)
            return { ...data }
        },
    },
})
export const {
    fetchusers,
    setData,
    editUser,
    updateUserState,
    updateUser,
    editUserState,
    updateUserData,
    updateData,
    deleteUser,
    deleteUserData,
    setToken,
} = userSlice.actions
export default userSlice.reducer
