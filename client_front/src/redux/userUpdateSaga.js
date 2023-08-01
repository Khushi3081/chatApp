import axios from "axios"
import { fork, call, put, takeEvery } from "redux-saga/effects"
import { updateData, updateUserData } from "./features/userSlice"
import { getAuthorizationHeader } from "../interceptor"

const userData = async (uid, payload) => {
    const response = await axios.post(
        `http://localhost:5000/updateData?id=${uid}`,
        {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phoneNo: payload.phoneNo,
            dateOfBirth: payload.dateOfBirth,
            gender: payload.gender,
            name: payload.Role.name,
        },
        { headers: { Authorization: getAuthorizationHeader() } }
    )
    return response.data
}

function* onUserFetchUpdate({ payload }) {
    try {
        const uid = payload.id

        const data = yield call(userData, uid, payload)
        if (data) {
            yield put(updateData(data))
        }
    } catch (err) {
        console.log(err.message)
    }
}

export function* onLoadupdateUser() {
    yield takeEvery(updateUserData.type, onUserFetchUpdate)
}
export const userUpdateSaga = [fork(onLoadupdateUser)]
