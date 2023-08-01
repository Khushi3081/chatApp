import axios from "axios"
import { takeLatest, fork, call, put, takeEvery } from "redux-saga/effects"
import { editUserState, updateUserState } from "./features/userSlice"
import { getAuthorizationHeader } from "../interceptor"

const userData = async (uid, active) => {
    const response = await axios.post(
        `http://localhost:5000/changeStatus?id=${uid}`,
        {
            isActive: active,
        },
        { headers: { Authorization: getAuthorizationHeader() } }
    )
    return response.data
}

function* onUserFetchEdit({ payload }) {
    try {
        const uid = payload.id
        const active = payload.isActive
        const data = yield call(userData, uid, active)
        if (data) {
            yield put(updateUserState(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadEditUser() {
    yield takeEvery(editUserState.type, onUserFetchEdit)
}
export const userStateSaga = [fork(onLoadEditUser)]
