import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { getMsg, setMsg } from "./features/groupSlice"
import { getAuthorizationHeader } from "../interceptor"

const msgData = async (payload) => {
    const response = await axios.post(
        "http://localhost:5000/grp/addMsg",
        {
            msg: payload.data.msg,
            senderId: payload.senderId,
            groupId: payload.groupId,
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
        if (data) {
            yield put(setMsg(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadMsg() {
    yield takeEvery(getMsg.type, onFetchMsg)
}
export const grpmsgSaga = [fork(onLoadMsg)]
