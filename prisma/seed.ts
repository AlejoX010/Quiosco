import { categorias } from './data/categorias'
import { productos } from './data/productos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//Esta es la funcion para poder hacer el crud a la base de datos
const main = async () : Promise<void> => {
    try {
        await prisma.categoria.createMany({data:categorias})
        await prisma.producto.createMany({data:productos})
    } catch (error) {
        console.log(error);
        
    }
}
main()