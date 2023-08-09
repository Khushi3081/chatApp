import React, { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import TextField from "../components/TextField"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setToken } from "../redux/features/userSlice"
function LoginForm() {
    const [backError, setBackError] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is Required")
            .email("Email is invalid"),
        password: yup
            .string()
            .required("Password is required")
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                "Password contains one uppercase,one lowercase, one digit and length should be 8 digit"
            ),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })
    const submitData = (userLoginData) => {
        const backError = {}
        if (userLoginData) {
            axios
                .post("http://localhost:5000/checkData", {
                    userLoginData,
                })
                .then((response) => {
                    if (response?.data === "email is incorrect") {
                        backError.email = "Entered email is incorrect"
                    } else if (response?.data === "Password does not match") {
                        backError.password = "Password does not match"
                    } else if (
                        response?.data?.token &&
                        response?.data?.roleId !== 1 &&
                        response?.data?.isActive === true
                    ) {
                        dispatch(
                            setToken({
                                token: response?.data?.token,
                                roleId: response?.data?.roleId,
                                userId: response?.data?.data.id,
                            })
                        )
                    } else if (
                        response?.data?.token &&
                        response?.data?.roleId !== 1 &&
                        response?.data?.isActive === false
                    ) {
                        backError.common =
                            "Wait sometimes admin can soon activate your account"
                        navigate("/login")
                    } else {
                        dispatch(
                            setToken({
                                token: response?.data?.token,
                                roleId: response?.data?.roleId,
                                userId: response?.data?.data.id,
                            })
                        )
                    }
                    setBackError(backError)
                })
        }
    }
    return (
        <div>
            <h2>Login-Form</h2>
            <form
                id='form-style'
                onSubmit={handleSubmit(submitData)}
                method='POST'
            >
                <TextField
                    label='Email'
                    name='email'
                    type='text'
                    register={register}
                ></TextField>
                <div className='error'>{errors.email?.message}</div>
                <div className='error'>{backError?.email}</div>
                <TextField
                    label='Password'
                    name='password'
                    type='text'
                    register={register}
                ></TextField>
                <div className='error'>{errors.password?.message}</div>
                <div className='error'>{backError?.password}</div>
                <TextField
                    label='Submit'
                    name='Submit'
                    type='submit'
                ></TextField>
                <div className='error'>{backError?.common}</div>
            </form>
        </div>
    )
}

export default LoginForm
