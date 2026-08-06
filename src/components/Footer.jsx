import React from 'react';

const Footer = () => (
  <footer className="bg-[#F3F1E7] text-[#3E4636] border-t border-[#D9D8C9]">
    <div className="mx-auto max-w-7xl px-6 py-16">

      {/* Main Footer */}
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

        {/* Brand */}
        <div className="max-w-sm">
          <div className="inline-flex items-center gap-4">

            {/* Logo */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9D8C9] text-2xl font-bold text-[#59634C] shadow-sm">
              ❦
            </div>

            <div>
              <p className="text-2xl font-semibold tracking-tight text-[#343B2F]">
                LoomB⸙oom
              </p>

              <p className="mt-3 text-sm leading-6 text-[#6D7465]">
                Natural fabrics and handwoven style brought to life with
                timeless textures and thoughtful design.
              </p>
            </div>

          </div>

          {/* Social Icons */}
          <div className="mt-8 flex items-center gap-4">

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E3E2D5] text-[#59634C] transition-all duration-300 hover:bg-[#59634C] hover:text-white hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.402a4.91 4.91 0 011.753 1.015 4.91 4.91 0 011.015 1.753c.162.457.346 1.257.402 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.402 2.427a4.914 4.914 0 01-1.015 1.753 4.914 4.914 0 01-1.753 1.015c-.457.162-1.257.346-2.427.402-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.402a4.916 4.916 0 01-1.753-1.015 4.916 4.916 0 01-1.015-1.753c-.162-.457-.346-1.257-.402-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.402-2.427a4.91 4.91 0 011.015-1.753A4.91 4.91 0 015.403 2.635c.457-.162 1.257-.316 1.953-.362 1.244-.057 1.62-.069 4.644-.069zm0 1.838c-3.16 0-3.536.012-4.78.069-1.027.046-1.584.218-1.953.362a3.07 3.07 0 00-1.115.725 3.07 3.07 0 00-.725 1.115c-.144.369-.316.926-.362 1.953-.057 1.244-.069 1.62-.069 4.78s.012 3.536.069 4.78c.046 1.027.218 1.584.362 1.953.168.442.422.834.725 1.115.281.303.673.557 1.115.725.369.144.926.316 1.953.362 1.244.057 1.62.069 4.78.069s3.536-.012 4.78-.069c1.027-.046 1.584-.218 1.953-.362a3.07 3.07 0 001.115-.725 3.07 3.07 0 00.725-1.115c.144-.369.316-.926.362-1.953.057-1.244.069-1.62.069-4.78s-.012-3.536-.069-4.78c-.046-1.027-.218-1.584-.362-1.953a3.065 3.065 0 00-.725-1.115 3.065 3.065 0 00-1.115-.725c-.369-.144-.926-.316-1.953-.362-1.244-.057-1.62-.069-4.78-.069zm0 4.838a5.002 5.002 0 110 10.004 5.002 5.002 0 010-10.004zm0 1.838a3.164 3.164 0 100 6.328 3.164 3.164 0 000-6.328zm4.406-1.438a1.166 1.166 0 11-2.332 0 1.166 1.166 0 012.332 0z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E3E2D5] text-[#59634C] transition-all duration-300 hover:bg-[#59634C] hover:text-white hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.412c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.92.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="#"
              aria-label="Twitter"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E3E2D5] text-[#59634C] transition-all duration-300 hover:bg-[#59634C] hover:text-white hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 4.557a9.832 9.832 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.863 9.863 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.897 4.897 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.588 3.416A9.867 9.867 0 010 21.543a13.933 13.933 0 007.548 2.212c9.056 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="#"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E3E2D5] text-[#59634C] transition-all duration-300 hover:bg-[#59634C] hover:text-white hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 5.478 3.657 10.092 8.698 11.616.636.117.87-.276.87-.613 0-.303-.011-1.106-.017-2.17-3.54.77-4.288-1.705-4.288-1.705-.582-1.48-1.422-1.875-1.422-1.875-1.163-.795.088-.78.088-.78 1.285.091 1.96 1.32 1.96 1.32 1.143 1.958 2.999 1.393 3.73 1.064.116-.827.447-1.393.813-1.712-2.828-.322-5.803-1.414-5.803-6.292 0-1.39.497-2.524 1.313-3.414-.132-.323-.568-1.621.125-3.38 0 0 1.07-.342 3.504 1.305A12.274 12.274 0 0112.004 5.8c1.084.005 2.174.146 3.192.43 2.43-1.647 3.497-1.305 3.497-1.305.695 1.759.259 3.057.128 3.38.818.89 1.312 2.023 1.312 3.414 0 4.89-2.98 5.967-5.817 6.283.459.395.868 1.175.868 2.371 0 1.71-.016 3.09-.016 3.51 0 .34.232.735.877.61C20.345 22.093 24 17.48 24 12.004 24 5.373 18.627 0 12.004 0z" />
              </svg>
            </a>

          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:w-[58%]">

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#59634C]">
              Shop
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-[#6D7465]">
              <li><a href="#" className="transition hover:text-[#343B2F]">New arrivals</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Best sellers</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Gift sets</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Sale</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#59634C]">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-[#6D7465]">
              <li><a href="#" className="transition hover:text-[#343B2F]">About us</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Our story</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Sustainability</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#59634C]">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-[#6D7465]">
              <li><a href="#" className="transition hover:text-[#343B2F]">Help center</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Shipping</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Returns</a></li>
              <li><a href="#" className="transition hover:text-[#343B2F]">Contact</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 flex flex-col gap-4 border-t border-[#D9D8C9] pt-8 text-sm text-[#7A806F] sm:flex-row sm:items-center sm:justify-between">

        <p>
          © 2026 LoomBloom. Crafted with care for every home.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="transition hover:text-[#343B2F]">
            Privacy
          </a>

          <a href="#" className="transition hover:text-[#343B2F]">
            Terms
          </a>

          <a href="#" className="transition hover:text-[#343B2F]">
            Accessibility
          </a>
        </div>

      </div>

    </div>
  </footer>
);

export default Footer;