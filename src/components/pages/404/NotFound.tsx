import { Link } from "react-router-dom";

export default function NotFound (){
    
    return(
         <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-7xl font-bold text-[#4FFEB0]">404</h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-400 mt-2">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-lg bg-[#4FFEB0] text-black font-medium"
      >
        Back Home
      </Link>
    </div>
    )
}