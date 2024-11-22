export default function Button ({nameProp}){
    return (
        <button className="w-full sm:w-auto py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:scale-105">{nameProp}</button>
    )
}