import { Moon, Sun, Laptop } from 'lucide-react'

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-700 overflow-hidden">
      <button onClick={() => setTheme('light')} className={`p-2 ${theme === 'light' ? 'bg-slate-100 dark:bg-slate-900' : ''}`} aria-label="Light">
        <Sun size={16} />
      </button>
      <button onClick={() => setTheme('dark')} className={`p-2 ${theme === 'dark' ? 'bg-slate-100 dark:bg-slate-900' : ''}`} aria-label="Dark">
        <Moon size={16} />
      </button>
      <button onClick={() => setTheme('system')} className={`p-2 ${theme === 'system' ? 'bg-slate-100 dark:bg-slate-900' : ''}`} aria-label="System">
        <Laptop size={16} />
      </button>
    </div>
  )
}
