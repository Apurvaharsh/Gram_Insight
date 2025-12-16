import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'officer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <div className="bg-[#f9fcf8] text-[#111b0d] font-sans min-h-screen flex flex-col relative overflow-hidden selection:bg-[#46ec13] selection:text-black">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top Right Sphere */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#efffe9] to-[#dcfce5] blur-3xl opacity-60 animate-float-slow"></div>
        {/* Bottom Left Blob */}
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#46ec13] to-[#eaf3e7] blur-[100px] opacity-20 animate-float-medium"></div>
        
        

      {/* Minimal Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-2 md:px-8 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-lg border border-slate-100 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-[#46ec13] text-lg font-bold">spa</span>
          </div>
          <h2 className="text-[#111b0d] text-base font-bold tracking-tight">GramInsight</h2>
        </div>
        <div className="hidden sm:block">
          <a className="text-[10px] font-semibold text-[#5e9a4c] hover:text-[#111b0d] transition-colors" href="#">Help &amp; Support</a>
        </div>
      </header>

     
        
        {/* Row 6 */}
        
        <div className="absolute top-[45%] left-[33%] w-6 h-6 rounded-lg bg-gradient-to-br from-white to-[#dcfce5] shadow-md rotate-18 opacity-39 animate-float-medium" style={{animationDelay: '1.3s'}}></div>
        <div className="absolute top-[45%] left-[40%] w-6 h-6 rounded-lg bg-gradient-to-tl from-[#f0fdf4] to-white shadow-md -rotate-12 opacity-35 animate-float-slow" style={{animationDelay: '1.5s'}}></div>
        
        <div className="absolute top-[45%] left-[75%] w-6 h-6 rounded-lg bg-gradient-to-bl from-white to-[#dcfce5] shadow-md rotate-20 opacity-36 animate-float-medium" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-[45%] left-[82%] w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f0fdf4] to-white shadow-md -rotate-8 opacity-39 animate-float-slow" style={{animationDelay: '2.7s'}}></div>
        <div className="absolute top-[45%] left-[89%] w-6 h-6 rounded-lg bg-gradient-to-br from-[#eaf3e7] to-white shadow-md rotate-14 opacity-43 animate-float-medium" style={{animationDelay: '2.9s'}}></div>
        <div className="absolute top-[45%] left-[96%] w-6 h-6 rounded-lg bg-gradient-to-tl from-white to-[#dcfce5] shadow-md -rotate-12 opacity-38 animate-float-slow" style={{animationDelay: '3.1s'}}></div>
        
        {/* Rows 7-12 would continue similarly - showing just a few more for balance */}
        {/* Row 7 */}
        <div className="absolute top-[53%] left-[5%] w-6 h-6 rounded-lg bg-gradient-to-br from-[#f0fdf4] to-white shadow-md rotate-16 opacity-41 animate-float-slow" style={{animationDelay: '0.6s'}}></div>
        <div className="absolute top-[53%] left-[26%] w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f0fdf4] to-white shadow-md -rotate-10 opacity-38 animate-float-medium" style={{animationDelay: '1.2s'}}></div>
        
        
        {/* Row 10 */}
        <div className="absolute top-[69%] left-[12%] w-6 h-6 rounded-lg bg-gradient-to-tl from-[#eaf3e7] to-white shadow-md -rotate-14 opacity-37 animate-float-medium" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute top-[69%] left-[33%] w-6 h-6 rounded-lg bg-gradient-to-br from-[#eaf3e7] to-white shadow-md rotate-18 opacity-35 animate-float-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[69%] left-[54%] w-6 h-6 rounded-lg bg-gradient-to-tr from-[#eaf3e7] to-white shadow-md -rotate-12 opacity-36 animate-float-medium" style={{animationDelay: '2.1s'}}></div>
        <div className="absolute top-[69%] left-[75%] w-6 h-6 rounded-lg bg-gradient-to-bl from-[#eaf3e7] to-white shadow-md rotate-20 opacity-43 animate-float-slow" style={{animationDelay: '2.7s'}}></div>
        <div className="absolute top-[69%] left-[96%] w-6 h-6 rounded-lg bg-gradient-to-tl from-[#eaf3e7] to-white shadow-md -rotate-12 opacity-38 animate-float-medium" style={{animationDelay: '3.3s'}}></div>
        
        {/* Bottom row accents */}
        <div className="absolute top-[85%] left-[19%] w-6 h-6 rounded-lg bg-gradient-to-bl from-white to-[#dcfce5] shadow-md rotate-16 opacity-41 animate-float-slow" style={{animationDelay: '1.1s'}}></div>
        <div className="absolute top-[85%] left-[40%] w-6 h-6 rounded-lg bg-gradient-to-tl from-white to-[#dcfce5] shadow-md -rotate-10 opacity-42 animate-float-medium" style={{animationDelay: '1.7s'}}></div>
        <div className="absolute top-[85%] left-[61%] w-6 h-6 rounded-lg bg-gradient-to-br from-white to-[#dcfce5] shadow-md rotate-12 opacity-35 animate-float-slow" style={{animationDelay: '2.3s'}}></div>
        <div className="absolute top-[85%] left-[82%] w-6 h-6 rounded-lg bg-gradient-to-tr from-white to-[#dcfce5] shadow-md -rotate-8 opacity-36 animate-float-medium" style={{animationDelay: '2.9s'}}></div>

     
        
        {/* 20 Additional boxes scattered everywhere */}
        <div className="absolute top-12 left-1/4 w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#dcfce5] shadow-md rotate-18 opacity-45 animate-float-slow" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-36 right-1/4 w-8 h-8 rounded-lg bg-gradient-to-tl from-[#f0fdf4] to-white shadow rotate-25 opacity-40 animate-float-medium" style={{animationDelay: '1.7s'}}></div>
        <div className="absolute top-1/4 left-1/3 w-12 h-12 rounded-2xl bg-gradient-to-bl from-[#eaf3e7] to-white shadow-md -rotate-10 opacity-55 animate-float-slow" style={{animationDelay: '0.6s'}}></div>
        <div className="absolute top-48 right-1/3 w-14 h-14 rounded-2xl bg-gradient-to-tr from-white to-[#eaf3e7] shadow-lg rotate-14 opacity-50 animate-float-medium" style={{animationDelay: '2.8s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-9 h-9 rounded-xl bg-gradient-to-br from-[#dcfce5] to-white shadow -rotate-20 opacity-48 animate-float-slow" style={{animationDelay: '1.1s'}}></div>
        
        <div className="absolute top-3/4 left-24 w-11 h-11 rounded-xl bg-gradient-to-tl from-[#eaf3e7] to-white shadow-md rotate-8 opacity-52 animate-float-medium" style={{animationDelay: '3.1s'}}></div>
        <div className="absolute top-40 left-1/2 w-13 h-13 rounded-2xl bg-gradient-to-br from-white to-[#f0fdf4] shadow-lg -rotate-12 opacity-58 animate-float-slow" style={{animationDelay: '0.4s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 rounded-xl bg-gradient-to-bl from-[#dcfce5] to-white shadow-md rotate-22 opacity-47 animate-float-medium" style={{animationDelay: '2.3s'}}></div>
        <div className="absolute bottom-36 right-1/4 w-15 h-15 rounded-2xl bg-gradient-to-tr from-[#eaf3e7] to-white shadow-lg -rotate-18 opacity-62 animate-float-slow" style={{animationDelay: '1.4s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-lg bg-gradient-to-br from-white to-[#dcfce5] shadow rotate-16 opacity-42 animate-float-medium" style={{animationDelay: '0.9s'}}></div>
        
        
        
        
        <div className="absolute bottom-3/8 right-5/8 w-5 h-5 rounded bg-gradient-to-tr from-[#f0fdf4] to-white shadow -rotate-14 opacity-27 animate-float-medium" style={{animationDelay: '3.6s'}}></div>
        <div className="absolute bottom-5/8 left-7/8 w-8 h-8 rounded-lg bg-gradient-to-br from-[#eaf3e7] to-white shadow rotate-18 opacity-34 animate-float-slow" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-7/8 right-7/8 w-6 h-6 rounded-lg bg-gradient-to-tl from-white to-[#dcfce5] shadow -rotate-20 opacity-32 animate-float-medium" style={{animationDelay: '2.7s'}}></div>
        <div className="absolute top-6 left-15 w-7 h-7 rounded-lg bg-gradient-to-bl from-[#f0fdf4] to-white shadow rotate-12 opacity-30 animate-float-slow" style={{animationDelay: '4.5s'}}></div>
        <div className="absolute top-9 right-15 w-5 h-5 rounded bg-gradient-to-tr from-[#eaf3e7] to-white shadow -rotate-16 opacity-28 animate-float-medium" style={{animationDelay: '1.2s'}}></div>
        
       
        
        <div className="absolute bottom-9 right-15 w-6 h-6 rounded-lg bg-gradient-to-tl from-[#eaf3e7] to-white shadow -rotate-12 opacity-32 animate-float-medium" style={{animationDelay: '3.1s'}}></div>
        <div className="absolute bottom-12 left-19 w-7 h-7 rounded-lg bg-gradient-to-bl from-white to-[#dcfce5] shadow rotate-16 opacity-30 animate-float-slow" style={{animationDelay: '0.4s'}}></div>
        <div className="absolute bottom-16 right-19 w-5 h-5 rounded bg-gradient-to-tr from-[#f0fdf4] to-white shadow -rotate-24 opacity-28 animate-float-medium" style={{animationDelay: '2.8s'}}></div>
        <div className="absolute bottom-19 left-23 w-8 h-8 rounded-lg bg-gradient-to-br from-[#eaf3e7] to-white shadow rotate-18 opacity-34 animate-float-slow" style={{animationDelay: '4.2s'}}></div>
        <div className="absolute bottom-24 right-23 w-6 h-6 rounded-lg bg-gradient-to-tl from-white to-[#dcfce5] shadow -rotate-14 opacity-31 animate-float-medium" style={{animationDelay: '1.8s'}}></div>
        
      
       
        
        <div className="absolute bottom-4 right-6 w-6 h-6 rounded-lg bg-gradient-to-tl from-[#f0fdf4] to-white shadow -rotate-14 opacity-31 animate-float-medium" style={{animationDelay: '3.3s'}}></div>
        <div className="absolute top-3 left-7 w-7 h-7 rounded-lg bg-gradient-to-bl from-[#eaf3e7] to-white shadow rotate-18 opacity-29 animate-float-slow" style={{animationDelay: '0.6s'}}></div>
        <div className="absolute top-6 right-7 w-5 h-5 rounded bg-gradient-to-tr from-white to-[#dcfce5] shadow -rotate-20 opacity-27 animate-float-medium" style={{animationDelay: '2.9s'}}></div>
        <div className="absolute bottom-3 left-7 w-8 h-8 rounded-lg bg-gradient-to-br from-[#f0fdf4] to-white shadow rotate-24 opacity-35 animate-float-slow" style={{animationDelay: '4.4s'}}></div>
        <div className="absolute bottom-6 right-7 w-6 h-6 rounded-lg bg-gradient-to-tl from-[#eaf3e7] to-white shadow -rotate-16 opacity-32 animate-float-medium" style={{animationDelay: '1.9s'}}></div>
      </div>

      {/* Minimal Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-2 md:px-8 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-lg border border-slate-100 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-[#46ec13] text-lg font-bold">spa</span>
          </div>
          <h2 className="text-[#111b0d] text-base font-bold tracking-tight">GramInsight</h2>
        </div>
        <div className="hidden sm:block">
          <a className="text-[10px] font-semibold text-[#5e9a4c] hover:text-[#111b0d] transition-colors" href="#">Help &amp; Support</a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2">
        {/* 3D Floating Card Container */}
        <div className="glass-panel w-full max-w-[440px] rounded-3xl shadow-[0_20px_40px_-5px_rgba(20,34,16,0.08),0_10px_20px_-5px_rgba(20,34,16,0.04),0_0_0_1px_rgba(255,255,255,0.8)] p-5 md:p-6 relative group/card transition-all duration-500 hover:shadow-xl">
          {/* Accent Bar at Top */}
          <div className="absolute top-0 inset-x-10 h-1 bg-gradient-to-r from-transparent via-[#46ec13] to-transparent opacity-50"></div>
          
          {/* Heading Section */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f0fdf4] to-white shadow-sm border border-[#eaf3e7] mb-2">
              <span className="material-symbols-outlined text-[#46ec13] text-xl">person_add</span>
            </div>
            <h1 className="text-2xl font-black text-[#111b0d] tracking-tight mb-1">Create Account</h1>
            <p className="text-[#5e9a4c] text-xs font-medium">Register to access the dashboard</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Name Field */}
            <div className="flex flex-col gap-2 group/field">
              <label className="text-[#111b0d] text-sm font-bold pl-1 flex items-center gap-2">
                Full Name
              </label>
              <div className="relative transition-transform duration-200 group-focus-within/field:scale-[1.01]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e9a4c] pointer-events-none flex items-center">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <input
                  className="input-debossed w-full h-10 rounded-xl pl-11 pr-4 text-[#111b0d] placeholder:text-[#9abf91] text-xs font-medium focus:ring-0"
                  placeholder="Enter your full name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2 group/field">
              <label className="text-[#111b0d] text-sm font-bold pl-1 flex items-center gap-2">
                Email Address
              </label>
              <div className="relative transition-transform duration-200 group-focus-within/field:scale-[1.01]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e9a4c] pointer-events-none flex items-center">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  className="input-debossed w-full h-10 rounded-xl pl-11 pr-4 text-[#111b0d] placeholder:text-[#9abf91] text-xs font-medium focus:ring-0"
                  placeholder="user@graminsight.gov.in"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[#111b0d] text-sm font-bold pl-1">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="officer"
                    checked={formData.role === 'officer'}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="peer sr-only"
                  />
                  <div className="input-debossed h-9 rounded-xl flex items-center justify-center gap-1.5 peer-checked:bg-white peer-checked:shadow-[inset_1px_1px_3px_rgba(166,175,163,0.2),0_0_0_2px_rgba(70,236,19,0.3)] peer-checked:border-[#46ec13] transition-all">
                    <span className="material-symbols-outlined text-[14px] text-[#5e9a4c]">badge</span>
                    <span className="text-[11px] font-bold text-[#111b0d]">Officer</span>
                  </div>
                </label>
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="peer sr-only"
                  />
                  <div className="input-debossed h-9 rounded-xl flex items-center justify-center gap-1.5 peer-checked:bg-white peer-checked:shadow-[inset_1px_1px_3px_rgba(166,175,163,0.2),0_0_0_2px_rgba(70,236,19,0.3)] peer-checked:border-[#46ec13] transition-all">
                    <span className="material-symbols-outlined text-[14px] text-[#5e9a4c]">admin_panel_settings</span>
                    <span className="text-[11px] font-bold text-[#111b0d]">Admin</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 group/field">
              <label className="text-[#111b0d] text-sm font-bold pl-1">Password</label>
              <div className="relative transition-transform duration-200 group-focus-within/field:scale-[1.01]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e9a4c] pointer-events-none flex items-center">
                  <span className="material-symbols-outlined text-[20px]">key</span>
                </div>
                <input
                  className="input-debossed w-full h-10 rounded-xl pl-11 pr-11 text-[#111b0d] placeholder:text-[#9abf91] text-xs font-medium focus:ring-0"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e9a4c] hover:text-[#111b0d] transition-colors flex items-center"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* 3D Submit Button */}
            <div className="mt-1">
              <div className="btn-3d-wrapper" style={{height: '3rem'}}>
                <div className="btn-3d-shadow"></div>
                <button className="btn-3d-face" type="submit">
                  <span className="mr-2 text-sm">Create Account</span>
                  <span className="material-symbols-outlined text-[18px] font-bold">arrow_forward</span>
                </button>
              </div>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-4 text-center pt-3 border-t border-[#eaf3e7]">
            <p className="text-[#5e9a4c] text-[11px]">
              Already have an account?
              <Link className="text-[#111b0d] font-bold hover:text-[#46ec13] transition-colors ml-1 inline-flex items-center gap-1 group/link" to="/">
                Login here
                <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-0.5 transition-transform">chevron_right</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="mt-2 flex items-center gap-1.5 opacity-60">
          <span className="material-symbols-outlined text-[#111b0d] text-[14px]">verified_user</span>
          <span className="text-[9px] font-bold text-[#111b0d] uppercase tracking-wider">Secure Government Portal</span>
        </div>
      </main>
    </div>
  );
};