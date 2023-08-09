import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { getSearchValue, setSearchValue } from "./features/messageSlice"
import { getAuthorizationHeader } from "../interceptor"

const searchData = async (senderId, receiverId, search) => {
    const response = await axios.get(
        `http://localhost:5000/msg/searchData?search=${search}&&senderId=${senderId}&&receiverId=${receiverId}`,
        {
            headers: { Authorization: getAuthorizationHeader() },
        }
    )
    return response.data
}

function* onsearchFetch({ payload }) {
    const senderId = payload.senderId
    const receiverId = payload.receiverId
    const search = payload.search
    try {
        const data = yield call(searchData, senderId, receiverId, search)
        if (data) {
            yield put(setSearchValue(data))
            // yield put(clearSearchValue())
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadSearch() {
    yield takeEvery(getSearchValue.type, onsearchFetch)
}
export const searchSaga = [fork(onLoadSearch)]
