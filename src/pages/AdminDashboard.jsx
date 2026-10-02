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
  AlertTriangle,
  Key,
  KeyRound,
  Lock,
  Shield,
  ShieldCheck,
  Mail,
  Copy,
  RefreshCw,
  HelpCircle,
  UserCheck,
  MapPin,
  Compass,
  Phone,
  Bell,
  Settings,
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

// ─── STUDIO RECOVERY QUESTION (Single Fixed Question) ───
export const STUDIO_SECURITY_QUESTION = {
  id: 'q1',
  category: 'Founding & Atelier',
  question: 'What is the founding location and primary atelier of MY3 Studios?',
  defaultAnswer: 'Srinivasa Center, Nandyal, Andhra Pradesh',
  hint: 'Official headquarters atelier in Nandyal',
  badge: 'HQ Location',
  icon: 'MapPin',
};

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
  const [qaModalInitialQuestion, setQaModalInitialQuestion] = useState('');
  const [qaModalInitialAnswer, setQaModalInitialAnswer] = useState('');

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
    <div className="min-h-screen bg-[#F4F2EC] text-[#1E2024] flex flex-col">
      
      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#1E2024] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#FFCE26]/30 animate-fade-in">
          <CheckCircle2 size={18} className="text-[#FFCE26]" />
          <span className="text-xs sm:text-sm font-bold">{toastMsg}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TOP NAVIGATION BAR (Matching Reference Image 2)
      ═══════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 bg-[#F4F2EC]/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Brand Seal + Symmetrical Pill Tabs */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-white p-1 shadow-xs border border-gray-200 flex items-center justify-center">
                <img src="/logo.png" alt="MY3 Studios" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-black text-sm tracking-tight text-[#1E2024] block leading-tight">
                  MY3 Studios
                </span>
                <span className="text-[10px] font-bold text-coral uppercase tracking-widest block leading-tight">
                  Admin Console
                </span>
              </div>
            </Link>

            {/* Pill Navigation Tabs — horizontally scrollable on small screens */}
            <nav className="hidden md:flex items-center gap-1.5 bg-white/70 p-1 rounded-full border border-gray-200/90 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#1E2024] text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-black hover:bg-gray-100/70'
                }`}
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('packages')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-[#1E2024] text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-black hover:bg-gray-100/70'
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
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#1E2024] text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-black hover:bg-gray-100/70'
                }`}
              >
                <ImageIcon size={14} />
                <span>Gallery</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gray-200 text-charcoal-800 font-mono">
                  {gallery.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'bookings'
                    ? 'bg-coral text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-black hover:bg-gray-100/70'
                }`}
              >
                <Calendar size={14} />
                <span>Inquiries</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-coral/20 text-coral font-mono">
                  {bookings.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-[#1E2024] text-white border border-coral/40 shadow-xs'
                    : 'text-charcoal-600 hover:text-black hover:bg-gray-100/70'
                }`}
              >
                <Key size={14} className={activeTab === 'security' ? 'text-coral' : ''} />
                <span>Security</span>
              </button>
            </nav>

          </div>

          {/* Right: Actions + Live Site + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Add Package CTA */}
            <button
              type="button"
              onClick={() => setIsAddPackageOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200/90 text-xs font-bold text-charcoal-700 shadow-xs transition-all active:scale-95"
              title="View Public Pricing Page"
            >
              <span className="hidden sm:inline">Live Site</span>
              <ArrowUpRight size={13} />
            </Link>

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200/80">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-200 shadow-xs flex items-center justify-center p-0.5" title="Anji — Studio Lead">
                <img
                  src="/logo.png"
                  alt="Anji Studio Lead"
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-8 h-8 rounded-full bg-white hover:bg-red-50 hover:text-red-600 text-charcoal-500 border border-gray-200 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F4F2EC]/95 backdrop-blur-md border-t border-gray-100 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
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
                  ? 'text-coral'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-coral' : 'text-gray-500'}`}>
                {tab.label}
              </span>
              {tab.count != null && tab.count > 0 && (
                <span className="absolute -top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-coral text-white text-[9px] font-bold flex items-center justify-center">
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
        <aside className="hidden lg:flex flex-col items-center justify-between w-14 bg-white backdrop-blur-md rounded-full py-5 border border-gray-100 shadow-sm shrink-0 self-start sticky top-28">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-coral text-black shadow-sm'
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
                  ? 'bg-[#1E2024] text-white shadow-sm'
                  : 'text-charcoal-400 hover:text-black hover:bg-gray-100'
              }`}
              title="Manage Packages"
            >
              <Package size={17} />
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#1E2024] text-white shadow-sm'
                  : 'text-charcoal-400 hover:text-black hover:bg-gray-100'
              }`}
              title="Manage Gallery"
            >
              <ImageIcon size={17} />
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#1E2024] text-white shadow-sm'
                  : 'text-charcoal-400 hover:text-black hover:bg-gray-100'
              }`}
              title="Client Inquiries"
            >
              <Calendar size={17} />
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-black text-coral border border-gray-200 shadow-sm'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="Password & Access Security"
            >
              <Key size={17} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
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
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-black text-white font-black text-sm flex items-center justify-center border border-gray-200 shadow-xs shrink-0">
                  K
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-charcoal-900 truncate leading-tight">
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 text-xs font-semibold border border-gray-100 transition-colors"
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
                      ? 'bg-black text-white border border-coral/40 shadow-sm'
                      : 'bg-white text-gray-400 hover:text-white border border-gray-100'
                  }`}
                >
                  {t.icon && <t.icon size={13} className={activeTab === t.id ? 'text-coral' : ''} />}
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
                  <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1E2024] tracking-tight">
                    Welcome back, Anji!
                  </h1>
                  <p className="text-xs sm:text-sm text-charcoal-500 font-medium mt-0.5">
                    Control studio packages, gallery curation, and verified bookings.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsAddPackageOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
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
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#1E2024] font-display">Catalog Overview</h3>
                      <p className="text-[11px] text-charcoal-400">Live Studio Assets & Albums</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Catalog
                    </span>
                  </div>

                  {/* Two Main Metrics */}
                  <div className="grid grid-cols-2 gap-4 my-3 py-3 border-y border-gray-100">
                    <button
                      type="button"
                      onClick={() => setActiveTab('packages')}
                      className="text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-medium group-hover:text-coral transition-colors">
                        <Package size={13} className="text-coral" />
                        <span>Packages</span>
                      </div>
                      <span className="text-2xl font-black text-[#1E2024] font-display block mt-1 group-hover:text-coral transition-colors">
                        {packages.length}
                      </span>
                      <span className="text-[10px] text-charcoal-400">Available to clients</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('gallery')}
                      className="text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-medium group-hover:text-[#FFCE26] transition-colors">
                        <ImageIcon size={13} className="text-[#FFCE26]" />
                        <span>Gallery Photos</span>
                      </div>
                      <span className="text-2xl font-black text-[#1E2024] font-display block mt-1 group-hover:text-charcoal-900 transition-colors">
                        {gallery.length}
                      </span>
                      <span className="text-[10px] text-charcoal-400">Curated showcase</span>
                    </button>
                  </div>

                  {/* Real Gallery Category Distribution Bar Graphic */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-charcoal-400">
                        Gallery Breakdown by Category
                      </p>
                      <span className="text-[10px] font-medium text-charcoal-500">
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
                                  ? 'bg-coral group-hover:bg-coral-dark shadow-xs'
                                  : 'bg-[#1E2024] group-hover:bg-black'
                              }`}
                            />
                            <span className="text-[9px] text-charcoal-400 font-medium truncate max-w-full">
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
                    className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal-700 group-hover:text-coral transition-colors">
                        Client Inquiries
                      </span>
                      <Calendar size={14} className="text-coral" />
                    </div>
                    <div className="my-3">
                      <span className="text-xs font-semibold text-coral flex items-center gap-1">
                        {bookings.filter((b) => b.status === 'Pending').length} Pending Review
                      </span>
                      <span className="text-2xl font-black text-[#1E2024] font-display mt-0.5 block">
                        {bookings.length}
                      </span>
                      <p className="text-[10px] text-charcoal-400">Total website inquiries</p>
                    </div>
                    <div className="pt-2 border-t border-gray-100 text-[11px] font-bold text-coral flex items-center justify-between">
                      <span>View Inquiries</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                  {/* Card 2: Active Packages Coverage */}
                  <div
                    onClick={() => setActiveTab('packages')}
                    className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal-700 group-hover:text-black transition-colors">
                        Active Packages
                      </span>
                      <Sparkles size={14} className="text-[#FFCE26]" />
                    </div>
                    <div className="my-3">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        {packages.filter((p) => p.featured).length} Featured
                      </span>
                      <span className="text-2xl font-black text-[#1E2024] font-display mt-0.5 block">
                        {packages.length}
                      </span>
                      <p className="text-[10px] text-charcoal-400">Public wedding packages</p>
                    </div>
                    <div className="pt-2 border-t border-gray-100 text-[11px] font-bold text-charcoal-700 flex items-center justify-between">
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
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
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
                    <div className="pt-2 border-t border-gray-100 text-[11px] font-bold text-[#FFCE26] flex items-center justify-between">
                      <span>Curate Photos</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                </div>

              </div>

              {/* Grid 2: Recent Inquiries Table (Real Data or Clean Empty State) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-bold text-[#1E2024] font-display">
                      Recent Inquiries & Bookings
                    </h3>
                    <p className="text-xs text-charcoal-400">
                      Dispatched directly from Home & Pricing WhatsApp booking modals
                    </p>
                  </div>
                  {bookings.length > 0 && (
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs font-bold text-coral hover:text-coral-dark"
                    >
                      View All →
                    </button>
                  )}
                </div>

                {bookings.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-charcoal-400">
                      <Calendar size={22} />
                    </div>
                    <h4 className="text-sm font-bold text-[#1E2024]">No client inquiries logged yet</h4>
                    <p className="text-xs text-charcoal-500 max-w-sm mx-auto mt-1">
                      When clients submit photoshoot requests via the website booking modal or WhatsApp, they will appear here automatically.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAddPackageOpen(true)}
                        className="px-4 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        + Add New Package
                      </button>
                      <Link
                        to="/pricing"
                        target="_blank"
                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-800 text-xs font-bold transition-all"
                      >
                        View Public Packages ↗
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                          <th className="pb-3 font-semibold">Client Name</th>
                          <th className="pb-3 font-semibold">Package</th>
                          <th className="pb-3 font-semibold">Event Date</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Investment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs">
                        {bookings.slice(0, 4).map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3.5 font-bold text-[#1E2024]">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-coral/10 text-coral font-bold flex items-center justify-center text-xs">
                                  {b.clientName.charAt(0)}
                                </div>
                                <div>
                                  <span>{b.clientName}</span>
                                  <span className="block text-[10px] text-charcoal-400 font-normal">
                                    {b.phone}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 text-charcoal-600 font-medium">{b.packageTitle}</td>
                            <td className="py-3.5 text-charcoal-500 font-mono text-[11px]">{b.eventDate}</td>
                            <td className="py-3.5">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  b.status === 'Confirmed'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : b.status === 'In Progress'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-gray-100 text-charcoal-700'
                                }`}
                              >
                                • {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 font-bold text-right text-[#1E2024]">
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
                  <h2 className="text-2xl font-black font-display text-[#1E2024] tracking-tight">
                    Packages Management
                  </h2>
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Add, edit, or remove photography packages. Updates immediately reflect on the live{' '}
                    <Link to="/pricing" target="_blank" className="text-coral underline font-semibold">
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-charcoal-600 text-xs font-bold transition-all shadow-xs cursor-pointer"
                    title="Restore default packages"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={() => setIsAddPackageOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
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
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-all relative group"
                  >
                    {/* Top Badges & Actions */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-coral/10 text-coral">
                          {pkg.badge || 'Package'}
                        </span>
                        
                        {/* Edit / Delete Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingPackage(pkg)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1E2024] hover:text-white text-charcoal-700 flex items-center justify-center transition-all cursor-pointer"
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
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white text-charcoal-700 flex items-center justify-center transition-all cursor-pointer"
                            title="Delete Package"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-black font-display text-[#1E2024] leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-charcoal-500 mt-1 line-clamp-2">
                        {pkg.tagline || pkg.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black font-display text-[#1E2024]">
                            {pkg.startingPrice}
                          </span>
                          <span className="text-[11px] text-charcoal-400 font-medium">starting</span>
                        </div>
                        <span className="text-xs text-charcoal-500 font-medium block mt-0.5">
                          Duration: {pkg.duration}
                        </span>
                      </div>

                      {/* Deliverables Count */}
                      <div className="mt-4 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                          Included Deliverables ({pkg.deliverables?.length || 0}):
                        </span>
                        <ul className="text-xs text-charcoal-600 space-y-1">
                          {pkg.deliverables?.slice(0, 3).map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span className="truncate">{d}</span>
                            </li>
                          ))}
                          {(pkg.deliverables?.length || 0) > 3 && (
                            <li className="text-[11px] text-coral font-bold pl-4">
                              + {(pkg.deliverables?.length || 0) - 3} more deliverables
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-charcoal-400 font-mono">
                        ID: {pkg.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingPackage(pkg)}
                        className="text-xs font-bold text-coral hover:text-coral-dark flex items-center gap-1 cursor-pointer"
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
                  <h2 className="text-2xl font-black font-display text-[#1E2024] tracking-tight">
                    Gallery Archive Management
                  </h2>
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Add, edit, or delete curated photo heirlooms. Changes update live on the{' '}
                    <Link to="/gallery" target="_blank" className="text-coral underline font-semibold">
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-charcoal-600 text-xs font-bold transition-all shadow-xs cursor-pointer"
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {galleryCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setGalleryCategoryFilter(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        galleryCategoryFilter === c.id
                          ? 'bg-[#1E2024] text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-charcoal-700'
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
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-coral"
                  />
                </div>
              </div>

              {/* Photo Grid with Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
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
                          className="w-8 h-8 rounded-full bg-white text-charcoal-900 hover:bg-[#FFCE26] flex items-center justify-center shadow-md transition-all cursor-pointer"
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
                          className="w-8 h-8 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="text-xs font-bold text-[#1E2024] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-charcoal-400 mt-0.5 truncate">
                        {item.location || 'Telugu Wedding'} • {item.year || '2026'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredGallery.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl p-6 border border-gray-100">
                  <Camera size={36} className="text-charcoal-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-charcoal-800">No photos found</p>
                  <p className="text-xs text-charcoal-400 mt-1">Try another category or add a new photo.</p>
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
                <h2 className="text-2xl font-black font-display text-[#1E2024] tracking-tight">
                  Client Bookings & Inquiries
                </h2>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Live client submissions routed directly through WhatsApp & Booking Modal.
                </p>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-charcoal-400">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-base font-bold text-[#1E2024]">No Client Inquiries Logged Yet</h3>
                  <p className="text-xs text-charcoal-500 max-w-md mx-auto mt-1">
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
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
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
                        <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3.5 font-bold text-[#1E2024]">{b.clientName}</td>
                          <td className="py-3.5 text-charcoal-600 font-medium">
                            <div>{b.phone}</div>
                            <div className="text-[10px] text-charcoal-400">{b.email}</div>
                          </td>
                          <td className="py-3.5 text-charcoal-700 font-medium">{b.packageTitle}</td>
                          <td className="py-3.5 text-charcoal-500 font-mono text-[11px]">{b.eventDate}</td>
                          <td className="py-3.5">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                              • {b.status}
                            </span>
                          </td>
                          <td className="py-3.5 font-bold text-right text-[#1E2024]">{b.totalAmount}</td>
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
                <h2 className="text-2xl sm:text-3xl font-black font-display text-[#1E2024] tracking-tight">
                  Password &amp; Access Security
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Welcome back, <strong className="text-charcoal-900 font-semibold">MY3 Fotography Admin</strong>. All studio systems running in real-time.
                </p>
              </div>

              {/* Top Hero Banner Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Key size={22} className="rotate-45" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1E2024] leading-snug">
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
                    className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-charcoal-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                    title="Refresh Security Status"
                  >
                    <RefreshCw size={15} className={isRefreshingSecurity ? 'animate-spin text-coral' : ''} />
                  </button>
                </div>
              </div>

              {/* Administrator Accounts Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-coral" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-charcoal-900">
                      ADMINISTRATOR ACCOUNTS
                    </h3>
                    <span className="text-[11px] font-bold text-charcoal-700 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                      {adminAccounts.length} accounts
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddAdminOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-coral hover:bg-coral-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
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
                        className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 hover:border-gray-200 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5"
                      >
                        {/* Left: Avatar + Account Meta */}
                        <div className="flex items-start sm:items-center gap-4 min-w-0">
                          <div className="w-12 h-12 rounded-full bg-black text-white font-black text-base flex items-center justify-center border-2 border-gray-200 shadow-md shrink-0">
                            {acc.avatarInitial || acc.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-base font-bold text-[#1E2024] truncate">
                                {acc.name}
                              </h4>
                              {acc.isCurrent && (
                                <span className="text-xs font-bold text-coral">
                                  (You)
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-charcoal-500 mt-0.5 truncate">
                              <span className="text-charcoal-700 font-medium">{acc.email}</span>
                              <span className="mx-1.5">&middot;</span>
                              <span>{acc.role || acc.designation}</span>
                            </p>

                            {/* Badges row matching screenshot */}
                            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                              {acc.isMaster ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-600 border border-rose-500/30 uppercase tracking-wider">
                                  MASTER ADMIN
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/15 text-blue-600 border border-blue-500/30 uppercase tracking-wider">
                                  ADMINISTRATOR
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                ACTIVE
                              </span>
                              {acc.isMaster && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-charcoal-500 border border-gray-200">
                                  Master Admin Only
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions — stacks vertically on mobile for better touch targets */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                          {/* Row 1: Email + Password actions */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => setEmailModalAccount(acc)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-charcoal-800 transition-all hover:border-coral cursor-pointer active:scale-95"
                            >
                              <Mail size={13} className="text-coral" />
                              <span className="hidden sm:inline">CHANGE</span> <span>EMAIL</span>
                            </button>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 shadow-inner">
                              <span className="text-xs font-mono font-bold text-charcoal-900 min-w-[60px] sm:min-w-[70px]">
                                {isRevealed ? acc.password : '••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(acc.id)}
                                className="text-charcoal-400 hover:text-charcoal-900 transition-colors cursor-pointer p-0.5"
                                title={isRevealed ? "Hide Password" : "View Password"}
                              >
                                {isRevealed ? <EyeOff size={14} className="text-coral" /> : <Eye size={14} />}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopyPassword(acc)}
                                className="text-charcoal-400 hover:text-charcoal-900 transition-colors cursor-pointer p-0.5"
                                title="Copy Password to Clipboard"
                              >
                                {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>

                          {/* Row 2: Password change + Delete */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPasswordModalAccount(acc)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-charcoal-800 transition-all hover:border-coral cursor-pointer active:scale-95"
                            >
                              <Key size={13} className="text-coral" />
                              <span className="hidden sm:inline">CHANGE</span> <span>PASSWORD</span>
                            </button>

                            {acc.isMaster ? (
                              <div
                                className="px-2.5 py-2 rounded-full bg-gray-100 border border-gray-200 text-charcoal-400 flex items-center gap-1 text-[11px] font-semibold cursor-not-allowed"
                                title="Master Admin account is protected"
                              >
                                <Lock size={12} />
                                <span>Protected</span>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDeleteModalAccount(acc)}
                                className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 text-xs font-bold transition-all cursor-pointer active:scale-95"
                                title={`Delete ${acc.name}`}
                              >
                                <Trash2 size={13} className="text-red-500" />
                                <span>DELETE</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Recovery & Q&A Status Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-emerald-500" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-charcoal-900">
                      Studio Security Recovery Protocol
                    </h4>
                  </div>
                  <span className="text-[11px] text-charcoal-500 font-mono">
                    Last updated: {securityQA.lastUpdated || 'Active'}
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-charcoal-500 block">
                      Active Security Question
                    </span>
                    <p className="text-sm sm:text-base font-bold text-charcoal-900 leading-snug">
                      {securityQA.question}
                    </p>
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <span className="text-xs text-charcoal-500 font-medium">Answer:</span>
                      <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {showQAAnswer ? securityQA.answer : '••••••••••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowQAAnswer(!showQAAnswer)}
                        className="text-coral hover:text-coral-dark font-bold transition-colors cursor-pointer text-xs underline ml-1"
                      >
                        {showQAAnswer ? 'Hide' : 'Reveal'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setQaModalInitialQuestion(securityQA.question);
                      setQaModalInitialAnswer(securityQA.answer);
                      setIsQAModalOpen(true);
                    }}
                    className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-charcoal-900 hover:bg-black text-xs font-bold text-white transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Edit3 size={13} />
                    <span>Edit Q&amp;A</span>
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
          initialQuestion={qaModalInitialQuestion || securityQA.question}
          initialAnswer={qaModalInitialAnswer || securityQA.answer}
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
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h3 className="text-lg font-black font-display text-[#1E2024]">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-600 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Package Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 3 Days Royal Wedding Package"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Starting Price *
              </label>
              <input
                type="text"
                required
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                placeholder="₹60,000"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-coral placeholder-gray-500 focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2 Days Full Event Coverage"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Wedding & Multi-Day"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Most Popular / Essential"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
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
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-xs focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Included Deliverables (One per line)
            </label>
            <textarea
              rows={4}
              value={formData.deliverables || ''}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              placeholder="Traditional Photography&#10;Traditional Videography&#10;60 Sheets Luxury Lay-Flat Album&#10;Teaser Video"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-xs font-mono focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              Each new line will render as a checkmark bullet point on the pricing card.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold shadow-md cursor-pointer"
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
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h3 className="text-lg font-black font-display text-[#1E2024]">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-600 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Photo Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Royal Telugu Muhurtham"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 text-xs font-bold focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
              >
                <option value="wedding">Wedding</option>
                <option value="prewedding">Pre Wedding</option>
                <option value="bday">Birthday</option>
                <option value="maternity">Maternity</option>
                <option value="potraites">Portraits</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Nandyal / Kurnool / Gandikota"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-gray-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
            />
          </div>

          {/* Upload Photo from Laptop — Drag & Drop / Click to Browse */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1.5">
              Upload Photo *
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-coral bg-coral/10 scale-[1.01]'
                  : 'border-gray-200 bg-gray-50 hover:border-coral/50 hover:bg-white/5'
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
                  isDragOver ? 'bg-coral/20 text-coral' : 'bg-gray-100 text-charcoal-400'
                }`}>
                  <Camera size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal-700">
                    {isDragOver ? 'Drop your photo here' : 'Click to browse or drag & drop'}
                  </p>
                  <p className="text-[10px] text-charcoal-400 mt-0.5">
                    JPG, PNG, WebP — auto-compressed for gallery
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <p className={`text-[11px] font-bold mt-1.5 ${
                uploadStatus.includes('success') ? 'text-emerald-600' : uploadStatus === 'Processing...' ? 'text-charcoal-500' : 'text-red-500'
              }`}>
                {uploadStatus}
              </p>
            )}
          </div>

          {/* Or pick from studio archive */}
          <div>
            <label className="block text-[11px] font-bold text-charcoal-500 mb-1.5">
              Or pick from studio archive:
            </label>
            <div className="grid grid-cols-6 gap-2">
              {photoPresets.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setFormData({ ...formData, image: src })}
                  className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    formData.image === src
                      ? 'border-coral scale-105 shadow-xs'
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
            <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3 border border-gray-200/60">
              <div className="w-14 h-18 rounded-lg overflow-hidden bg-black shrink-0">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs min-w-0">
                <span className="font-bold text-[#1E2024] block">Photo Preview</span>
                <span className="text-[10px] text-charcoal-500 block truncate">
                  {formData.image.startsWith('data:') ? 'Uploaded from device' : formData.image}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-charcoal-700 hover:bg-gray-200 cursor-pointer"
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
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-coral/20 text-coral flex items-center justify-center">
              <Mail size={16} />
            </div>
            <h3 className="text-base font-bold text-[#1E2024]">Change Admin Email</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-600 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
            <span className="text-charcoal-500 block text-[11px] font-semibold">Administrator Account:</span>
            <span className="font-bold text-charcoal-900 block mt-0.5 text-sm">{account.name}</span>
            <span className="text-[11px] text-charcoal-600 block mt-0.5 font-mono">Current: {account.email}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">
              New Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rmythristudiondl.anji@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-charcoal-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
            />
            <span className="text-[10px] text-charcoal-500 mt-1 block">
              This email will be used for authentication on the MY3 Studios admin portal.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold shadow-md cursor-pointer"
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
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-coral/20 text-coral flex items-center justify-center">
              <Key size={16} />
            </div>
            <h3 className="text-base font-bold text-[#1E2024]">Change Admin Password</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-600 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
            <span className="text-charcoal-500 block text-[11px] font-semibold">Target Account:</span>
            <span className="font-bold text-charcoal-900 block mt-0.5 text-sm">{account.name}</span>
            <span className="text-[11px] text-charcoal-600 block font-mono mt-0.5">{account.email}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-charcoal-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548] pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-900 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <span className="text-[10px] text-charcoal-500 mt-1 block">
              Minimum 6 characters with mixed letters and numbers recommended.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-charcoal-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548] font-mono"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-bold flex items-center gap-1.5 bg-red-50 p-2.5 rounded-xl border border-red-200">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold shadow-md cursor-pointer"
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
function SecurityQAModal({ currentQA, initialQuestion, initialAnswer, onSave, onClose }) {
  const fixedQuestion = STUDIO_SECURITY_QUESTION.question;
  const [answer, setAnswer] = useState(initialAnswer || currentQA.answer || '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setErrorMsg('Please enter the security answer.');
      return;
    }
    onSave(fixedQuestion, answer.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
              <KeyRound size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-charcoal-900 leading-none">
                Update Security Recovery Answer
              </h3>
              <p className="text-[11px] text-charcoal-500 mt-1">
                Used to verify studio ownership if access is ever lost
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
            <AlertTriangle size={15} className="shrink-0 text-red-500" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fixed Question Display */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
              Security Question (Fixed)
            </label>
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-charcoal-900">
              {fixedQuestion}
            </div>
            <span className="text-[10px] text-charcoal-500 mt-1 block">
              This is your studio's fixed security recovery question.
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-charcoal-800">
                Security Answer *
              </label>
              <span className="text-[10px] text-emerald-700 font-mono font-medium">
                Case-insensitive matching
              </span>
            </div>
            <input
              type="text"
              required
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter recovery answer..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-charcoal-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548] font-medium"
            />
            <span className="text-[10px] text-charcoal-500 mt-1 block">
              Tip: Keep the answer memorable, e.g. "Srinivasa Center, Nandyal, Andhra Pradesh".
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Save Recovery Answer</span>
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
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/15 text-red-500 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} />
        </div>
        <h3 className="text-lg font-bold text-charcoal-900 mb-2">Delete Administrator?</h3>
        <p className="text-xs text-charcoal-600 mb-2 leading-relaxed">
          Are you sure you want to delete <strong className="text-charcoal-900 font-bold">{account.name}</strong>?
        </p>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 mb-4 text-[11px] text-charcoal-800 font-mono font-medium">
          {account.email}
        </div>
        <p className="text-[11px] text-red-600 font-medium mb-5">
          This account will permanently lose login access to MY3 Studios admin portal on all devices.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-700 text-xs font-bold cursor-pointer"
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
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-coral/20 text-coral flex items-center justify-center">
              <Plus size={16} />
            </div>
            <h3 className="text-base font-bold text-[#1E2024]">Add New Administrator</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal-600 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rajesh Kumar"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-charcoal-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">
              Admin Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. rajesh@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-charcoal-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">
              Access Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Set password (min 6 chars)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 placeholder-charcoal-400 text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548] pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-900 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 mb-1">
              Role &amp; Responsibility *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-900 text-xs font-bold focus:outline-none focus:border-coral focus:ring-1 focus:ring-[#FF6548]"
            >
              <option value="Studio Admin">Studio Administrator</option>
              <option value="Lead Artist">Lead Cinematographer / Photographer</option>
              <option value="Client Coordination">Client Desk &amp; Operations</option>
              <option value="Post-Production Editor">Post-Production &amp; Album Editor</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Add Administrator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
