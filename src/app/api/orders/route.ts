import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

type OrderRequestBody = {
  items: {
    productId: number;
    quantity: number;
  }[];
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod: "credit_card";
};

function createOrderNumber() {
  const now = Date.now();
  return `ORD-${now}`;
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "You must be logged in to place an order." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as OrderRequestBody;

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty." },
        { status: 400 },
      );
    }

    if (!body.shippingName || !body.shippingAddress || !body.shippingPhone) {
      return NextResponse.json(
        { message: "Shipping information is missing." },
        { status: 400 },
      );
    }

    const validItems = body.items.filter((item) => {
      return item.productId > 0 && item.quantity > 0;
    });

    if (validItems.length === 0) {
      return NextResponse.json(
        { message: "No valid cart items found." },
        { status: 400 },
      );
    }

    const productIds = validItems.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No valid products found." },
        { status: 400 },
      );
    }

    const totalAmount = validItems.reduce((total, item) => {
      const product = products.find(
        (currentProduct) => currentProduct.id === item.productId,
      );

      if (!product) {
        return total;
      }

      return total + product.price * item.quantity;
    }, 0);

    const orderItems = validItems
      .map((item) => {
        const product = products.find(
          (currentProduct) => currentProduct.id === item.productId,
        );

        if (!product) {
          return null;
        }

        return {
          productId: product.id,
          quantity: item.quantity,
          unitPrice: product.price,
        };
      })
      .filter((item) => item !== null);

    if (orderItems.length === 0) {
      return NextResponse.json(
        { message: "No valid order items found." },
        { status: 400 },
      );
    }

    const order = await prisma.order.create({
      data: {
        userId: currentUser.id,
        orderNumber: createOrderNumber(),
        totalAmount,
        status: "pending",
        shippingName: body.shippingName,
        shippingAddress: body.shippingAddress,
        shippingPhone: body.shippingPhone,
        paymentMethod: body.paymentMethod,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong while creating the order." },
      { status: 500 },
    );
  }
}