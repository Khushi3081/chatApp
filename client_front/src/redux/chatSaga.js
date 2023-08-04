import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { getChat, setChat } from "./features/messageSlice"
const msgData = async (senderId, receiverId,offset,limit) => {
    const response = await axios.get(
        `http://localhost:5000/msg/fetchChat?senderId=${senderId}&&receiverId=${receiverId}&&offset=${offset}&&limit=${limit}`

    )
    return response.data
}

function* onFetchChat({ payload }) {
   
    const senderId = payload.senderId
    const receiverId = payload.receiverId
    const offset = payload.offset
    const limit = payload.limit

    try {
        const data = yield call(msgData, senderId, receiverId,offset,limit)
        if (data) {
            yield put(setChat(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadChat() {
    yield takeEvery(getChat.type, onFetchChat)
}
export const chatSaga = [fork(onLoadChat)]
