"use client";

export default function Navbar() {
  return (
    <nav
      className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-8 py-5"
      style={{
        animation: "navIn .9s cubic-bezier(.16,1,.3,1) 1.8s both",
      }}
    >
      {/* logo */}
      <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
        <rect
          x="2"
          y="2"
          width="12"
          height="12"
          rx="2"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="18"
          y="2"
          width="12"
          height="12"
          rx="2"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="2"
          y="18"
          width="12"
          height="12"
          rx="2"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="18"
          y="18"
          width="12"
          height="12"
          rx="2"
          fill="white"
          opacity="0.3"
        />
      </svg>

      {/* nav pill */}
      <div
        className="hidden md:flex items-center gap-0.5 rounded-full px-2 py-1.5 border"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.15)",
        }}
      >
        {["Home", "About us", "Services", "Portfolio", "Contacts"].map(
          (item, i) => (
            <a
              key={item}
              href="#"
              className={`px-[18px] py-[7px] rounded-full text-[16px] font-medium tracking-wide transition-all duration-200 no-underline ${
                i === 0
                  ? "bg-white text-gray-900"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              style={{
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              {item}
            </a>
          )
        )}
      </div>

      {/* right side */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex gap-2">
          {[
            {
              l: "f",
              p: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
            },
            {
              l: "ig",
              p: "M12 2.163c3.204 0 3.584.012 4.85.07...",
            },
            {
              l: "x",
              p: "M18.244 2.25h3.308l-7.227 8.26...",
            },
          ].map(({ l, p }) => (
            <button
              key={l}
              aria-label={l}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-white/75 hover:text-white"
              style={{
                border: "1px solid rgba(255,255,255,0.28)",
                background: "transparent",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="13"
                height="13"
              >
                <path d={p} />
              </svg>
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-2.5 bg-white text-gray-900 rounded-full pl-6 pr-2 py-2.5 hover:bg-gray-100 transition-colors"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          Consultation

          <span className="w-[26px] h-[26px] bg-gray-900 rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              width="12"
              height="12"
            >
              <path
                d="M7 17L17 7M7 7h10v10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}