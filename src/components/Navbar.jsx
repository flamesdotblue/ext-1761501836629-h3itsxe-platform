import { useState } from 'react'
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ theme, setTheme, cartCount, onOpenCart, onOpenLogin, user, onLogout, query, setQuery, category, setCategory, categories }) {
  const [open, setOpen] = useState(false)

  const NavLinks = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      <a href="#" className="hover:text-emerald-600">Home</a>
      <a href="#products" className="hover:text-emerald-600">Products</a>
      <a href="#about" className="hover:text-emerald-600">About</a>
    </div>
  )

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/70 dark:border-slate-800/70 backdrop-blur bg-white/70 dark:bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button className="sm:hidden p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-900" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <a href="#" className="font-extrabold text-lg tracking-tight">Tharu Bazaar</a>
          </div>

          <div className="hidden sm:flex">
            <NavLinks />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-48 lg:w-64 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-2 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button onClick={onOpenCart} className="relative inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-900">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">{cartCount}</span>
              )}
            </button>
            {user ? (
              <div className="relative group">
                <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-900">
                  <User size={18} />
                  <span className="hidden sm:inline max-w-[120px] truncate">{user.name || user.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center gap-2"><LogOut size={16}/> Logout</button>
                </div>
              </div>
            ) : (
              <button onClick={onOpenLogin} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"><User size={18}/> Login</button>
            )}
          </div>
        </div>

        {open && (
          <div className="sm:hidden pb-4 border-t border-slate-200 dark:border-slate-800">
            <div className="py-3"><NavLinks /></div>
            <div className="flex flex-col gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-2 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
