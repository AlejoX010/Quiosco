import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import Image from "next/image";
import { formatearDinero } from "../helpers";

const Carrito = () => {
  const { pedido, handleEditarCantidades, handleEliminarProducto } = useQuiosco();
  return (
    <Layout pagina={" Resumen"}>
      <h1 className="text-4xl font-black">Carrito</h1>
      <p className="text-2xl my-10">
        {" "}
        {pedido?.length === 0
          ? "Favor de agregar productos a su carrito en el apartado de menú"
          : "Revisa tu pedido"}
      </p>
      {pedido?.length === 0 ? (
        <div className="flex flex-col justify-center mt-20">
          <Image
          priority
            width={200}
            height={200}
            src={`/assets/img/shoppingcart1_114878.svg`}
            alt="Imagen carrito"
          />
          <h1 className="text-center font-bold text-4xl ml-16">
            Carrito vacio
          </h1>
        </div>
      ) : (
        pedido.map((producto) => (
          <div key={producto.id}  className="shadow p-5 flex gap-10 items-center mb-3">
            <div className="md:w-1/6">
              <Image
                width={300}
                height={400}
                src={`/assets/img/${producto.imagen}.jpg`}
                alt="Imagen producto"
              />
            </div>

            <div key={producto.id} className="md:w-4/6">
              <p className="text-4xl font-bold">{producto.nombre}</p>
              <p className="text-2xl font-bold mt-2">
                Cantidad: {producto.cantidad}
              </p>
              <p className="text-2xl font-bold text-yellow-500 mt-2">
                Precio: {formatearDinero(producto.precio)}
              </p>
              <p className=" font-semibold text-base text-gray-500 mt-2">
                Subtotal: {formatearDinero(producto.precio * producto.cantidad)}
              </p>
            </div>

            <div>
              <button
                type="button"
                className="flex gap-2 bg-sky-700 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full "
                onClick={()=>{handleEditarCantidades(producto.id)}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                Editar
              </button>
              <button
                type="button"
                className="flex gap-2 bg-red-700 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full mt-3 "
                onClick={()=>{handleEliminarProducto(producto.id)}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
};

export default Carrito;
