import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const ordenes = await prisma.order.findMany({where:{estado: false}});
  res.status(200).json(ordenes);

  //Asi es como se agrega un pedido a la base de datos con prisma
  if (req.method === "POST") {
    const orden = await prisma.order.create({
      data: {
        nombre: req.body.nombre,
        total: parseFloat(req.body.total),
        pedido: req.body.pedido,
        fecha: req.body.fecha,
      },
    });
    res.status(200).json(orden);
  }else{
    //Asi es como se optiene las ordenes de la base de datos
 
  }
}
