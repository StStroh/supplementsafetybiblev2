import { Link, NavLink } from 'react-router-dom';

export default function NavClinical(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600"/>
          <span className="font-semibold tracking-tight">Supplement Safety Bible</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=>isActive?"text-indigo-700 font-medium":"text-slate-700 hover:text-indigo-700"}>Home</NavLink>
          <NavLink to="/pricing" className={({isActive})=>isActive?"text-indigo-700 font-medium":"text-slate-700 hover:text-indigo-700"}>Pricing</NavLink>
          <NavLink to="/premium" className={({isActive})=>isActive?"text-indigo-700 font-medium":"text-slate-700 hover:text-indigo-700"}>Premium</NavLink>
          <a href="#faq" className="text-slate-700 hover:text-indigo-700">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm">Sign in</Link>
          <Link to="/pricing" className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 shadow-sm">Get Premium</Link>
        </div>
      </div>
    </header>
  );
}
