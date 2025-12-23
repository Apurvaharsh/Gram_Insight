import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9fcf8] text-[#111b0d] font-sans min-h-screen flex flex-col relative overflow-hidden selection:bg-[#46ec13] selection:text-black">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#efffe9] to-[#dcfce5] blur-3xl opacity-60 animate-float-slow"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#46ec13] to-[#eaf3e7] blur-[100px] opacity-20 animate-float-medium"></div>
      </div>

      {/* Header */}
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
        <div className="glass-panel w-full max-w-[440px] rounded-3xl shadow-[0_25px_60px_-5px_rgba(20,34,16,0.25),0_15px_35px_-5px_rgba(20,34,16,0.15),0_0_0_1px_rgba(255,255,255,0.8)] p-5 md:p-6 relative group/card transition-all duration-500 hover:shadow-[0_30px_70px_-5px_rgba(20,34,16,0.3),0_20px_40px_-5px_rgba(20,34,16,0.2)]">
          {/* Accent Bar at Top */}
          <div className="absolute top-0 inset-x-10 h-1 bg-gradient-to-r from-transparent via-[#46ec13] to-transparent opacity-50"></div>
          
          {/* Heading Section */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f0fdf4] to-white shadow-sm border border-[#eaf3e7] mb-2">
              <span className="material-symbols-outlined text-[#46ec13] text-xl">login</span>
            </div>
            <h1 className="text-2xl font-black text-[#111b0d] tracking-tight mb-1">Welcome Back</h1>
            <p className="text-[#5e9a4c] text-xs font-medium">Sign in to access your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                  disabled={loading}
                />
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
                  disabled={loading}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e9a4c] hover:text-[#111b0d] transition-colors flex items-center"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
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
                <button className="btn-3d-face" type="submit" disabled={loading}>
                  <span className="mr-2 text-sm">{loading ? 'Signing in...' : 'Sign In'}</span>
                  <span className="material-symbols-outlined text-[18px] font-bold">arrow_forward</span>
                </button>
              </div>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-4 text-center pt-3 border-t border-[#eaf3e7]">
            <p className="text-[#5e9a4c] text-[11px]">
              Don't have an account?
              <Link className="text-[#111b0d] font-bold hover:text-[#46ec13] transition-colors ml-1 inline-flex items-center gap-1 group/link" to="/register">
                Register here
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

