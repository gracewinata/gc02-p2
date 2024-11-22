import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Toastify from 'toastify-js'
import Button from '../components/Button'


export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        try {
            const {data} = await axios.post('https://h8-phase2-gc.vercel.app/apis/login',{email, password})
            localStorage.setItem('access_token', data.data.access_token)
            navigate('/')

            Toastify({
                text: "Login success",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "#34D399",
                    color: "#000000"
                },
            }).showToast();
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
        <div className="bg-blue-500 bg-opacity-30">
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="rounded-lg px-8 py-6 w-1/3 bg-blue-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium ">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="your@email.com"
                                autoComplete='current-email'
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter your password"
                                autoComplete='current-password'
                                onChange={(e)=> setPassword(e.target.value)}
                                />
                        </div>
                        <div className="flex justify-center space-x-4 mt-5">

                        <Button nameProp = "Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
