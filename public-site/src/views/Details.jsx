import logoNavbar from '../assets/logo-navbar.png'
import playButton from '../assets/play-button.png'
import music from '../assets/music.mp3'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function DetailPage(){
    const [product, setProduct] = useState({})
    const {id} = useParams()

    function playRadio(){
        const audio = document.getElementById('radioMusic');
        if (audio.paused) {
            audio.play(); 
        } else {
            audio.pause(); 
        }
    }

    async function fetchData(){
        try {
            const {data} = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines/${id}`)
            setProduct(data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])




    return (
        <>
        <div className = "bg-yellow-700 bg-opacity-30">
       
        {/* navbar */}
        <div className="flex justify-center p-5">
            <nav className="sticky top-0 z-10 p-10 bg-yellow-600 border-2 border-black rounded-md shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <span className='text-white font-bold text-4xl'>{product.name}</span>
            </nav>
        </div>


        {/* Main Page */}
        <div id="Homepage" className="p-5 min-h-screen">
        <main className="mt-5 grid grid-cols-1 gap-5 h-full w-full">
            {/* card details */}
            <div className="flex bg-yellow-600 bg-opacity-40 border-2 border-black p-5">
            <div className="mr-5">
                    <img
                    src={product.imgUrl}
                    alt="product image"
                    className="border-2 border-black rounded-md h-auto w-auto"
                    />
            </div>
            <div className="w-screen">
                    <span className="text-2xl font-bold">{product.name}</span>
                    <hr className="h-px my-2 bg-black border-0" />
                    <p className="text-2xl">
                    {" "}
                    {product.description}
                    </p>
                    <br />
                    <br />
                    {/* button */}
                    <div className='flex justify-center'>
                        <Link to='/' className=" text-white text-2xl p-5 bg-yellow-600 border-2 border-black rounded-md shadow-[2px_2px_0px_rgba(0,0,0,1)] inline-flex justify-center items-center w-full max-w-xs mx-auto cursor-pointer transition-all hover:bg-yellow-500 hover:scale-105 hover:shadow-lg">Back to Home</Link>
                    </div>
                    {/* end of button */}
                </div>
            </div>


        </main>
        </div>

        {/* Footer */}
        <div className="p-5">
            <footer className="sticky top-0 z-10 p-3 bg-yellow-600 border-2 border-black rounded-md shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
                <div className="group relative">
                <div className="text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>KLIK UNTUK DENGAR RADIO</span>
                </div>
                <br />
                <div className="flex justify-center">
                     {/* radio */}
                    <audio id="radioMusic" className="w-full" loop="">
                        <source src={music} type="audio/mpeg" />
                    </audio>
                    <img
                        src={playButton}
                        alt="Play"
                        className="h-12 scale-150 cursor-pointer"
                        onClick={playRadio}
                    />
                </div>
                </div>
            </div>
            <br />
            <div className="flex text-lg text-white justify-center">
                <span>COPYRIGHT 2024</span>
            </div>
            </footer>
        </div>
    
        </div>
        </>

    )
}