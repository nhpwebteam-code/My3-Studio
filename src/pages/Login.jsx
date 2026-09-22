import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useStudioData();

  const [email, setEmail] = useState('admin@my3studios.com');
  const [password, setPassword] = useState('my3studios2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already authenticated, redirect to admin
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your login email');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/admin');
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('admin@my3studios.com', 'my3studios2026');
      setIsLoading(false);
      navigate('/admin');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#11141A] text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* ─── Top Atmospheric Radial Glow ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-coral/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* ─── Header: Brand Logo & Navigation Bar ─── */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between relative z-20">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 border border-white/15 backdrop-blur-md flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-coral/50 shadow-md">
            <img
              src="/logo.png"
              alt="MY3 Studios Official Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white leading-none">
              MY3 <span className="text-coral">Studios</span>
            </span>
            <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase mt-0.5">
              Atelier Portal
            </span>
          </div>
        </Link>

        {/* Top Right: Status / Navigation Badge matching screenshot */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-bold text-white/80 tracking-wide backdrop-blur-xs">
            <span className="text-xs">🇮🇳</span>
            <span>EN</span>
          </div>
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 text-xs font-semibold text-white/90 hover:text-white transition-all"
          >
            <span>Back to Site</span>
            <ArrowRight size={13} className="text-coral" />
          </Link>
        </div>
      </header>

      {/* ─── Center: Main Sign In Card ─── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative z-20 w-full">
        <div className="w-full max-w-[380px] sm:max-w-[400px] mx-auto animate-fade-in">
          
          {/* Centered Logo Badge Above Title matching reference */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.04] p-2.5 border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="MY3 Emblem"
                  className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(255,101,72,0.4)]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-coral border-2 border-[#11141A] shadow-xs" />
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="text-center mb-7">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Sign in
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-2 font-medium">
              Sign in and start managing your studio!
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs text-center font-medium animate-shake">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Login / Email Input */}
            <div>
              <div className="relative rounded-xl overflow-hidden bg-[#1C222C] border border-white/10 hover:border-white/20 focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/20 transition-all shadow-inner">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Login"
                  autoComplete="email"
                  className="w-full px-4 py-3.5 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative rounded-xl overflow-hidden bg-[#1C222C] border border-white/10 hover:border-white/20 focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/20 transition-all shadow-inner">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full px-4 pr-11 py-3.5 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none font-medium font-mono text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-0.5 px-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-coral focus:ring-0 cursor-pointer accent-[#FF6548]"
                />
                <span className="text-xs text-white/70 font-medium hover:text-white transition-colors">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() => alert("For admin password reset, please contact Anji garu directly at +91 99493 95037.")}
                className="text-xs text-coral hover:text-coral-light font-medium transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Login Button matching reference pill button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-coral hover:bg-coral-dark text-white font-bold text-sm tracking-wide shadow-[0_4px_22px_rgba(255,101,72,0.4)] transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Quick Demo One-Click Sign In Helper */}
          <div className="mt-5 pt-4 border-t border-white/[0.08] text-center">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white/75 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <CheckCircle2 size={14} className="text-coral" />
              <span>One-Click Demo Admin Sign In</span>
            </button>
          </div>

        </div>
      </main>

      {/* ─── Bottom Undulating Layered Waves matching screenshot ─── */}
      <footer className="w-full relative z-10 mt-auto pointer-events-none select-none">
        
        {/* Floating Ambient Dots & Rings above waves */}
        <div className="relative w-full h-12 overflow-hidden pointer-events-none">
          <span className="absolute bottom-6 left-[8%] w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="absolute bottom-10 left-[18%] w-2 h-2 rounded-full border border-white/25" />
          <span className="absolute bottom-4 left-[32%] w-1 h-1 rounded-full bg-white/30" />
          <span className="absolute bottom-8 left-[45%] w-1.5 h-1.5 rounded-full bg-white/15" />
          <span className="absolute bottom-3 right-[38%] w-2 h-2 rounded-full border border-white/20" />
          <span className="absolute bottom-9 right-[22%] w-1 h-1 rounded-full bg-white/35" />
          <span className="absolute bottom-5 right-[11%] w-1.5 h-1.5 rounded-full bg-white/25" />
          <span className="absolute bottom-11 right-[5%] w-2 h-2 rounded-full border border-white/20" />
        </div>

        {/* Multi-layered Wave Landscape */}
        <div className="w-full relative -mb-[1px]">
          <svg
            className="w-full h-28 sm:h-36 md:h-44 block"
            viewBox="0 0 1440 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Wave 1: Deep slate layer */}
            <path
              d="M0,70 C280,120 540,30 840,80 C1100,120 1320,60 1440,70 L1440,220 L0,220 Z"
              fill="#181D26"
            />
            {/* Wave 2: Slate-blue middle layer */}
            <path
              d="M0,105 C340,60 620,150 960,100 C1180,70 1340,120 1440,110 L1440,220 L0,220 Z"
              fill="#232B38"
              fillOpacity="0.8"
            />
            {/* Wave 3: Soft light contrast layer */}
            <path
              d="M0,140 C320,180 720,110 1080,150 C1260,170 1370,135 1440,145 L1440,220 L0,220 Z"
              fill="#D4D9E2"
              fillOpacity="0.45"
            />
            {/* Wave 4: Signature Cream Base matching website */}
            <path
              d="M0,170 C380,140 780,200 1180,165 C1320,155 1390,165 1440,170 L1440,220 L0,220 Z"
              fill="#FAF7F2"
            />
          </svg>
        </div>

        {/* Bottom Light Base with Centered Copyright Text */}
        <div className="bg-[#FAF7F2] py-4 px-4 text-center pointer-events-auto">
          <p className="text-[11px] font-semibold text-charcoal-500 tracking-wide">
            2026 © MY3 Studios. All rights reserved.
          </p>
          <p className="text-[10px] text-charcoal-400 mt-0.5">
            Designed for Mythri Photography Atelier • Nandyal, Andhra Pradesh
          </p>
        </div>
      </footer>
    </div>
  );
}
