import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { getGroupChat, setGroupChat } from "./features/groupSlice"
import { getAuthorizationHeader } from "../interceptor"

const msgData = async (senderId, receiverId) => {
    const response = await axios.get(
        `http://localhost:5000/grp/fetchChat?senderId=[${senderId}]&&receiverId=${receiverId}`,
        {
            headers: { Authorization: getAuthorizationHeader() },
        }
    )
    return response.data
}

function* onFetchChat({ payload }) {
    const senderId = payload.groupedUserId
    const receiverId = payload.groupId

    try {
        const data = yield call(msgData, senderId, receiverId)
        if (data) {
            yield put(setGroupChat(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadChat() {
    yield takeEvery(getGroupChat.type, onFetchChat)
}
export const groupUserChatSaga = [fork(onLoadChat)]
