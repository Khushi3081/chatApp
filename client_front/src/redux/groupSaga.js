import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { addGroup, setGroup } from "./features/messageSlice"
const GroupData = async (payload) => {
    const response = await axios.post("http://localhost:5000/grp/addGroup", {
        groupName: `Group${Math.floor(Math.random() * 10)}`,
        userIds: payload,
    })
    return response.data
}

function* onFetchGroup({ payload }) {
    console.log(payload)
    try {
        const data = yield call(GroupData, payload)
        if (data) {
            yield put(setGroup(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadGroup() {
    yield takeEvery(addGroup.type, onFetchGroup)
}
export const groupSaga = [fork(onLoadGroup)]
