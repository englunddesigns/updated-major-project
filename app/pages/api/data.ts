import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  let whereClause: Prisma.shipWhereInput[] = [];
  if (query) {
    for (const key in query) {
      whereClause.push({
        [key]: {
          contains: query[key],
        },
      });
    }
  }
  const where = whereClause.length
    ? {
        where: {
          OR: whereClause,
        },
      }
    : undefined;
  const result = await prisma.ship.findMany(where);
  res.status(200).json(result);
}
