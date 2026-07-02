import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const lighting = await prisma.category.create({
    data: {
      name: "Lighting",
      slug: "lighting",
      description: "Modern lamps and ambient lighting products.",
    },
  });

  const furniture = await prisma.category.create({
    data: {
      name: "Furniture",
      slug: "furniture",
      description: "Minimal furniture for home and office spaces.",
    },
  });

  const decor = await prisma.category.create({
    data: {
      name: "Decor",
      slug: "decor",
      description: "Decorative objects for calm and beautiful interiors.",
    },
  });

  const workspace = await prisma.category.create({
    data: {
      name: "Workspace",
      slug: "workspace",
      description: "Desk accessories and workspace essentials.",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Nordic Desk Lamp",
        description:
          "A compact desk lamp with a minimal Nordic design, ideal for reading and focused work.",
        price: 49.99,
        stock: 18,
        imageUrl: "/products/nordic-desk-lamp.jpg",
        categoryId: lighting.id,
        isFeatured: true,
      },
      {
        name: "Ceramic Table Lamp",
        description:
          "A warm ceramic table lamp designed to add soft light to bedrooms and living rooms.",
        price: 64.99,
        stock: 12,
        imageUrl: "/products/ceramic-table-lamp.jpg",
        categoryId: lighting.id,
        isFeatured: true,
      },
      {
        name: "Minimal Floor Lamp",
        description:
          "A slim floor lamp with a clean silhouette for modern living spaces.",
        price: 89.99,
        stock: 7,
        imageUrl: "/products/minimal-floor-lamp.jpg",
        categoryId: lighting.id,
        isFeatured: false,
      },
      {
        name: "Oak Side Table",
        description:
          "A small oak side table for sofas, reading corners and bedside use.",
        price: 129.99,
        stock: 6,
        imageUrl: "/products/oak-side-table.jpg",
        categoryId: furniture.id,
        isFeatured: true,
      },
      {
        name: "Modern Accent Chair",
        description:
          "A comfortable accent chair with a simple profile and soft fabric texture.",
        price: 179.99,
        stock: 5,
        imageUrl: "/products/modern-accent-chair.jpg",
        categoryId: furniture.id,
        isFeatured: false,
      },
      {
        name: "Floating Wall Shelf",
        description:
          "A practical wall shelf for books, small plants and decorative objects.",
        price: 39.99,
        stock: 20,
        imageUrl: "/products/floating-wall-shelf.jpg",
        categoryId: furniture.id,
        isFeatured: false,
      },
      {
        name: "Ceramic Plant Pot",
        description:
          "A neutral ceramic plant pot suitable for desks, shelves and windowsills.",
        price: 24.99,
        stock: 30,
        imageUrl: "/products/ceramic-plant-pot.jpg",
        categoryId: decor.id,
        isFeatured: true,
      },
      {
        name: "Scented Soy Candle",
        description:
          "A hand-poured soy candle with a soft scent for relaxed evenings.",
        price: 19.99,
        stock: 40,
        imageUrl: "/products/scented-soy-candle.jpg",
        categoryId: decor.id,
        isFeatured: false,
      },
      {
        name: "Abstract Wall Art",
        description:
          "A minimal abstract wall print for living rooms, offices and bedrooms.",
        price: 59.99,
        stock: 10,
        imageUrl: "/products/abstract-wall-art.jpg",
        categoryId: decor.id,
        isFeatured: true,
      },
      {
        name: "Wooden Desk Organizer",
        description:
          "A wooden organizer for pens, notes and small workspace accessories.",
        price: 29.99,
        stock: 22,
        imageUrl: "/products/wooden-desk-organizer.jpg",
        categoryId: workspace.id,
        isFeatured: false,
      },
      {
        name: "Linen Notebook Set",
        description:
          "A set of linen-covered notebooks for planning, journaling and daily notes.",
        price: 14.99,
        stock: 35,
        imageUrl: "/products/linen-notebook-set.jpg",
        categoryId: workspace.id,
        isFeatured: false,
      },
      {
        name: "Ergonomic Mouse Pad",
        description:
          "A soft mouse pad designed for comfortable everyday desk use.",
        price: 21.99,
        stock: 28,
        imageUrl: "/products/ergonomic-mouse-pad.jpg",
        categoryId: workspace.id,
        isFeatured: false,
      },
    ],
  });

  console.log("Seed data created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });