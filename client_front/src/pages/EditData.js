// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useLocation, useParams } from "react-router-dom"
// import { editUser, updateData } from "../redux/features/userSlice"
// import TextField from "../components/TextField"

// function EditData() {
//     const { state } = useLocation()
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(editUser(state.id))
//     }, [])
//     const user = useSelector((state) => state.user?.updateItem)
//     const [editData, setEditData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNo: "",
//         dateOfBirth: "",
//         gender: "",
//     })
//     useEffect(() => {
//         if (user) {
//             setEditData({
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 phoneNo: user.phoneNo,
//                 dateOfBirth: user.dateOfBirth,
//                 gender: user.gender,
//             })
//         }
//     }, [user])

//     console.log(user)

//     const handleChange = (e) => {
//         const { name, value } = e.target
//         let val = { ...editData }
//         val[name] = value
//         setEditData(val)
//     }

//     function submitData() {
//         dispatch(updateData(editData))
//     }

//     return (
//         <div>
//             {user !== "" ? (
//                 <>
//                     <center>
//                         <td style={{ fontWeight: "bold", fontSize: "2rem" }}>
//                             EditData
//                         </td>
//                     </center>
//                     <form onSubmit={submitData}>
//                         <TextField
//                             label='FirstName'
//                             name='FirstName'
//                             type='text'
//                             register={register}
//                             defaultValue={user.firstName}
//                             onChange={() => handleChange}
//                         ></TextField>
//                         <div className='error'>{errors.FirstName?.message}</div>
//                         <TextField
//                             label='LastName'
//                             name='LastName'
//                             type='text'
//                             register={register}
//                             defaultValue={user.lastName}
//                             onChange={() => handleChange}
//                         ></TextField>
//                         <div className='error'>{errors.LastName?.message}</div>
//                         <TextField
//                             label='email'
//                             name='email'
//                             type='text'
//                             register={register}
//                             defaultValue={user.email}
//                             onChange={() => handleChange}
//                         ></TextField>
//                         <div className='error'>{errors.email?.message}</div>
//                         <TextField
//                             label='phoneNo'
//                             name='phoneNo'
//                             type='text'
//                             register={register}
//                             defaultValue={user.phoneNo}
//                             onChange={() => handleChange}
//                         ></TextField>
//                         <div className='error'>{errors.phoneNo?.message}</div>
//                         <TextField
//                             label='dateOfBirth'
//                             name='dateOfBirth'
//                             type='date'
//                             register={register}
//                             defaultValue={user.dateOfBirth}
//                             onChange={() => handleChange}
//                         ></TextField>
//                         <div className='error'>
//                             {errors.dateOfBirth?.message}
//                         </div>
//                         <RadioField
//                             label='Gender'
//                             register={register}
//                         ></RadioField>
//                         <div
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "row",
//                                 justifyContent: "space-around",
//                             }}
//                         >
//                             <RadioField
//                                 name='gender'
//                                 type='radio'
//                                 value='Male'
//                                 register={register}
//                                 defaultValue={user.gender}
//                                 onChange={() => handleChange}
//                             ></RadioField>
//                             <RadioField
//                                 name='gender'
//                                 type='radio'
//                                 value='Female'
//                                 register={register}
//                             ></RadioField>
//                             <RadioField
//                                 name='gender'
//                                 type='radio'
//                                 value='Other'
//                                 register={register}
//                             ></RadioField>
//                         </div>
//                         <div className='error'>{errors.gender?.message}</div>

//                         <tr>
//                             {/* <input
//                             type='text'
//                             name='role'
//                             style={{ height: "50px", width: "50rem" }}
//                             placeholder='role'
//                             onChange={handleChange}
//                         ></input> */}
//                         </tr>
//                         <br />
//                         <button onClick={() => submitData()}>Update</button>
//                     </form>
//                 </>
//             ) : null}
//         </div>
//     )
// }

// export default EditData
