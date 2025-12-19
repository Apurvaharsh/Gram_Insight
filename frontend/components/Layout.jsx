import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Layout = ({ children }) => {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';

  if (isRegisterPage) {
    return <>{children}</>;
  }

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white shadow-sm z-20">
        <div className="flex h-full flex-col justify-between p-5">
          <div>
            <div className="flex items-center gap-3 px-2 mb-8 mt-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-green-200">
                <span className="material-symbols-outlined text-2xl">agriculture</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold leading-none tracking-tight text-slate-900">GramInsight</h1>
                <p className="text-xs font-semibold text-primary-600 mt-0.5">Admin Portal</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5">
              <Link to="/" className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive('/') && location.pathname === '/' ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-inset ring-primary-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <span className={`material-symbols-outlined ${isActive('/') && location.pathname === '/' ? 'fill' : ''}`}>dashboard</span>
                <span className="text-sm font-bold">Dashboard</span>
              </Link>
              <Link to="/villages" className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive('/villages') ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-inset ring-primary-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <span className={`material-symbols-outlined ${isActive('/villages') ? 'fill' : ''}`}>map</span>
                <span className="text-sm font-bold">Villages</span>
              </Link>
              <Link to="/forecasts" className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive('/forecasts') ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-inset ring-primary-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <span className={`material-symbols-outlined ${isActive('/forecasts') ? 'fill' : ''}`}>trending_up</span>
                <span className="text-sm font-bold">Forecasts</span>
              </Link>
              <Link to="/ai-plans" className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive('/ai-plans') ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-inset ring-primary-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <span className={`material-symbols-outlined ${isActive('/ai-plans') ? 'fill' : ''}`}>psychology</span>
                <span className="text-sm font-bold">AI Plans</span>
              </Link>
              <Link to="/approvals" className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive('/approvals') ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-inset ring-primary-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <span className={`material-symbols-outlined ${isActive('/approvals') ? 'fill' : ''}`}>assignment_turned_in</span>
                <span className="text-sm font-bold">Approvals</span>
                <span className="ml-auto bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
              </Link>
              <Link to="/analytics" className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive('/analytics') ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-inset ring-primary-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <span className={`material-symbols-outlined ${isActive('/analytics') ? 'fill' : ''}`}>bar_chart</span>
                <span className="text-sm font-bold">Analytics</span>
              </Link>
              <Link to="/profile" className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive('/profile') ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-inset ring-primary-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                 <span className={`material-symbols-outlined ${isActive('/profile') ? 'fill' : ''}`}>person</span>
                <span className="text-sm font-bold">Profile</span>
              </Link>
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-4">
             <Link to="/profile" className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 hover:bg-white hover:shadow-md transition-all">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/seed/user1/100/100")' }}></div>
              <div className="flex flex-col overflow-hidden">
                <p className="truncate text-sm font-bold text-slate-900">Arjun Singh</p>
                <p className="truncate text-xs font-medium text-slate-500">District Admin</p>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header (Simplified) */}
        <header className="md:hidden flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
           <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">agriculture</span>
              <span className="font-bold text-slate-900">GramInsight</span>
           </div>
           <span className="material-symbols-outlined text-slate-500">menu</span>
        </header>
        
        {/* Desktop Header */}
        <header className="hidden md:flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 sticky top-0 z-10">
            <div className="flex flex-col justify-center">
               <h2 className="text-xl font-bold text-slate-800 capitalize">{location.pathname === '/' ? 'Overview' : location.pathname.split('/')[1].replace('-', ' ')}</h2>
               <p className="text-xs text-slate-500 font-medium">Welcome back, here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <input className="h-10 w-80 rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none" placeholder="Search villages, schemes..." type="text" />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-lg text-slate-400 group-focus-within:text-primary-500">search</span>
              </div>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-primary-600 transition-all">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-white bg-red-500"></span>
              </button>
               <Link to="/register" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-primary-600 transition-all" title="Logout/Register">
                <span className="material-symbols-outlined">logout</span>
              </Link>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar scroll-smooth">
          <div className="mx-auto max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};