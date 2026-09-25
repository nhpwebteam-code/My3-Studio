import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Lock,
  KeyRound,
  HelpCircle,
  X,
  Copy,
  Check,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export default function Login() {
  const navigate = useNavigate();
  const {
    login,
    isAuthenticated,
    securityQA,
    adminAccounts = [],
    updateAdminPassword,
  } = useStudioData();

  const [email, setEmail] = useState('admin@my3studios.com');
  const [password, setPassword] = useState('my3studios2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

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
      const res = login(email, password);
      setIsLoading(false);
      if (res && res.success) {
        navigate('/admin');
      } else {
        setErrorMsg(res?.message || 'Invalid email or password');
      }
    }, 350);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('rmythristudiondl.anji@gmail.com', 'my3studios2026');
      setIsLoading(false);
      navigate('/admin');
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* ─── Top Atmospheric Radial Glow ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#E59A3D]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* ─── Header: Brand Logo & Navigation Bar ─── */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between relative z-20">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 border border-white/15 backdrop-blur-md flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-[#E59A3D]/50 shadow-md">
            <img
              src="/logo.png"
              alt="MY3 Studios Official Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white leading-none">
              MY3 <span className="text-[#E59A3D]">Studios</span>
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
            <ArrowRight size={13} className="text-[#E59A3D]" />
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
                  className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(229,154,61,0.4)]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#E59A3D] border-2 border-[#07080A] shadow-xs" />
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
              <div className="relative rounded-xl overflow-hidden bg-[#14161C] border border-white/10 hover:border-white/20 focus-within:border-[#E59A3D] focus-within:ring-2 focus-within:ring-[#E59A3D]/20 transition-all shadow-inner">
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
              <div className="relative rounded-xl overflow-hidden bg-[#14161C] border border-white/10 hover:border-white/20 focus-within:border-[#E59A3D] focus-within:ring-2 focus-within:ring-[#E59A3D]/20 transition-all shadow-inner">
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
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#E59A3D] focus:ring-0 cursor-pointer accent-[#E59A3D]"
                />
                <span className="text-xs text-white/70 font-medium hover:text-white transition-colors">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs text-[#E59A3D] hover:text-[#f3b05c] font-medium transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Login Button matching reference pill button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#E59A3D] hover:bg-[#c98028] text-black font-bold text-sm tracking-wide shadow-[0_4px_22px_rgba(229,154,61,0.35)] transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
              <CheckCircle2 size={14} className="text-[#E59A3D]" />
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
              fill="#14161C"
            />
            {/* Wave 2: Slate-blue middle layer */}
            <path
              d="M0,105 C340,60 620,150 960,100 C1180,70 1340,120 1440,110 L1440,220 L0,220 Z"
              fill="#1A1C24"
              fillOpacity="0.8"
            />
            {/* Wave 3: Subtle Gold Accent Layer */}
            <path
              d="M0,140 C320,180 720,110 1080,150 C1260,170 1370,135 1440,145 L1440,220 L0,220 Z"
              fill="#E59A3D"
              fillOpacity="0.15"
            />
            {/* Wave 4: Deep Black Base */}
            <path
              d="M0,170 C380,140 780,200 1180,165 C1320,155 1390,165 1440,170 L1440,220 L0,220 Z"
              fill="#000000"
            />
          </svg>
        </div>

        {/* Bottom Dark Base with Centered Copyright Text */}
        <div className="bg-[#000000] py-4 px-4 text-center pointer-events-auto border-t border-white/5">
          <p className="text-[11px] font-semibold text-gray-400 tracking-wide">
            2026 © MY3 Studios. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Designed for Mythri Photography Atelier • Nandyal, Andhra Pradesh
          </p>
        </div>
      </footer>

      {/* ─── Forgot Password / Security Question Recovery Modal ─── */}
      {isForgotModalOpen && (
        <ForgotPasswordSecurityModal
          onClose={() => setIsForgotModalOpen(false)}
          securityQA={securityQA}
          adminAccounts={adminAccounts}
          updateAdminPassword={updateAdminPassword}
          login={login}
          navigate={navigate}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FORGOT PASSWORD / SECURITY QUESTION RECOVERY MODAL
// ─────────────────────────────────────────────────────────────
function ForgotPasswordSecurityModal({
  onClose,
  securityQA,
  adminAccounts = [],
  updateAdminPassword,
  login,
  navigate,
}) {
  const [answerInput, setAnswerInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showPassFor, setShowPassFor] = useState({});
  const [selectedAdminId, setSelectedAdminId] = useState(
    adminAccounts[0]?.id || 'admin-1'
  );
  const [newPassword, setNewPassword] = useState('');
  const [newPassMsg, setNewPassMsg] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const activeQuestion =
    securityQA?.question ||
    'What is the founding location and primary atelier of MY3 Studios?';
  const activeAnswer =
    securityQA?.answer || 'Srinivasa Center, Nandyal, Andhra Pradesh';

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    const cleanInput = (answerInput || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    const cleanTarget = activeAnswer
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

    if (!cleanInput) {
      setVerifyError('Please enter your security answer to proceed.');
      return;
    }

    const isMatch =
      cleanInput === cleanTarget ||
      (cleanInput.length >= 3 && cleanTarget.includes(cleanInput)) ||
      (cleanTarget.length >= 3 && cleanInput.includes(cleanTarget));

    if (isMatch) {
      setIsVerified(true);
      setVerifyError('');
    } else {
      setVerifyError('Incorrect security answer. Please check your answer and try again.');
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPassFor((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPassword = (id, pass) => {
    navigator.clipboard.writeText(pass);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDirectLogin = (account) => {
    login(account.email, account.password);
    onClose();
    navigate('/admin');
  };

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.trim().length < 4) {
      setNewPassMsg('Password must be at least 4 characters');
      return;
    }

    setIsUpdating(true);
    updateAdminPassword(selectedAdminId, newPassword.trim());

    const targetAccount =
      adminAccounts.find((a) => a.id === selectedAdminId) || adminAccounts[0];

    setNewPassMsg('Password updated successfully! Logging you in...');
    setTimeout(() => {
      login(targetAccount.email, newPassword.trim());
      setIsUpdating(false);
      onClose();
      navigate('/admin');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-white/10 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#E59A3D]/15 blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isVerified
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[#E59A3D]/20 text-[#E59A3D] border border-[#E59A3D]/30'
              }`}
            >
              {isVerified ? <ShieldCheck size={18} /> : <KeyRound size={18} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isVerified ? 'Studio Access Recovery' : 'Admin Security Verification'}
              </h3>
              <p className="text-[11px] text-gray-400">
                {isVerified
                  ? 'Identity confirmed. View credentials or set a new password.'
                  : 'Answer your registered security question to access credentials'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Step 1: Security Question Verification */}
        {!isVerified ? (
          <form onSubmit={handleVerify} className="space-y-4 relative z-10">
            {/* Display Active Question */}
            <div className="p-4 rounded-2xl bg-[#1C1F28] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E59A3D] flex items-center gap-1.5">
                  <HelpCircle size={13} />
                  <span>Security Question</span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {securityQA?.lastUpdated || 'Active'}
                </span>
              </div>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {activeQuestion}
              </p>
            </div>

            {/* Answer Input */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center justify-between">
                <span>Enter Your Security Answer *</span>
                <span className="text-[10px] text-gray-400 font-normal">
                  Case-insensitive
                </span>
              </label>
              <input
                type="text"
                autoFocus
                value={answerInput}
                onChange={(e) => {
                  setAnswerInput(e.target.value);
                  if (verifyError) setVerifyError('');
                }}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
              />
            </div>

            {/* Error Message */}
            {verifyError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle size={15} className="shrink-0 text-red-400" />
                <span>{verifyError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#E59A3D] hover:bg-[#c98028] text-black text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Verify &amp; Recover Access</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="pt-2 text-center border-t border-white/5">
              <p className="text-[11px] text-gray-500">
                Can't remember the answer? Contact Anji garu directly at{' '}
                <a
                  href="tel:+919949395037"
                  className="text-[#E59A3D] hover:underline font-mono"
                >
                  +91 99493 95037
                </a>
              </p>
            </div>
          </form>
        ) : (
          /* Step 2: Credentials Revealed & Reset Option */
          <div className="space-y-4 relative z-10">
            {/* Success notification */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-emerald-300">
                Security answer verified successfully! Here are your credentials:
              </span>
            </div>

            {/* List of Admin Accounts */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                Admin Credentials
              </span>

              {adminAccounts.map((account) => {
                const isPassVisible = showPassFor[account.id];
                const isCopied = copiedId === account.id;

                return (
                  <div
                    key={account.id}
                    className="p-3.5 rounded-2xl bg-[#1C1F28] border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/10 text-white font-bold text-xs flex items-center justify-center">
                          {account.avatarInitial || account.name?.charAt(0) || 'A'}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white leading-none">
                            {account.name}
                          </p>
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                            {account.email}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E59A3D]/15 text-[#E59A3D] border border-[#E59A3D]/30">
                        {account.role || 'Admin'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-medium">Password:</span>
                        <span className="text-xs font-mono font-bold text-[#E59A3D] bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                          {isPassVisible ? account.password : '••••••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(account.id)}
                          className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                          title={isPassVisible ? 'Hide Password' : 'Show Password'}
                        >
                          {isPassVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyPassword(account.id, account.password)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer transition-all"
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDirectLogin(account)}
                          className="px-3 py-1 rounded-lg bg-[#E59A3D] hover:bg-[#c98028] text-black text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <span>Sign In</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Set New Password Form */}
            <form onSubmit={handleSetNewPassword} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300">
                <Lock size={13} className="text-[#E59A3D]" />
                <span>Or Reset Password Directly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={selectedAdminId}
                  onChange={(e) => setSelectedAdminId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white text-xs focus:outline-none focus:border-[#E59A3D]"
                >
                  {adminAccounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.email})
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#E59A3D]"
                />
              </div>

              {newPassMsg && (
                <p className="text-[11px] text-emerald-400 font-semibold">{newPassMsg}</p>
              )}

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                <CheckCircle2 size={14} />
                <span>{isUpdating ? 'Saving...' : 'Save New Password & Sign In'}</span>
              </button>
            </form>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
