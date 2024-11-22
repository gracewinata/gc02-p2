import logoLanding from '../assets/logo-landing.png'
import {Link} from 'react-router-dom'

export default function LandingPage(){
    return(
        <>
        <div className="bg-yellow-700 bg-opacity-50">

        <div className="w-full h-screen flex justify-center items-center flex-col">
        <div>
            <img src={logoLanding} alt="Logo" className="scale-150" />
        </div>
       
            <div className="bg-yellow-600 border-2 border-black rounded-md shadow-md p-6 mt-40 hover:bg-yellow-500 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
           
                <Link to ="/" className="text-4xl font-bold text-white flex justify-center items-center">Yuk mampir</Link>
            
            </div>
        
        </div>
        </div>

        </>
    )
}