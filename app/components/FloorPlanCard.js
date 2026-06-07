"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    number: "01",
    title: "Luxury Residence",
    desc: "Crafting refined architectural spaces that blend elegance, comfort and timeless design.",
  },
  {
    number: "02",
    title: "Urban Retreat",
    desc: "Modern living experiences designed around light, openness and premium materials.",
  },
  {
    number: "03",
    title: "Modern Workspace",
    desc: "Innovative commercial environments that inspire collaboration and creativity.",
  },
  {
    number: "04",
    title: "Coastal Escape",
    desc: "An immersive architectural expression connecting luxury with natural surroundings.",
  },
];

const frameCount = 156;

export default function ScrollFramePortfolio() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // =========================
    // HIGH DPI CANVAS
    // =========================

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    setupCanvas();

    // =========================
    // FRAME PATH
    // =========================

    const currentFrame = (index) =>
      `/floorplantwo/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

    // =========================
    // PRELOAD
    // =========================

    const images = [];
    const frame = {
      current: 0,
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // =========================
    // RENDER
    // =========================

    const render = () => {
      const img = images[Math.floor(frame.current)];

      if (!img) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const scale = Math.max(
        canvasWidth / img.width,
        canvasHeight / img.height,
      );

      const x = canvasWidth / 2 - (img.width / 2) * scale;
      const y = canvasHeight / 2 - (img.height / 2) * scale;

      context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale,
      );
    };

    images[0].onload = render;

    // =========================
    // RESIZE
    // =========================

    const handleResize = () => {
      setupCanvas();
      render();
    };

    window.addEventListener("resize", handleResize);

    // =========================
    // FRAME SEQUENCE
    // =========================

    gsap.to(frame, {
      current: frameCount - 1,
      snap: "current",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=9000",
        scrub: 1,
      },
      onUpdate: render,
    });

    // =========================
    // CANVAS SCALE
    // =========================

    gsap.to(canvas, {
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=9000",
        scrub: true,
      },
    });

    // =========================
    // HEADER ANIMATION
    // =========================

    gsap.from(".portfolio-tag", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".portfolio-header",
        start: "top 80%",
      },
    });

    gsap.from(".portfolio-line", {
      yPercent: 120,
      stagger: 0.12,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".portfolio-header",
        start: "top 80%",
      },
    });

    // =========================
    // CARD ANIMATIONS
    // =========================

    gsap.utils.toArray(".portfolio-card").forEach((card, index) => {
      const fromRight = index % 2 === 0;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          xPercent: fromRight ? 45 : -45,
          rotateY: fromRight ? -16 : 16,
          rotateX: 10,
          scale: 0.88,
          filter: "blur(24px)",
          transformPerspective: 1600,
          transformOrigin: fromRight
            ? "left center"
            : "right center",
        },
        {
          opacity: 1,
          xPercent: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 55%",
            scrub: 1.2,
          },
        },
      );

      // HOVER FLOAT

      const hover = gsap.to(card, {
        y: -14,
        scale: 1.02,
        duration: 0.7,
        ease: "power3.out",
        paused: true,
      });

      card.addEventListener("mouseenter", () => hover.play());

      card.addEventListener("mouseleave", () => hover.reverse());
    });

    // =========================
    // CLEANUP
    // =========================

    return () => {
      window.removeEventListener("resize", handleResize);

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[650vh] overflow-clip bg-black"
    >
      {/* ========================= */}
      {/* STICKY VISUAL */}
      {/* ========================= */}

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* CANVAS */}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full scale-[1.02]"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

        {/* VIGNETTE */}

        <div className="absolute inset-0 shadow-[inset_0_0_240px_rgba(0,0,0,0.5)]" />

        {/* GRAIN */}

        <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light bg-[url('/noise.png')]" />
      </div>

      {/* ========================= */}
      {/* CONTENT */}
      {/* ========================= */}

      <div className="relative z-20">
        {/* ========================= */}
        {/* HERO */}
        {/* ========================= */}

        <div className="portfolio-header flex h-screen items-center px-6 md:px-10 lg:px-16">
          <div className="max-w-[1500px]">
            <span className="portfolio-tag mb-6 block text-[11px] uppercase tracking-[0.35em] text-white/60">
              SELECTED PORTFOLIO
            </span>

            <h2 className="text-[56px] leading-[0.88] tracking-[-0.07em] text-white md:text-[110px] lg:text-[180px] font-light">
              <div className="overflow-hidden">
                <span className="portfolio-line block">
                  Architectural
                </span>
              </div>

              <div className="overflow-hidden">
                <span className="portfolio-line block">
                  storytelling
                </span>
              </div>

              <div className="overflow-hidden">
                <span className="portfolio-line block">
                  through motion.
                </span>
              </div>
            </h2>
          </div>
        </div>

        {/* ========================= */}
        {/* CARDS */}
        {/* ========================= */}

        <div className="relative z-20 px-6 md:px-10 lg:px-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                flex
                h-screen
                items-center
                ${
                  index % 2 === 0
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >
              <div
                className="
                  portfolio-card
                  group
                  relative
                  w-full
                  max-w-[560px]
                  overflow-hidden
                  rounded-[36px]
                  border
                  border-white/10
                  bg-white/[0.08]
                  backdrop-blur-2xl
                  p-8
                  md:p-10
                  shadow-[0_8px_40px_rgba(0,0,0,0.22)]

                  before:absolute
                  before:inset-0
                  before:bg-gradient-to-br
                  before:from-white/10
                  before:via-white/[0.03]
                  before:to-transparent
                  before:pointer-events-none

                  after:absolute
                  after:inset-0
                  after:rounded-[36px]
                  after:border
                  after:border-white/5
                  after:pointer-events-none
                "
              >
                {/* LIGHT GLOW */}

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                {/* CONTENT */}

                <div className="relative z-10">
                  {/* NUMBER */}

                  <div className="text-[72px] md:text-[92px] leading-none tracking-[-0.05em] text-white/15 font-light">
                    {card.number}
                  </div>

                  {/* TITLE */}

                  <h3 className="mt-6 text-[38px] md:text-[54px] leading-[0.92] tracking-[-0.05em] text-white font-light">
                    {card.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="mt-6 max-w-[390px] text-sm leading-relaxed text-white/65">
                    {card.desc}
                  </p>

                  {/* BUTTON */}

                  <button
                    className="
                      group
                      mt-10
                      inline-flex
                      items-center
                      gap-3
                      text-[11px]
                      uppercase
                      tracking-[0.28em]
                      text-white
                    "
                  >
                    View Project

                    <span className="transition-all duration-700 group-hover:translate-x-3">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}