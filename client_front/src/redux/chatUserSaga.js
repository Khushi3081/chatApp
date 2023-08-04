import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { clearChat, getChatUser, setChatUser } from "./features/messageSlice"

const userData = async () => {
    const response = await axios.get("http://localhost:5000/msg/chatUserData")
    return response.data
}

function* onChatUserFetch() {
    try {
        const data = yield call(userData)
        if (data) {
            yield put(setChatUser(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadChatUser() {
    yield takeEvery(getChatUser.type, onChatUserFetch)
}
export const chatUserSaga = [fork(onLoadChatUser)]
