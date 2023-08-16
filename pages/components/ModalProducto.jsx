import Image from "next/image";
import useQuiosco from "../../hooks/useQuiosco";
import { formatearDinero } from "../../helpers";
import { useState, useEffect } from "react";

const ModalProducto = () => {
  const { producto, pedido, handleSetModal, handleAgregarPedido } =
    useQuiosco();
  //Este estate nos va a funcionar para ver que cantidad de cada producto vamos a querer
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  //Este effect es para que actualice el estado de edicion
  useEffect(() => {
  //Condicional para ver si el producto ya se agrego al pedido para actualizar la cantidad a la cantidad que ya se pidio
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
        const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
        setEdicion(true)
        setCantidad(productoEdicion.cantidad)
    }
  }, [producto, pedido]);

  

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          src={`/assets/img/${producto.imagen}.jpg`}
          alt="producto cafeteria"
        />
      </div>

      <div className="md:w-2/3">
        <div className="flex justify-end">
          {/* Como pasa directamente lo podemos poner sin callback */}
          <button type="button" onClick={handleSetModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-yellow-400">
          {formatearDinero(producto.precio)}
        </p>
        <div className="mt-5 flex gap-4">
          <button
            type="button"
            onClick={() => {
              cantidad > 1 && setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <p className="text-2xl font-bold">{cantidad}</p>

          <button
            type="button"
            onClick={() => {
              cantidad < 10 && setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {/* No le entendi muy bien al pedo este de los 3 puntos pero es para que el objeto de producto y el de cantidad se unan en uno mismo */}
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white p-3 font-bold w-full mt-5 uppercase"
          onClick={() => {handleAgregarPedido({ ...producto, cantidad }); handleSetModal}}
        >
          {edicion ? 'Guardar Cambios': 'Añadir'}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
