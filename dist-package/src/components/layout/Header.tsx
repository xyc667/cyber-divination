import { Link, NavLink } from 'react-router-dom';
import { Compass, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export default function Header() {
  const { dark, toggle } = useTheme();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'px-3 py-1.5 rounded text-sm transition',
      isActive
        ? 'bg-ancient-red text-white'
        : 'text-ancient-brown hover:bg-ancient-gold/20 dark:text-stone-200',
    );

  return (
    <header className="sticky top-0 z-10 border-b border-ancient-gold/30 bg-white/80 backdrop-blur dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-ancient-red" />
          <span className="text-lg font-bold ancient-title">赛博算卦</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            首页
          </NavLink>
          <NavLink to="/demo" className={linkClass}>
            示范·起卦
          </NavLink>
          <NavLink to="/history" className={linkClass}>
            历史
          </NavLink>
          <button
            type="button"
            onClick={toggle}
            className="ml-2 rounded p-2 hover:bg-ancient-gold/20"
            aria-label="切换主题"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}