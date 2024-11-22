import axios from 'axios'
import {useEffect, useState} from "react"
import { Link, useParams } from 'react-router-dom'
import Toastify from 'toastify-js'


export default function HomePage(){
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    async function fetchData(){
        try {
            const {data} = await axios.get('https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines', {
                headers: {Authorization: `Bearer ${localStorage.access_token}`}
            })

            setProducts(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete(id){
        try {
            const {data} = await axios.delete(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, {
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            fetchData()
            Toastify({
                text: `Succedd delete data`,
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
        }
    }
   function formatCurrency(number){    
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }        

    function handleLogout(){
        localStorage.clear()
    }
    
    


    useEffect(()=>{
        fetchData()
    },[])


    const lastProduct = currentPage * itemsPerPage
    const firstProduct = lastProduct - itemsPerPage
    const currentProducts = products.slice(firstProduct, lastProduct)

    const totalPages = Math.ceil(products.length / itemsPerPage)

    async function handlePagination(page){
        try {
            if (page >= 1 && page <= totalPages){
                setCurrentPage(page)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {/* body */}
        <div className="min-h-screen bg-blue-500 bg-opacity-30">
        
         
                <div className="flex justify-center items-center font-bold text-6xl">
                    <span className='mt-10'>List of All Products</span>
                </div>
       

            <div className="flex items-center justify-center w-full p-4">
            <div className="rounded-lg m-10 mb-40 p-5 w-screen bg-blue-400 bg-opacity-50 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-end mb-5">
           
            <Link to="/addForm" className='py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105'>
                + New Item
            </Link>   
            </div>

        {/* products */}
        <table>
            {/* table header */}
            <thead>
            <tr  className="border-2 border-black bg-amber-400 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Description</th>
                {/* <th className="px-4 py-2">Stock</th> */}
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>

            {/* table body */}
            <tbody>
            {/* data */}
            {currentProducts.map((product)=>{
                return(
                    <tr className="border-black bg-white bg-opacity-40" key={product.id}>       
                        <td className="w-screen border-black border-2 px-4 py-2 text-center">{product.id}</td>
                        
                        <td className="w-screen border-black border-2 px-4 py-2 text-center">{product.name}</td>
                        <td className=" w-screen border-black border-2 px-4 py-2 text-center">
                        <div className=' w-30 border-2 border-black'>
                        <img
                             src={product.imgUrl}
                             alt="Product"
                             className="w-40 h-auto mx-auto"
                             />
                        </div>
                        </td>
                        <td className="w-screen border-black border-2 px-4 py-2 text-center">{product.description}</td>
                        {/* <td className="px-4 py-2 text-center">{product.stock}</td> */}
                        <td className="w-screen border-black border-2 px-4 py-2 text-center font-bold">{formatCurrency(product.price)}</td>
                        <td className="w-screen border-black border-2 px-4 py-2 text-center">{product.User.username}</td>
                        <td className="w-screen border-black border-2 px-4 py-2 text-center">
                        <div className="w-50 flex justify-center space-x-3">
                            <a  className="cursor-pointer text-white font-bold material-symbols-outlined border-2 border-black p-3 bg-red-700 bg-opacity-90 rounded-lg transition-all duration-200 transform hover:scale-105" onClick={() => handleDelete(product.id)}>
                            delete
                            </a>
                            <Link to={`/edit/${product.id}`} className="text-white font-bold material-symbols-outlined border-2 border-black p-3 bg-green-700 bg-opacity-90 rounded-lg transition-all duration-200 transform hover:scale-105">
                            edit
                            </Link>
                            <Link to = {`/upload/${product.id}`} className="text-white font-bold material-symbols-outlined border-2 border-black p-3 bg-yellow-500 bg-opacity-90 rounded-lg transition-all duration-200 transform hover:scale-105">
                            image
                            </Link>
                        </div>
                        </td>
                    </tr>
                )
            })}

            </tbody>
        </table>

            {/* pagination */}
            
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={() => handlePagination(currentPage - 1)} 
                className="px-4 py-2 bg-amber-600 border-2 border-white hover:scale-105 hover:transform cursor-pointer text-white rounded-lg"
                disabled={currentPage === 1}>
                Prev
              </button>
              <span className="py-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
              <button 
                onClick={() => handlePagination(currentPage + 1)} 
                className="px-4 py-2 bg-amber-600 border-2 border-white hover:scale-105 hover:transform cursor-pointer text-white rounded-lg"
                disabled={currentPage === totalPages}>
                Next
              </button>
            </div>

        

        </div>
        </div>
        </div>

        </>

    )
}