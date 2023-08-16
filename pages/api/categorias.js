import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  //Aqui se le pone include a productos para que desde el mimso categoria tengamos acceso a los productos ya filtrados por su categoria
  const categorias = await prisma.categoria.findMany({include:{productos:true}})
  res.status(200).json(categorias)
}
