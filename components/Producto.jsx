import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({producto}) => {
    const {handleSetProducto, handleSetModal}= useQuiosco()
    return (
        <>
            <div className='border p-3'>
                <Image priority width={400} height={500} src={`/assets/img/${producto.imagen}.jpg`} alt={`Imagen producto ${producto.nombre}`} />
                <div className="p-5">
                    <h3 className="text-2xl font-bold">{producto.nombre}</h3>
                    <p className="mt-5 font-black text-4xl text-yellow-400">{formatearDinero(producto.precio)}</p>

                    <button type="button" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold" onClick={()=>{handleSetModal(); handleSetProducto(producto);}}>
                        Agregar
                    </button>
                </div>
            </div>
        </>
    );
}

export default Producto;
