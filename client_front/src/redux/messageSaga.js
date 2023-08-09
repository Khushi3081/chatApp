import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { getChat, getMsg } from "./features/messageSlice"
import { getAuthorizationHeader } from "../interceptor"

const msgData = async (payload) => {
    const response = await axios.post(
        "http://localhost:5000/msg/addMsg",
        {
            msg: payload.data.msg,
            senderId: payload.senderId,
            receiverId: payload.receiverId,
        },
        {
            headers: { Authorization: getAuthorizationHeader() },
        }
    )

    return response.data
}

function* onFetchMsg({ payload }) {
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

export function* onLoadMsg() {
    yield takeEvery(getMsg.type, onFetchMsg)
}
export const messageSaga = [fork(onLoadMsg)]
