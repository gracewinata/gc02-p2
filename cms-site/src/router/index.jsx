import {createBrowserRouter,redirect} from "react-router-dom"
import Toastify from 'toastify-js'
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import Categories from "../views/Categories";
import EditForm from "../views/EditForm";
import AddForm from "../views/AddForm";
import AddStaff from "../views/AddStaff";
import UploadFile from "../components/UploadFile";
import BaseLayout from "../views/BaseLayout";


const router = createBrowserRouter([
    {
        path: "/login",
        element:<LoginPage/>,
        loader: ()=>{
            if(localStorage.access_token){
                // Toastify({
                //     text: "Please log in first",
                //     duration: 3000,
                //     newWindow: true,
                //     close: true,
                //     gravity: "bottom", // `top` or `bottom`
                //     position: "right", // `left`, `center` or `right`
                //     stopOnFocus: true, // Prevents dismissing of toast on hover
                //     style: {
                //         background: "#F87171",
                //         color: "#000000"
                //     }
                // }).showToast();
                return redirect('/') 
            }

            return null
        }
    },
    {
        element:<BaseLayout/>,
        loader: ()=>{
            if(!localStorage.access_token){
                Toastify({
                    text: "Please log in first",
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
                return redirect('/login')
            }
            return null
        },
        children: [
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path: "/categories",
                element:<Categories/>
            },
            {
                path: "/edit/:id",
                element:<EditForm/>
            },
            {
                path: "/addForm",
                element:<AddForm/>,

            },
            {
                path: "/upload/:id",
                element:<UploadFile/>
            },
            {
                path: "/add-user",
                element: <AddStaff/>
            }
        ]
    }
]
)

export default router