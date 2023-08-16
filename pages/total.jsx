import Layout from "../layout/Layout";
import { useCallback, useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const Total = () => {

    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco()

    //Esto es para comprobar que el nombre de la person a no este vacio al igual que lo pedidos para no enviar pedidos vacios o pedidos sin un nombre de la persona
    const comprobarPedido = useCallback (() => {
        return pedido.length===0 || nombre === ''
    })

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido]);

   
    return (
        <Layout pagina={' Total'}>
            <h1 className="text-4xl font-black">Confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>
            
            <form onSubmit={colocarOrden}>
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} type="text" className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md" />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: {' '} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

            {comprobarPedido() ?
               null :<div className="mt-10">
                <input value='Confirmar Pedido' type="submit" className="w-full lg:w-auto px-5 py-3 text-white bg-indigo-600 hover:bg-indigo-800 rounded uppercase font-bold text-center hover:cursor-pointer" disabled={comprobarPedido()} />
            </div>
}
            </form>
        </Layout>
    );
}

export default Total;
