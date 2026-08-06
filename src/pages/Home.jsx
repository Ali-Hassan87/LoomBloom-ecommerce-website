import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Snowflake,
  Truck,
  ShieldCheck,
  Star,
  ShoppingBag,
  Heart,
  Quote,
  Mail,
  Tag,
  Sparkles,
  Camera,
  Gift,
  Zap,
  Award,
  Globe,
  Clock,
  DollarSign,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const categories = [
  {
    name: "Outfits",
    tagline: "Handwoven silhouettes",
    count: "120+ styles",
    to: "/collection?tab=outfits",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Shoes",
    tagline: "Crafted for every step",
    count: "65+ designs",
    to: "/collection?tab=shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Perfumes",
    tagline: "Bottled from nature",
    count: "12 signatures",
    to: "/collection?tab=perfumes",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
  },
];

const featured = [
  {
    name: "Frostwoven Wrap Dress",
    price: "$128",
    originalPrice: "$185",
    discount: "-31%",
    rating: 4.9,
    reviews: 284,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
    badge: "New",
    stock: "In stock",
  },
  {
    name: "Alpine Linen Trousers",
    price: "$96",
    originalPrice: "$140",
    discount: "-31%",
    rating: 4.8,
    reviews: 512,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80",
    badge: "Bestseller",
    stock: "Only 8 left",
  },
  {
    name: "Glacier Suede Loafers",
    price: "$142",
    originalPrice: "$199",
    discount: "-28%",
    rating: 4.7,
    reviews: 389,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80",
    badge: null,
    stock: "In stock",
  },
  {
    name: "Frost Bloom Eau de Parfum",
    price: "$88",
    originalPrice: "$120",
    discount: "-27%",
    rating: 5.0,
    reviews: 167,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
    badge: "Limited",
    stock: "6 left",
  },
];

const promotions = [
  {
    icon: Zap,
    title: "Flash Sale",
    description: "Ends in 2 days",
    color: "text-[#B85C4A]",
  },
  {
    icon: Gift,
    title: "Free Shipping",
    description: "Orders over $80",
    color: "text-[#5C6B49]",
  },
  {
    icon: Award,
    title: "Loyalty Rewards",
    description: "Earn points",
    color: "text-[#7C8C63]",
  },
];

const values = [
  {
    icon: Leaf,
    title: "Grown, not synthesised",
    text: "Every fibre is sourced from natural, renewable materials tended by hand.",
  },
  {
    icon: Snowflake,
    title: "Finished in frost",
    text: "Our signature ice-dye process locks in colour with zero heat or waste.",
  },
  {
    icon: Truck,
    title: "Considered delivery",
    text: "Carbon-offset shipping, packed in compostable wraps, on every order.",
  },
  {
    icon: ShieldCheck,
    title: "Made to last",
    text: "A one-year craftsmanship guarantee stands behind every stitch.",
  },
];

const testimonials = [
  {
    quote:
      "The wrap dress moves like nothing else I own — it feels handmade because it is.",
    name: "Amara K.",
    role: "Verified buyer",
    rating: 5,
  },
  {
    quote:
      "Their loafers softened the sage-and-frost aesthetic of my whole wardrobe.",
    name: "Daniyal R.",
    role: "Verified buyer",
    rating: 5,
  },
  {
    quote: "Frost Bloom is the first perfume that's ever gotten me compliments at work.",
    name: "Sana M.",
    role: "Verified buyer",
    rating: 5,
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Artisan families" },
  { value: 12, suffix: "k+", label: "Pieces rehomed" },
  { value: 4.8, suffix: "★", label: "Average rating" },
  { value: 100, suffix: "%", label: "Carbon-offset shipping" },
];

const gallery = [
  "1595777457583-95e059d581b8",
  "1608256246200-53e635b5b65f",
  "1592945403244-b3fbafd7f539",
  "1594633312681-425c7b97ccd1",
  "1560769629-975ec94e6a86",
  "1544441893-675973e31985",
];

const collections = [
  {
    name: "Summer Frost",
    items: "24 pieces",
    image:
      "https://i.pinimg.com/736x/4e/49/bc/4e49bc80e85eed86ee432bb672f3c3bb.jpg",
  },
  {
    name: "Winter Bloom",
    items: "18 pieces",
    image:
      "https://i.pinimg.com/736x/ff/b0/9c/ffb09c9939a99b1e70f0def4644eb312.jpg",
  },
  {
    name: "Artisan Edit",
    items: "12 pieces",
    image:
      "https://i.pinimg.com/236x/53/32/28/533228c185060d74c227197831c52276.jpg",
  },
];

const curatorPicks = [
  {
    name: "The Minimalist Edit",
    description: "Curated by our design team",
    pieces: 8,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Artisan's Choice",
    description: "From our maker partners",
    pieces: 12,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Weekend Essentials",
    description: "Perfect for every occasion",
    pieces: 15,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80",
  },
];

const materialGuide = [
  { name: "Organic Linen", benefit: "Breathable & durable", icon: Leaf },
  { name: "Ice-Dyed", benefit: "Zero-waste process", icon: Snowflake },
  { name: "Artisan Woven", benefit: "Hand-finished", icon: Award },
];

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                             */
/* -------------------------------------------------------------------------- */

function useOnScreen(ref, rootMargin = "-80px") {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return visible;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        } ${className}`}
    >
      {children}
    </div>
  );
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref, "-40px");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const isDecimal = value % 1 !== 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setDisplay(isDecimal ? current.toFixed(1) : Math.round(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, value]);

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => setLoaded(true), []);

  const handleAddToCart = (productName) => {
    setAddedToCart(productName);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="bg-[#F3F1E7] text-[#2B2A25]">

      {/* ---------------------------------------------------------------- */}
      {/* Announcement bar                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Link
        to="/sales"
        className="group flex items-center justify-center gap-2 bg-[#2B2A25] px-6 py-2.5 text-center text-xs font-semibold tracking-wider text-[#F3F1E7] transition hover:bg-[#454437]"
      >
        <Tag size={12} className="text-[#B85C4A]" />
        END OF SEASON SALE — UP TO 40% OFF, WHILE STOCK LASTS
        <ArrowRight size={12} className="transition group-hover:translate-x-1" />
      </Link>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#DCE2CC] via-[#F1EEE2] to-[#F3F1E7]">
        <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full border border-[#A7B594]/40" />
        <div className="pointer-events-none absolute right-40 bottom-10 h-40 w-40 rounded-full border border-[#A7B594]/40" />
        <div className="pointer-events-none absolute -left-15 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-[#A7B594]/30" />

        <div
          className={`relative mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center transition-all duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          <span className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#B85C4A]">
            <Sparkles size={13} />
            ALIKHAN ENTERPRISES · EST. 2026
          </span>
          <h1 className="font-serif text-5xl leading-tight sm:text-6xl">
            Woven in Nature,
            <br />
            <span className="italic text-[#7C8C63]">Finished in Frost</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#55564C]">
            Handwoven textiles and natural fabrics brought to life with timeless
            textures, thoughtful design, and an icy touch of modern elegance.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/collection"
              className="rounded-sm bg-[#2B2A25] px-8 py-3 text-xs font-semibold tracking-wider text-[#F3F1E7] transition hover:bg-[#454437]"
            >
              EXPLORE OUTFITS
            </Link>
            <Link
              to="/about"
              className="rounded-sm border border-[#2B2A25]/40 px-8 py-3 text-xs font-semibold tracking-wider transition hover:border-[#2B2A25] hover:bg-[#2B2A25]/5"
            >
              OUR STORY
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#66675C]">
            <span className="flex items-center gap-2">
              <Star size={13} className="fill-[#8A9873] text-[#8A9873]" />
              4.8 average rating · 2,300+ reviews
            </span>
            <span className="hidden h-3 w-px bg-[#2B2A25]/15 sm:block" />
            <span className="flex items-center gap-2">
              <Truck size={13} className="text-[#8A9873]" />
              Free carbon-offset delivery over $80
            </span>
            <span className="hidden h-3 w-px bg-[#2B2A25]/15 sm:block" />
            <span className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-[#8A9873]" />
              One-year repair guarantee
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Promo bar                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[#F3F1E7] border-b border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {promotions.map((promo, i) => {
              const Icon = promo.icon;
              return (
                <Reveal key={promo.title} delay={i * 60}>
                  <div className="flex items-center gap-4 rounded-md border border-black/5 bg-white/50 p-4 transition hover:bg-white hover:border-black/10">
                    <Icon size={20} className={promo.color} />
                    <div>
                      <p className="text-sm font-semibold">{promo.title}</p>
                      <p className="text-xs text-[#66675C]">{promo.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Stats strip                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-black/5 bg-[#EAE7D9]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 text-center sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-xs font-medium tracking-wide text-[#66675C]">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* CATEGORY STRIP - IMPROVED & EXPANDED                             */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#7C8C63]">
                SHOP BY CATEGORY
              </span>
              <h2 className="mt-2 font-serif text-4xl">Find your texture</h2>
              <p className="mt-3 text-sm text-[#66675C] max-w-sm">
                Browse our curated collections of handcrafted pieces, each with its own story to tell.
              </p>
            </div>
            <Link
              to="/collection"
              className="hidden items-center gap-1 text-sm font-medium text-[#5C6B49] hover:underline sm:flex"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 120}>
              <Link
                to={c.to}
                className="group relative block h-96 overflow-hidden rounded-lg border border-black/5 transition hover:border-black/20 hover:shadow-lg"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-[#F3F1E7] text-xs font-semibold">
                  {c.count}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-[#F3F1E7]">
                  <p className="text-xs tracking-widest text-[#DCE2CC] uppercase">
                    {c.tagline}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <h3 className="font-serif text-3xl">{c.name}</h3>
                    <ArrowRight
                      size={20}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                  <button className="mt-4 text-xs font-semibold tracking-wider text-[#DCE2CC] opacity-0 transition group-hover:opacity-100 hover:text-[#F3F1E7]">
                    EXPLORE {c.name.toUpperCase()} →
                  </button>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Sub-collections carousel */}
        <Reveal>
          <div className="pt-6 border-t border-black/5">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#7C8C63] mb-6">
              COLLECTION HIGHLIGHTS
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {collections.map((col, i) => (
                <Reveal key={col.name} delay={i * 80}>
                  <Link
                    to="/collection"
                    className="group overflow-hidden rounded-lg"
                  >
                    <div className="relative h-48 overflow-hidden rounded-lg">
                      <img
                        src={col.image}
                        alt={col.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-serif text-lg group-hover:underline">
                        {col.name}
                      </h3>
                      <p className="text-sm text-[#66675C]">{col.items}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* FEATURED PRODUCTS - ENHANCED                                    */}
      {/* ================================================================ */}
      <section className="bg-[#EAE7D9] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-[#7C8C63]">
                  THIS SEASON
                </span>
                <h2 className="mt-2 font-serif text-4xl">Newly arrived, quietly loved</h2>
                <p className="mt-3 text-sm text-[#66675C] max-w-xl">
                  Discover our handpicked selection of pieces that embody the essence of LoomBloom.
                </p>
              </div>
              <Link
                to="/collection"
                className="hidden items-center gap-1 text-sm font-medium text-[#5C6B49] hover:underline sm:flex"
              >
                View all products <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {featured.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div className="group overflow-hidden rounded-lg bg-[#F3F1E7] shadow-sm ring-1 ring-black/5 transition hover:-translate-y-2 hover:shadow-xl">
                  {/* Product image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    {/* Badge */}
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#2B2A25] px-3 py-1.5 text-[9px] font-bold tracking-wider text-[#F3F1E7]">
                        {p.badge.toUpperCase()}
                      </span>
                    )}
                    {/* Discount badge */}
                    <span className="absolute right-3 top-3 rounded-full bg-[#B85C4A] px-2.5 py-1 text-[9px] font-bold text-white">
                      {p.discount}
                    </span>
                    {/* Wishlist button */}
                    <button
                      aria-label="Add to wishlist"
                      className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#2B2A25] opacity-0 shadow-md transition group-hover:opacity-100 hover:bg-white hover:scale-110"
                    >
                      <Heart size={16} className="transition group-hover:fill-[#B85C4A] group-hover:text-[#B85C4A]" />
                    </button>
                  </div>

                  {/* Product details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-base leading-snug flex-1">
                        {p.name}
                      </h3>
                    </div>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star size={12} fill="currentColor" className="text-[#8A9873]" />
                        <span className="text-sm font-semibold text-[#2B2A25]">
                          {p.rating}
                        </span>
                      </div>
                      <span className="text-xs text-[#8A9873]">
                        ({p.reviews} reviews)
                      </span>
                    </div>

                    {/* Stock info */}
                    <p className={`mt-2 text-xs font-medium ${p.stock.includes("Only") || p.stock.includes("left")
                        ? "text-[#B85C4A]"
                        : "text-[#5C6B49]"
                      }`}>
                      {p.stock}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="font-bold text-lg text-[#2B2A25]">
                        {p.price}
                      </span>
                      <span className="text-sm line-through text-[#8A8B7E]">
                        {p.originalPrice}
                      </span>
                    </div>

                    {/* Add to bag button */}
                    <div className="mt-4 flex gap-2">
                      <button
                        aria-label="Add to bag"
                        onClick={() => handleAddToCart(p.name)}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold tracking-wider transition ${addedToCart === p.name
                            ? "bg-[#5C6B49] text-[#F3F1E7]"
                            : "bg-[#2B2A25] text-[#F3F1E7] hover:bg-[#454437]"
                          }`}
                      >
                        {addedToCart === p.name ? (
                          <>
                            <span>✓</span>
                            ADDED
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} />
                            ADD TO BAG
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* View more button */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/collection"
              className="flex items-center gap-2 rounded-lg border border-[#2B2A25] px-8 py-3.5 text-sm font-semibold text-[#2B2A25] transition hover:bg-[#2B2A25] hover:text-[#F3F1E7]"
            >
              VIEW ALL PRODUCTS
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CURATOR PICKS - EDITORIAL SECTION                               */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#7C8C63]">
              HANDPICKED WITH INTENTION
            </span>
            <h2 className="mt-2 font-serif text-4xl">Curator picks for this season</h2>
            <p className="mt-3 text-sm text-[#66675C] max-w-2xl">
              Our team of designers and artisans have selected their favourite pieces,
              combinations, and stories from this season's collection.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-3">
          {curatorPicks.map((pick, i) => (
            <Reveal key={pick.name} delay={i * 100}>
              <Link
                to="/collection"
                className="group block overflow-hidden rounded-lg"
              >
                <div className="relative h-72 overflow-hidden rounded-lg mb-4">
                  <img
                    src={pick.image}
                    alt={pick.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                  <div className="absolute top-4 left-4 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[#F3F1E7] text-xs font-semibold">
                    {pick.pieces} pieces
                  </div>
                </div>
                <h3 className="font-serif text-lg group-hover:text-[#5C6B49] transition">
                  {pick.name}
                </h3>
                <p className="text-xs text-[#8A9873] mt-1">{pick.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* MATERIAL GUIDE - EDUCATIONAL SECTION                             */}
      {/* ================================================================ */}
      <section className="bg-[#F3F1E7] border-y border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#7C8C63]">
                CRAFT MATTERS
              </span>
              <h2 className="mt-2 font-serif text-3xl">Understanding our materials</h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {materialGuide.map(({ name, benefit, icon: Icon }, i) => (
              <Reveal key={name} delay={i * 100}>
                <div className="rounded-lg border border-black/5 p-8 text-center transition hover:border-black/20 hover:bg-white">
                  <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[#DCE2CC] flex items-center justify-center text-[#5C6B49] group-hover:scale-110 transition">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-serif text-lg font-medium">{name}</h3>
                  <p className="mt-2 text-sm text-[#66675C]">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/collection?tab=aboutproducts"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#5C6B49] hover:underline"
            >
              Learn more about our craft <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Values strip                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#7C8C63]">
              OUR PROMISE
            </span>
            <h2 className="mt-2 font-serif text-4xl">
              Crafted with intention, loved by you
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100} className="group">
              <div className="flex flex-col gap-4 rounded-lg border border-black/5 p-6 transition hover:border-black/20 hover:bg-[#F3F1E7]">
                <div className="h-12 w-12 rounded-full bg-[#DCE2CC] text-[#5C6B49] flex items-center justify-center transition group-hover:scale-110">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#66675C]">
                    {text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Gallery strip                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[#EAE7D9] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-[#7C8C63]">
                  #WORNBYLOOMBLOOM
                </span>
                <h2 className="mt-2 font-serif text-4xl">As worn by our community</h2>
                <p className="mt-3 text-sm text-[#66675C] max-w-sm">
                  See how our customers style their LoomBloom pieces in their everyday lives.
                </p>
              </div>
              <a
                href="#"
                className="hidden items-center gap-1 text-sm font-medium text-[#5C6B49] hover:underline sm:flex"
              >
                <Camera size={15} />
                Follow along on Instagram
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {gallery.map((id, i) => (
              <Reveal key={id} delay={i * 60}>
                <div className="group relative aspect-square overflow-hidden rounded-lg border border-black/5">
                  <img
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`}
                    alt="Community styled piece"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#2B2A25]/0 transition group-hover:bg-[#2B2A25]/40">
                    <div className="flex flex-col items-center gap-2 opacity-0 transition group-hover:opacity-100">
                      <Camera size={20} className="text-[#F3F1E7]" />
                      <p className="text-[10px] text-[#F3F1E7] font-semibold">
                        View post
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[#2B2A25] py-24 text-[#F3F1E7]">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#A7B594]">
                WORDS FROM THE COMMUNITY
              </span>
              <h2 className="mt-2 font-serif text-4xl">Loved, worn, worn again</h2>
              <p className="mt-3 text-sm text-[#E6E4D6] max-w-2xl mx-auto">
                Hear from customers who've made LoomBloom pieces a part of their everyday style.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="h-full rounded-lg border border-[#F3F1E7]/15 bg-linear-to-br from-[#F3F1E7]/10 to-[#F3F1E7]/5 p-8 transition hover:border-[#F3F1E7]/30 hover:bg-[#F3F1E7]/15">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star
                        key={s}
                        size={14}
                        fill="#B85C4A"
                        className="text-[#B85C4A]"
                      />
                    ))}
                  </div>
                  <Quote size={22} className="text-[#A7B594] mb-4" />
                  <p className="text-base leading-relaxed text-[#E6E4D6] italic">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 pt-6 border-t border-[#F3F1E7]/10">
                    <p className="font-serif text-lg font-semibold">{t.name}</p>
                    <p className="text-xs text-[#A7B594]">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PREMIUM CERTIFICATION BAR                                        */}
      {/* ================================================================ */}
      <section className="bg-white border-y border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <Reveal>
              <div>
                <p className="font-serif text-sm font-semibold text-[#2B2A25]">
                  Certified Ethical
                </p>
                <p className="text-xs text-[#8A9873] mt-1">Fair trade artisans</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <p className="font-serif text-sm font-semibold text-[#2B2A25]">
                  Carbon Neutral
                </p>
                <p className="text-xs text-[#8A9873] mt-1">100% offset shipping</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <p className="font-serif text-sm font-semibold text-[#2B2A25]">
                  Lifetime Quality
                </p>
                <p className="text-xs text-[#8A9873] mt-1">1-year repair guarantee</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div>
                <p className="font-serif text-sm font-semibold text-[#2B2A25]">
                  Zero Waste
                </p>
                <p className="text-xs text-[#8A9873] mt-1">Eco packaging</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* NEWSLETTER & CALL TO ACTION - ENHANCED                           */}
      {/* ================================================================ */}
      <section className="bg-linear-to-b from-[#EDEADD] to-[#F3F1E7] py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#DCE2CC] text-[#5C6B49]">
              <Mail size={24} />
            </div>
            <h2 className="font-serif text-4xl">Experience the LoomBloom difference</h2>
            <p className="mt-6 text-base leading-relaxed text-[#66675C]">
              Every piece carries the warmth of human hands and the cool serenity
              of natural ice dyes. Join 12,000+ customers who've made LoomBloom their trusted source for
              handcrafted elegance.
            </p>

            {subscribed ? (
              <div className="mt-10 rounded-lg bg-[#5C6B49]/10 border border-[#5C6B49] p-6">
                <p className="font-semibold text-[#5C6B49]">
                  ✓ You're on the list — welcome to LoomBloom.
                </p>
                <p className="text-sm text-[#66675C] mt-2">
                  Watch your inbox for exclusive early access and seasonal releases.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 rounded-lg border border-[#2B2A25]/20 bg-white px-5 py-3.5 text-sm text-[#2B2A25] placeholder:text-[#8A8B7E] focus:border-[#2B2A25] focus:outline-none focus:ring-2 focus:ring-[#2B2A25]/10"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#2B2A25] px-8 py-3.5 text-xs font-bold tracking-wider text-[#F3F1E7] transition hover:bg-[#454437] whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}

            {/* CTA buttons */}
            <div className="mt-12 flex flex-col gap-3 sm:flex-row justify-center">
              <Link
                to="/collection"
                className="rounded-lg bg-[#2B2A25] px-8 py-3.5 text-xs font-bold tracking-wider text-[#F3F1E7] transition hover:bg-[#454437]"
              >
                SHOP THE COLLECTION
              </Link>
              <Link
                to="/sales"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#2B2A25]/40 px-8 py-3.5 text-xs font-bold tracking-wider text-[#2B2A25] transition hover:border-[#2B2A25] hover:bg-[#2B2A25]/5"
              >
                <Tag size={14} />
                VIEW SALE
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-xs text-[#66675C]">
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#5C6B49]" />
                Secure checkout
              </span>
              <span className="flex items-center gap-2">
                <Truck size={14} className="text-[#5C6B49]" />
                30-day returns
              </span>
              <span className="flex items-center gap-2">
                <Award size={14} className="text-[#5C6B49]" />
                1-year guarantee
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}