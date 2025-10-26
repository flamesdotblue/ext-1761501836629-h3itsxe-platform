import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import LoginModal from './components/LoginModal'
import productsData from './data/products'

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system')

  useEffect(() => {
    const root = document.documentElement
    const apply = (mode) => {
      if (mode === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    if (theme === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      apply(mql.matches ? 'dark' : 'light')
      const handler = (e) => apply(e.matches ? 'dark' : 'light')
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    } else {
      apply(theme)
    }
  }, [theme])

  const set = (val) => {
    setTheme(val)
    localStorage.setItem('theme', val)
  }

  return { theme, setTheme: set }
}

function App() {
  const { theme, setTheme } = useTheme()
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [cart, setCart] = useState(() => {
    try {
      const v = localStorage.getItem('cart')
      return v ? JSON.parse(v) : []
    } catch {
      return []
    }
  })
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem('auth')
      return u ? JSON.parse(u) : null
    } catch {
      return null
    }
  })
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const onLogin = (authObj) => {
    setUser(authObj)
    localStorage.setItem('auth', JSON.stringify(authObj))
    setLoginOpen(false)
  }

  const onLogout = () => {
    setUser(null)
    localStorage.removeItem('auth')
  }

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return productsData.filter((p) => {
      const matchQuery = !q || `${p.name} ${p.category} ${p.cultureTag}`.toLowerCase().includes(q)
      const matchCat = category === 'all' || p.category === category
      return matchQuery && matchCat
    })
  }, [query, category])

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
        return copy
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => setCart([])

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])

  const categories = useMemo(() => {
    const set = new Set(productsData.map((p) => p.category))
    return ['all', ...Array.from(set)]
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar
        theme={theme}
        setTheme={setTheme}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        user={user}
        onLogout={onLogout}
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-[url('https://images.unsplash.com/photo-1649336321305-3fe272852c94?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxiYWNrZ3JvdW5kJTIwaW1hZ2V8ZW58MHwwfHx8MTc2MTUwMjI2MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Tharu Bazaar</h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300">
            Celebrate Tharu and Nepali heritage with authentic crafts, textiles, and flavors. Handpicked goods from local artisans with secure shopping and a delightful experience.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#products" className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition">Shop Now</a>
            <a href="#about" className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition">Learn More</a>
          </div>
        </div>
      </header>

      <main id="products" className="max-w-6xl mx-auto px-4 pb-24">
        <ProductGrid products={filteredProducts} onAdd={addToCart} />
      </main>

      <footer id="about" className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold">Our Mission</h3>
            <p className="mt-2 text-slate-700 dark:text-slate-300">Support Tharu and Nepali artisans through fair trade and modern technology while preserving culture and stories.</p>
          </div>
          <div>
            <h3 className="font-semibold">Security</h3>
            <p className="mt-2 text-slate-700 dark:text-slate-300">We follow best practices like HTTPS-only, secure auth, and PCI-compliant payment gateways. Demo app uses client-only mock checkout.</p>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <p className="mt-2 text-slate-700 dark:text-slate-300">Email: support@tharubazaar.example • Kathmandu, Nepal</p>
          </div>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={updateQty}
        onRemove={removeFromCart}
        onClear={clearCart}
        subtotal={subtotal}
        onCheckout={() => {
          if (!user) {
            setLoginOpen(true)
            return
          }
          alert('This demo uses a mock checkout. Integrate Stripe/Razorpay on the server for production.')
        }}
      />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={onLogin} />
    </div>
  )
}

export default App
