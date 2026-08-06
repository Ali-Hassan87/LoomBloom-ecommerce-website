import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import UserDropdown from "./UserDropdown";
import SearchOverlay from "./Search";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "🏚️ Home", path: "/" },
    { name: "👜 Collection", path: "/collection" },
    { name: "🏷️ Sales", path: "/sales" },
    { name: "✨ New Arrivals", path: "/new-arrivals" },
    { name: "☕︎ About", path: "/about" },
  ];

  // Body scroll lock when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[rgb(198,206,183)] border-b border-[#E5DDD3]/50 backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="LoomBloom"
              className="h-12 w-auto object-contain sm:h-14 transition-transform duration-300 hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wide text-[#333C2E] sm:text-2xl whitespace-nowrap">
                LoomB⸙oom
              </span>
              <span className="hidden sm:block text-[10px] text-[#B85C4A] font-medium tracking-widest uppercase">
                AliKhan Enterprises
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative group w-full px-5 py-3 text-sm whitespace-nowrap font-medium tracking-wide rounded-full transition-all duration-300 ${isActive
                    ? "text-[#343B2F] font-extrabold text-xl"
                    : "text-[#77716B] hover:text-[#343B2F]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className="absolute bottom-0 left-0 h-0.5 rounded-full bg-[#343B2F] 
                      w-0 group-hover:w-full
                      group-hover:transition-[width]
                      group-hover:duration-500
                      group-hover:ease-in-out "
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search — ab overlay kholey ga */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="group inline-flex rounded-full p-2.5 transition-all duration-300 text-[#333C2E]/70 hover:bg-[#343B2F] hover:text-white shadow-sm hover:shadow-md"
            >
              <Search size={19} strokeWidth={1.7} className="transition-transform duration-300 group-hover:scale-110" />
            </button>

            <UserDropdown />

            <NavLink
              to="/cart"
              aria-label="Shopping Bag"
              className={({ isActive }) =>
                `group relative inline-flex rounded-full p-2.5 transition-all duration-300 ${isActive
                  ? "bg-[#343B2F] text-white shadow-md"
                  : "text-[#333C2E]/70 hover:bg-[#343B2F] hover:text-white shadow-sm hover:shadow-md"
                }`
              }
            >
              <ShoppingBag size={19} strokeWidth={1.7} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#343B2F] text-[10px] font-bold text-white shadow-lg">
                0
              </span>
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-3 text-[#333C2E]/70 hover:text-[#B85C4A] transition-all duration-300 hover:bg-[#F3EDE4]/50 shadow-sm hover:shadow-md lg:hidden"
          >
            {isMenuOpen ? <X size={22} strokeWidth={1.7} /> : <Menu size={22} strokeWidth={1.7} />}
          </button>
        </div>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu — Fixed Slide-in Panel (overflow issue fixed!) */}
      <div
        className={`fixed inset-0 z-60 lg:hidden transition-all duration-500 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Slide Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-[#FAF7F2] shadow-2xl transition-transform duration-500 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-[#E5DDD3]/50 px-5 py-4 sm:px-8">
            <span className="font-serif text-lg font-semibold text-[#333C2E]">
              Menu
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full p-2 text-[#333C2E]/70 hover:text-[#B85C4A] transition-all duration-300 hover:bg-[#F3EDE4]/50"
            >
              <X size={22} strokeWidth={1.7} />
            </button>
          </div>

          {/* Scrollable Content — aapka original content bilkul same */}
          <div className="h-[calc(100%-65px)] overflow-y-auto px-5 pb-6 pt-4 sm:px-8">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-4 text-sm font-medium rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-[#B85C4A] bg-[#F3EDE4]/50"
                        : "text-[#77716B] hover:text-[#B85C4A] hover:bg-[#F3EDE4]/20"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-[#B85C4A] transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {item.name}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {/* Mobile Search — overlay kholey ga */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E5DDD3] py-3 text-sm text-[#333C2E] transition-all duration-300 hover:border-[#B85C4A] hover:text-[#B85C4A] hover:bg-[#F3EDE4]/20"
              >
                <Search size={17} strokeWidth={1.7} />
                Search
              </button>

              {/* UserDropdown — ab clip nahi hoga! */}
              <div className="flex items-center">
                <UserDropdown />
              </div>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/cart");
                }}
                aria-label="Shopping Bag"
                className="relative rounded-full border border-[#E5DDD3] p-3 text-[#333C2E] transition-all duration-300 hover:border-[#B85C4A] hover:text-[#B85C4A] hover:bg-[#F3EDE4]/20"
              >
                <ShoppingBag size={18} strokeWidth={1.7} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#B85C4A] text-[10px] font-bold text-white shadow-lg">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;