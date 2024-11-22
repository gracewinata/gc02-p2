import axios from 'axios'
import { useState } from 'react'
import Toastify from 'toastify-js'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'


export default function AddStaff(){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()


    async function handleAddUser(e){
        e.preventDefault()
        try {
            const {data} = await axios.post(`https://h8-phase2-gc.vercel.app/apis/add-user`,
                {username, email, password, phoneNumber, address},
                {
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            navigate('/')
            Toastify({
                text: `Succeed add user`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#34D399",
                    color: "#000000"
                },
            }).showToast();

        } catch (error) {
            Toastify({
                text: error.response.data.error,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "#000000"
                }
            }).showToast();
        }
    }


    return(
        <>
        <div className="bg-blue-500 bg-opacity-30">
        <div className="min-h-screen flex items-center justify-center w-full p-5">
        <div className="rounded-lg px-8 py-6 w-1/3 bg-blue-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {/* <div className="max-w-sm mx-auto bg-blue-400 p-5 rounded-lg shadow-lg"> */}
                <div className="w-full sm:w-auto py-2 px-4 border-2 border-black text-sm font-medium bg-yellow-500 text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-bold  text-center">Add Staff</h2>
                
                </div>
                <form onSubmit = {handleAddUser}>
                        <div className="mb-4 mt-10">
                            <label htmlFor="username" className="block text-sm font-medium ">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter username"
                                onChange={(e)=>setUsername(e.target.value)}
                                />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium ">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter email address"
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium ">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter password"
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium ">
                                Phone Number
                            </label>
                            <input
                                type="string"
                                id="phoneNumber"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter phone number (optional)"
                                onChange={(e)=>setPhoneNumber(e.target.value)}
                                />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium ">
                                Address
                            </label>
                            <textarea
                                id="address"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter address (optional)"
                                onChange={(e)=>setAddress(e.target.value)}
                                />
                        </div>

                        {/* button */}
                        <div className="flex justify-center space-x-4 mt-5">
        
                        <Button nameProp = "Submit"/>

                        <button className="w-full sm:w-auto py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium bg-white text-gray-700 hover:bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105">
                            Cancel
                        </button>
                        </div>

                </form>
            {/* </div> */}
        </div>
        </div>
        </div>

        </>
    )
}