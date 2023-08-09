import { all } from "redux-saga/effects"
import { onLoadUser, userSaga } from "./userSaga"
import { userStateSaga } from "./userStateSaga"
import { userDeleteSaga } from "./userDeleteSaga"
import { userEditSaga } from "./userEditSaga"
import { userUpdateSaga } from "./userUpdateSaga"
import { messageSaga } from "./messageSaga"
import { chatUserSaga } from "./chatUserSaga"
import { chatSaga } from "./chatSaga"
import { groupSaga } from "./groupSaga"
import { groupUserSaga } from "./groupChatSaga"
import { grpmsgSaga } from "./groupMsgs"
import { groupUserChatSaga } from "./groupUserChatSaga"
import { mediaSaga } from "./mediaSaga"
import { searchSaga } from "./searchSaga"
import { groupSearchSaga } from "./groupSearchSaga"

export default function* rootSaga() {
    yield all([
        ...userSaga,
        ...userStateSaga,
        ...userDeleteSaga,
        ...userEditSaga,
        ...userUpdateSaga,
        ...messageSaga,
        ...chatUserSaga,
        ...chatSaga,
        ...groupSaga,
        ...groupUserSaga,
        ...grpmsgSaga,
        ...groupUserChatSaga,
        ...mediaSaga,
        ...searchSaga,
        ...groupSearchSaga,
    ])
}
