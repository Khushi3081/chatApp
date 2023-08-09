import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { addFile, getChat } from "./features/messageSlice"
import { getAuthorizationHeader } from "../interceptor"

const msgData = async (payload) => {
    const response = await axios.post(
        "http://localhost:5000/msg/addFile",
        payload,
        {
            headers: { Authorization: getAuthorizationHeader() },
        }
    )

    return response.data
}

function* onFetchFile({ payload }) {
    try {
        const data = yield call(msgData, payload)
        const senderId = data.senderId
        const receiverId = data.receiverId
        const offset = 5
        if (data) {
            yield put(getChat({ senderId, receiverId, offset }))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadFile() {
    yield takeEvery(addFile.type, onFetchFile)
}
export const mediaSaga = [fork(onLoadFile)]
