import { useRouter } from "next/router";
import useQuiosco from "../hooks/useQuiosco";
import { toast } from "react-toastify";


const pasos = [
    {paso:1, nombre:'Menú', URL:'/'},
    {paso:2, nombre:'Carrito', URL:'/carrito'},
    {paso:3, nombre:'Datos y total', URL:'/total'}

]

const Pasos = () => {
    //Esta variable la usaremos para el tema del routin que viene con un hook que ya nos trae next por default
    const router = useRouter()
    const {pedido} = useQuiosco()
  
    return (
        <>
            <div className="flex justify-between my-10 mx-5">
                {pasos.map(paso=>(
                    <button onClick={()=> {router.pathname === '/carrito' || router.pathname === '/total' ? router.push(paso.URL) : pedido.length === 0 ? toast.warning('Carrito vacio') : router.push(paso.URL) }} key={paso.paso} type="" className="text-2xl font-bold ">
                        {paso.nombre}
                    </button>
                ))}
            </div>

            <div className="bg-gray-100 mb-10">
                <div className={`rounded-full bg-yellow-500 text-xs leading-none h-2 text-center text-white ${router.pathname === '/' ? 'w-1/12': router.pathname === '/carrito'?'w-6/12':'w-full'}`} >

                </div>
            </div>
        </>
    );
}

export default Pasos;
