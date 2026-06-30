"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", title: "Silent Room",     category: "Luxury Interior",      image: "/portfolio-1.png",  year: "2024" },
  { id: "02", title: "Ocean Residence", category: "Minimal Architecture", image: "/portfolio-2.png",  year: "2024" },
  { id: "03", title: "The Passage",     category: "Vintage Atmosphere",   image: "/portfolio-3.png",  year: "2023" },
  { id: "04", title: "The Vault",       category: "Winter Retreat",       image: "/portfolio-4.png",  year: "2023" },
  { id: "05", title: "Forest House",    category: "Nature Living",        image: "/building-one.jpg", year: "2023" },
  { id: "06", title: "Concrete Studio", category: "Editorial Space",      image: "/building-2.jpg",   year: "2022" },
  { id: "07", title: "Light Chamber",   category: "Modern Interior",      image: "/building-3.jpg",   year: "2022" },
];

// ── Scroll progress thresholds ──────────────────────────────────────────────
// 0.00 → 0.38  Phase 1 : side cards exit + header fades
// 0.20 → 0.60  Phase 2 : center card → fullscreen
// 0.62 → 1.00  Phase 3 : fullscreen → arch on marble bg
//
// Auto-slide is paused whenever scroll progress > PAUSE_AT
const PAUSE_AT = 0.38;

export default function PremiumProjectsSection() {
  const sectionRef  = useRef(null);
  const isPausedRef = useRef(false);   // tracks whether auto-slide is paused
  const intervalRef = useRef(null);

  const [active, setActive] = useState(0);

  const nextSlide = useCallback(() => setActive((p) => (p + 1) % projects.length), []);
  const prevSlide = useCallback(() => setActive((p) => (p === 0 ? projects.length - 1 : p - 1)), []);

  // ── Auto-slide (start / stop based on isPausedRef) ─────────────────────
  const startInterval = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) nextSlide();
    }, 5500);
  }, [nextSlide]);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  // ── GSAP scroll animations ──────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "300% top",
          scrub: 1.3,
          pin: ".sticky-stage",
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Pause auto-slide while user has scrolled past initial state
            isPausedRef.current = self.progress > PAUSE_AT;
          },
        },
      });

      // ════════════════════════════════════════════════════════
      // PHASE 1  (tl time 0 → 0.38)
      // Side cards exit, section header fades, initial title fades
      // ════════════════════════════════════════════════════════
      tl.to(".left-card",        { xPercent: -200, rotate: -12, opacity: 0, stagger: 0.04, ease: "power3.inOut", duration: 0.35 }, 0)
        .to(".right-card",       { xPercent:  200, rotate:  12, opacity: 0, stagger: 0.04, ease: "power3.inOut", duration: 0.35 }, 0)
        .to(".section-header",   { opacity: 0, y: -24, ease: "power2.in", duration: 0.22 }, 0.05)
        // FIX: fade out the "initial" card title so it doesn't ghost behind fullscreen title
        .to(".initial-title",    { opacity: 0, y: -16, ease: "power2.in", duration: 0.20 }, 0.22);

      // ════════════════════════════════════════════════════════
      // PHASE 2  (tl time 0.20 → 0.62)
      // Center card grows to fullscreen; FS UI fades in
      // ════════════════════════════════════════════════════════
      tl.to(".center-hero", {
          width:        "100vw",
          height:       "100vh",
          borderRadius: "0px",
          borderWidth:  "0px",
          boxShadow:    "none",
          ease:         "power2.inOut",
          duration:     0.42,
        }, 0.20)
        // FS title (bottom-left) — unique class "fs-title"
        .fromTo(".fs-title",    { opacity: 0, y: 28  }, { opacity: 1, y: 0,  ease: "power3.out", duration: 0.18 }, 0.50)
        // FS counter (top-right) — unique class "fs-counter"
        .fromTo(".fs-counter",  { opacity: 0        }, { opacity: 1,         ease: "power2.out", duration: 0.15 }, 0.52)
        // FS nav buttons (bottom-center) — unique class "fs-nav"
        .fromTo(".fs-nav",      { opacity: 0, y: 18 }, { opacity: 1, y: 0,  ease: "power3.out", duration: 0.15 }, 0.54);

      // ════════════════════════════════════════════════════════
      // PHASE 3  (tl time 0.62 → 1.00)
      // Fullscreen shrinks to arch; marble bg + arch UI appear
      // ════════════════════════════════════════════════════════

      // Hide FS UI immediately as phase 3 starts
      tl.to(".fs-title",   { opacity: 0, duration: 0.08 }, 0.62)
        .to(".fs-counter", { opacity: 0, duration: 0.08 }, 0.62)
        .to(".fs-nav",     { opacity: 0, duration: 0.08 }, 0.62);

      // Marble bg fades in
      tl.fromTo(".arch-bg", { opacity: 0 }, { opacity: 1, ease: "power2.inOut", duration: 0.28 }, 0.63);

      // Card morphs to arch
      tl.to(".center-hero", {
          width:        "34vw",
          height:       "70vh",
          borderRadius: "50% 50% 0 0 / 52% 52% 0 0",
          borderWidth:  "1px",
          ease:         "power3.inOut",
          duration:     0.38,
        }, 0.65);

      // Arch-mode UI fades in
      tl.fromTo(".arch-title",   { opacity: 0, x: -22 }, { opacity: 1, x: 0, ease: "power3.out", duration: 0.22 }, 0.85)
        .fromTo(".arch-counter", { opacity: 0         }, { opacity: 1,        ease: "power2.out", duration: 0.20 }, 0.86)
        .fromTo(".arch-nav",     { opacity: 0, y: 14  }, { opacity: 1, y: 0,  ease: "power3.out", duration: 0.20 }, 0.87);

      // ── Parallax on hero image ───────────────────────────
      gsap.to(".hero-image", {
        scale: 1.16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Ambient orbs drift ────────────────────────────────
      gsap.to(".floating-orb", {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Mount entrance ────────────────────────────────────
      gsap.fromTo(".initial-title",
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.2 },
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const proj = projects[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] text-white"
    >
      {/* ── AMBIENT BACKGROUND ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
        <div className="floating-orb absolute left-[4%]   top-[8%]   h-[500px] w-[500px] rounded-full bg-orange-500/[0.07] blur-[160px]" />
        <div className="floating-orb absolute right-[6%]  top-[20%]  h-[600px] w-[600px] rounded-full bg-amber-300/[0.05]  blur-[180px]" />
        <div className="floating-orb absolute bottom-[4%] left-[28%] h-[400px] w-[400px] rounded-full bg-white/[0.04]      blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#080808_100%)]" />
      </div>

      {/* ── STICKY STAGE ─────────────────────────────────────── */}
      <div className="sticky-stage sticky top-0 z-10 h-screen w-full overflow-hidden">

        {/* SECTION HEADER */}
        <div className="section-header pointer-events-none absolute left-1/2 top-8 z-40 -translate-x-1/2 text-center whitespace-nowrap">
          <span className="mb-3 block text-[10px] uppercase tracking-[0.5em] text-white/35">
            Selected Projects
          </span>
          <h2 className="text-[34px] font-extralight leading-[0.88] tracking-[-0.05em] md:text-[60px] lg:text-[84px]">
            Spaces with
            <br />
            <span className="italic opacity-60">cinematic</span> emotion.
          </h2>
        </div>

        {/* LEFT SIDE CARDS */}
        <div className="absolute left-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4 xl:left-10">
          {projects.slice(0, 3).map((item, i) => (
            <SideCard key={i} item={item} cls="left-card" />
          ))}
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4 xl:right-10">
          {projects.slice(3, 6).map((item, i) => (
            <SideCard key={i} item={item} cls="right-card" />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            ARCH / MARBLE BACKGROUND  (z-[25], behind center-hero)
            All arch-mode UI lives here so it's truly behind the
            hero card in phase 1 & 2, and beside it in phase 3.
        ══════════════════════════════════════════════════════ */}
        <div
          className="arch-bg pointer-events-none absolute inset-0 z-[25] opacity-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 110%, #191410 0%, #0e0c0a 45%, #080808 100%)",
          }}
        >
          {/* SVG marble veining */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.09]" preserveAspectRatio="none">
            <path d="M180 0 Q330 180 280 420 T480 900"   stroke="rgba(255,215,140,0.5)" strokeWidth="0.9" fill="none"/>
            <path d="M750 80 Q580 260 630 480 T380 950"  stroke="rgba(255,215,140,0.35)" strokeWidth="0.7" fill="none"/>
            <path d="M90 280 Q220 380 180 580"           stroke="rgba(255,215,140,0.25)" strokeWidth="0.5" fill="none"/>
          </svg>
          {/* Fine noise grain */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "300px 300px",
            }}
          />

          {/* ── ARCH TITLE  (left of arch) ── */}
          <div
            className="arch-title pointer-events-auto absolute top-1/2 z-10 -translate-y-1/2 pr-8 text-right opacity-0"
            style={{ right: "calc(50% + 17vw + 24px)" }}
          >
            <span className="mb-3 block text-[10px] uppercase tracking-[0.5em] text-white/35">
              {proj.category}
            </span>
            <p className="text-[26px] font-extralight leading-[1.0] tracking-[-0.04em] md:text-[38px]">
              {proj.title}
            </p>
          </div>

          {/* ── ARCH COUNTER  (right of arch) ── */}
          <div
            className="arch-counter absolute top-1/2 z-10 -translate-y-1/2 opacity-0"
            style={{ left: "calc(50% + 17vw + 28px)" }}
          >
            <div
              className="flex h-[84px] w-[84px] items-center justify-center rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.14)", background: "transparent" }}
            >
              <span className="text-[17px] font-extralight tracking-[-0.02em] text-white/65">
                {active + 1}/{projects.length}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CENTER HERO CARD  (z-30)
            Morphs: rounded card  →  fullscreen  →  arch shape
        ══════════════════════════════════════════════════════ */}
        <div
          className="center-hero absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#0c0c0c]"
          style={{
            width:        "60vw",
            height:       "70vh",
            borderRadius: "36px",
            border:       "1px solid rgba(255,255,255,0.08)",
            boxShadow:    "0 40px 160px rgba(0,0,0,0.7)",
          }}
        >
          {/* Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              key={proj.image}
              src={proj.image}
              alt={proj.title}
              className="hero-image h-full w-full scale-105 object-cover transition-all duration-[1800ms] ease-out"
            />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,transparent_28%,rgba(0,0,0,0.32)_100%)]" />

          {/* ─────────────────────────────────────────────────────
              STATE 0  initial card title  (visible on mount)
              GSAP fades this OUT in phase 1 via ".initial-title"
          ───────────────────────────────────────────────────── */}
          <div className="initial-title absolute bottom-8 left-8 z-20 md:bottom-10 md:left-10">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.45em] text-white/50">
              {proj.category}
            </span>
            <h3 className="text-[32px] font-extralight leading-[0.9] tracking-[-0.05em] md:text-[50px]">
              {proj.title}
            </h3>
          </div>

          {/* ─────────────────────────────────────────────────────
              STATE 2  FULLSCREEN UI
              All three elements start opacity-0; GSAP fades in.
              Each has a UNIQUE class so GSAP targets precisely.
          ───────────────────────────────────────────────────── */}

          {/* FS title — bottom left */}
          <div className="fs-title absolute bottom-10 left-10 z-30 opacity-0 md:bottom-14 md:left-14">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.48em] text-white/50">
              {proj.category}
            </span>
            <h3 className="text-[48px] font-extralight leading-[0.88] tracking-[-0.05em] md:text-[74px]">
              {proj.title}
            </h3>
          </div>

          {/* FS counter — top right */}
          <div className="fs-counter absolute right-10 top-10 z-30 opacity-0 md:right-14 md:top-14">
            <div
              className="flex h-[96px] w-[96px] items-center justify-center rounded-full backdrop-blur-xl"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
            >
              <span className="text-[19px] font-extralight tracking-[-0.02em]">
                {String(active + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* FS nav — bottom center */}
          <div
            className="fs-nav absolute z-30 flex items-center gap-4 opacity-0"
            style={{ bottom: "40px", left: "50%", transform: "translateX(-50%)" }}
          >
            <RoundBtn onClick={prevSlide} dir="prev" variant="dark-glass" />
            <RoundBtn onClick={nextSlide} dir="next" variant="cream"      />
          </div>

          {/* ─────────────────────────────────────────────────────
              STATE 3  ARCH-MODE nav  (sits inside card, at base)
              Centered, both buttons dark — fades in via ".arch-nav"
          ───────────────────────────────────────────────────── */}
          <div
            className="arch-nav absolute z-40 flex items-center gap-3 opacity-0"
            style={{ bottom: "20px", left: "50%", transform: "translateX(-50%)" }}
          >
            <RoundBtn onClick={prevSlide} dir="prev" variant="dark-solid" />
            <RoundBtn onClick={nextSlide} dir="next" variant="dark-solid" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SIDE CARD ─────────────────────────────────────────────────────────── */
function SideCard({ item, cls }) {
  return (
    <div
      className={`${cls} relative h-[148px] w-[218px] overflow-hidden xl:h-[160px] xl:w-[242px]`}
      style={{
        borderRadius: "22px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 18px 65px rgba(0,0,0,0.55)",
      }}
    >
      <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-3 left-4">
        <p className="text-[9px] uppercase tracking-[0.35em] text-white/45">{item.category}</p>
        <p className="text-[12px] font-light leading-tight">{item.title}</p>
      </div>
    </div>
  );
}

/* ─── ROUND BUTTON ──────────────────────────────────────────────────────── */
// variant: "dark-glass" | "cream" | "dark-solid"
function RoundBtn({ onClick, dir, variant }) {
  const isPrev = dir === "prev";

  const styles = {
    "dark-glass": {
      background: "rgba(0,0,0,0.65)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(16px)",
    },
    "cream": {
      background: "#eee9df",
      color: "black",
      border: "none",
      backdropFilter: "none",
    },
    "dark-solid": {
      background: "rgba(8,8,8,0.94)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(12px)",
    },
  };

  const s = styles[variant] ?? styles["dark-glass"];

  return (
    <button
      onClick={onClick}
      className="group flex h-[74px] w-[74px] items-center justify-center rounded-full transition-all duration-400 hover:scale-110"
      style={s}
    >
      <span
        className={`text-xl leading-none transition-transform duration-300 ${
          isPrev ? "group-hover:-translate-x-[3px]" : "group-hover:translate-x-[3px]"
        }`}
      >
        {isPrev ? "←" : "→"}
      </span>
    </button>
  );
}
