import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  //Este es el estado para obtener las categorias de las apis
  const [categorias, setCategorias] = useState([]);
  //Este es el state para saber en que categoria estamos seleccionados
  const [categoriaActual, setCategoriaActual] = useState({});
  //Este nos va a funcionar para poder saber en que producto estamos seleccionando
  const [producto, setProducto] = useState({});
  //Este es el state para el modal que mostraremos dependiendo del producto que tengamos seleccionado
  const [modal, setModal] = useState(false);
  //Este es el state que guarda el pedido
  const [pedido, setPedido] = useState([]);
  //Este es el state para guardar el nombre de la persona quien realizo el pedido
  const [nombre, setNombre] = useState("");
  //Este es el state para almacenar el total de todo los productos de un pedido
  const [total, setTotal] = useState(0);

  const router = useRouter();

  //Funcion para optener las categorias y que luego mandaremos a llamar en el useefect
  const obtenerCategorias = async () => {
    try {
      const { data } = await axios("/api/categorias");
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };
  //Este es el useffect para la peticion de la api
  useEffect(() => {
    obtenerCategorias();
  }, []);

  //Este effect es para que muestre una categoria al iniciar la pagina dependiendo del numero que tengamos dentro del arreglo
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  //Este es el effect para que se actualice el precio del total con forme vaya cambiando el pedido
  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  //Esta funcion es la que exportaremos asi no exportamos el set del state
  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((ctg) => ctg.id === id);
    //Como es un metodo de array lo que se debe de poner despues de la variable es [0] asi estamos accediendo al objeto dentro del arreglo.
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  //Esta es la funcion que le daremos al boton de agregar de cada producto en el apartado de producto.jsx
  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  //Funcion para ponerlo en el boton para mostrar o no el modal
  const handleSetModal = () => {
    setModal(!modal);
  };

  //Funcion para ponerlo en el boton para los pedidos
  //Aqui en el props esta medio raro por que en esta forma que le asignamos queremos decir que del objeto que tenemos no vamos a necesitar lo que esta antes de los 3 puntos y asi trae todo menos lo que esta antes
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    //Antes que todo debemos de comprobar si el producto agregado ya existe, para en el caso de que sea asi no lo dupliqu3e y solo lo sume/edite al que ya esta
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //Actualiza la cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Actualizado correctamente");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al pedido");
    }
    setModal(false);
  };

  //Esta es la funcion en la que actualiza la cantidad en el apartado de carrito
  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    handleSetModal();
  };

  const handleEliminarProducto = (id) => {
    const eliminarProducto = pedido.filter((producto) => producto.id !== id);
    setPedido(eliminarProducto);
  };

  //Funcion para mandar la orden del pedido hacia la api y que la aloje en la base de datos
  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);
      router.push('/')
      setTimeout(() => {
        toast.success('Pedido Realizado')
      }, 500);
     
      console.log(data);

      //Resetear la aplicacion
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Aqui en el value van a ir todos los states que vamos a importar */}
      <QuioscoContext.Provider
        value={{
          categorias,
          categoriaActual,
          producto,
          modal,
          pedido,
          nombre,
          total,
          handleClickCategoria,
          handleSetProducto,
          handleSetModal,
          handleAgregarPedido,
          handleEditarCantidades,
          handleEliminarProducto,
          setNombre,
          colocarOrden,
        }}
      >
        {children}
      </QuioscoContext.Provider>
    </>
  );
};
export { QuioscoProvider };
export default QuioscoContext;
