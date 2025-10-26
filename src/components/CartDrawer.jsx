import { X, Minus, Plus, ShieldCheck } from 'lucide-react'

export default function CartDrawer({ open, onClose, items, onQty, onRemove, onClear, subtotal, onCheckout }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold">Your Cart</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="Close cart"><X size={18}/></button>
        </div>
        <div className="h-[calc(100%-200px)] overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-slate-600 dark:text-slate-400">Your cart is empty.</p>
          )}
          {items.map((i) => (
            <div key={i.id} className="flex gap-3 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <img src={i.image} alt={i.name} className="h-20 w-24 object-cover" />
              <div className="flex-1 py-2 pr-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium leading-tight">{i.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">रु {i.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => onRemove(i.id)} className="text-xs text-red-600 hover:underline">Remove</button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => onQty(i.id, i.qty - 1)} className="p-1 rounded border border-slate-300 dark:border-slate-700"><Minus size={14} /></button>
                  <span className="min-w-[24px] text-center text-sm">{i.qty}</span>
                  <button onClick={() => onQty(i.id, i.qty + 1)} className="p-1 rounded border border-slate-300 dark:border-slate-700"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">Subtotal</span>
            <span className="font-semibold">रु {subtotal.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-3"><ShieldCheck size={14}/> Secure checkout with PCI-compliant gateways</p>
          <div className="flex gap-2">
            <button onClick={onCheckout} disabled={items.length === 0} className="flex-1 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50">Proceed to Pay</button>
            <button onClick={onClear} disabled={items.length === 0} className="rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50">Clear</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
