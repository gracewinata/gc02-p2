import axios from 'axios'

import Toastify from 'toastify-js'
import { useNavigate } from 'react-router-dom'
// import ProductForm from '../components/productForm'
import ProductForm from '../components/productForm'


export default function AddForm(){
    const navigate = useNavigate()


    async function handleSubmit(e, name, description, price, imgUrl, categoryId){
        e.preventDefault()
        try {
            const {data} = await axios.post(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines`,
                {name, description, price:+price, imgUrl, categoryId:+categoryId},
                {
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            navigate('/')

            Toastify({
                text: `Succeed add data ${data.data.name}`,
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
                onClick: function (){}
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
        // <>
        // <div className="bg-blue-500 bg-opacity-30">
        // <div className="min-h-screen flex items-center justify-center w-full p-5">
        // <div className="rounded-lg px-8 py-6 w-1/3 bg-blue-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        //     {/* <div className="max-w-sm mx-auto bg-blue-400 p-5 rounded-lg shadow-lg"> */}
        //         <div className="w-full sm:w-auto py-2 px-4 border-2 border-black text-sm font-medium bg-yellow-500 text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        //         <h2 className="text-2xl font-bold  text-center">New Product</h2>
                
        //         </div>
        //         <form onSubmit={handleSubmit}>
        //                 <div className="mb-4 mt-10">
        //                     <label htmlFor="name" className="block text-sm font-medium ">
        //                         Name
        //                     </label>
        //                     <input
        //                         type="text"
        //                         id="name"
        //                         className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        //                         placeholder="Enter product name"
        //                         onChange={(e)=>setName(e.target.value)}
        //                         />
        //                 </div>


        //                 <div className="mb-4">
        //                 <label htmlFor="category" className="block text-sm font-medium">
        //                     Category
        //                 </label>
        //                 <select
        //                     id="category"
        //                     className="rounded-2xl w-full px-3 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        //                     onChange={(e)=>setCategoryId(e.target.value)}
        //                     >
        //                         <option value="" disabled selected> --- Select a category --- </option>
        //                     {categories.map(el=>{
        //                         return(
        //                             <>
        //                             <option value={el.id}>{el.name}</option>
        //                             </>
        //                 )
        //             })}
        //                 </select>



        //                 </div>

        //                 <div className="mb-4">
        //                     <label htmlFor="description" className="block text-sm font-medium ">
        //                         Description
        //                     </label>
        //                     <input
        //                         type="text"
        //                         id="description"
        //                         className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        //                         placeholder="Enter product description"
        //                         onChange={(e)=>setDescription(e.target.value)}
        //                         />
        //                 </div>

        //                 <div className="mb-4">
        //                     <label htmlFor="name" className="block text-sm font-medium ">
        //                         Price
        //                     </label>
        //                     <input
        //                         type="number"
        //                         id="price"
        //                         className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        //                         placeholder="Enter product price"
        //                         onChange={(e)=>setPrice(e.target.value)}
        //                         />
        //                 </div>

        //                 <div className="mb-4">
        //                     <label htmlFor="imageUrl" className="block text-sm font-medium ">
        //                         Image
        //                     </label>
        //                     <input
        //                         type="text"
        //                         id="imageUrl"
        //                         className="rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        //                         placeholder="Enter product image url"
        //                         onChange={(e)=>setImageUrl(e.target.value)}
        //                         />
        //                 </div>

        //                 {/* button */}
        //                 <div className="flex justify-center space-x-4 mt-5">
        
        //                 <button type="submit" className="w-full sm:w-auto py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105">
        //                     Add Item
        //                 </button>

        //                 <Link to ="/" className="w-full sm:w-auto py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium bg-white text-gray-700 hover:bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105">
        //                     Cancel
        //                 </Link>
        //                 </div>

        //         </form>
        //     {/* </div> */}
        // </div>
        // </div>
        // </div>

        // </>
        <>
            <ProductForm handleSubmit = {handleSubmit} nameProp = "Add Item"/>
        </>
    )
}