import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { fetchusers, setData } from "./features/userSlice"
import { getAuthorizationHeader } from "../interceptor"

const userData = async (user) => {
    const response = await axios.get("http://localhost:5000/fetchData", {
        headers: { Authorization: getAuthorizationHeader() },
    })
    return response.data
}

function* onUserFetch() {
    try {
        const data = yield call(userData)
        if (data) {
            yield put(setData(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadUser() {
    yield takeEvery(fetchusers.type, onUserFetch)
}
export const userSaga = [fork(onLoadUser)]
