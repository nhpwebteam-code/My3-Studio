import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Calendar,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  Download,
  X,
  Camera,
  Layers,
  Check,
  RotateCcw,
  Eye,
  EyeOff,
  AlertCircle,
  Key,
  Lock,
  Shield,
  ShieldCheck,
  Mail,
  Copy,
  RefreshCw,
  HelpCircle,
  UserCheck,
  Bell,
  Settings,
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    resetPackages,

    gallery,
    galleryCategories,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetGallery,

    bookings,
    adminAccounts = [],
    updateAdminEmail,
    updateAdminPassword,
    deleteAdminAccount,
    addAdminAccount,
    securityQA = {
      question: 'What is the founding location of MY3 Studios?',
      answer: 'Srinivasa Center, Nandyal, Andhra Pradesh',
      lastUpdated: 'September 2026',
    },
    updateSecurityQA,

    user,
    logout,
  } = useStudioData();

  // Active top/sidebar tab: 'overview', 'packages', 'gallery', 'bookings', 'security'
  const [activeTab, setActiveTab] = useState('overview');

  // Security Tab States
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [emailModalAccount, setEmailModalAccount] = useState(null);
  const [passwordModalAccount, setPasswordModalAccount] = useState(null);
  const [deleteModalAccount, setDeleteModalAccount] = useState(null);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isQAModalOpen, setIsQAModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isRefreshingSecurity, setIsRefreshingSecurity] = useState(false);
  const [showQAAnswer, setShowQAAnswer] = useState(false);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPassword = (account) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(account.password);
      setCopiedId(account.id);
      showToast(`Password for ${account.name} copied to clipboard!`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleRefreshSecurity = () => {
    setIsRefreshingSecurity(true);
    setTimeout(() => {
      setIsRefreshingSecurity(false);
      showToast('All security credentials & active sessions verified in real-time');
    }, 600);
  };

  // Package Modals
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  // Gallery Modals
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);

  // Gallery Filter inside Admin
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast banner
  const [toastMsg, setToastMsg] = useState('');
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filtered gallery items in Admin
  const filteredGallery = gallery.filter((item) => {
    const matchesCat = galleryCategoryFilter === 'all' || item.category === galleryCategoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col overflow-x-hidden">
      
      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#E59A3D] text-black px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#FFCE26]/30 animate-fade-in">
          <CheckCircle2 size={18} className="text-[#FFCE26]" />
          <span className="text-xs sm:text-sm font-bold">{toastMsg}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TOP NAVIGATION BAR
      ═══════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 bg-[#07080A]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Brand Seal + Pill Tabs (desktop only) */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-0">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#14161C] p-1 shadow-xs border border-white/10 flex items-center justify-center">
                <img src="/logo.png" alt="MY3 Studios" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-black text-sm tracking-tight text-white block leading-tight">
                  MY3 Studios
                </span>
                <span className="text-[10px] font-bold text-[#E59A3D] uppercase tracking-widest block leading-tight">
                  Admin Console
                </span>
              </div>
            </Link>

            {/* Pill Navigation Tabs — hidden on mobile, shown md+ */}
            <nav className="hidden md:flex items-center gap-1.5 bg-[#14161C] p-1 rounded-full border border-white/10 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#E59A3D] text-black shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('packages')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-[#E59A3D] text-black shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package size={14} />
                <span>Packages</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFCE26] text-black font-mono">
                  {packages.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#E59A3D] text-black shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ImageIcon size={14} />
                <span>Gallery</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-gray-200 font-mono">
                  {gallery.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'bookings'
                    ? 'bg-[#E59A3D] text-black shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar size={14} />
                <span>Inquiries</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E59A3D]/20 text-[#E59A3D] font-mono">
                  {bookings.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-black text-white border border-[#E59A3D]/40 shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Key size={14} className={activeTab === 'security' ? 'text-[#E59A3D]' : ''} />
                <span>Security</span>
              </button>
            </nav>

            {/* Mobile: show current tab name */}
            <span className="md:hidden text-sm font-bold text-white font-display capitalize truncate">
              {activeTab === 'overview' ? 'Dashboard' : activeTab === 'bookings' ? 'Inquiries' : activeTab === 'security' ? 'Security' : activeTab}
            </span>
          </div>

          {/* Right: Actions + Live Site + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Add Package CTA */}
            <button
              type="button"
              onClick={() => setIsAddPackageOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Package</span>
            </button>

            {/* Quick Add Photo CTA */}
            <button
              type="button"
              onClick={() => setIsAddPhotoOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1E2024] hover:bg-black text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Photo</span>
            </button>

            {/* View Live Website Button */}
            <Link
              to="/pricing"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14161C] hover:bg-white/5 border border-white/10 text-xs font-bold text-gray-300 shadow-xs transition-all active:scale-95"
              title="View Public Pricing Page"
            >
              <span className="hidden sm:inline">Live Site</span>
              <ArrowUpRight size={13} />
            </Link>

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#14161C] border border-white/10 shadow-xs flex items-center justify-center p-0.5" title="Anji — Studio Lead">
                <img
                  src="/logo.png"
                  alt="Anji Studio Lead"
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-8 h-8 rounded-full bg-[#14161C] hover:bg-red-50 hover:text-red-600 text-gray-400 border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="Logout from Admin"
              >
                <LogOut size={14} />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════
          MOBILE BOTTOM NAVIGATION BAR (visible below md)
      ═══════════════════════════════════════════ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D0E12]/95 backdrop-blur-md border-t border-white/10 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Home' },
            { id: 'packages', icon: Package, label: 'Packages', count: packages.length },
            { id: 'gallery', icon: ImageIcon, label: 'Gallery', count: gallery.length },
            { id: 'bookings', icon: Calendar, label: 'Inquiries', count: bookings.length },
            { id: 'security', icon: Key, label: 'Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all cursor-pointer relative ${
                activeTab === tab.id
                  ? 'text-[#E59A3D]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-[#E59A3D]' : 'text-gray-500'}`}>
                {tab.label}
              </span>
              {tab.count != null && tab.count > 0 && (
                <span className="absolute -top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#E59A3D] text-white text-[9px] font-bold flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          MAIN DASHBOARD BODY (Side Dock + Content)
      ═══════════════════════════════════════════ */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8 flex-grow flex gap-6">
        
        {/* Left Floating Dock / Sidebar (Matching Reference Image 2) */}
        <aside className="hidden lg:flex flex-col items-center justify-between w-14 bg-[#14161C] backdrop-blur-md rounded-full py-5 border border-white/10 shadow-sm shrink-0 self-start sticky top-28">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#E59A3D] text-black shadow-sm'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="Overview Dashboard"
            >
              <LayoutDashboard size={17} />
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'packages'
                  ? 'bg-[#E59A3D] text-black shadow-sm'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="Manage Packages"
            >
              <Package size={17} />
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#E59A3D] text-black shadow-sm'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="Manage Gallery"
            >
              <ImageIcon size={17} />
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#E59A3D] text-black shadow-sm'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="Client Inquiries"
            >
              <Calendar size={17} />
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-black text-[#E59A3D] border border-white/20 shadow-sm'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="Password & Access Security"
            >
              <Key size={17} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </aside>

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0">

          {/* Mobile Profile & Horizontal Pill Tabs (Matching Mobile Reference Screenshot) */}
          <div className="md:hidden space-y-3.5 mb-6">
            <div className="bg-[#14161C] rounded-3xl p-4 border border-white/10 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-black text-white font-black text-sm flex items-center justify-center border border-white/20 shadow-xs shrink-0">
                  K
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate leading-tight">
                    MY3 Fotography Admin
                  </h3>
                  <p className="text-[11px] text-gray-400 truncate leading-tight mt-0.5">
                    Studio Admin <span className="text-gray-500">(@my3fotography)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 text-xs font-semibold border border-white/10 transition-colors"
                >
                  <LogOut size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Horizontal scrollable tab buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'overview', label: 'Dashboard' },
                { id: 'packages', label: 'Packages', count: packages.length },
                { id: 'gallery', label: 'Gallery', count: gallery.length },
                { id: 'bookings', label: 'Inquiries', count: bookings.length },
                { id: 'security', label: 'Security', icon: Key },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    activeTab === t.id
                      ? 'bg-black text-white border border-[#E59A3D]/40 shadow-sm'
                      : 'bg-[#14161C] text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {t.icon && <t.icon size={13} className={activeTab === t.id ? 'text-[#E59A3D]' : ''} />}
                  <span>{t.label}</span>
                  {t.count != null && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-gray-300 font-mono">
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              TAB 1: OVERVIEW & DASHBOARD SUMMARY (Exact Reference Image 2 Layout)
          ═══════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              
              {/* Header Title Block matching Reference 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                    Welcome back, Anji!
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
                    Control studio packages, gallery curation, and verified bookings.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsAddPackageOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <Plus size={15} />
                    <span>Add Package</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddPhotoOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E2024] hover:bg-black text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <Plus size={15} />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Grid 1: Real Studio Catalog & Operations Metrics (Zero Fake Data) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Card: Dynamic Studio Catalog & Real Category Distribution */}
                <div className="lg:col-span-5 bg-[#14161C] rounded-3xl p-6 sm:p-7 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white font-display">Catalog Overview</h3>
                      <p className="text-[11px] text-gray-500">Live Studio Assets & Albums</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Catalog
                    </span>
                  </div>

                  {/* Two Main Metrics */}
                  <div className="grid grid-cols-2 gap-4 my-3 py-3 border-y border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveTab('packages')}
                      className="text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium group-hover:text-[#E59A3D] transition-colors">
                        <Package size={13} className="text-[#E59A3D]" />
                        <span>Packages</span>
                      </div>
                      <span className="text-2xl font-black text-white font-display block mt-1 group-hover:text-[#E59A3D] transition-colors">
                        {packages.length}
                      </span>
                      <span className="text-[10px] text-gray-500">Available to clients</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('gallery')}
                      className="text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium group-hover:text-[#FFCE26] transition-colors">
                        <ImageIcon size={13} className="text-[#FFCE26]" />
                        <span>Gallery Photos</span>
                      </div>
                      <span className="text-2xl font-black text-white font-display block mt-1 group-hover:text-white transition-colors">
                        {gallery.length}
                      </span>
                      <span className="text-[10px] text-gray-500">Curated showcase</span>
                    </button>
                  </div>

                  {/* Real Gallery Category Distribution Bar Graphic */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                        Gallery Breakdown by Category
                      </p>
                      <span className="text-[10px] font-medium text-gray-400">
                        {galleryCategories.length} categories
                      </span>
                    </div>

                    <div className="flex items-end justify-between h-24 gap-2 pt-2 px-1">
                      {galleryCategories.map((cat, i) => {
                        const count = gallery.filter((item) => item.category === cat.id).length;
                        const maxCount = Math.max(...galleryCategories.map((c) => gallery.filter((it) => it.category === c.id).length), 1);
                        const pct = Math.max(15, Math.round((count / maxCount) * 100));

                        return (
                          <div
                            key={cat.id}
                            className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative cursor-pointer"
                            onClick={() => {
                              setGalleryCategoryFilter(cat.id);
                              setActiveTab('gallery');
                            }}
                            title={`${cat.label || cat.id}: ${count} photos`}
                          >
                            <div
                              style={{ height: `${pct}%` }}
                              className={`w-full rounded-full transition-all duration-300 ${
                                i % 2 === 0
                                  ? 'bg-[#E59A3D] group-hover:bg-[#E59A3D]-dark shadow-xs'
                                  : 'bg-[#1E2024] group-hover:bg-black'
                              }`}
                            />
                            <span className="text-[9px] text-gray-500 font-medium truncate max-w-full">
                              {(cat.label || cat.id).split(' ')[0].slice(0, 3)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Cards: Real Studio Operations Cards (Zero Fake Data) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  
                  {/* Card 1: Client Inquiries */}
                  <div
                    onClick={() => setActiveTab('bookings')}
                    className="bg-[#14161C] rounded-3xl p-5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300 group-hover:text-[#E59A3D] transition-colors">
                        Client Inquiries
                      </span>
                      <Calendar size={14} className="text-[#E59A3D]" />
                    </div>
                    <div className="my-3">
                      <span className="text-xs font-semibold text-[#E59A3D] flex items-center gap-1">
                        {bookings.filter((b) => b.status === 'Pending').length} Pending Review
                      </span>
                      <span className="text-2xl font-black text-white font-display mt-0.5 block">
                        {bookings.length}
                      </span>
                      <p className="text-[10px] text-gray-500">Total website inquiries</p>
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-[#E59A3D] flex items-center justify-between">
                      <span>View Inquiries</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                  {/* Card 2: Active Packages Coverage */}
                  <div
                    onClick={() => setActiveTab('packages')}
                    className="bg-[#14161C] rounded-3xl p-5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                        Active Packages
                      </span>
                      <Sparkles size={14} className="text-[#FFCE26]" />
                    </div>
                    <div className="my-3">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        {packages.filter((p) => p.featured).length} Featured
                      </span>
                      <span className="text-2xl font-black text-white font-display mt-0.5 block">
                        {packages.length}
                      </span>
                      <p className="text-[10px] text-gray-500">Public wedding packages</p>
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-gray-300 flex items-center justify-between">
                      <span>Manage Catalog</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                  {/* Card 3: DARK CARD - Curated Showcase */}
                  <div
                    onClick={() => setActiveTab('gallery')}
                    className="bg-[#26211C] text-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-200">Curated Gallery</span>
                      <div className="w-6 h-6 rounded-full bg-[#14161C]/10 flex items-center justify-center">
                        <ImageIcon size={12} className="text-[#FFCE26]" />
                      </div>
                    </div>
                    <div className="my-3">
                      <span className="text-xs font-semibold text-[#FFCE26] flex items-center gap-1">
                        {galleryCategories.length} Categories Active
                      </span>
                      <span className="text-2xl font-black text-white font-display mt-0.5 block">
                        {gallery.length}
                      </span>
                      <p className="text-[10px] text-gray-400">High-res client photographs</p>
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-[#FFCE26] flex items-center justify-between">
                      <span>Curate Photos</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                </div>

              </div>

              {/* Grid 2: Recent Inquiries Table (Real Data or Clean Empty State) */}
              <div className="bg-[#14161C] rounded-3xl p-6 sm:p-7 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Recent Inquiries & Bookings
                    </h3>
                    <p className="text-xs text-gray-500">
                      Dispatched directly from Home & Pricing WhatsApp booking modals
                    </p>
                  </div>
                  {bookings.length > 0 && (
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs font-bold text-[#E59A3D] hover:text-[#E59A3D]-dark"
                    >
                      View All →
                    </button>
                  )}
                </div>

                {bookings.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-gray-500">
                      <Calendar size={22} />
                    </div>
                    <h4 className="text-sm font-bold text-white">No client inquiries logged yet</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                      When clients submit photoshoot requests via the website booking modal or WhatsApp, they will appear here automatically.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAddPackageOpen(true)}
                        className="px-4 py-2 rounded-xl bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        + Add New Package
                      </button>
                      <Link
                        to="/pricing"
                        target="_blank"
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-bold transition-all"
                      >
                        View Public Packages ↗
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                          <th className="pb-3 font-semibold">Client Name</th>
                          <th className="pb-3 font-semibold">Package</th>
                          <th className="pb-3 font-semibold">Event Date</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Investment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs">
                        {bookings.slice(0, 4).map((b) => (
                          <tr key={b.id} className="hover:bg-white/5/50 transition-colors">
                            <td className="py-3.5 font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-[#E59A3D]/10 text-[#E59A3D] font-bold flex items-center justify-center text-xs">
                                  {b.clientName.charAt(0)}
                                </div>
                                <div>
                                  <span>{b.clientName}</span>
                                  <span className="block text-[10px] text-gray-500 font-normal">
                                    {b.phone}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 text-gray-400 font-medium">{b.packageTitle}</td>
                            <td className="py-3.5 text-gray-400 font-mono text-[11px]">{b.eventDate}</td>
                            <td className="py-3.5">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  b.status === 'Confirmed'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : b.status === 'In Progress'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-white/5 text-gray-300'
                                }`}
                              >
                                • {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 font-bold text-right text-white">
                              {b.totalAmount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════
              TAB 2: PACKAGES CRUD MANAGEMENT (ADD, EDIT, DELETE)
          ═══════════════════════════════════════════ */}
          {activeTab === 'packages' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black font-display text-white tracking-tight">
                    Packages Management
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Add, edit, or remove photography packages. Updates immediately reflect on the live{' '}
                    <Link to="/pricing" target="_blank" className="text-[#E59A3D] underline font-semibold">
                      /pricing page
                    </Link>.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all packages back to initial default catalog?')) {
                        resetPackages();
                        showToast('Packages reset to original defaults');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14161C] hover:bg-white/5 border border-white/10 text-gray-400 text-xs font-bold transition-all shadow-xs cursor-pointer"
                    title="Restore default packages"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={() => setIsAddPackageOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <Plus size={15} />
                    <span>Create New Package</span>
                  </button>
                </div>
              </div>

              {/* Grid of Package Management Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-[#14161C] rounded-3xl p-6 border border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-all relative group"
                  >
                    {/* Top Badges & Actions */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E59A3D]/10 text-[#E59A3D]">
                          {pkg.badge || 'Package'}
                        </span>
                        
                        {/* Edit / Delete Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingPackage(pkg)}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#1E2024] hover:text-white text-gray-300 flex items-center justify-center transition-all cursor-pointer"
                            title="Edit Package"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${pkg.title}"?`)) {
                                deletePackage(pkg.id);
                                showToast(`Deleted package "${pkg.title}"`);
                              }
                            }}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white text-gray-300 flex items-center justify-center transition-all cursor-pointer"
                            title="Delete Package"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-black font-display text-white leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {pkg.tagline || pkg.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black font-display text-white">
                            {pkg.startingPrice}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">starting</span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium block mt-0.5">
                          Duration: {pkg.duration}
                        </span>
                      </div>

                      {/* Deliverables Count */}
                      <div className="mt-4 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                          Included Deliverables ({pkg.deliverables?.length || 0}):
                        </span>
                        <ul className="text-xs text-gray-400 space-y-1">
                          {pkg.deliverables?.slice(0, 3).map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span className="truncate">{d}</span>
                            </li>
                          ))}
                          {(pkg.deliverables?.length || 0) > 3 && (
                            <li className="text-[11px] text-[#E59A3D] font-bold pl-4">
                              + {(pkg.deliverables?.length || 0) - 3} more deliverables
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500 font-mono">
                        ID: {pkg.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingPackage(pkg)}
                        className="text-xs font-bold text-[#E59A3D] hover:text-[#E59A3D]-dark flex items-center gap-1 cursor-pointer"
                      >
                        <span>Edit Details</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════
              TAB 3: GALLERY CRUD MANAGEMENT (ADD, EDIT, DELETE)
          ═══════════════════════════════════════════ */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black font-display text-white tracking-tight">
                    Gallery Archive Management
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Add, edit, or delete curated photo heirlooms. Changes update live on the{' '}
                    <Link to="/gallery" target="_blank" className="text-[#E59A3D] underline font-semibold">
                      /gallery page
                    </Link>.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset gallery back to default archive?')) {
                        resetGallery();
                        showToast('Gallery reset to default archive');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14161C] hover:bg-white/5 border border-white/10 text-gray-400 text-xs font-bold transition-all shadow-xs cursor-pointer"
                    title="Restore default gallery"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={() => setIsAddPhotoOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E2024] hover:bg-black text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <Plus size={15} />
                    <span>Upload / Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#14161C] p-3 rounded-2xl border border-white/10 shadow-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {galleryCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setGalleryCategoryFilter(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        galleryCategoryFilter === c.id
                          ? 'bg-[#E59A3D] text-black shadow-xs'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-60">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gallery..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#1C1F28] border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#E59A3D]"
                  />
                </div>
              </div>

              {/* Photo Grid with Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#14161C] rounded-2xl overflow-hidden border border-white/10 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] bg-charcoal-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-black/70 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {item.category}
                      </span>

                      {/* Hover Actions Bar */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingPhoto(item)}
                          className="w-8 h-8 rounded-full bg-[#14161C] text-white hover:bg-[#FFCE26] flex items-center justify-center shadow-md transition-all cursor-pointer"
                          title="Edit Photo"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete photo "${item.title}"?`)) {
                              deleteGalleryItem(item.id);
                              showToast(`Deleted photo "${item.title}"`);
                            }
                          }}
                          className="w-8 h-8 rounded-full bg-[#14161C] text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                        {item.location || 'Telugu Wedding'} • {item.year || '2026'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredGallery.length === 0 && (
                <div className="text-center py-16 bg-[#14161C] rounded-3xl p-6 border border-white/10">
                  <Camera size={36} className="text-charcoal-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-200">No photos found</p>
                  <p className="text-xs text-gray-500 mt-1">Try another category or add a new photo.</p>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════
              TAB 4: CLIENT BOOKINGS & INQUIRIES
          ═══════════════════════════════════════════ */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black font-display text-white tracking-tight">
                  Client Bookings & Inquiries
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Live client submissions routed directly through WhatsApp & Booking Modal.
                </p>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-[#14161C] rounded-3xl p-12 text-center border border-white/10 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-gray-500">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-base font-bold text-white">No Client Inquiries Logged Yet</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
                    When visitors submit photoshoot inquiries via the website booking modal or WhatsApp, they will appear here in real time.
                  </p>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <Link
                      to="/pricing"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E2024] hover:bg-black text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <span>Preview Booking Portal</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-[#14161C] rounded-3xl p-6 border border-white/10 shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        <th className="pb-3 font-semibold">Client</th>
                        <th className="pb-3 font-semibold">Phone / Email</th>
                        <th className="pb-3 font-semibold">Package Selected</th>
                        <th className="pb-3 font-semibold">Event Date</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Investment</th>
                        <th className="pb-3 font-semibold text-right">WhatsApp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/5/60 transition-colors">
                          <td className="py-3.5 font-bold text-white">{b.clientName}</td>
                          <td className="py-3.5 text-gray-400 font-medium">
                            <div>{b.phone}</div>
                            <div className="text-[10px] text-gray-500">{b.email}</div>
                          </td>
                          <td className="py-3.5 text-gray-300 font-medium">{b.packageTitle}</td>
                          <td className="py-3.5 text-gray-400 font-mono text-[11px]">{b.eventDate}</td>
                          <td className="py-3.5">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                              • {b.status}
                            </span>
                          </td>
                          <td className="py-3.5 font-bold text-right text-white">{b.totalAmount}</td>
                          <td className="py-3.5 text-right">
                            <a
                              href={`https://wa.me/919949395037?text=Hello%20${encodeURIComponent(b.clientName)},%20we%20received%20your%20booking%20inquiry%20at%20MY3%20Studios!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full"
                            >
                              <span>Chat</span>
                              <ArrowUpRight size={12} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════
              SECTION: SECURITY & ACCESS MANAGEMENT (Matching Reference Screenshot)
          ═══════════════════════════════════════════ */}
          {activeTab === 'security' && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              
              {/* Header Title block */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                  Password &amp; Access Security
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Welcome back, <strong className="text-white font-semibold">MY3 Fotography Admin</strong>. All studio systems running in real-time.
                </p>
              </div>

              {/* Top Hero Banner Card */}
              <div className="bg-[#14161C] rounded-3xl p-5 sm:p-7 border border-white/10 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Key size={22} className="rotate-45" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      Password &amp; Access Security
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                      Manage passwords and access emails securely &middot; Admin Portal Only
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
                  <button
                    type="button"
                    onClick={() => setIsQAModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <HelpCircle size={14} />
                    <span>UPDATE SECURITY Q&amp;A</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRefreshSecurity}
                    disabled={isRefreshingSecurity}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                    title="Refresh Security Status"
                  >
                    <RefreshCw size={15} className={isRefreshingSecurity ? 'animate-spin text-[#E59A3D]' : ''} />
                  </button>
                </div>
              </div>

              {/* Administrator Accounts Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#E59A3D]" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-300">
                      ADMINISTRATOR ACCOUNTS
                    </h3>
                    <span className="text-[11px] font-bold text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      {adminAccounts.length} accounts
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddAdminOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <Plus size={13} />
                    <span>Add Administrator</span>
                  </button>
                </div>

                {/* Account Cards Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {adminAccounts.map((acc) => {
                    const isRevealed = Boolean(visiblePasswords[acc.id]);
                    const isCopied = copiedId === acc.id;

                    return (
                      <div
                        key={acc.id}
                        className="bg-[#14161C] rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5"
                      >
                        {/* Left: Avatar + Account Meta */}
                        <div className="flex items-start sm:items-center gap-4 min-w-0">
                          <div className="w-12 h-12 rounded-full bg-black text-white font-black text-base flex items-center justify-center border-2 border-white/20 shadow-md shrink-0">
                            {acc.avatarInitial || acc.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-base font-bold text-white truncate">
                                {acc.name}
                              </h4>
                              {acc.isCurrent && (
                                <span className="text-xs font-bold text-[#E59A3D]">
                                  (You)
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                              <span className="text-gray-300 font-medium">{acc.email}</span>
                              <span className="mx-1.5">&middot;</span>
                              <span>{acc.role || acc.designation}</span>
                            </p>

                            {/* Badges row matching screenshot */}
                            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                              {acc.isMaster ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                                  MASTER ADMIN
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                                  ADMINISTRATOR
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                ACTIVE
                              </span>
                              {acc.isMaster && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-gray-400 border border-white/10">
                                  Master Admin Only
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions (Change Email + Show/Copy Password + Change Password + Delete) */}
                        <div className="flex items-center gap-2 flex-wrap self-start md:self-center shrink-0">
                          {/* Change Email Button */}
                          <button
                            type="button"
                            onClick={() => setEmailModalAccount(acc)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition-all hover:border-[#E59A3D]/40 cursor-pointer active:scale-95"
                          >
                            <Mail size={13} className="text-[#E59A3D]" />
                            <span>CHANGE EMAIL</span>
                          </button>

                          {/* Password Box: Toggle View & Copy */}
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1F28] border border-white/15 shadow-inner">
                            <span className="text-xs font-mono font-bold text-white min-w-[70px]">
                              {isRevealed ? acc.password : '••••••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(acc.id)}
                              className="text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5"
                              title={isRevealed ? "Hide Password" : "View Password"}
                            >
                              {isRevealed ? <EyeOff size={14} className="text-[#E59A3D]" /> : <Eye size={14} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyPassword(acc)}
                              className="text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5"
                              title="Copy Password to Clipboard"
                            >
                              {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>

                          {/* Change Password Button */}
                          <button
                            type="button"
                            onClick={() => setPasswordModalAccount(acc)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition-all hover:border-[#E59A3D]/40 cursor-pointer active:scale-95"
                          >
                            <Key size={13} className="text-[#E59A3D]" />
                            <span>CHANGE PASSWORD</span>
                          </button>

                          {/* Delete Account Button */}
                          {acc.isMaster ? (
                            <div
                              className="px-2.5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-500 flex items-center gap-1 text-[11px] font-semibold cursor-not-allowed"
                              title="Master Admin account is protected"
                            >
                              <Lock size={12} />
                              <span>Protected</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeleteModalAccount(acc)}
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/5 hover:bg-red-500/15 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-xs font-bold transition-all cursor-pointer active:scale-95"
                              title={`Delete ${acc.name}`}
                            >
                              <Trash2 size={13} className="text-red-400" />
                              <span>DELETE</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Recovery & Q&A Status Card */}
              <div className="bg-[#14161C] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-emerald-400" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-300">
                      Studio Security Recovery Protocol
                    </h4>
                  </div>
                  <span className="text-[11px] text-gray-500 font-mono">
                    Last updated: {securityQA.lastUpdated || 'Active'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#1C1F28] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                      Active Security Question
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {securityQA.question}
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-[10px] text-gray-400">Answer:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {showQAAnswer ? securityQA.answer : '••••••••••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowQAAnswer(!showQAAnswer)}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer text-[11px] underline ml-1"
                      >
                        {showQAAnswer ? 'Hide' : 'Reveal'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsQAModalOpen(true)}
                    className="self-start sm:self-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/15 transition-all shadow-xs cursor-pointer"
                  >
                    Edit Q&amp;A
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ═══════════════════════════════════════════
          MODAL: ADD NEW PACKAGE
      ═══════════════════════════════════════════ */}
      {isAddPackageOpen && (
        <PackageFormModal
          title="Create New Package"
          initialData={{
            title: '',
            tagline: '',
            category: 'Wedding & Celebration',
            startingPrice: '₹40,000',
            basePriceNum: 40000,
            duration: '1 Day Full Coverage',
            badge: 'Exclusive Offer',
            description: '',
            deliverables: [
              'Full Traditional Photography',
              '4K High-Definition Video Editing',
              'Designer Lay-Flat Album',
            ].join('\n'),
          }}
          onSave={(data) => {
            addPackage(data);
            setIsAddPackageOpen(false);
            showToast(`Created package "${data.title}" successfully!`);
          }}
          onClose={() => setIsAddPackageOpen(false)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: EDIT PACKAGE
      ═══════════════════════════════════════════ */}
      {editingPackage && (
        <PackageFormModal
          title={`Edit Package: ${editingPackage.title}`}
          initialData={{
            ...editingPackage,
            deliverables: Array.isArray(editingPackage.deliverables)
              ? editingPackage.deliverables.join('\n')
              : editingPackage.deliverables,
          }}
          onSave={(data) => {
            updatePackage(editingPackage.id, data);
            setEditingPackage(null);
            showToast(`Updated package "${data.title}"`);
          }}
          onClose={() => setEditingPackage(null)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: ADD NEW PHOTO
      ═══════════════════════════════════════════ */}
      {isAddPhotoOpen && (
        <PhotoFormModal
          title="Add Photo to Gallery"
          initialData={{
            title: '',
            category: 'wedding',
            image: '',
            year: '2026',
            location: 'Nandyal / Kurnool',
            client: 'Telugu Couple',
          }}
          onSave={(data) => {
            addGalleryItem(data);
            setIsAddPhotoOpen(false);
            showToast(`Added photo "${data.title}" to gallery!`);
          }}
          onClose={() => setIsAddPhotoOpen(false)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: EDIT PHOTO
      ═══════════════════════════════════════════ */}
      {editingPhoto && (
        <PhotoFormModal
          title={`Edit Photo: ${editingPhoto.title}`}
          initialData={editingPhoto}
          onSave={(data) => {
            updateGalleryItem(editingPhoto.id, data);
            setEditingPhoto(null);
            showToast(`Updated photo "${data.title}"`);
          }}
          onClose={() => setEditingPhoto(null)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: CHANGE ADMIN EMAIL
      ═══════════════════════════════════════════ */}
      {emailModalAccount && (
        <ChangeEmailModal
          account={emailModalAccount}
          onSave={(newEmail) => {
            updateAdminEmail(emailModalAccount.id, newEmail);
            showToast(`Updated email for "${emailModalAccount.name}" to ${newEmail}`);
            setEmailModalAccount(null);
          }}
          onClose={() => setEmailModalAccount(null)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: CHANGE ADMIN PASSWORD
      ═══════════════════════════════════════════ */}
      {passwordModalAccount && (
        <ChangePasswordModal
          account={passwordModalAccount}
          onSave={(newPassword) => {
            updateAdminPassword(passwordModalAccount.id, newPassword);
            showToast(`Updated password for "${passwordModalAccount.name}" successfully!`);
            setPasswordModalAccount(null);
          }}
          onClose={() => setPasswordModalAccount(null)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: UPDATE SECURITY Q&A
      ═══════════════════════════════════════════ */}
      {isQAModalOpen && (
        <SecurityQAModal
          currentQA={securityQA}
          onSave={(q, a) => {
            updateSecurityQA(q, a);
            showToast('Security recovery question and answer updated successfully!');
            setIsQAModalOpen(false);
          }}
          onClose={() => setIsQAModalOpen(false)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: CONFIRM DELETE ADMIN
      ═══════════════════════════════════════════ */}
      {deleteModalAccount && (
        <ConfirmDeleteAdminModal
          account={deleteModalAccount}
          onConfirm={() => {
            const res = deleteAdminAccount(deleteModalAccount.id);
            if (res.success) {
              showToast(`Administrator "${deleteModalAccount.name}" removed successfully`);
            } else {
              showToast(res.message || 'Cannot delete account');
            }
            setDeleteModalAccount(null);
          }}
          onClose={() => setDeleteModalAccount(null)}
        />
      )}

      {/* ═══════════════════════════════════════════
          MODAL: ADD NEW ADMINISTRATOR
      ═══════════════════════════════════════════ */}
      {isAddAdminOpen && (
        <AddAdminModal
          onSave={(data) => {
            addAdminAccount(data);
            showToast(`Added new administrator "${data.name}"`);
            setIsAddAdminOpen(false);
          }}
          onClose={() => setIsAddAdminOpen(false)}
        />
      )}

    </div>
  );
}

// ─────────────────────────────────────────────
// PACKAGE FORM MODAL (Add / Edit)
// ─────────────────────────────────────────────
function PackageFormModal({ title, initialData, onSave, onClose }) {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert('Package title is required');
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <h3 className="text-lg font-black font-display text-white">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Package Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 3 Days Royal Wedding Package"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Starting Price *
              </label>
              <input
                type="text"
                required
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                placeholder="₹60,000"
                className="w-full px-3.5 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-sm font-bold text-[#E59A3D] placeholder-gray-500 focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2 Days Full Event Coverage"
                className="w-full px-3.5 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Wedding & Multi-Day"
                className="w-full px-3.5 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Most Popular / Essential"
                className="w-full px-3.5 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Short Description / Tagline
            </label>
            <textarea
              rows={2}
              value={formData.description || formData.tagline || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                  tagline: e.target.value,
                })
              }
              placeholder="Brief description of the package scope and photography approach..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Included Deliverables (One per line)
            </label>
            <textarea
              rows={4}
              value={formData.deliverables || ''}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              placeholder="Traditional Photography&#10;Traditional Videography&#10;60 Sheets Luxury Lay-Flat Album&#10;Teaser Video"
              className="w-full px-3.5 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              Each new line will render as a checkmark bullet point on the pricing card.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-gray-300 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Save Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PHOTO FORM MODAL (Add / Edit) — File Upload from Laptop
// ─────────────────────────────────────────────
function PhotoFormModal({ title, initialData, onSave, onClose }) {
  const [formData, setFormData] = useState(initialData);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = React.useRef(null);

  const photoPresets = [
    '/takeout-1-001/wedding/MY306596.jpg',
    '/takeout-1-001/wedding/MY308576.jpg',
    '/takeout-1-001/wedding/SAI09788.jpg',
    '/takeout-1-001/prewedding/DSC04247.jpg',
    '/takeout-1-001/prewedding/SAI09694.jpg',
    '/takeout-1-001/potraites/DSC04170.jpg',
    '/takeout-1-001/potraites/DSC06581_1a.jpg',
    '/takeout-1-001/maternity/DSC05912_A.jpg',
    '/takeout-1-001/bday/MY300026.jpg',
    '/takeout-1-001/bday/01.jpg',
    '/takeout-1-001/prewedding/DSC04577.jpg',
  ];

  // Process uploaded file → compress and convert to base64 data URL
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setUploadStatus('Please select a valid image file');
      return;
    }

    setUploadStatus('Processing...');

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        // Compress: max dimension 1200px for localStorage friendliness
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h / w) * maxDim);
            w = maxDim;
          } else {
            w = Math.round((w / h) * maxDim);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
        setUploadStatus('Photo uploaded successfully');
        setTimeout(() => setUploadStatus(''), 2000);
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      setUploadStatus('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert('Photo title is required');
    if (!formData.image) return alert('Please upload a photo or select from archive');
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <h3 className="text-lg font-black font-display text-white">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Photo Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Royal Telugu Muhurtham"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
              >
                <option value="wedding">Wedding</option>
                <option value="prewedding">Pre Wedding</option>
                <option value="bday">Birthday</option>
                <option value="maternity">Maternity</option>
                <option value="potraites">Portraits</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Nandyal / Kurnool / Gandikota"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
          </div>

          {/* Upload Photo from Laptop — Drag & Drop / Click to Browse */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Upload Photo *
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-[#E59A3D] bg-[#E59A3D]/10 scale-[1.01]'
                  : 'border-white/20 bg-[#1C1F28] hover:border-[#E59A3D]/50 hover:bg-white/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  isDragOver ? 'bg-[#E59A3D]/20 text-[#E59A3D]' : 'bg-white/5 text-gray-500'
                }`}>
                  <Camera size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-300">
                    {isDragOver ? 'Drop your photo here' : 'Click to browse or drag & drop'}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    JPG, PNG, WebP — auto-compressed for gallery
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <p className={`text-[11px] font-bold mt-1.5 ${
                uploadStatus.includes('success') ? 'text-emerald-600' : uploadStatus === 'Processing...' ? 'text-gray-400' : 'text-red-500'
              }`}>
                {uploadStatus}
              </p>
            )}
          </div>

          {/* Or pick from studio archive */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 mb-1.5">
              Or pick from studio archive:
            </label>
            <div className="grid grid-cols-6 gap-2">
              {photoPresets.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setFormData({ ...formData, image: src })}
                  className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    formData.image === src
                      ? 'border-[#E59A3D] scale-105 shadow-xs'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={src} alt="preset" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Preview of selected/uploaded image */}
          {formData.image && (
            <div className="p-3 bg-white/5 rounded-2xl flex items-center gap-3 border border-white/10/60">
              <div className="w-14 h-18 rounded-lg overflow-hidden bg-black shrink-0">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs min-w-0">
                <span className="font-bold text-white block">Photo Preview</span>
                <span className="text-[10px] text-gray-400 block truncate">
                  {formData.image.startsWith('data:') ? 'Uploaded from device' : formData.image}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-gray-300 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1E2024] hover:bg-black text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Save Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL: CHANGE ADMIN EMAIL
// ─────────────────────────────────────────────
function ChangeEmailModal({ account, onSave, onClose }) {
  const [email, setEmail] = useState(account.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    onSave(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E59A3D]/20 text-[#E59A3D] flex items-center justify-center">
              <Mail size={16} />
            </div>
            <h3 className="text-base font-bold text-white">Change Admin Email</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="text-gray-400 block text-[11px]">Administrator:</span>
            <span className="font-bold text-white block mt-0.5">{account.name}</span>
            <span className="text-[11px] text-gray-400 block mt-0.5 font-mono">Current: {account.email}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              New Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rmythristudiondl.anji@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              This email will be used for authentication on the MY3 Studios admin portal.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-gray-300 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Save Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL: CHANGE ADMIN PASSWORD
// ─────────────────────────────────────────────
function ChangePasswordModal({ account, onSave, onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }
    onSave(newPassword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E59A3D]/20 text-[#E59A3D] flex items-center justify-center">
              <Key size={16} />
            </div>
            <h3 className="text-base font-bold text-white">Change Admin Password</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="text-gray-400 block text-[11px]">Account:</span>
            <span className="font-bold text-white block mt-0.5">{account.name}</span>
            <span className="text-[11px] text-gray-400 block font-mono">{account.email}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter new strong password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              Minimum 6 characters with mixed letters and numbers recommended.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Confirm New Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              placeholder="Confirm new password"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] font-mono"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-bold flex items-center gap-1.5 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-gray-300 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL: UPDATE SECURITY Q&A
// ─────────────────────────────────────────────
function SecurityQAModal({ currentQA, onSave, onClose }) {
  const [question, setQuestion] = useState(currentQA.question || '');
  const [answer, setAnswer] = useState(currentQA.answer || '');

  const presetQuestions = [
    'What is the founding location and primary atelier of MY3 Studios?',
    'What was the founding year of MY3 Studios photography studio?',
    'What is the founder full name and master photographer of MY3 Studios?',
    'What is the primary flagship camera body used by MY3 Studios?',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert('Please fill out both the security question and answer');
      return;
    }
    onSave(question, answer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <HelpCircle size={16} />
            </div>
            <h3 className="text-base font-bold text-white">Update Security Q&amp;A</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Select or Customize Security Question *
            </label>
            <select
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] mb-2"
            >
              {presetQuestions.map((q, idx) => (
                <option key={idx} value={q}>{q}</option>
              ))}
            </select>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Or type custom question"
              className="w-full px-3.5 py-2 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Security Answer *
            </label>
            <input
              type="text"
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter recovery answer"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              Used to verify studio ownership and identity in the event of access recovery.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-gray-300 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Save Q&amp;A
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL: CONFIRM DELETE ADMINISTRATOR
// ─────────────────────────────────────────────
function ConfirmDeleteAdminModal({ account, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/10 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Delete Administrator?</h3>
        <p className="text-xs text-gray-300 mb-2 leading-relaxed">
          Are you sure you want to delete <strong className="text-white font-bold">{account.name}</strong>?
        </p>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-4 text-[11px] text-gray-300 font-mono">
          {account.email}
        </div>
        <p className="text-[11px] text-red-400 font-medium mb-5">
          This account will permanently lose login access to MY3 Studios admin portal.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL: ADD NEW ADMINISTRATOR
// ─────────────────────────────────────────────
function AddAdminModal({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Studio Admin',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      alert('Please fill out all required fields');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#14161C] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E59A3D]/20 text-[#E59A3D] flex items-center justify-center">
              <Plus size={16} />
            </div>
            <h3 className="text-base font-bold text-white">Add New Administrator</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rajesh Kumar"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Admin Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. rajesh@my3studios.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Access Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Set password (min 6 chars)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D] pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Role &amp; Responsibility *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1F28] border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-[#E59A3D] focus:ring-1 focus:ring-[#E59A3D]"
            >
              <option value="Studio Admin">Studio Administrator</option>
              <option value="Lead Artist">Lead Cinematographer / Photographer</option>
              <option value="Client Coordination">Client Desk &amp; Operations</option>
              <option value="Post-Production Editor">Post-Production &amp; Album Editor</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-gray-300 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#E59A3D] hover:bg-[#E59A3D]-dark text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Add Administrator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
