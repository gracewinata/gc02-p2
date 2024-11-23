import logoNavbar from '../assets/logo-navbar.png'
import playButton from '../assets/play-button.png'
import music from '../assets/music.mp3'
import Card from '../components/Card'
import {Link} from 'react-router-dom'
import gifLoading from '../assets/loading.gif'


import axios from 'axios'
import { useEffect, useState } from 'react'

export default function HomePage(){
    const [products, setProducts] = useState([])
    const [sort, setSort] = useState("ASC")
    const [filter, setFilter] = useState("")
    const [categories, setCategories]= useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const pagination = getPagination()

    function getPagination(){
        let temp = []
        for (let i = 1; i <= totalPage; i++){
            temp.push(i)
        }
        return temp
    }

    function handlePrev(){
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    function handleNext(){
        if(currentPage < totalPage){
            setCurrentPage(currentPage + 1)
        }
    }

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
            const {data} = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines?limit=12&i=${filter}&sort=${sort}&q=${search}&page=${currentPage}` )

            setProducts(data.data.query)
            setTotalPage(data.data.pagination.totalPage)
            setCurrentPage(data.data.pagination.currentPage)
            
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchCategories() {
        try {
            const {data} = await axios.get('https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/categories')

            setCategories(data.data)
        } catch (error) {
            console.log(error);
        }
        
    }


    useEffect(()=>{
        fetchCategories()
    },[])

    useEffect(()=>{
        fetchData()
    },[currentPage,sort,filter,search])

    return (
        <>
        <div className = "bg-yellow-700 bg-opacity-30">
       
        {/* navbar */}
        <div className="p-5">
        <nav className="sticky top-0 z-10 p-3 bg-yellow-600 border-2 border-black rounded-md shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between w-full relative">
            {/* links */}
            <div className="flex flex-grow justify-center ml-50 space-x-6">
                <div className="group relative">
                    <Link 
                        to="/landing"
                        className="text-3xl font-bold px-6 text-white z-10 relative"
                    >
                        Home
                    </Link>
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-0">
                    </div>
                </div>

                <div className="group relative">
                    <a href="#" className="text-3xl font-bold px-6 text-white z-10 relative" onClick={() => setSort("DESC")} >
                        Sort descending
                    </a>
                    <a href="#" className="text-3xl font-bold px-6 text-white z-10 relative" onClick={() => setSort("ASC")} >
                        Sort ascending
                    </a>
                </div>
                
                <div className="group relative">
                    <a href="#" className="text-3xl font-bold px-6 z-10 relative">
                        <select onChange={(e) => setFilter(e.target.value)}> 
                            <option value="" disabled>Filter by Category</option>
                            {categories.map((c) => {
                                return (
                                    <option value={c.name}>{c.name}</option>
                                )
                            })}
                        </select>
                    </a>
                  
                </div>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <input
                    type="text"
                    placeholder="Search.."
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
        </div>
    </nav>
        </div>

        {/* loading */}
        {loading ? (
            <div className='flax justify-center mt-28'>
                <img src = {gifLoading} className='w-1/5'/>
            </div>
        ):(
            <>
            {/* Main Page */}
            <div id="Homepage" className="p-5">
            <main className="mt-5 grid grid-cols-3 gap-5 h-full w-full">
                {/* card */}
                {products.map((product)=>{
                    return(
                       <Card product={product}/>
                    )
                })}
                {/* end of card  */}
            </main>
            </div>
            {/* pagination */}
            <nav className="flex items-center justify-center gap-x-1">
                            <button
                                type="button"
                                // className="px-4 py-2 bg-amber-600 border-2 border-white hover:scale-105 hover:transform cursor-pointer text-white rounded-lg"
                                className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-amber-600 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm font-bold disabled:bg-amber-600"
                                onClick={handlePrev}
                                disabled={currentPage == 1}
                            >
                                <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                <span>Prev</span>
                            </button>
                            <div className="flex items-center gap-x-1">
                                {pagination.map((el) => {
                                    return (
                                        <>
                                            <button
                                                type="button"
                                                className={el == currentPage ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-amber-600 py-2 px-3 text-sm font-bold rounded-lg border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-amber-600 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm"}
                                                onClick={() => setCurrentPage(el)}
                                            >
                                                {el}
                                            </button>
                                        </>
                                    )
                                })}
                            </div>
                            <button
                                type="button"
                                className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-amber-600 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm font-bold disabled:bg-amber-600"
                                onClick={handleNext}
                                disabled={currentPage == totalPage}
                            >
                                <span>Next</span>
                                <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </nav>
            </>
        )}

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