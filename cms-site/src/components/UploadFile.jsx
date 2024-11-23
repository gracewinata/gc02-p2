import Button from "./Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Toastify from 'toastify-js'
import axios from "axios";
import gifLoading from "../assets/loading.gif"


export default function UploadFile(product){
    const navigate = useNavigate()
    const [upload, setUpload] = useState('')
    const {id} = useParams()
    const [loading,setLoading] = useState(false)

    async function handleUpload(e){
        try {
            e.preventDefault()
            setLoading(true)
  
            const formData = new FormData()
            formData.append('file', upload)
            
            const {data} = await axios.patch(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, formData, {
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate('/')

            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#008000",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        } catch (error) {
            console.log(error);
            
            Toastify({
                text: error.response.data.error,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#FF0000",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        } finally{
            setLoading(false)
        }
    }
    return(
        <>
        <div className="bg-blue-500 bg-opacity-30">
        <div className="min-h-screen flex items-center justify-center w-full p-5">
        <div className="rounded-lg px-8 py-6 w-1/3 bg-blue-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {/* <div className="max-w-sm mx-auto bg-blue-400 p-5 rounded-lg shadow-lg"> */}
                <div className="w-full sm:w-auto py-2 px-4 border-2 border-black text-sm font-medium bg-yellow-500 text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-bold  text-center">Update Image</h2>
                
               

                </div>
                <form onSubmit = {handleUpload}>
                        <div className="mb-4 mt-10">
                            <label htmlFor="upload" className="block text-sm font-medium">
                                Choose File
                            </label>
                            <input
                                type="file"
                                id="upload"
                                className="rounded-4xl w-full px-3 py-2 border-2 border-black bg-white rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="no file selected"
                                onChange={(e)=> setUpload(e.target.files[0])}
                                />
                        </div>


                        {/* button */}
                        <div className="flex justify-center space-x-4 mt-5">
        
                        {/* <button className="w-full sm:w-auto py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105">
                            Update Image
                        </button> */}
                        <Button nameProp={"Upload"}/>

                        <Link to = "/" className="w-full sm:w-auto py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium bg-white text-gray-700 hover:bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105">
                            Cancel
                        </Link>
                        </div>

                </form>

                
                {loading && (
                    <div className="flex justify-center items-center mt-5">
                        <img src = {gifLoading}/>
                    </div>
                )}
            {/* </div> */}
        </div>
        </div>
        </div>

        </>
    )
}