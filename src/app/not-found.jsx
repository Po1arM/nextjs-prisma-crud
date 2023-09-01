import Link from "next/link";
function NotFound(){
    return(
        
       <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
        <div className="text-4xl font-bold text-center">
            <div className="flex justify-center items-center gap-10"> 
                <h1>404</h1>
                <h2>Page Not Found</h2>
            </div>
            <Link href="/" className="font-bold text-2xl text-slate-500 hover:text-slate-400">Volver a la pagina inicial</Link>

        </div>

       </section> 

    )
}

export default NotFound;