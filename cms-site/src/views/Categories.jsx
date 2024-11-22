import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Toastify from 'toastify-js'


export default function Categories(){
    const [categories, setCategories] = useState([])

    async function fetchCategories(){
        try {
            const {data} = await axios.get('https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories', {
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setCategories(data.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchCategories()
    },[])

    return(
        <>
        <div className="bg-blue-500 bg-opacity-30">

        <div className="flex justify-center items-center font-bold text-6xl">
            <span>List of All Categories</span>
        </div>
        <div className="h-full flex items-center justify-center w-full p-5">

            <div className="m-10 p-5 w-screen bg-blue-400 bg-opacity-50 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <table className="table-auto w-full border-collapse">
                {/* table header */}
                <thead className="border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <tr className="bg-amber-400">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                </tr>
                </thead>


                {/* table body */}
                <tbody>
                {categories.map(category=>{
                
                    return(
              
                <tr className="border-b" key={category.id}>
                    <td className="px-4 py-2 text-center font-bold">{category.id}</td>
                    <td className="px-4 py-2 text-center font-bold">{category.name}</td>
                </tr>

                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
        </div>

        </>
    )
}