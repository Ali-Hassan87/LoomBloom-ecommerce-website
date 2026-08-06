import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingBag,
  Leaf,
  Snowflake,
  Sparkles,
  Scissors,
  Recycle,
  Truck,
  Users,
  Award,
  MapPin,
  Clock,
  X,
  Check,
  ArrowUp,
  Minus,
  Plus,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Product data — enriched with details from NewArrivals                    */
/* -------------------------------------------------------------------------- */

const outfits = [
  { name: "Frostwoven Wrap Dress", price: 128, oldPrice: 160, rating: 4.9, reviews: 124, tag: "New", img: "1595777457583-95e059d581b8", category: "Outfit", colors: ["#E8F4F8", "#F5F0E6", "#2C2C2C"], description: "Elegant wrap silhouette in glacier-washed linen. Mother-of-pearl buttons and hidden side ties.", material: "100% Organic Linen" },
  { name: "Alpine Linen Trousers", price: 96, oldPrice: null, rating: 4.8, reviews: 89, tag: "Bestseller", img: "1594633312681-425c7b97ccd1", category: "Outfit", colors: ["#F5F0E6", "#B8C4A8"], description: "Relaxed wide-leg cut with drawstring waist. Breathable enough for summer mountain walks.", material: "Belgian Linen" },
  { name: "Sage Cotton Kaftan", price: 84, oldPrice: null, rating: 4.7, reviews: 56, tag: null, img: "1525507119028-ed4c629a60a3", category: "Outfit", colors: ["#B8C4A8", "#FAFBFC"], description: "Flowing kaftan with hand-stitched neckline detail. Side slits for graceful movement.", material: "Handwoven Cotton" },
  { name: "Meadow Knit Cardigan", price: 112, oldPrice: 140, rating: 4.6, reviews: 78, tag: "Sale", img: "1551803091-e20673f15770", category: "Outfit", colors: ["#D0E8F0", "#F5F0E6", "#C9A96E"], description: "Chunky hand-knit cardigan with wooden toggle closures. Warm enough for alpine evenings.", material: "Highland Wool Blend" },
  { name: "Ice-Dye Midi Skirt", price: 78, oldPrice: null, rating: 4.8, reviews: 45, tag: "New", img: "1496747611176-843222e1e57c", category: "Outfit", colors: ["#E8F4F8", "#D0E8F0"], description: "Signature frost-dye technique creates unique crystalline patterns on every skirt.", material: "Wild Silk" },
  { name: "Handloom Overshirt", price: 104, oldPrice: null, rating: 4.5, reviews: 67, tag: null, img: "1602810318383-e386cc2a3ccf", category: "Outfit", colors: ["#2C2C2C", "#6B6B6B"], description: "Oversized shirt jacket woven on traditional pit looms. Corozo buttons throughout.", material: "Handloom Cotton" },
  { name: "Frost Bloom Blouse", price: 68, oldPrice: null, rating: 4.7, reviews: 92, tag: "Bestseller", img: "1551803091-e20673f15770", category: "Outfit", colors: ["#FAFBFC", "#F5F0E6", "#E8F4F8"], description: "Delicate blouse with frost-printed florals. Ruffled cuffs and mother-of-pearl buttons.", material: "Organic Cotton Voile" },
  { name: "Woven Wide-Leg Pants", price: 98, oldPrice: 120, rating: 4.6, reviews: 34, tag: "Sale", img: "1509631179647-0177331693ae", category: "Outfit", colors: ["#F5F0E6", "#2C2C2C"], description: "High-waisted wide-leg trousers with front pleats. Elastic back for comfort fit.", material: "Linen-Cotton Blend" },
  { name: "Natural Dye Tunic", price: 72, oldPrice: null, rating: 4.4, reviews: 28, tag: null, img: "1445205170230-053b83016050", category: "Outfit", colors: ["#B8C4A8", "#C9A96E"], description: "Botanically dyed tunic using indigo and walnut hulls. Each piece is one-of-a-kind.", material: "Natural Dyed Cotton" },
  { name: "Glacier Wool Poncho", price: 138, oldPrice: null, rating: 4.9, reviews: 156, tag: "Limited", img: "1544441893-675973e31985", category: "Outfit", colors: ["#D0E8F0", "#FAFBFC", "#2C2C2C"], description: "Reversible poncho in grade-A merino. Woven on traditional wooden looms in the highlands.", material: "Merino Wool" },
];

const shoes = [
  { name: "Glacier Suede Loafers", price: 142, oldPrice: null, rating: 4.7, reviews: 88, tag: null, img: "1560769629-975ec94e6a86", category: "Shoes", colors: ["#C9A96E", "#2C2C2C"], description: "Hand-stitched suede loafers with natural crepe sole. Molds to your foot over time.", material: "Calf Suede & Crepe" },
  { name: "Frost Canvas Sneakers", price: 88, oldPrice: null, rating: 4.6, reviews: 64, tag: "New", img: "1549298916-b41d501d3772", category: "Shoes", colors: ["#FAFBFC", "#E8F4F8"], description: "Minimalist sneakers in glacier-washed canvas. Cork insole and recycled rubber outsole.", material: "Organic Canvas" },
  { name: "Handwoven Espadrilles", price: 64, oldPrice: 80, rating: 4.5, reviews: 42, tag: "Sale", img: "1595950653106-6c9ebd614d3a", category: "Shoes", colors: ["#F5F0E6", "#B8C4A8"], description: "Traditional jute-soled espadrilles with hand-braided straps. Made by coastal artisans.", material: "Jute & Cotton" },
  { name: "Sage Leather Sandals", price: 76, oldPrice: null, rating: 4.4, reviews: 37, tag: null, img: "1603487742131-4160ec999306", category: "Shoes", colors: ["#B8C4A8", "#C9A96E"], description: "Vegetable-tanned leather sandals with brass buckles. Softens beautifully with wear.", material: "Veg-Tanned Leather" },
  { name: "Alpine Ankle Boots", price: 158, oldPrice: null, rating: 4.8, reviews: 112, tag: "Bestseller", img: "1608256246200-53e635b5b65f", category: "Shoes", colors: ["#2C2C2C", "#6B6B6B"], description: "Rugged ankle boots with wool lining and water-resistant waxed leather upper.", material: "Waxed Leather & Wool" },
  { name: "Meadow Slip-On Mules", price: 82, oldPrice: null, rating: 4.5, reviews: 51, tag: null, img: "1571019613454-1cb2f99b2d8b", category: "Shoes", colors: ["#D0E8F0", "#F5F0E6"], description: "Woven upper mules with cushioned footbed. Perfect for easy summer dressing.", material: "Handwoven Raffia" },
  { name: "Woven Rope Wedges", price: 94, oldPrice: 110, rating: 4.6, reviews: 73, tag: "Sale", img: "1518049362265-d5b2a6467637", category: "Shoes", colors: ["#C9A96E", "#FAFBFC"], description: "Espadrille wedges with braided jute heel. Ankle tie for secure fit.", material: "Jute & Linen" },
  { name: "Natural Cork Sliders", price: 58, oldPrice: null, rating: 4.3, reviews: 29, tag: null, img: "1560343090-f0409e92791a", category: "Shoes", colors: ["#F5F0E6", "#B8C4A8"], description: "Contoured cork footbed sliders with organic cotton straps. Zero synthetic materials.", material: "Natural Cork" },
  { name: "Frostline Trail Boots", price: 168, oldPrice: null, rating: 4.9, reviews: 95, tag: "Limited", img: "1520639888713-7851133b1ed0", category: "Shoes", colors: ["#2C2C2C", "#6B6B6B", "#B8C4A8"], description: "Technical trail boots with recycled rubber sole and waterproof membrane.", material: "Recycled Materials" },
  { name: "Linen Weave Flats", price: 70, oldPrice: null, rating: 4.5, reviews: 48, tag: "New", img: "1543163521-1bf539c55dd2", category: "Shoes", colors: ["#FAFBFC", "#E8F4F8"], description: "Ballet flats in handwoven linen with leather sole. Foldable for travel.", material: "Handwoven Linen" },
];

const perfumes = [
  { name: "Frost Bloom Eau de Parfum", price: 88, oldPrice: null, rating: 5.0, reviews: 210, tag: "Limited", img: "1592945403244-b3fbafd7f539", category: "Perfume", colors: ["#E8F4F8", "#FAFBFC"], description: "Icy jasmine and white tea on a bed of Himalayan cedar. Unisex floral.", material: "Botanical Extracts" },
  { name: "Sage & Cedar Cologne", price: 74, oldPrice: 90, rating: 4.7, reviews: 134, tag: "Sale", img: "1541643600914-78b084683601", category: "Perfume", colors: ["#B8C4A8", "#C9A96E"], description: "Wild sage, atlas cedar, and a hint of mountain pepper. Earthy and grounding.", material: "Essential Oils" },
  { name: "Wild Meadow Mist", price: 62, oldPrice: null, rating: 4.6, reviews: 87, tag: "New", img: "1523293182086-7651a899d37f", category: "Perfume", colors: ["#D0E8F0", "#F5F0E6"], description: "Fresh-cut grass, dewy violet leaf, and sun-warmed hay. A walk through alpine fields.", material: "Natural Fragrance" },
  { name: "Glacier Musk Extrait", price: 96, oldPrice: null, rating: 4.8, reviews: 178, tag: "Bestseller", img: "1615634260167-c8cdede054de", category: "Perfume", colors: ["#FAFBFC", "#E8F4F8"], description: "Clean musk with crushed mint and frozen bergamot. Our signature scent.", material: "Botanical Musk" },
  { name: "Woven Amber Oil", price: 54, oldPrice: null, rating: 4.5, reviews: 65, tag: null, img: "1547887538-e3a2f32cb1cc", category: "Perfume", colors: ["#C9A96E", "#F5F0E6"], description: "Rich amber resin blended with vanilla orchid. Roll-on precision application.", material: "Amber Resin" },
  { name: "Frost Petal Eau Fraiche", price: 68, oldPrice: null, rating: 4.6, reviews: 92, tag: null, img: "1594035910387-fea47794261f", category: "Perfume", colors: ["#E8F4F8", "#D0E8F0"], description: "Rose damascena cooled with alpine spring water. Light and refreshing.", material: "Floral Hydrosol" },
  { name: "Alpine Rain Cologne", price: 72, oldPrice: 85, rating: 4.4, reviews: 54, tag: "Sale", img: "1563170351-be82bc888aa4", category: "Perfume", colors: ["#B8C4A8", "#6B6B6B"], description: "Petrichor, wet stone, and silver fir. Captures the moment rain hits mountain soil.", material: "Natural Extracts" },
  { name: "Natural Vetiver Splash", price: 58, oldPrice: null, rating: 4.5, reviews: 41, tag: null, img: "1608528577891-eb055944f2e7", category: "Perfume", colors: ["#2C2C2C", "#C9A96E"], description: "Haitian vetiver root with a splash of citrus. Bold, smoky, and deeply natural.", material: "Vetiver Root" },
  { name: "Ice Jasmine Parfum", price: 84, oldPrice: null, rating: 4.7, reviews: 103, tag: "New", img: "1557170334-a9632e77c6e4", category: "Perfume", colors: ["#FAFBFC", "#F5F0E6"], description: "Night-blooming jasmine enfleurage. Intoxicating white floral with icy clarity.", material: "Enfleurage Jasmine" },
  { name: "Loom Wood Extrait", price: 92, oldPrice: null, rating: 4.6, reviews: 76, tag: null, img: "1588405748880-12d1d2a59f75", category: "Perfume", colors: ["#C9A96E", "#2C2C2C"], description: "Sandalwood, loom dust, and warm skin. A tribute to the hands that weave.", material: "Sandalwood Oil" },
];

const aboutProducts = [
  { icon: Leaf, title: "Grown, not synthesised", text: "Fibres sourced from cotton, linen, and wool farms that skip synthetic inputs entirely." },
  { icon: Snowflake, title: "Finished in frost", text: "Our signature ice-dye method sets colour using cold water, cutting energy use dramatically." },
  { icon: Scissors, title: "Cut by hand", text: "Every pattern is cut and stitched by artisans across small family workshops." },
  { icon: Recycle, title: "Zero-waste offcuts", text: "Fabric scraps are rewoven into accessories instead of landfill." },
  { icon: Users, title: "50+ artisan families", text: "We partner directly with weaving households, paying above fair-trade rates." },
  { icon: Award, title: "Est. 2026", text: "Alikhan Enterprises began as a single loom and a promise of honest textiles." },
  { icon: MapPin, title: "Rooted in the highlands", text: "Our wool and dye ingredients are gathered from mountain communities we know by name." },
  { icon: Truck, title: "Considered delivery", text: "Every order ships carbon-offset, wrapped in compostable packaging." },
  { icon: Clock, title: "Slow by design", text: "We release small seasonal batches instead of chasing fast-fashion cycles." },
  { icon: Sparkles, title: "One-year guarantee", text: "If a stitch gives way within a year, we repair or replace it, no questions asked." },
];

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`;

const TABS = [
  { key: "outfits", label: "Outfits", data: outfits },
  { key: "shoes", label: "Shoes", data: shoes },
  { key: "perfumes", label: "Perfumes", data: perfumes },
  { key: "aboutproducts", label: "Why LoomBloom??", data: aboutProducts },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

/* -------------------------------------------------------------------------- */
/*  Badge style helper                                                        */
/* -------------------------------------------------------------------------- */

function getBadgeStyle(badge) {
  switch (badge) {
    case "Bestseller": return "bg-[#C9A96E] text-white";
    case "New": return "bg-[#B8C4A8] text-[#2B2A25]";
    case "Sale": return "bg-[#2B2A25] text-[#F3F1E7]";
    case "Limited": return "bg-[#E8F4F8] text-[#2B2A25] border border-[#D0E8F0]";
    default: return "bg-[#E8F4F8] text-[#2B2A25]";
  }
}

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

function CartDrawer({ cart, isOpen, onClose, onUpdateQty, onRemove, onCheckout }) {
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
                {item.size && <p className="text-xs text-stone">Size: {item.size}</p>}
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
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-stone">Subtotal</span>
              <span className="font-medium">${total}</span>
            </div>
            <button
              onClick={() => { onClose(); onCheckout(); }}
              className="w-full py-3.5 bg-[#2B2A25] text-[#F3F1E7] text-xs tracking-[0.15em] uppercase font-medium rounded-sm hover:bg-gold transition-colors"
            >
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
/*  Quick View Modal                                                          */
/* -------------------------------------------------------------------------- */

function QuickViewModal({ product, wishlist, onToggleWishlist, onOrder, onClose, selectedSize, onSelectSize }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#FAF9F4] rounded-sm max-w-225 w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-square bg-[#E8E6DC]">
          <img src={img(product.img)} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            {product.tag && (
              <span className={`px-3 py-1 text-[0.65rem] tracking-[0.15em] uppercase rounded-sm font-semibold ${getBadgeStyle(product.tag)}`}>
                {product.tag}
              </span>
            )}
            <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone">{product.category}</span>
          </div>
          <h2 className="font-serif text-2xl text-[#2B2A25] mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm text-stone">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <p className="text-stone leading-relaxed mb-6 text-sm">{product.description}</p>
          <div className="mb-6">
            <p className="text-xs font-medium text-[#2B2A25] mb-2 uppercase tracking-wide">Material</p>
            <p className="text-sm text-stone">{product.material}</p>
          </div>
          <div className="mb-6">
            <p className="text-xs font-medium text-[#2B2A25] mb-2 uppercase tracking-wide">Available Colors</p>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xs font-medium text-[#2B2A25] mb-2 uppercase tracking-wide">Select Size</p>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectSize(product.name, size)}
                  className={`w-10 h-10 rounded border text-sm font-medium transition-all ${selectedSize === size ? "border-[#2B2A25] bg-[#2B2A25] text-[#F3F1E7]" : "border-[#E8E4D9] text-[#2B2A25] hover:border-sage"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-light text-[#2B2A25]">${product.price}</span>
            {product.oldPrice && <span className="text-base text-stone line-through">${product.oldPrice}</span>}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { onOrder(product, product.colors[0], selectedSize || "M", 1); onClose(); }}
              className="flex-1 py-3.5 bg-[#2B2A25] text-[#F3F1E7] text-xs tracking-[0.15em] uppercase font-medium rounded-sm hover:bg-gold transition-colors"
            >
              Order Now
            </button>
            <button
              onClick={() => onToggleWishlist(product.name)}
              className="w-12 h-12 border border-[#E8E4D9] rounded flex items-center justify-center hover:border-sage transition-colors"
            >
              <Heart size={18} className={wishlist.has(product.name) ? "text-red-500 fill-red-500" : "text-[#2B2A25]"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Product card                                                              */
/* -------------------------------------------------------------------------- */

function ProductCard({ item, isWishlisted, onToggleWishlist, onQuickView, onAddToCart, onOrder }) {
  return (
    <div className="group overflow-hidden rounded-sm bg-[#FAF9F4] shadow-sm ring-1 ring-black/5 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden bg-[#E8E6DC]">
        <img
          src={img(item.img)}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {item.tag && (
            <span className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-sm ${getBadgeStyle(item.tag)}`}>
              {item.tag}
            </span>
          )}
          <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-sm bg-[#B85C4A] text-white">
            Coming Soon
          </span>
        </div>
        {/* Wishlist */}
        <button
          onClick={() => onToggleWishlist(item.name)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur text-[#2B2A25] shadow-sm transition hover:bg-white hover:scale-110 z-10"
        >
          <Heart size={15} className={isWishlisted ? "text-red-500 fill-red-500" : ""} />
        </button>
        {/* Quick View overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => onQuickView(item)}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur text-[#2B2A25] text-[11px] tracking-widest uppercase font-medium rounded-sm hover:bg-[#2B2A25] hover:text-[#F3F1E7] transition-colors"
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
        <p className="text-[0.65rem] tracking-[0.15em] uppercase text-stone mb-1">{item.category}</p>
        <h3 className="font-serif text-base leading-snug text-[#2B2A25]">{item.name}</h3>
        <p className="mt-1.5 text-xs text-stone line-clamp-2 leading-relaxed">{item.description}</p>
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
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#2B2A25]">${item.price}</span>
            {item.oldPrice && <span className="text-xs text-stone line-through">${item.oldPrice}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOrder(item, item.colors[0], item.sizes?.[0] || "M", 1)}
              className="px-3 py-1.5 bg-[#2B2A25] text-[#F3F1E7] text-[0.65rem] tracking-widest uppercase font-medium rounded-sm hover:bg-gold transition-colors"
            >
              Order
            </button>
            <button
              onClick={() => onAddToCart(item)}
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
/*  About card                                                                */
/* -------------------------------------------------------------------------- */

function AboutProducts({ item }) {
  const Icon = item.icon;
  return (
    <div className="rounded-sm bg-[#FAF9F4] p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#DCE2CC] text-[#5C6B49]">
        <Icon size={18} />
      </div>
      <h3 className="font-serif text-lg text-[#2B2A25]">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#66675C]">{item.text}</p>
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
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Outfits() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = TABS.some((t) => t.key === searchParams.get("tab")) ? searchParams.get("tab") : "outfits";
  const [active, setActive] = useState(initialTab);
  const [wishlist, setWishlist] = useState(new Set());
  const [quickView, setQuickView] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [toast, setToast] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const activeTab = useMemo(() => TABS.find((t) => t.key === active), [active]);

  const handleTab = (key) => {
    setActive(key);
    setSearchParams({ tab: key });
  };

  const toggleWishlist = (name) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product, size = null) => {
    const cartId = `${product.name}-${size || "OS"}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) => (i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, cartId, qty: 1, size }];
    });
    setCartOpen(true);
    showToast(`${product.name} added to bag`);
  };

  const updateCartQty = (cartId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.cartId === cartId ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleOrder = (product, color, size, qty) => {
    navigate("/account", {
      state: {
        product: product,
        selectedColor: color || product.colors?.[0],
        selectedSize: size || "M",
        quantity: qty || 1,
      },
    });
  };

  const handleCheckout = () => {
    navigate("/account", {
      state: { cart: cart },
    });
  };

  return (
    <div className="bg-[#F3F1E7] text-[#2B2A25] min-h-screen">
      <Toast message={toast} onClose={() => setToast(null)} />
      <CartDrawer cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateCartQty} onRemove={removeFromCart} onCheckout={handleCheckout} />
      <ScrollToTop />

      {/* Header */}
      <section className="bg-linear-to-b from-[#DCE2CC] to-[#F3F1E7] px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-[radial-gradient(circle,rgba(184,196,168,0.25)_0%,transparent_70%)] rounded-full" />
        <span className="relative text-xs font-semibold tracking-[0.25em] text-[#B85C4A]">THE FULL COLLECTION</span>
        <h1 className="relative mt-3 font-serif text-4xl sm:text-5xl">Outfits, Shoes &amp; Perfumes</h1>
        <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#55564C]">
          Handwoven pieces, considered footwear, and botanical scents — every category finished with our signature icy touch.
        </p>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-10 border-b border-black/5 bg-[#F3F1E7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl justify-center gap-2 px-6 py-4 sm:justify-start">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTab(t.key)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition ${active === t.key
                  ? "bg-[#2B2A25] text-[#F3F1E7]"
                  : "bg-[#DCE2CC]/60 text-[#4A5340] hover:bg-[#DCE2CC]"
                }`}
            >
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Cart summary strip */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl">{activeTab.label}</h2>
            <span className="text-xs text-[#8A8B7E]">{activeTab.data.length} items</span>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2B2A25] text-[#F3F1E7] text-xs tracking-wider hover:bg-[#454437] transition"
          >
            <ShoppingBag size={14} />
            Bag ({cart.reduce((a, b) => a + b.qty, 0)})
          </button>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {active === "aboutproducts"
            ? activeTab.data.map((item) => <AboutProducts key={item.title} item={item} />)
            : activeTab.data.map((item) => (
              <ProductCard
                key={item.name}
                item={item}
                isWishlisted={wishlist.has(item.name)}
                onToggleWishlist={toggleWishlist}
                onQuickView={setQuickView}
                onAddToCart={addToCart}
                onOrder={handleOrder}
              />
            ))}
        </div>
      </section>

      {/* Newsletter / Craft Banner */}
      <section className="bg-[#DCE2CC] py-16 px-6 border-t border-black/5">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles size={24} className="mx-auto mb-4 text-[#5C6B49]" />
          <h3 className="font-serif text-2xl mb-3">Join the LoomBloom Circle</h3>
          <p className="text-sm text-[#4A5340] leading-relaxed mb-6">
            Be the first to know when new frost-dyed batches drop. Subscribers receive early access and a 10% welcome gift.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-sm bg-white border border-black/10 text-sm outline-none focus:border-[#5C6B49] placeholder:text-[#8A8B7E]"
            />
            <button className="px-6 py-3 bg-[#2B2A25] text-[#F3F1E7] text-xs tracking-[0.15em] uppercase font-medium rounded-sm hover:bg-[#454437] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickView && (
        <QuickViewModal
          product={quickView}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onOrder={handleOrder}
          onClose={() => setQuickView(null)}
          selectedSize={selectedSize[quickView.name]}
          onSelectSize={(name, size) => setSelectedSize((prev) => ({ ...prev, [name]: size }))}
        />
      )}
    </div>
  );
}