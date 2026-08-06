import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const About = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.dataset.section]));
        }
      });
    }, { threshold: 0.12 });

    sectionRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const addRef = (el, idx) => { sectionRefs.current[idx] = el; };

  const fadeClass = (section) =>
    `transition-all duration-700 ease-out
    ${visibleSections.has(section) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  const values = [
    {
      title: 'Curated Quality',
      desc: 'Every product is hand-selected by Ali Khan, ensuring only the finest outfits, shoes, and fragrances reach our customers.',
    },
    {
      title: 'Timeless Design',
      desc: 'We believe in pieces that transcend seasons — classic silhouettes, natural palettes, and enduring craftsmanship.',
    },
    {
      title: 'Trusted Service',
      desc: 'From seamless browsing to doorstep delivery, every touchpoint is designed with care and professionalism.',
    },
  ];

  return (
    <div className="font-sans text-charcoal antialiased">

      {/* HERO */}
      <section
        ref={el => addRef(el, 0)}
        data-section="hero"
        className={`relative pt-32 pb-24 px-6 bg-linear-to-b from-[#DCE2CC] to-[#F3F1E7] py-20 ${fadeClass('hero')}`}
      >
        <div className="max-w-225 mx-auto text-center">
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-[#B85C4A] mb-6 font-bold">
            AliKhan Enterprises · Est. 2026
          </p>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.08] tracking-[-0.02em] mb-6">
            The Art of<br />
            <span className="italic text-[#7A8B6E]">Considered Living</span>
          </h1>
          <p className="text-stone leading-[1.8] max-w-130 mx-auto text-[0.95rem]">
            LoomBloom is a premium online destination for those who seek quality without compromise.
            Founded by Ali Khan, we bring together the finest outfits, footwear, and fragrances
            under one thoughtfully designed roof.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section
        ref={el => addRef(el, 1)}
        data-section="story"
        className={`py-24 px-6 bg-snow ${fadeClass('story')}`}
      >
        <div className="max-w-275 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-4/5 rounded overflow-hidden bg-cream">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="LoomBloom Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-24 h-24 border border-gold/30 rounded-full hidden lg:block" />
            <div className="absolute -top-5 -left-5 w-16 h-16 border border-sage/30 rounded-full hidden lg:block" />
          </div>

          <div>
            <div className="w-10 h-px bg-gold mb-8" />
            <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-light leading-[1.3] mb-6">
              A Store Built on<br />Personal Curation
            </h2>
            <p className="text-stone leading-[1.85] mb-5 text-[0.95rem]">
              What began as a simple vision — to offer discerning customers a single destination
              for premium lifestyle goods — has grown into LoomBloom. Every item in our collection
              is chosen not by algorithm, but by Ali Khan himself.
            </p>
            <p className="text-stone leading-[1.85] mb-5 text-[0.95rem]">
              From hand-finished outfits and artisan footwear to refined fragrances,
              we source products that balance heritage craftsmanship with modern sensibility.
              No excess. Only what deserves a place in your wardrobe.
            </p>
            <p className="text-stone leading-[1.85] text-[0.95rem]">
              Our palette draws from nature — sage, cream, frost, and stone —
              reflecting a design philosophy that values calm over noise, and permanence over trend.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section
        ref={el => addRef(el, 2)}
        data-section="values"
        className={`py-24 px-6 bg-linear-to-b from-snow via-cream/20 to-snow ${fadeClass('values')}`}
      >
        <div className="max-w-250 mx-auto">
          <div className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-3 font-medium">Our Standards</p>
            <h2 className="text-[clamp(1.5rem,2.8vw,2rem)] font-light tracking-[-0.01em]">Three Principles We Live By</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div
                key={value.title.replace(/\s+/g, '-').toLowerCase()}
                className="text-center p-8 bg-white rounded border border-black/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="w-10 h-px bg-gold mx-auto mb-6" />
                <h3 className="text-base font-medium mb-3 tracking-wide">{value.title}</h3>
                <p className="text-sm text-stone leading-[1.7]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section
        ref={el => addRef(el, 3)}
        data-section="founder"
        className={`py-24 px-6 bg-charcoal text-white relative overflow-hidden ${fadeClass('founder')}`}
      >
        <div className="absolute inset-0 bg-linear-to-br from-sage/8 via-transparent to-frost/8" />
        <div className="max-w-225 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 items-center">
            <div className="mx-auto md:mx-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-gold/30 mx-auto">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm8DdAtEsOBbgJHA6KFE0CeSC0gDXHJ4gt35g4HPI942QCa8ed7CSwuW6W&s=10"
                  alt="Ali Khan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-4 font-medium">Founder</p>
              <h2 className="text-3xl font-light mb-4">Ali Khan</h2>
              <p className="text-white/60 leading-[1.85] text-[0.95rem] mb-6 max-w-120">
                With a background in design and a deep appreciation for quality craftsmanship,
                Ali Khan founded LoomBloom to bridge the gap between traditional artisanal goods
                and the modern online shopping experience. Every product reflects his personal standard
                of excellence.
              </p>
              <div className="flex items-center gap-6 justify-center md:justify-start text-sm text-white/50">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Founder & Curator
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  AliKhan Enterprises
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        ref={el => addRef(el, 4)}
        data-section="stats"
        className={`py-20 px-6 bg-cream ${fadeClass('stats')}`}
      >
        <div className="max-w-225 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '500+', label: 'Products Curated' },
            { num: '100%', label: 'Quality Checked' },
            { num: '14', label: 'Day Returns' },
            { num: '50K+', label: 'Happy Customers' },
          ].map((stat) => (
            <div key={stat.label.replace(/\s+/g, '-').toLowerCase()}>
              <div className="text-[2.2rem] font-extralight text-gold mb-1">{stat.num}</div>
              <div className="text-[0.75rem] tracking-[0.12em] uppercase text-stone">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-linear-to-b from-snow to-cream/40 text-center">
        <h2 className="text-[clamp(1.5rem,2.8vw,2rem)] font-light mb-4">
          Discover the Collection
        </h2>
        <p className="text-stone max-w-110 mx-auto mb-8 leading-[1.8] text-[0.95rem]">
          Browse our latest arrivals in outfits, shoes, and fragrances —
          curated with the same care that defines everything we do.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <NavLink
            to="/collection"
            className="px-10 py-3.5 bg-charcoal text-white rounded-sm text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-[#454437] hover:-translate-y-0.5"
          >
            Shop Outfits
          </NavLink>
          <NavLink
            to="/new-arrivals"
            className="rounded-sm border border-[#2B2A25]/40 px-8 py-3 text-xs font-semibold tracking-wider transition hover:border-[#2B2A25] hover:bg-[#2B2A25]/5"
          >
            New Arrivals
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default About;