import { useEffect, useRef, useState } from 'react'

export default function LoginModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setError('')
      setPassword('')
    }
  }, [open])

  const validate = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) return 'Enter a valid email.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    if (mode === 'register' && name.trim().length < 2) return 'Enter your full name.'
    return ''
  }

  const submit = (e) => {
    e.preventDefault()
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    const token = btoa(`${email}:${Date.now()}`)
    const authObj = { email, name: name || email.split('@')[0], token }
    onLogin(authObj)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div ref={ref} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-1">{mode === 'login' ? 'Login' : 'Create account'}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Secure access to your Tharu Bazaar account.</p>
        <form onSubmit={submit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">{mode === 'login' ? 'Login' : 'Sign up'}</button>
        </form>
        <div className="mt-3 text-sm text-center">
          {mode === 'login' ? (
            <button className="text-emerald-700 dark:text-emerald-400 hover:underline" onClick={() => setMode('register')}>Create an account</button>
          ) : (
            <button className="text-emerald-700 dark:text-emerald-400 hover:underline" onClick={() => setMode('login')}>Have an account? Login</button>
          )}
        </div>
      </div>
    </div>
  )
}
