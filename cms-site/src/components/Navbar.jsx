import {Link, useNavigate} from 'react-router-dom'


export default function Navbar(){
    const navigate = useNavigate()

    function handleLogout(){
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
        {/* navbar */}
        <div className="bg-blue-500 bg-opacity-30 p-5">
        <nav className="flex justify-center font-bold text-2xl space-x-20 rounded-lg p-7 ml-10 mr-10 bg-blue-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <Link className="border-2 cursor-pointer border-black p-3 bg-amber-400 bg-opacity-90 rounded-lg transition-all duration-200 transform hover:scale-105">
                Home
            </Link>
            <Link to = "/categories" className="border-2 cursor-pointer border-black p-3 bg-amber-400 bg-opacity-90 rounded-lg transition-all duration-200 transform hover:scale-105">
                Categories
            </Link>
            <Link to = "/add-user" className="border-2 cursor-pointer border-black p-3 bg-amber-400 bg-opacity-90 rounded-lg transition-all duration-200 transform hover:scale-105">
                Add Staff
            </Link>
            <Link className="border-2 cursor-pointer border-black p-3 bg-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                onClick = {handleLogout}>
                Logout
            </Link>
  
            </nav>
        </div>
        </>
    )
}