import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingBag,
  X,
  Check,
  Flame,
  Tag,
  Timer,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  ArrowUp,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Sale data                                                                 */
/* -------------------------------------------------------------------------- */

const sales = [
  {
    name: "Frostwoven Wrap Dress",
    price: 128,
    original: 178,
    rating: 4.9,
    reviews: 124,
    tag: "Ending Soon",
    img: "1595777457583-95e059d581b8",
    category: "Outfits",
    desc: "Our signature cold-set weave, cut into a fluid wrap silhouette. Finished with the icy dye that started it all — no two lengths of fabric take the colour quite the same way.",
    material: "100% Organic Linen",
    colors: ["#DCE2CC", "#B85C4A", "#2B2A25"],
    sizes: ["XS", "S", "M", "L"],
    stock: 4,
  },
  {
    name: "Alpine Ankle Boots",
    price: 118,
    original: 158,
    rating: 4.8,
    reviews: 89,
    tag: "Bestseller",
    img: "1608256246200-53e635b5b65f",
    category: "Shoes",
    desc: "Hand-lasted leather boots built for highland mornings. The suede is treated with our botanical weatherproofing, so the finish only softens with wear.",
    material: "Waxed Leather & Wool",
    colors: ["#454437", "#8A9873"],
    sizes: ["36", "37", "38", "39", "40"],
    stock: 6,
  },
  {
    name: "Frost Bloom Eau de Parfum",
    price: 66,
    original: 88,
    rating: 5.0,
    reviews: 210,
    tag: "Limited",
    img: "1592945403244-b3fbafd7f539",
    category: "Perfumes",
    desc: "A cold-pressed floral built around glacier musk and wild jasmine. Each batch is rested for six weeks before bottling, so the scent settles rather than fades.",
    material: "Botanical Extracts",
    colors: ["#F3F1E7"],
    sizes: ["30ml", "50ml", "100ml"],
    stock: 9,
  },
  {
    name: "Meadow Knit Cardigan",
    price: 82,
    original: 112,
    rating: 4.6,
    reviews: 78,
    tag: null,
    img: "1551803091-e20673f15770",
    category: "Outfits",
    desc: "Undyed wool, spun slow and knit dense enough for shoulder-season mornings. The natural lanolin means it only gets softer wash after wash.",
    material: "Highland Wool Blend",
    colors: ["#DCE2CC", "#66675C"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 3,
  },
  {
    name: "Frostline Trail Boots",
    price: 128,
    original: 168,
    rating: 4.9,
    reviews: 95,
    tag: "Ending Soon",
    img: "1520639888713-7851133b1ed0",
    category: "Shoes",
    desc: "Built for the same slopes our wool comes down from. A reinforced toe and hand-stitched welt mean these are made to be resoled, not replaced.",
    material: "Recycled Materials",
    colors: ["#2B2A25", "#8A9873"],
    sizes: ["38", "39", "40", "41", "42"],
    stock: 5,
  },
  {
    name: "Sage & Cedar Cologne",
    price: 54,
    original: 74,
    rating: 4.7,
    reviews: 134,
    tag: null,
    img: "1541643600914-78b084683601",
    category: "Perfumes",
    desc: "Woody and dry, built around cedar shavings from our own offcuts. A quiet scent for people who don't want to announce themselves.",
    material: "Essential Oils",
    colors: ["#F3F1E7"],
    sizes: ["50ml", "100ml"],
    stock: 12,
  },
  {
    name: "Ice-Dye Midi Skirt",
    price: 56,
    original: 78,
    rating: 4.8,
    reviews: 45,
    tag: "New Markdown",
    img: "1496747611176-843222e1e57c",
    category: "Outfits",
    desc: "Hand-dipped in cold dye baths so the gradient never repeats. Every skirt is genuinely one of a kind — what you see is the only one like it.",
    material: "Wild Silk",
    colors: ["#DCE2CC", "#B85C4A"],
    sizes: ["XS", "S", "M", "L"],
    stock: 2,
  },
  {
    name: "Glacier Suede Loafers",
    price: 99,
    original: 142,
    rating: 4.7,
    reviews: 67,
    tag: "Bestseller",
    img: "1560769629-975ec94e6a86",
    category: "Shoes",
    desc: "Soft suede over a hand-turned sole. Designed to be worn barefoot in summer and with wool socks the rest of the year.",
    material: "Calf Suede & Crepe",
    colors: ["#66675C", "#DCE2CC"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stock: 7,
  },
  {
    name: "Ice Jasmine Parfum",
    price: 61,
    original: 84,
    rating: 4.7,
    reviews: 103,
    tag: "New Markdown",
    img: "1557170334-a9632e77c6e4",
    category: "Perfumes",
    desc: "Jasmine cut with something colder — a clean, high mineral note that keeps it from ever turning sweet.",
    material: "Enfleurage Jasmine",
    colors: ["#F3F1E7"],
    sizes: ["30ml", "50ml", "100ml"],
    stock: 10,
  },
  {
    name: "Glacier Wool Poncho",
    price: 98,
    original: 138,
    rating: 4.9,
    reviews: 156,
    tag: "Limited",
    img: "1544441893-675973e31985",
    category: "Outfits",
    desc: "A single length of undyed wool, folded and cut by hand. No two ponchos share the same natural marbling.",
    material: "Merino Wool",
    colors: ["#DCE2CC", "#454437"],
    sizes: ["One Size"],
    stock: 3,
  },
];

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const pct = (price, original) => Math.round(100 - (price / original) * 100);

const FILTERS = ["All", "Outfits", "Shoes", "Perfumes"];

/* -------------------------------------------------------------------------- */
/*  Toast                                                                     */
/* -------------------------------------------------------------------------- */

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed top-24 right-6 z-300 flex items-center gap-3 bg-[#2B2A25] text-[#F3F1E7] px-5 py-3 rounded-sm shadow-2xl text-sm tracking-wide animate-slideIn">
      <Check size={16} className="text-sage" />
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cart Drawer                                                               */
/* -------------------------------------------------------------------------- */

function CartDrawer({ cart, isOpen, onClose, onUpdateQty, onRemove }) {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className="fixed inset-0 z-250 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#FAF9F4] h-full shadow-2xl flex flex-col animate-slideInRight">
        <div className="flex items-center justify-between p-6 border-b border-black/5">
          <h2 className="font-serif text-xl">Your Bag ({cart.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 && (
            <div className="text-center py-20 text-stone">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
              <p>Your bag is empty.</p>
              <p className="text-sm mt-1">Add something beautiful.</p>
            </div>
          )}
          {cart.map((item) => (
            <div key={item.cartId} className="flex gap-4 bg-white p-3 rounded-sm ring-1 ring-black/5">
              <img src={img(item.img)} alt={item.name} className="w-20 h-24 object-cover rounded-sm" />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-stone mt-0.5">{item.material}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-stone">
                  {item.color && <span>Color: <span className="inline-block w-3 h-3 rounded-full border border-black/10 align-middle ml-0.5" style={{ backgroundColor: item.color }} /></span>}
                  {item.size && <span>Size: {item.size}</span>}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 bg-[#F3F1E7] rounded-full px-2 py-1">
                    <button onClick={() => onUpdateQty(item.cartId, -1)} className="p-0.5 hover:text-[#B85C4A]"><Minus size={12} /></button>
                    <span className="text-xs w-4 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.cartId, 1)} className="p-0.5 hover:text-[#B85C4A]"><Plus size={12} /></button>
                  </div>
                  <span className="text-sm font-medium">${item.price * item.qty}</span>
                </div>
              </div>
              <button onClick={() => onRemove(item.cartId)} className="self-start p-1 text-stone hover:text-red-500"><X size={14} /></button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t border-black/5 bg-white">
            <div className="flex justify-between mb-1 text-sm">
              <span className="text-stone">Subtotal</span>
              <span className="font-medium">${total}</span>
            </div>
            <div className="flex justify-between mb-4 text-xs text-[#B85C4A]">
              <span>You saved</span>
              <span>${cart.reduce((sum, i) => sum + (i.original - i.price) * i.qty, 0)}</span>
            </div>
            <button onClick={() => {
              onClose();
              navigate("/account", { state: { cart: cart } });
            }}
              className="w-full py-3.5 bg-[#2B2A25] text-[#F3F1E7] text-xs tracking-[0.15em] uppercase font-medium rounded-sm hover:bg-gold transition-colors">
              Checkout
            </button>
            <p className="text-center text-[0.65rem] text-stone mt-3">Shipping & taxes calculated at checkout</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scroll to top                                                             */
/* -------------------------------------------------------------------------- */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-100 h-11 w-11 rounded-full bg-[#2B2A25] text-[#F3F1E7] shadow-lg flex items-center justify-center hover:bg-gold transition-colors"
    >
      <ArrowUp size={18} />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sale card                                                                 */
/* -------------------------------------------------------------------------- */

function SaleCard({ item, isWishlisted, onToggleWishlist, onOpen, onAddToCart, onOrder }) {
  const discount = pct(item.price, item.original);
  return (
    <div className="group cursor-pointer overflow-hidden rounded-sm bg-[#FAF9F4] shadow-sm ring-1 ring-black/5 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 sm:h-64 overflow-hidden bg-[#E8E6DC]" onClick={() => onOpen(item)}>
        <img
          src={img(item.img)}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          <span className="flex items-center gap-1 rounded-sm bg-[#B85C4A] px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#F3F1E7]">
            <Tag size={10} />
            -{discount}%
          </span>
          {item.tag && (
            <span className="rounded-sm bg-[#2B2A25]/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#F3F1E7]">
              {item.tag.toUpperCase()}
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(item.name); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur text-[#2B2A25] shadow-sm transition hover:bg-white hover:scale-110 z-10"
        >
          <Heart size={15} className={isWishlisted ? "text-red-500 fill-red-500" : ""} />
        </button>
        {/* Stock indicator */}
        {item.stock <= 4 && (
          <span className="absolute right-3 bottom-3 flex items-center gap-1 rounded-sm bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-semibold text-[#B85C4A] z-10">
            <Flame size={10} />
            {item.stock} left
          </span>
        )}
        {/* Quick view overlay — visible by default on touch/mobile, hover-reveal on sm+ */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(item); }}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur text-[#2B2A25] text-[11px] tracking-wider uppercase font-medium rounded-sm hover:bg-[#2B2A25] hover:text-[#F3F1E7] transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>
      <div className="p-4">
        {/* Colors */}
        <div className="flex gap-1.5 mb-2">
          {item.colors.map((c, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-[0.65rem] tracking-[0.15em] uppercase text-[#8A9873] font-semibold">
          {item.category}
        </span>
        <h3 className="mt-1 font-serif text-base leading-snug text-[#2B2A25]">{item.name}</h3>
        <p className="mt-1.5 text-xs text-stone line-clamp-2 leading-relaxed">{item.desc}</p>
        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-3 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(item.rating) ? "text-gold fill-gold" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-[0.7rem] text-stone">{item.rating} ({item.reviews})</span>
        </div>
        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-[#2B2A25]">${item.price}</span>
            <span className="text-xs text-[#8A8B7E] line-through">${item.original}</span>
            <span className="text-[10px] font-semibold text-[#B85C4A]">Save ${item.original - item.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onOrder(item, item.colors[0], item.sizes[Math.floor(item.sizes.length / 2)], 1); }}
              className="px-3 py-1.5 bg-[#2B2A25] text-[#F3F1E7] text-[0.65rem] tracking-wider uppercase font-medium rounded-sm hover:bg-gold transition-colors"
            >
              Order
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
              className="grid h-8 w-8 place-items-center rounded-full bg-[#2B2A25] text-[#F3F1E7] transition hover:bg-[#454437]"
            >
              <ShoppingBag size={13} />
            </button>
          </div>
        </div>
        <p className="text-[0.6rem] text-stone mt-2 tracking-wide">{item.material}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quick view modal                                                          */
/* -------------------------------------------------------------------------- */

function QuickView({ item, onClose, wishlist, onToggleWishlist, onAddToCart, onOrder }) {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(item.colors[0]);
  const [size, setSize] = useState(item.sizes[Math.floor(item.sizes.length / 2)]);
  const discount = pct(item.price, item.original);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleAdd = () => {
    onAddToCart(item, color, size, qty);
    onClose();
  };

  const handleOrderClick = () => {
    onOrder(item, color, size, qty);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-200 flex items-center justify-center bg-[#2B2A25]/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-sm bg-[#FAF9F4] shadow-2xl sm:grid-cols-2 animate-fadeIn max-h-[92vh] overflow-y-auto"
      >
        <button
          aria-label="Close quick view"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#2B2A25] transition hover:bg-white"
        >
          <X size={16} />
        </button>

        {/* Image side */}
        <div className="relative h-56 sm:h-full bg-[#E8E6DC]">
          <img
            src={img(item.img)}
            alt={item.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            <span className="flex items-center gap-1 rounded-sm bg-[#B85C4A] px-2 py-1 text-[10px] font-semibold tracking-wider text-[#F3F1E7]">
              <Tag size={10} />
              -{discount}%
            </span>
            {item.tag && (
              <span className="rounded-sm bg-[#2B2A25]/90 px-2 py-1 text-[10px] font-semibold tracking-wider text-[#F3F1E7]">
                {item.tag.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Details side */}
        <div className="flex max-h-[80vh] flex-col overflow-y-auto p-6 sm:p-8">
          <span className="text-[0.65rem] tracking-[0.15em] uppercase text-[#8A9873] font-semibold">
            {item.category}
          </span>
          <h2 className="mt-1 font-serif text-2xl leading-snug text-[#2B2A25]">{item.name}</h2>
          <div className="mt-2 flex items-center gap-1 text-xs text-[#8A9873]">
            <Star size={12} fill="currentColor" />
            {item.rating}
            <span className="text-[#8A8B7E]">· {item.reviews} reviews · {item.stock} left in stock</span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-2xl text-[#2B2A25]">${item.price}</span>
            <span className="text-sm text-[#8A8B7E] line-through">${item.original}</span>
            <span className="text-xs font-semibold text-[#B85C4A]">Save ${item.original - item.price}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#66675C]">{item.desc}</p>

          <div className="mt-4">
            <p className="text-xs font-medium text-[#2B2A25] mb-1 uppercase tracking-wide">Material</p>
            <p className="text-sm text-stone">{item.material}</p>
          </div>

          {/* Color */}
          <div className="mt-5">
            <span className="text-xs font-semibold tracking-wider text-[#4A5340]">COLOUR</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.colors.map((c) => (
                <button
                  key={c}
                  aria-label={`Colour ${c}`}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`h-8 w-8 rounded-full ring-1 ring-black/10 transition ${color === c ? "outline-2 outline-offset-2 outline-[#2B2A25]" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-5">
            <span className="text-xs font-semibold tracking-wider text-[#4A5340]">SIZE</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition ${size === s ? "bg-[#2B2A25] text-[#F3F1E7]" : "bg-[#DCE2CC]/60 text-[#4A5340] hover:bg-[#DCE2CC]"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + add to bag — wraps instead of overflowing on narrow screens */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full bg-[#DCE2CC]/60">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-9 w-9 place-items-center text-[#2B2A25]"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm font-medium">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(item.stock, q + 1))}
                className="grid h-9 w-9 place-items-center text-[#2B2A25]"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="whitespace-nowrap flex flex-1 min-w-40 items-center justify-center gap-2 rounded-full bg-[#2B2A25] px-5 py-3 text-xs font-semibold tracking-wider text-[#F3F1E7] transition hover:bg-[#454437]"
            >
              <ShoppingBag size={14} />
              ADD TO BAG · ${item.price * qty}
            </button>
            <button
              onClick={() => onToggleWishlist(item.name)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#E8E4D9] text-[#2B2A25] hover:border-sage transition"
            >
              <Heart size={18} className={wishlist.has(item.name) ? "text-red-500 fill-red-500" : ""} />
            </button>
          </div>

          {/* Order button below add to bag */}
          <button
            onClick={handleOrderClick}
            className="mt-3 w-full py-3 bg-transparent border border-[#2B2A25] text-[#2B2A25] text-xs tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-[#2B2A25] hover:text-[#F3F1E7] transition-colors"
          >
            Order Now · ${item.price * qty}
          </button>

          <div className="mt-4 flex flex-col gap-2 border-t border-black/5 pt-4 text-xs text-[#66675C]">
            <span className="flex items-center gap-2">
              <Truck size={13} className="text-[#8A9873]" />
              Carbon-offset delivery, compostable packaging
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-[#8A9873]" />
              One-year repair guarantee
            </span>
            <span className="flex items-center gap-2">
              <Timer size={13} className="text-[#B85C4A]" />
              Sale price ends when stock runs out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Sales() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const visible = useMemo(
    () => (filter === "All" ? sales : sales.filter((s) => s.category === filter)),
    [filter]
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleWishlist = (name) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
        showToast(`${name} removed from wishlist`);
      } else {
        next.add(name);
        showToast(`${name} added to wishlist`);
      }
      return next;
    });
  };

  const addToCart = (product, color = null, size = null, qty = 1) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[Math.floor(product.sizes.length / 2)];
    const cartId = `${product.name}-${chosenColor}-${chosenSize}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, qty: Math.min(i.qty + qty, product.stock) } : i
        );
      }
      return [...prev, { ...product, cartId, qty, color: chosenColor, size: chosenSize }];
    });
    setCartOpen(true);
    showToast(`${product.name} added to bag`);
  };

  const updateCartQty = (cartId, delta) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.cartId === cartId) {
          const newQty = Math.max(1, Math.min(i.qty + delta, i.stock));
          return { ...i, qty: newQty };
        }
        return i;
      })
    );
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  // ===== THIS IS THE KEY FUNCTION =====
  const handleOrder = (product, color, size, qty) => {
    navigate("/account", {
      state: {
        product: product,
        selectedColor: color,
        selectedSize: size,
        quantity: qty,
      },
    });
  };

  return (
    <div className="bg-[#F3F1E7] text-[#2B2A25] min-h-screen">
      <Toast message={toast} onClose={() => setToast(null)} />
      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
      />
      <ScrollToTop />

      {/* Header */}
      <section className="bg-linear-to-b from-[#DCE2CC] to-[#F3F1E7] px-4 sm:px-6 py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-[radial-gradient(circle,rgba(184,196,168,0.25)_0%,transparent_70%)] rounded-full" />
        <span className="relative text-xs font-semibold tracking-[0.25em] text-[#B85C4A]">
          FOR A LIMITED TIME 💥
        </span>
        <h1 className="relative mt-3 font-serif text-3xl sm:text-4xl md:text-5xl px-2">
          End of Season Sale
        </h1>
        <p className="relative mx-auto mt-4 max-w-xl px-2 text-sm leading-relaxed text-[#55564C]">
          The same handwoven pieces, considered footwear, and botanical
          scents — marked down while stock lasts. Once it's gone, it's gone.
        </p>
      </section>

      {/* Filters — horizontally scrollable on mobile so nothing gets clipped */}
      <div className="sticky top-0 z-10 border-b border-black/5 bg-[#F3F1E7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 px-4 sm:px-6 py-3 sm:py-4 overflow-x-auto scrollbar-hide flex-nowrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 sm:px-5 py-2 text-[0.7rem] sm:text-xs font-semibold tracking-wider transition ${filter === f ? "bg-[#2B2A25] text-[#F3F1E7]" : "bg-[#DCE2CC]/60 text-[#4A5340] hover:bg-[#DCE2CC]"}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl">Marked Down</h2>
            <span className="text-xs text-[#8A8B7E]">{visible.length} items</span>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2B2A25] text-[#F3F1E7] text-xs tracking-wider hover:bg-[#454437] transition"
          >
            <ShoppingBag size={14} />
            Bag ({cart.reduce((a, b) => a + b.qty, 0)})
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <SaleCard
              key={item.name}
              item={item}
              isWishlisted={wishlist.has(item.name)}
              onToggleWishlist={toggleWishlist}
              onOpen={setSelected}
              onAddToCart={(product, c, s) => addToCart(product, c, s, 1)}
              onOrder={handleOrder}
            />
          ))}
        </div>
      </section>

      {selected && (
        <QuickView
          item={selected}
          onClose={() => setSelected(null)}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onOrder={handleOrder}
        />
      )}
    </div>
  );
}