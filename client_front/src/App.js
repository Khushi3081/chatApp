import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import RegistrationForm from "./pages/RegistrationForm"
import Waiting from "./pages/Waiting"
import LoginForm from "./pages/LoginForm"
import AdminView from "./pages/AdminView"
import UserView from "./pages/UserView"
import Public from "./components/Public"
import Private from "./components/Private"
import Chat from "./pages/Chat"
import Exception from "./pages/Exception"
import GroupChat from "./pages/GroupChat"
import "./assets/css/Message.css"

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route element={<Private />}>
                    <Route path='/admin' element={<AdminView />}></Route>
                    <Route path='/user' element={<UserView />}></Route>
                    <Route path='/chat/:id' element={<Chat />}></Route>
                    <Route
                        path='/groupChat/:id'
                        element={<GroupChat />}
                    ></Route>
                </Route>
                <Route element={<Exception />}>
                    <Route path='/' element={<RegistrationForm />}></Route>
                </Route>
                <Route element={<Public />}>
                    <Route path='/waitingPage' element={<Waiting />}></Route>
                    <Route path='/login' element={<LoginForm />}></Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
