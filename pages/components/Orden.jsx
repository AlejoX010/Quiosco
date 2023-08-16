import Image from "next/image";
import { formatearDinero } from "../../helpers";
import axios from "axios";
import {toast} from 'react-toastify'

const Orden = ({orden}) => {

    const completarOrden = async () => {
        try {
            const {data} = await axios.post(`/api/ordenes/${orden.id}`)
            toast.success('Orden Lista')
        } catch (error) {
            toast.error('Un error fatal ah ocurrido')
            console.log(error);
        }
    }

    return (
        <div className="border p-10 space-y-5">
          <h3 className="text-2xl font-bold">Orden: {orden.id}</h3>
          <p className="text-lg font-bold">Cliente: {orden.nombre}</p>

          <div>
            {orden.pedido.map(platillo => (
                <div key={platillo.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                    <div className="w-32">
                        <Image width={400} height={500} src={`/assets/img/${platillo.imagen}.jpg`} alt="Imagen platillo" /> 
                    </div>
                    <div className="p-5 space-y-2">
                        <h4 className="text-xl font-bold text-yellow-600">{platillo.nombre}</h4>
                    <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
                    </div>
                </div>
            ))}
          </div>
          <div className="md:flex md:items-center md:justify-between my-10">
            <p className="mt-5 font-black text-4xl">Total a pagar: <span className="text-yellow-600">{formatearDinero(orden.total)}</span></p>
            <button type="button" className="bg-blue-700 hover:bg-blue-900 text-white p-3 rounded-md mt- md:mt-0 uppercase font-semibold w-auto" onClick={completarOrden}>
                Completar Pedido
            </button>
          </div>
        </div>
    );
}

export default Orden;
