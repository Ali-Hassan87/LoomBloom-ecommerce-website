import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, TrendingUp, Clock } from "lucide-react";

const recentSearches = ["Kurta", "Waistcoat", "Shalwar Kameez", "Embroidered"];
const trending = ["Summer Collection", "Wedding Wear", "New Arrivals"];

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Search Container */}
      <div
        className={`absolute left-0 right-0 top-0 bg-[#FAF7F2] shadow-2xl transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8 sm:py-8">
          {/* Search Input */}
          <div className="relative flex items-center">
            <Search
              size={22}
              strokeWidth={1.5}
              className="absolute left-5 text-[#B85C4A]"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for kurta, waistcoat, shalwar..."
              className="w-full rounded-2xl border-2 border-[#E5DDD3] bg-white py-4 pl-14 pr-14 text-base text-[#333C2E] placeholder:text-[#A8A29E] transition-all duration-300 focus:border-[#B85C4A] focus:outline-none focus:ring-4 focus:ring-[#B85C4A]/10 sm:py-5 sm:text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-14 rounded-full p-1 text-[#A8A29E] hover:text-[#B85C4A] transition-colors"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={onClose}
              className="absolute right-4 rounded-full p-2 text-[#77716B] hover:bg-[#F3EDE4] hover:text-[#B85C4A] transition-all"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Search Suggestions */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-[#B85C4A]" strokeWidth={1.5} />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#77716B]">
                  Recent
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="group flex items-center gap-2 rounded-full border border-[#E5DDD3] bg-white px-4 py-2 text-sm text-[#55514D] transition-all duration-300 hover:border-[#B85C4A] hover:text-[#B85C4A] hover:shadow-md"
                  >
                    {item}
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-[#B85C4A]" strokeWidth={1.5} />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#77716B]">
                  Trending Now
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trending.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="group flex items-center gap-2 rounded-full bg-[#B85C4A]/10 px-4 py-2 text-sm font-medium text-[#B85C4A] transition-all duration-300 hover:bg-[#B85C4A] hover:text-white hover:shadow-lg hover:shadow-[#B85C4A]/20"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;