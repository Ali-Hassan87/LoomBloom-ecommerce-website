import { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from '../firebase/config'; 
import { UserRound, Settings, Package, Shield, LogOut, LayoutDashboard, ShoppingBag, Users } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

export default function UserDropdown() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Admin state — localStorage se read karo
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });

  // 🔥 FIX: Admin login/logout pe state sync karo
  useEffect(() => {
    function handleAdminLogin() {
      const saved = localStorage.getItem('adminUser');
      setAdmin(saved ? JSON.parse(saved) : null);
    }

    function handleStorage(e) {
      if (e.key === 'adminUser') {
        setAdmin(e.newValue ? JSON.parse(e.newValue) : null);
      }
    }

    window.addEventListener('admin-login', handleAdminLogin);
    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('admin-login', handleAdminLogin);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // 🔥 FIX: Jab bhi dropdown open karo, fresh localStorage check karo
  const toggleDropdown = () => {
    const saved = localStorage.getItem('adminUser');
    setAdmin(saved ? JSON.parse(saved) : null);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // CUSTOMER logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ADMIN logout
  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('adminUser');
      setAdmin(null);
      setIsOpen(false);
      // 🔥 FIX: Logout event fire karo
      window.dispatchEvent(new Event('admin-login'));
      navigate('/');
    } catch (error) {
      console.error('Admin logout error:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'AD';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // ===================== ADMIN DROPDOWN =====================
  if (admin) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none rounded-full"
        >
          {admin.photoURL ? (
            <img
              src={admin.photoURL}
              alt="Admin"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#A8B89A] hover:border-[#343B2F] transition-colors"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#B85C4A] to-[#343B2F] flex items-center justify-center text-white font-bold text-sm border-2 border-[#C5CEB8] hover:border-[#343B2F] transition-colors">
              {getInitials(admin.name)}
            </div>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-60 bg-[#FAF7F2] rounded-2xl shadow-xl border border-[#E8EBE3] py-2 z-50">
            <div className="px-4 py-3 border-b border-[#E8EBE3]">
              <div className="flex items-center gap-3">
                {admin.photoURL ? (
                  <img src={admin.photoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  // <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#B85C4A] to-[#343B2F] flex items-center justify-center text-white font-bold text-xs">
                  //   {getInitials(admin.name)}
                  // </div>
                  "ali"
                )}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#343B2F] truncate">{admin.name}</p>
                  <p className="text-xs text-[#B85C4A] font-medium">Administrator</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button onClick={() => { navigate('/admin/dashboard'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
                <LayoutDashboard size={16} strokeWidth={1.7} className="text-[#77716B]" /> Dashboard
              </button>
              <button onClick={() => { navigate('/admin/products'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
                <ShoppingBag size={16} strokeWidth={1.7} className="text-[#77716B]" /> Products
              </button>
              <button onClick={() => { navigate('/admin/orders'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
                <Package size={16} strokeWidth={1.7} className="text-[#77716B]" /> Orders
              </button>
              <button onClick={() => { navigate('/admin/customers'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
                <Users size={16} strokeWidth={1.7} className="text-[#77716B]" /> Customers
              </button>
              <button onClick={() => { navigate('/admin/settings'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
                <Settings size={16} strokeWidth={1.7} className="text-[#77716B]" /> Settings
              </button>
            </div>

            <div className="border-t border-[#E8EBE3] pt-1 mt-1">
              <button onClick={handleAdminLogout} className="w-full text-left px-4 py-2.5 text-sm text-[#B85C4A] hover:bg-red-50 flex items-center gap-3 transition-colors">
                <LogOut size={16} strokeWidth={1.7} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===================== NOT LOGGED IN =====================
  if (!user) {
    return (
      <NavLink to="/account" aria-label="Account" className={({ isActive }) => `group inline-flex rounded-full p-2.5 transition-all duration-300 ${isActive ? "bg-[#343B2F] text-white shadow-md" : "text-[#333C2E]/70 hover:bg-[#343B2F] hover:text-white shadow-sm hover:shadow-md"}`}>
        <UserRound size={19} strokeWidth={1.7} className="transition-transform duration-300 group-hover:scale-110" />
      </NavLink>
    );
  }

  // ===================== CUSTOMER LOGGED IN =====================
  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center focus:outline-none rounded-full">
        {user.photoURL ? (
          <img src={user.photoURL} alt="Profile" referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover border-2 border-[#C5CEB8] hover:border-[#343B2F] transition-colors" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#A8B89A] to-[#343B2F] flex items-center justify-center text-white font-bold text-sm border-2 border-[#C5CEB8] hover:border-[#343B2F] transition-colors">
            {getInitials(user.displayName || user.email)}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-[#FAF7F2] rounded-2xl shadow-xl border border-[#E8EBE3] py-2 z-50">
          <div className="px-4 py-3 border-b border-[#E8EBE3]">
            <p className="text-sm font-bold text-[#343B2F] truncate">{user.displayName || 'User'}</p>
            <p className="text-xs text-[#77716B] truncate mt-0.5">{user.email}</p>
          </div>

          <div className="py-1">
            <button onClick={() => { navigate('/account/profile'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
              <UserRound size={16} strokeWidth={1.7} className="text-[#77716B]" /> Profile
            </button>
            <button onClick={() => { navigate('/account'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
              <Settings size={16} strokeWidth={1.7} className="text-[#77716B]" /> Account Settings
            </button>
            <button onClick={() => { navigate('/account/orders'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
              <Package size={16} strokeWidth={1.7} className="text-[#77716B]" /> My Orders
            </button>
            <button onClick={() => { navigate('/account/data'); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-[#343B2F] hover:bg-[#F3EDE4] flex items-center gap-3 transition-colors">
              <Shield size={16} strokeWidth={1.7} className="text-[#77716B]" /> Data & Privacy
            </button>
          </div>

          <div className="border-t border-[#E8EBE3] pt-1 mt-1">
            <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-[#B85C4A] hover:bg-red-50 flex items-center gap-3 transition-colors">
              <LogOut size={16} strokeWidth={1.7} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}