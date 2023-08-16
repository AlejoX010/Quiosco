import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const ordenActualizada = await prisma.order.update({
      where: { id: parseInt(req.query.id) },
      data: {estado:true},
    });
    res.status(200).json(ordenActualizada)
  }
}
