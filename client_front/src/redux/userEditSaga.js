import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { editUser, updateUser } from "./features/userSlice"
import { getAuthorizationHeader } from "../interceptor"

const userData = async (uid, active) => {
    const response = await axios.get(
        `http://localhost:5000/editData?id=${uid}`,
        {
            headers: { Authorization: getAuthorizationHeader() },
        }
    )
    return response.data
}

function* onUserFetchEdit({ payload }) {
    try {
        const uid = payload
        const data = yield call(userData, uid)
        if (data) {
            yield put(updateUser(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadEditUser() {
    yield takeEvery(editUser.type, onUserFetchEdit)
}
export const userEditSaga = [fork(onLoadEditUser)]
