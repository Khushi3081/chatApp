import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { getgroupUser, setgroupUser } from "./features/groupSlice"
import { getAuthorizationHeader } from "../interceptor"
const groupData = async () => {
    const response = await axios.get(
        "http://localhost:5000/grp/groupUserData",
        { headers: { Authorization: getAuthorizationHeader() } }
    )
    return response.data
}

function* ongroupUserFetch() {
    try {
        const data = yield call(groupData)
        if (data) {
            yield put(setgroupUser(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadgroupUser() {
    yield takeEvery(getgroupUser.type, ongroupUserFetch)
}
export const groupUserSaga = [fork(onLoadgroupUser)]
