import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function ProductForm({product, handleSubmit, nameProp}){
    const [categories, setCategories] = useState([])

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [categoryId, setCategoryId] = useState(0)

    async function fetchCategories(){
        try {
            const {data} = await axios.get('https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories',{
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
    }, [])

    useEffect(()=>{
        if(product){
            setName(product?.name)
            setDescription(product?.description)
            setPrice(product?.price)
            setImgUrl(product?.imgUrl)
            setCategoryId(product?.categoryId)
        }
    },[product])

    return (
        <>
        <div className="bg-blue-500 bg-opacity-30">
        <div className="min-h-screen flex items-center justify-center w-full p-5">
        <div className="rounded-lg px-8 py-6 w-1/3 bg-blue-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {/* <div className="max-w-sm mx-auto bg-blue-400 p-5 rounded-lg shadow-lg"> */}
                <div className="w-full sm:w-auto py-2 px-4 border-2 border-black text-sm font-medium bg-yellow-500 text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-bold  text-center">{nameProp}</h2>
                
                </div>
                <form onSubmit={(e) => handleSubmit(e,name, description, price, imgUrl, categoryId)}>
                        <div className="mb-4 mt-10">
                            <label htmlFor="name" className="block text-sm font-medium ">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter product name"
                                onChange={(e)=>setName(e.target.value)}
                                value={name}
                                />
                        </div>


                        <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            className="rounded-2xl w-full px-3 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e)=>setCategoryId(e.target.value)}
                            value = {categoryId}
                            >
                                <option value="" disabled selected> --- Select a category --- </option>
                            {categories.map(el=>{
                                return(
                                    <>
                                    <option value={el.id} key = {el.id}>{el.name}</option>
                                    </>
                        )
                    })}
                        </select>



                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium ">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter product description"
                                onChange={(e)=>setDescription(e.target.value)}
                                value={description}
                                />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium ">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter product price"
                                onChange={(e)=>setPrice(e.target.value)}
                                value={price}
                                />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="imageUrl" className="block text-sm font-medium ">
                                Image
                            </label>
                            <input
                                type="text"
                                id="imageUrl"
                                className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter product image url"
                                onChange={(e)=>setImgUrl(e.target.value)}
                                value={imgUrl}
                                />
                        </div>

                        {/* button */}
                        <div className="flex justify-center space-x-4 mt-5">
        
                       <Button nameProp={nameProp}/>

                        <Link to ="/" className="w-full sm:w-auto py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium bg-white text-gray-700 hover:bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105">
                            Cancel
                        </Link>
                        </div>

                </form>
            {/* </div> */}
        </div>
        </div>
        </div>

        </>
    )
}