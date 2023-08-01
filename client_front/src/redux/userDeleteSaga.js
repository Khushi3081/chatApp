import axios from "axios"
import { takeLatest, fork, call, put, takeEvery } from "redux-saga/effects"
import { deleteUser, deleteUserData } from "./features/userSlice"
import { getAuthorizationHeader } from "../interceptor"

const userData = async (uid) => {
    const response = await axios.delete(
        `http://localhost:5000/deleteUser?id=${uid}`,
        {
            headers: { Authorization: getAuthorizationHeader() },
        }
    )
    return response.data
}

function* onUserFetchDelete({ payload }) {
    try {
        const uid = payload
        const data = yield call(userData, uid)
        if (data) {
            yield put(deleteUserData(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadDeleteUser() {
    yield takeEvery(deleteUser.type, onUserFetchDelete)
}
export const userDeleteSaga = [fork(onLoadDeleteUser)]
