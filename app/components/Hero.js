"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
// import Navbar from "./Nav";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 176;
const pad = (n) => String(n + 1).padStart(3, "0");

export default function Hero() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const fillRef = useRef(null);
  const ctrRef = useRef(null);
  const hintRef = useRef(null);
  const imagesRef = useRef([]);
  const ctxRef = useRef(null);
  const loadedRef = useRef(0);
  const uiRef = useRef(null);
  const [ready, setReady] = useState(false);

  /* ─── draw a single frame ─── */
  const draw = (img) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || !img?.complete || !img.naturalWidth) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  /* ─── resize canvas ─── */
  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const img = imagesRef.current[0];
    if (img?.complete) draw(img);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);

    /* ─── 1. preload ALL frames, then boot ─── */
    imagesRef.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = `/3d_Building/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loadedRef.current += 1;
        if (i === 0) draw(img); // show frame 1 instantly
        if (loadedRef.current === TOTAL_FRAMES) {
          setReady(true); // signal all loaded
        }
      };
      return img;
    });

    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ─── 2. boot GSAP + Lenis ONLY after all frames loaded ─── */
  useEffect(() => {
    if (!ready) return;

    /* Lenis smooth scroll */
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    /* Tick lenis inside GSAP's RAF so ScrollTrigger stays in sync */
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ScrollTrigger — scrub drives frame index */
    const obj = { frame: 0 };

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true, // instant — Lenis already provides smoothing
      //   onUpdate(self) {
      //     const raw = self.progress * (TOTAL_FRAMES - 1);
      //     const frame = Math.round(raw);
      //     obj.frame = frame;

      //     draw(imagesRef.current[frame]);

      //     if (fillRef.current)
      //       fillRef.current.style.height = `${self.progress * 100}%`;

      //     if (ctrRef.current)
      //       ctrRef.current.textContent = `${String(frame + 1).padStart(2, "0")} / ${TOTAL_FRAMES}`;

      //     if (hintRef.current)
      //       hintRef.current.style.opacity = self.progress > 0.02 ? "0" : "1";
      //   },
      onUpdate(self) {
        const raw = self.progress * (TOTAL_FRAMES - 1);
        const frame = Math.round(raw);

        draw(imagesRef.current[frame]);

        if (fillRef.current) {
          fillRef.current.style.height = `${self.progress * 100}%`;
        }

        if (ctrRef.current) {
          ctrRef.current.textContent = `${String(frame + 1).padStart(2, "0")} / ${TOTAL_FRAMES}`;
        }

        if (hintRef.current) {
          hintRef.current.style.opacity = self.progress > 0.02 ? "0" : "1";
        }

        // Cinematic UI fade
        if (uiRef.current) {
          let opacity;

          if (self.progress <= 0.15) {
            // fade out
            opacity = 1 - self.progress / 0.15;
          } else if (self.progress >= 0.85) {
            // fade back in
            opacity = (self.progress - 0.85) / 0.15;
          } else {
            opacity = 0;
          }

          uiRef.current.style.opacity = opacity;
        }
      },
    });

    return () => {
      st.kill();
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ready]);

  return (
    <div ref={wrapRef} style={{ height: "600vh" }}>
      {/* sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />

        {/* loading shimmer until all frames ready */}
        {!ready && (
          <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-[1px] bg-white/10 overflow-hidden rounded">
                <div
                  className="h-full bg-white/60 rounded"
                  style={{
                    width: `${(loadedRef.current / TOTAL_FRAMES) * 100}%`,
                    transition: "width 0.2s ease",
                  }}
                />
              </div>
              <span
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="text-white/30 text-[10px] tracking-[0.3em] uppercase"
              >
                Loading experience
              </span>
            </div>
          </div>
        )}

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 65%, transparent 42%, rgba(0,0,0,0.58) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{
            height: 180,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: 200,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
          }}
        />

        <div
          ref={uiRef}
          className="absolute inset-0 z-30 transition-opacity duration-300"
        >
          {/* ── Brand watermark ──
          <div className="absolute inset-x-0 top-26 z-30 flex justify-center pointer-events-none select-none">
            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "200px",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "0.05em",
                textTransform: "uppercase",

                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.08) 100%)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "brandIn 1.8s cubic-bezier(.16,1,.3,1) .2s both",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              STUDIO R
            </h1>
          </div> */}
<div className="absolute inset-x-0 top-26 flex justify-center pointer-events-none select-none">
  <h1
    style={{
      fontFamily: "Montserrat, sans-serif",
      fontSize: "200px",
      fontWeight: 800,
      lineHeight: 0.9,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      animation: "brandIn 1.8s cubic-bezier(.16,1,.3,1) .2s both",
    }}
  >
    <span
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.08) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      STUDIO
    </span>

    {" "}

    <span
      style={{
        background:
          "linear-gradient(to bottom, #F5E6C8 0%, #D8B77A 45%, rgba(216,183,122,0.08) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      R
    </span>
  </h1>
</div>
          {/* ── Side taglines ── */}
          <div
            className="absolute left-7 top-1/2 -translate-y-1/2 z-30 max-w-[300px]"
            style={{
              animation: "sideIn .8s cubic-bezier(.16,1,.3,1) 2.2s both",
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.04em",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              We design things that combine aesthetics and functionality.
            </p>
          </div>
          <div
            className="absolute right-7 top-1/2 -translate-y-1/2 z-30 max-w-[200px] text-right"
            style={{
              animation: "sideIn .8s cubic-bezier(.16,1,.3,1) 2.4s both",
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.04em",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Designing the life of the future
            </p>
          </div>

          {/* ── Stat cards ── */}
          <div className="absolute bottom-24 right-7 z-30 flex flex-col gap-2.5">
            {[
              {
                n: "15+",
                l: "Years of architectural\nexcellence and innovation",
              },
              {
                n: "549",
                l: "Projects implemented\nworldwide with excellence",
              },
            ].map(({ n, l }, i) => (
              <div
                key={n}
                className="rounded-2xl px-5 py-4 min-w-[172px]"
                style={{
                  background: "rgba(20,20,20,0.68)",
                  backdropFilter: "blur(1px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  animation: `statIn .7s cubic-bezier(.16,1,.3,1) ${2.5 + i * 0.25}s both`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Montserrat',serif",
                    fontSize: 34,
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 16,
                    fontWeight: 300,
                    letterSpacing: "0.03em",
                    color: "#ffff",
                    marginTop: 4,
                    lineHeight: 1.55,
                    whiteSpace: "pre-line",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="absolute bottom-7 inset-x-0 z-30 flex items-end justify-between px-7"
            style={{
              animation: "botIn .8s cubic-bezier(.16,1,.3,1) 2.9s both",
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.06em",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Closer to design,
              <br />
              closer to yourself
            </p>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
              <button
                className="flex items-center gap-3 rounded-full pl-6 pr-2.5 py-2 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  fontFamily: "Montserrat,sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "#fff",
                }}
              >
                Consultation
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.88)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#111"
                    strokeWidth="2.5"
                    width="14"
                    height="14"
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
          </div>

          {/* ── Scroll progress ── */}
          <div
            className="absolute left-7 bottom-7 z-30 flex flex-col items-center gap-1.5"
            style={{ animation: "sideIn .8s cubic-bezier(.16,1,.3,1) 3s both" }}
          >
            <div
              className="w-px h-14 overflow-hidden rounded"
              style={{ background: "rgba(255,255,255,0.14)" }}
            >
              <div
                ref={fillRef}
                className="w-full rounded"
                style={{
                  height: "0%",
                  background: "rgba(255,255,255,0.85)",
                  transition: "height 0.05s linear",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.38)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              SCROLL
            </span>
          </div>

          {/* ── Frame counter ── */}
          <div
            ref={ctrRef}
            className="absolute right-7 bottom-7 z-30"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              animation: "sideIn .8s ease 3.1s both",
            }}
          >
            01 / 20
          </div>

          {/* ── Scroll hint ── */}
          <div
            ref={hintRef}
            className="absolute left-1/2 -translate-x-1/2 z-30 mb-2 flex flex-col items-center gap-1.5 pointer-events-none"
            style={{
              bottom: 80,
              transition: "opacity 0.6s ease",
              animation: "hintIn 1s ease 3.5s both",
            }}
          >
            <div
              className="relative w-px h-7"
              style={{ background: "rgba(255,255,255,0.22)" }}
            >
              <div
                className="absolute -left-px w-[3px] rounded-sm"
                style={{
                  height: 10,
                  background: "rgba(255,255,255,0.8)",
                  animation: "dotSlide 1.6s ease-in-out infinite",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
              }}
            >
              Scroll to enter
            </span>
          </div>
        </div>
      </div>

      {/* keyframes injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=Montserrat:wght@300;400;500;600&display=swap');
        @keyframes brandIn { from{opacity:0;letter-spacing:.18em} to{opacity:1;letter-spacing:-0.02em} }
        @keyframes navIn   { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sideIn  { from{opacity:0;transform:translateY(calc(-50% + 14px))} to{opacity:1;transform:translateY(-50%)} }
        @keyframes statIn  { from{opacity:0;transform:translateX(22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes botIn   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hintIn  { from{opacity:0} to{opacity:1} }
        @keyframes dotSlide{ 0%{top:0;opacity:1} 80%{top:17px;opacity:0} 100%{top:0;opacity:0} }
      `}</style>
    </div>
  );
}
