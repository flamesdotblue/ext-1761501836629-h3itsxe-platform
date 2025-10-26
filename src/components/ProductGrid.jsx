import { useState } from 'react'

export default function ProductGrid({ products, onAdd }) {
  const [visible, setVisible] = useState(24)

  const shown = products.slice(0, visible)

  return (
    <section>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Featured Products</h2>
        <span className="text-sm text-slate-600 dark:text-slate-400">{products.length} items</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {shown.map((p) => (
          <article key={p.id} className="group border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-950">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold truncate" title={p.name}>{p.name}</h3>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">रु {p.price.toLocaleString()}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{p.category} • {p.cultureTag}</p>
              <button onClick={() => onAdd(p)} className="mt-3 w-full inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700 text-sm">Add to cart</button>
            </div>
          </article>
        ))}
      </div>
      {visible < products.length && (
        <div className="flex justify-center mt-8">
          <button onClick={() => setVisible((v) => v + 24)} className="rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900">Load more</button>
        </div>
      )}
    </section>
  )
}
