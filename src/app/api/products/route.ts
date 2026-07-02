import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({
      products: [],
    });
  }

  const productIds = ids
    .split(",")
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id));

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json({
    products,
  });
}