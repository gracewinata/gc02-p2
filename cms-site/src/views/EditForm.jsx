import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Toastify from 'toastify-js'
// import ProductForm from "../components/productForm"
import ProductForm from "../components/productForm"
import axios from 'axios'

export default function EditForm(){
    // const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()
    

    async function handleSubmit(e,name, description, price, imgUrl, categoryId){
        console.log(name);
        
        e.preventDefault()
        try {
            const body = {name, description, price:+price, imgUrl, categoryId:+categoryId }
            
            const {data} = await axios.put(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, body,{
                headers:{
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            navigate('/')
            Toastify({
                text: `Succedd edit product`,
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

 

    async function fetchData(){
        try {
            const {data} = await axios.get(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.access_token}`
                }
            })

            setProduct(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    
 
    return(
        <>
            <ProductForm product = {product} handleSubmit= {handleSubmit} nameProp = "Edit Product"/>
        </>
    )
}