import Layout from "./layout/Layout"
//import { PrismaClient } from '@prisma/client'
import useQuiosco from "../hooks/useQuiosco"
import Producto from "./components/Producto"


export default function Home({categorias}) {
  const { categoriaActual} = useQuiosco()
  
  return (
    <>
    {/* Se le debe de poner el signo de interrogacion ya que al cargar la pagina no tiene nada pero al sengundo si lo tendra asi que por eso se le deja asi eso quiere decir que si no hay nada que siga con el proceso pero como luego al momento carga algo por eso no muestra en blanco  */}
    <Layout pagina={categoriaActual?.nombre}>
      {/* Lo que este aqui adentro es lo que le va a pasar como children al layout */}
      <h1 className="text-5xl font-black ">{categoriaActual?.nombre}</h1> 
      <p className="my-10 text-xl">Elige y personaliza tu pedido a continuación</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {categoriaActual?.productos?.map(producto => (
        <Producto key={producto.id} producto={producto} />
      ))}
      </div>
    </Layout>
    </>
  )
}   

/*Esta es la forma en la que se pueden consultar la informacion de la base de datos para exportarla con el cliente sin la necesidad de una api
export const getServerSideProps = async () => {
  const prisma = new PrismaClient()
  const categorias = await prisma.categoria.findMany()
  return{
    props: {
      categorias,
    }
  }
}*/