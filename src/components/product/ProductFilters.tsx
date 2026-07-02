import type { Category } from "@/types";

type ProductFiltersProps = {
  categories: Category[];
  search?: string;
  category?: string;
  sort?: string;
};

export default function ProductFilters({
  categories,
  search = "",
  category = "",
  sort = "newest",
}: ProductFiltersProps) {
  return (
    <form className="mb-10 grid gap-4 rounded-2xl border border-stone-200 bg-white p-5 md:grid-cols-[1fr_220px_220px_auto]">
      <div>
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Search
        </label>
        <input
          id="search"
          name="search"
          type="search"
          defaultValue={search}
          placeholder="Search products..."
          className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-stone-900"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={category}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-stone-900"
        >
          <option value="">All categories</option>

          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="sort"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Sort
        </label>
        <select
          id="sort"
          name="sort"
          defaultValue={sort}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-stone-900"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="w-full rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Apply
        </button>
      </div>
    </form>
  );
}