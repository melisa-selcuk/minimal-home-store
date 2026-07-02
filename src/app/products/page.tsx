import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { prisma } from "@/lib/db";

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  //url'den gelen değerleri alır.
  const search = params.search?.trim() ?? "";
  const category = params.category ?? "";
  const sort = params.sort ?? "newest";

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const products = await prisma.product.findMany({
    where: {
        //ürün adına göre arama yapar. Eğer search parametresi varsa, name alanında search değerini içeren ürünleri getirir. Eğer search parametresi yoksa, name alanına göre filtreleme yapmaz.
      name: search
        ? {
            contains: search,
          }
        : undefined,
        //kategoriye göre filtreleme yapar. Eğer category parametresi varsa, category alanında slug değeri category'ye eşit olan ürünleri getirir. Eğer category parametresi yoksa, category alanına göre filtreleme yapmaz.
      category: category
        ? {
            slug: category,
          }
        : undefined,
    },
    include: {
      category: true,
    },
    orderBy:
    //ürünleri sıralama yapar. Eğer sort parametresi "price-low" ise, ürünleri fiyatlarına göre artan sırada sıralar. Eğer sort parametresi "price-high" ise, ürünleri fiyatlarına göre azalan sırada sıralar. Eğer sort parametresi "newest" veya başka bir değer ise, ürünleri oluşturulma tarihlerine göre azalan sırada sıralar (yeni ürünler önce gelir).
      sort === "price-low"
        ? {
            price: "asc",
          }
        : sort === "price-high"
          ? {
              price: "desc",
            }
          : {
              createdAt: "desc",
            },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Products
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          Shop our collection
        </h1>

        <p className="mt-4 max-w-2xl text-stone-600">
          Browse minimal furniture, lighting, decor and workspace essentials.
        </p>
      </div>

      <ProductFilters
        categories={categories}
        search={search}
        category={category}
        sort={sort}
      />

      <ProductGrid products={products} />
    </section>
  );
}