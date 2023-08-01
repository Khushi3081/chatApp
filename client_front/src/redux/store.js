import { combineReducers, configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import userReducer from "../redux/features/userSlice"
import messageReducer from "../redux/features/messageSlice"
import groupReducer from "../redux/features/groupSlice"
import rootSaga from "./rootSaga"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
const saga = createSagaMiddleware()
const middleware = [saga]
const persistConfig = {
    key: "root",
    storage,
}
export const rootReducer = combineReducers({
    userReducer,
    messageReducer,
    groupReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) => getDefault().concat(middleware),
})
let persistor = persistStore(store)
saga.run(rootSaga)
export { store, persistor }
