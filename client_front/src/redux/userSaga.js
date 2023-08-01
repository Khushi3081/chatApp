import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { fetchusers, setData } from "./features/userSlice"

const userData = async (user) => {
    const response = await axios.get("http://localhost:5000/fetchData")
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
