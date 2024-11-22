import {Link} from 'react-router-dom'


export default function Card({product}){
    return (
        <>
        <div className="flex bg-yellow-600 bg-opacity-40 border-2 border-black p-5">
                <div className="mr-5">
                    <img
                    src={product.imgUrl}
                    alt="product image"
                    className="border-2 border-black rounded-md] h-auto w-screen"
                    />
                </div>
                <div className="w-screen">
                    <span className="text-2xl font-bold">{product.name}</span>
                    <hr className="h-px my-2 bg-black border-0" />
                    <p className="text-2xl">
                    {" "}
                    {product.description}
                    </p>
                    <br />
                    <br />
                    {/* button */}
                    <div>
                        <Link to={`/detail/${product.id}`} className="text-white text-2xl p-5 bg-yellow-600 border-2 border-black rounded-md shadow-[2px_2px_0px_rgba(0,0,0,1)] inline-flex justify-center items-center w-full max-w-xs mx-auto cursor-pointer transition-all hover:bg-yellow-500 hover:scale-105 hover:shadow-lg">Detail</Link>
                    </div>
                    {/* end of button */}
                </div>
                </div>
        
        </>
    )
}