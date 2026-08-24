import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, X, Check, ArrowUp, Star, Leaf, Truck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewArrivals = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [quickView, setQuickView] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [cartToast, setCartToast] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filters = ['All', 'Kurta', 'Waistcoat', 'Shalwar Kameez', 'Shawl', 'Sherwani', 'Casual'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const products = [
    { id: 1, name: 'Glacier Linen Kurta', category: 'Kurta', price: 189, oldPrice: 240, rating: 4.8, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', colors: ['#E8F4F8', '#F5F0E6', '#2C2C2C'], description: 'Breathable glacier-washed linen with mother-of-pearl buttons. Perfect for summer gatherings.', material: '100% Organic Linen' },
    { id: 2, name: 'Sage Weave Waistcoat', category: 'Waistcoat', price: 145, oldPrice: null, rating: 4.6, badge: 'New', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', colors: ['#B8C4A8', '#D0E8F0'], description: 'Hand-woven sage cotton waistcoat with traditional cross-stitch detailing.', material: 'Handwoven Cotton' },
    { id: 3, name: 'Frost Silk Shalwar Kameez', category: 'Shalwar Kameez', price: 275, oldPrice: 320, rating: 4.9, badge: 'Premium', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80', colors: ['#FAFBFC', '#E8F4F8'], description: 'Pure silk with frost-dye technique. Each piece has unique crystalline patterns.', material: 'Wild Silk' },
    { id: 4, name: 'Alpine Cotton Sherwani', category: 'Sherwani', price: 420, oldPrice: null, rating: 4.7, badge: null, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', colors: ['#F5F0E6', '#C9A96E'], description: 'Regal sherwani with gold thread embroidery and mandarin collar.', material: 'Premium Cotton' },
    { id: 5, name: 'Midnight Wool Shawl', category: 'Shawl', price: 165, oldPrice: 200, rating: 4.5, badge: 'Sale', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80', colors: ['#2C2C2C', '#6B6B6B'], description: 'Merino wool shawl with reversible design. Soft enough to wear against bare skin.', material: 'Merino Wool' },
    { id: 6, name: 'Hunza Embroidered Kurti', category: 'Kurta', price: 135, oldPrice: null, rating: 4.4, badge: 'New', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', colors: ['#B8C4A8', '#E8F4F8', '#F5F0E6'], description: 'Traditional Hunza embroidery on lightweight cotton. Hand-stitched floral motifs.', material: 'Organic Cotton' },
    { id: 7, name: 'Skardu Cashmere Shawl', category: 'Shawl', price: 320, oldPrice: 380, rating: 4.9, badge: 'Limited', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', colors: ['#D0E8F0', '#FAFBFC'], description: 'Grade-A cashmere from highland goats. Woven on traditional wooden looms.', material: 'Cashmere' },
    { id: 8, name: 'Gilgit Linen Trouser', category: 'Casual', price: 95, oldPrice: null, rating: 4.3, badge: null, image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80', colors: ['#F5F0E6', '#2C2C2C'], description: 'Relaxed-fit linen trousers with drawstring waist and side pockets.', material: 'Belgian Linen' },
    { id: 9, name: 'Chitral Handwoven Vest', category: 'Waistcoat', price: 210, oldPrice: null, rating: 4.7, badge: 'Artisan', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80', colors: ['#C9A96E', '#B8C4A8'], description: 'Wool vest with Chitrali patterns passed down through generations.', material: 'Highland Wool' },
    { id: 10, name: 'Swat Valley Pashmina', category: 'Shawl', price: 580, oldPrice: 650, rating: 5.0, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', colors: ['#FAFBFC', '#E8F4F8', '#F5F0E6'], description: 'The finest Swat Valley pashmina. So delicate it passes through a wedding ring.', material: 'Pashmina Wool' },
    { id: 11, name: 'Deosai Trek Jacket', category: 'Casual', price: 240, oldPrice: null, rating: 4.6, badge: 'New', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80', colors: ['#2C2C2C', '#6B6B6B', '#B8C4A8'], description: 'Water-resistant shell with wool lining. Built for mountain winds.', material: 'Wool Blend' },
    { id: 12, name: 'Karakoram Sherwani Set', category: 'Sherwani', price: 680, oldPrice: 800, rating: 4.8, badge: 'Premium', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', colors: ['#F5F0E6', '#C9A96E', '#2C2C2C'], description: 'Complete sherwani set with matching shawl and embroidered shoes.', material: 'Raw Silk' },
  ];

  let filtered = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter);

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'newest') filtered = [...filtered].sort((a, b) => b.id - a.id);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showToast = (msg) => {
    setCartToast(msg);
    setTimeout(() => setCartToast(null), 2500);
  };

  const addToCart = (product, size = null) => {
    const cartId = `${product.id}-${size || 'OS'}`;
    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, cartId, qty: 1, size }];
    });
    setCartOpen(true);
    showToast(`${product.name} added to cart`);
  };

  const handleOrder = (product, color, size, qty) => {
    navigate("/account", {
      state: {
        product: product,
        selectedColor: color || product.colors?.[0],
        selectedSize: size || 'M',
        quantity: qty || 1,
      },
    });
  };
  const handleCheckout = () => {
    navigate("/account", {
      state: { cart: cart },
    });
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Bestseller': return 'bg-[#C9A96E] text-white';
      case 'New': return 'bg-[#B8C4A8] text-[#2C2C2C]';
      case 'Sale': return 'bg-[#2C2C2C] text-white';
      case 'Premium': return 'bg-[#D0E8F0] text-[#2C2C2C]';
      case 'Limited': return 'bg-[#E8F4F8] text-[#2C2C2C] border border-[#D0E8F0]';
      case 'Artisan': return 'bg-[#F5F0E6] text-[#8B6914]';
      default: return 'bg-[#E8F4F8] text-[#2C2C2C]';
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="font-sans text-charcoal antialiased bg-snow min-h-screen">
      {/* Cart Toast */}
      {cartToast && (
        <div className="fixed top-24 right-6 z-300 flex items-center gap-2 bg-charcoal text-white px-5 py-3 rounded-sm shadow-2xl text-sm tracking-wide animate-slideIn">
          <Check size={16} className="text-sage" />
          {cartToast}
          <button onClick={() => setCartToast(null)} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-250 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <h2 className="text-lg font-medium">Your Cart ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-black/5 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 && (
                <div className="text-center py-20 text-stone">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
                  <p>Your cart is empty.</p>
                </div>
              )}
              {cart.map(item => (
                <div key={item.cartId} className="flex gap-4 bg-snow p-3 rounded-sm border border-black/5">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-sm" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    {item.size && <p className="text-xs text-stone">Size: {item.size}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">Qty: {item.qty}</span>
                      <span className="text-sm font-medium">${item.price * item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-black/5">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-stone">Subtotal</span>
                  <span className="font-medium">${cart.reduce((a, b) => a + b.price * b.qty, 0)}</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); handleCheckout(); }}
                  className="w-full py-3.5 bg-charcoal text-white text-xs tracking-[0.15em] uppercase font-medium rounded-sm hover:bg-gold transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scroll to top */}
      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 z-100 h-11 w-11 rounded-full bg-charcoal text-white shadow-lg flex items-center justify-center hover:bg-gold transition-colors">
          <ArrowUp size={18} />
        </button>
      )}

      {/* HEADER */}
      <div className="bg-linear-to-b from-[#DCE2CC] to-[#F3F1E7] pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-[radial-gradient(circle,rgba(184,196,168,0.25)_0%,transparent_70%)] rounded-full" />
        <p className="relative text-[0.7rem] tracking-[0.35em] uppercase text-[#B85C4A] mb-4 font-bold">Pre Order Now 🔥</p>
        <h1 className="relative text-[clamp(2.25rem,8vw,4rem)] font-light tracking-[-0.03em] mb-4 px-2">
          New Arrivals
        </h1>
        <p className="relative text-stone max-w-125 mx-auto leading-[1.8] text-[0.95rem] px-2">
          Naturally dyed. Ethically woven. Designed for those who find beauty in texture
          and calm in color. Each piece carries the warmth of human hands.
        </p>
      </div>

      {/* FILTER & SORT BAR */}
      <div className="sticky top-0 z-50 bg-snow/95 backdrop-blur-md border-b border-black/4 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-325 mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-nowrap">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-5 py-2 text-[0.8rem] font-semibold tracking-wider cursor-pointer transition-all duration-300 whitespace-nowrap ${activeFilter === filter
                  ? "bg-[#2B2A25] text-[#F3F1E7]"
                  : "bg-[#DCE2CC]/60 text-[#4A5340] hover:bg-[#DCE2CC]"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal text-white text-xs tracking-wider hover:bg-[#454437] transition"
            >
              <ShoppingBag size={14} />
              Cart ({cart.reduce((a, b) => a + b.qty, 0)})
            </button>
            <span className="text-sm text-stone">{filtered.length} products</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-ice rounded-full px-5 py-2 pr-10 text-sm text-charcoal outline-none focus:border-sage cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-325 mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-sm overflow-hidden border border-black/4 transition-all duration-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1"
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image */}
              <div className="relative aspect-3/4 overflow-hidden bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.badge && (
                    <span className={`px-3 py-1 text-[0.65rem] tracking-[0.15em] uppercase rounded-sm font-semibold ${getBadgeStyle(product.badge)}`}>
                      {product.badge}
                    </span>
                  )}
                  <span className="px-3 py-1 text-[0.65rem] tracking-[0.15em] uppercase rounded-sm font-semibold bg-[#B85C4A] text-white">
                    Coming Soon
                  </span>
                </div>
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 z-10 shadow-sm"
                >
                  <svg
                    className={`w-4 h-4 transition-colors ${wishlist.has(product.id) ? 'text-red-500 fill-red-500' : 'text-charcoal'}`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill={wishlist.has(product.id) ? 'currentColor' : 'none'}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                {/* Quick Actions — visible by default on touch/mobile, hover-reveal on sm+ */}
                <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => setQuickView(product)}
                    className="flex-1 py-2.5 bg-white/95 backdrop-blur text-charcoal text-xs tracking-widest uppercase font-medium rounded-sm hover:bg-charcoal hover:text-white transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                {/* Colors */}
                <div className="flex gap-1.5 mb-2">
                  {product.colors.map((color, cidx) => (
                    <div key={cidx} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <p className="text-[0.7rem] tracking-[0.15em] uppercase text-stone mb-1">{product.category}</p>
                <h3 className="text-[0.95rem] font-medium text-charcoal mb-1.5 leading-snug">{product.name}</h3>
                <p className="text-xs text-stone mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

                {/* Rating — stars only, no review count */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[0.7rem] text-stone">{product.rating}</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-charcoal">${product.price}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-stone line-through">${product.oldPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOrder(product, product.colors?.[0], selectedSize[product.id] || 'M', 1)}
                      className="px-4 py-2 bg-charcoal text-white text-[0.7rem] tracking-widest uppercase font-medium rounded-sm hover:bg-gold transition-colors"
                    >
                      Pre-Order
                    </button>
                    <button
                      onClick={() => addToCart(product, selectedSize[product.id])}
                      className="grid h-8 w-8 place-items-center rounded-full bg-charcoal text-white transition hover:bg-[#454437]"
                    >
                      <ShoppingBag size={13} />
                    </button>
                  </div>
                </div>
                <p className="text-[0.65rem] text-stone mt-2">{product.material}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-stone mb-2">No products found</p>
            <p className="text-sm text-stone">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* SIZE GUIDE TEASER */}
      <section className="bg-cream py-12 sm:py-16 px-4 sm:px-6 border-t border-black/4">
        <div className="max-w-200 mx-auto text-center">
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-4 font-medium">Fit Guide</p>
          <h3 className="text-2xl font-light mb-3">Not sure about your size?</h3>
          <p className="text-stone max-w-112.5 mx-auto mb-6 leading-[1.8]">
            Every piece is pre-shrunk and true to size. Our garments are cut for a relaxed,
            comfortable fit inspired by traditional silhouettes.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {sizes.map(size => (
              <div key={size} className="w-10 h-10 rounded-full border border-frost flex items-center justify-center text-xs text-stone bg-white">
                {size}
              </div>
            ))}
          </div>
          <button className="px-8 py-3.5 bg-transparent border border-charcoal text-charcoal text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-all duration-300 hover:bg-charcoal hover:text-white">
            View Size Chart
          </button>
        </div>
      </section>

      {/* NEW: Craftsmanship Banner */}
      <section className="bg-charcoal py-12 sm:py-16 px-4 sm:px-6 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Leaf size={28} className="mx-auto mb-3 text-sage" />
            <h4 className="text-sm tracking-widest uppercase mb-2">Botanical Dyes</h4>
            <p className="text-xs text-white/60 leading-relaxed max-w-60 mx-auto">Every colour comes from roots, leaves, and minerals. No synthetic pigments touch our fabrics.</p>
          </div>
          <div>
            <Truck size={28} className="mx-auto mb-3 text-sage" />
            <h4 className="text-sm tracking-widest uppercase mb-2">Carbon-Offset Delivery</h4>
            <p className="text-xs text-white/60 leading-relaxed max-w-60 mx-auto">From our loom to your door, every kilometre is offset through reforestation partners.</p>
          </div>
          <div>
            <Sparkles size={28} className="mx-auto mb-3 text-sage" />
            <h4 className="text-sm tracking-widest uppercase mb-2">Lifetime Repairs</h4>
            <p className="text-xs text-white/60 leading-relaxed max-w-60 mx-auto">Wear it for decades. If a seam loosens, we mend it free — because permanence matters.</p>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setQuickView(null)}
        >
          <div
            className="bg-white rounded-sm max-w-225 w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-4/3 sm:aspect-square bg-cream">
              <img src={quickView.image} alt={quickView.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                {quickView.badge && (
                  <span className={`px-3 py-1 text-[0.65rem] tracking-[0.15em] uppercase rounded-sm font-semibold ${getBadgeStyle(quickView.badge)}`}>
                    {quickView.badge}
                  </span>
                )}
                <span className="px-3 py-1 text-[0.65rem] tracking-[0.15em] uppercase rounded-sm font-semibold bg-[#B85C4A] text-white">
                  Coming Soon
                </span>
                <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone">{quickView.category}</span>
              </div>

              <h2 className="text-2xl font-light text-charcoal mb-2">{quickView.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(quickView.rating) ? 'text-gold fill-gold' : 'text-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-stone">{quickView.rating}</span>
              </div>

              <p className="text-stone leading-relaxed mb-6">{quickView.description}</p>

              <div className="mb-6">
                <p className="text-xs font-medium text-charcoal mb-2 uppercase tracking-wide">Material</p>
                <p className="text-sm text-stone">{quickView.material}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs font-medium text-charcoal mb-2 uppercase tracking-wide">Available Colors</p>
                <div className="flex gap-2">
                  {quickView.colors.map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-medium text-charcoal mb-2 uppercase tracking-wide">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize({ ...selectedSize, [quickView.id]: size })}
                      className={`w-10 h-10 rounded border text-sm font-medium transition-all
                        ${selectedSize[quickView.id] === size
                          ? 'border-charcoal bg-charcoal text-white'
                          : 'border-[#E8F4F0] text-charcoal hover:border-sage'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <span className="text-2xl font-light text-charcoal">${quickView.price}</span>
                {quickView.oldPrice && (
                  <span className="text-base text-stone line-through">${quickView.oldPrice}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    handleOrder(quickView, quickView.colors?.[0], selectedSize[quickView.id] || 'M', 1);
                    setQuickView(null);
                  }}
                  className="flex-1 min-w-36 py-3.5 bg-charcoal text-white text-xs tracking-[0.15em] uppercase font-medium rounded-sm hover:bg-gold transition-colors"
                >
                  Pre-Order Now
                </button>
                <button
                  onClick={() => toggleWishlist(quickView.id)}
                  className="w-12 h-12 border border-[#E8F4F0] rounded flex items-center justify-center hover:border-sage transition-colors"
                >
                  <svg className={`w-5 h-5 ${wishlist.has(quickView.id) ? 'text-red-500 fill-red-500' : 'text-charcoal'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill={wishlist.has(quickView.id) ? 'currentColor' : 'none'}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;