import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "../assets/css/TextField.css"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import TextField from "../components/TextField"
import RadioField from "../components/RadioField"
import "../assets/css/TextField.css"
import axios from "axios"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { editUser, updateUserData } from "../redux/features/userSlice"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
function RegistrationForm() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [oldUserError, setoldUserError] = useState()
    const now = new Date()
    const setBirthDate = new Date(
        now - (1000 * 60 * 60 * 24 * 365 * 18 - 1000 * 60 * 60 * 24 * 4)
    )
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = yup.object().shape({
        firstName: yup
            .string()
            .required("FirstName is required")
            .matches(
                /^[a-zA-Z ]*$/,
                "FirstName is not contained numeric values"
            ),
        lastName: yup
            .string()
            .required("LastName is required")
            .matches(
                /^[a-zA-Z ]*$/,
                "LastName is not contained numeric values"
            ),
        email: yup
            .string()
            .required("Email is Required")
            .email("Email is invalid"),
        phoneNo: yup
            .string()
            .required("Phone number is required")
            .matches(phoneRegExp, "Phone number is not valid")
            .min(10)
            .max(10),
        dateOfBirth: yup
            .date()
            .typeError("Date of Birth is required")
            .required("Date of Birth is required")
            .max(setBirthDate, "Your age atleast 18 years"),
        gender: yup.string().required("Gender is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must have at least 8 characters")
            // different error messages for different requirements
            .matches(/[0-9]/, "atleast one digit is required")
            .matches(/[a-z]/, "atleast one lowercase is required")
            .matches(/[A-Z]/, "atleast one uppercase is required"),
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (state?.id !== 1) {
            dispatch(editUser(state?.id))
        }
    }, [state])
    const user = useSelector((state) => state.userReducer.updateItem)
    useEffect(() => {
        if (user?.Role) {
            Object.entries(user).forEach(([name, value]) => {
                setValue(name, value)
            })
            Object.entries(user?.Role).forEach(([name, value]) => {
                setValue(user.Role.name, value)
            })
        }
    }, [user])

    const submitData = (userData) => {
        const res = Object.keys(user)?.length === 0
        {
            res === false
                ? dispatch(updateUserData(userData))
                : state?.id === 1
                ? axios
                      .post("http://localhost:5000/addData", {
                          userData,
                      })
                      .then((response) => {
                          console.log(response)
                          navigate("/admin")
                      })
                : axios
                      .post("http://localhost:5000/addData", {
                          userData,
                      })
                      .then((response) => {
                          if (response.data === false) {
                              setoldUserError("User has already registered")
                              navigate("/login")
                          } else {
                              navigate("/waitingPage")
                          }
                      })
        }
    }

    const LoginWithGoogle = async () => {
        window.location.href = "http://localhost:5000/google"
    }
    //sign in with front-end
    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => console.log(codeResponse),
    //     onError: (error) => console.log("Login Failed:", error),
    // })
    return (
        <div>
            <h2>Registration-Form</h2>
            <form id="form-style" onSubmit={handleSubmit(submitData)} method='POST'>
                <TextField
                    label='FirstName'
                    name='firstName'
                    type='text'
                    register={register}
                ></TextField>
                <div className='error'>{errors.firstName?.message}</div>
                <TextField
                    label='LastName'
                    name='lastName'
                    type='text'
                    register={register}
                ></TextField>
                <div className='error'>{errors.lastName?.message}</div>
                <TextField
                    label='email'
                    name='email'
                    type='text'
                    register={register}
                ></TextField>
                <div className='error'>{errors.email?.message}</div>
                <TextField
                    label='phoneNo'
                    name='phoneNo'
                    type='text'
                    register={register}
                ></TextField>
                <div className='error'>{errors.phoneNo?.message}</div>
                <TextField
                    label='dateOfBirth'
                    name='dateOfBirth'
                    type='date'
                    register={register}
                ></TextField>
                <div className='error'>{errors.dateOfBirth?.message}</div>
                <RadioField label='Gender' register={register}></RadioField>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <RadioField
                        name='gender'
                        type='radio'
                        value='Male'
                        register={register}
                    ></RadioField>
                    <RadioField
                        name='gender'
                        type='radio'
                        value='Female'
                        register={register}
                    ></RadioField>
                    <RadioField
                        name='gender'
                        type='radio'
                        value='Other'
                        register={register}
                    ></RadioField>
                </div>
                <div className='error'>{errors.gender?.message}</div>
                {state?.id === 1 ? (
                    <TextField
                        label='RoleName'
                        name='Role.name'
                        type='text'
                        register={register}
                    ></TextField>
                ) : (
                    <TextField
                        label='Password'
                        name='password'
                        type='text'
                        register={register}
                    ></TextField>
                )}
                <div className='error'>{errors.password?.message}</div>
                <TextField
                    label='Submit'
                    name='Submit'
                    type='submit'
                ></TextField>
                <br />
                {/* sign in with frontend */}
                {/* <input
                    label='Sign in with google'
                    value='Sign in with google'
                    name='Submit'
                    type='button'
                    onClick={() => login()}
                ></input> */}

                <input
                    type='button'
                    value='signIn'
                    onClick={LoginWithGoogle}
                ></input>
                <div className='error'>{oldUserError}</div>
            </form>
        </div>
    )
}

export default RegistrationForm
