import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { getSearchValue, setSearchValue } from "./features/groupSlice"
import { getAuthorizationHeader } from "../interceptor"

const searchData = async (senderId, groupId, search) => {
    const response = await axios.get(
        `http://localhost:5000/grp/searchData?search=${search}&&senderId=[${senderId}]&&groupId=${groupId}`,
        {
            headers: { Authorization: getAuthorizationHeader() },
        }
    )
    return response.data
}

function* onsearchFetch({ payload }) {
    const senderId = payload.groupedUserId
    const groupId = payload.groupId
    const search = payload.search
    try {
        const data = yield call(searchData, senderId, groupId, search)
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
export const groupSearchSaga = [fork(onLoadSearch)]
