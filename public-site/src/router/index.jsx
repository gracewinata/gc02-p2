import {createBrowserRouter} from 'react-router-dom' 
import HomePage from '../views/HomePage'
import DetailPage from '../views/Details'
import LandingPage from '../views/LandingPage'


const router = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/detail/:id",
        element: <DetailPage/>
    },
    {
        path:"/landing",
        element: <LandingPage/>
    }
])

export default router