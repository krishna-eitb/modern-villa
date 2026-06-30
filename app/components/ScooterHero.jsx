"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * HeroMoped — pixel-accurate recreation of the "Skot." electric moped hero section.
 *
 * Stack: Next.js + Tailwind CSS + GSAP
 * Note: Navbar intentionally excluded per spec — drop this directly below your own nav.
 *
 * v3 fixes (matching the Figma reference exactly):
 *  - Removed the stray floating gray box near the DB50QT card. It was a second SVG cutout
 *    left over from an earlier pass, positioned for a different layout pass and never
 *    aligned to the actual thumbnail card position. The Figma design doesn't cut a hole
 *    there at all — the DB50QT card is just a white, shadowed card floating on top of the
 *    blob, so the cutout is deleted entirely.
 *  - The blob now runs the FULL height of the stage (not stopping ~71% down), with a single
 *    notch on the bottom-left that's open to the card's own left/bottom edge — this is what
 *    produces that one rounded "step" shape behind the C45 text panel in the Figma file.
 *  - The pagination "slider" is restyled to match Figma exactly: in the reference only ONE
 *    dot reads as visible at a time. Previously all 3 dots were equally bright and stacked
 *    with visible gaps, which looked like decoration, not a control. Inactive dots are now
 *    barely-there (low opacity, smaller), so by default it looks identical to Figma's single
 *    dot — but it's still a real, working, keyboard-accessible slider underneath.
 *  - Scooter image wrapper now anchors to the bottom and scales slightly larger by default,
 *    since transparent PNG padding varies a lot between assets — see the README note on
 *    trimming your source PNGs for a perfect match.
 */

// Swap these with your real assets. Each slide = one moped variant shown by the dots.
const slides = [
  {
    id: "c45",
    name: "C45",
    subtitle: "Classic Model",
    description: (
      <>
        Officially the UK&apos;s No.1 selling moped.{" "}
        <span className="underline">This 50cc</span> Panther moped is agile
        and ready to strike.
      </>
    ),
    image: "/white.png",
  },
  {
    id: "db50qt",
    name: "DB50QT",
    subtitle: "Panther Moped",
    description: (
      <>
        A nimble city runabout with a punchy{" "}
        <span className="underline">50cc</span> motor, built for quick
        starts and tight corners.
      </>
    ),
    image: "/skyblue.png",
  },
  {
    id: "x2",
    name: "X2 Sport",
    subtitle: "Performance Edition",
    description: (
      <>
        Track-tuned suspension and a{" "}
        <span className="underline">torquey</span> motor for riders who
        want more bite.
      </>
    ),
    image: "/lime.png",
  },
];

const thumbScooterSrc = "/lime.png";
const avatar1 = "/man.png";
const avatar2 = "/boy.png";
const avatar3 = "/woman.png";

export default function HeroMoped() {
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const reviewsRef = useRef(null);
  const blobRef = useRef(null);
  const scooterRef = useRef(null);
  const scooterImgRef = useRef(null);
  const infoRef = useRef(null);
  const thumbRef = useRef(null);
  const dotsRef = useRef([]);

  const isAnimating = useRef(false);

  // ---------- Mount-in entrance ----------
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          headingRef.current,
          reviewsRef.current,
          blobRef.current,
          infoRef.current,
          thumbRef.current,
        ],
        { opacity: 0 }
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        blobRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.9 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.15
        )
        .fromTo(
          reviewsRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.35
        )
        .fromTo(
          scooterRef.current,
          { opacity: 0, x: 60, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power2.out" },
          0.25
        )
        .fromTo(
          infoRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.55
        )
        .fromTo(
          thumbRef.current,
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.6 },
          0.7
        );

      const avatars = reviewsRef.current?.querySelectorAll("[data-avatar]");
      if (avatars?.length) {
        gsap.fromTo(
          avatars,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "back.out(2)",
            delay: 0.45,
          }
        );
      }

      // idle float loop for the scooter
      gsap.to(scooterImgRef.current, {
        y: "+=8",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // ---------- Dot active-state visuals ----------
  useEffect(() => {
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      const isActive = i === activeIndex;
      gsap.to(dot, {
        scale: isActive ? 1 : 0.55,
        opacity: isActive ? 1 : 0.28,
        backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
        duration: 0.35,
        ease: "power2.out",
      });
    });
  }, [activeIndex]);

  const goToSlide = (index) => {
    if (index === activeIndex || isAnimating.current) return;
    isAnimating.current = true;
    const direction = index > activeIndex ? 1 : -1;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    tl.to(scooterImgRef.current, {
      opacity: 0,
      x: 40 * direction,
      scale: 0.96,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(infoRef.current, { opacity: 0, y: 10, duration: 0.25 }, 0)
      .add(() => setActiveIndex(index))
      .set(scooterImgRef.current, { x: -40 * direction, scale: 0.96 })
      .to(scooterImgRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      })
      .to(
        infoRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "<0.05"
      );
  };

  const goNext = () => goToSlide((activeIndex + 1) % slides.length);
  const goPrev = () =>
    goToSlide((activeIndex - 1 + slides.length) % slides.length);

  const active = slides[activeIndex];

  return (
    <section ref={rootRef} className="w-full bg-[#9a9c9f] px-[3.33%] py-[1.66%]">
      {/* Aspect-locked stage so every absolute child scales perfectly at any width */}
      <div
        className="relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-[4%]"
        style={{ aspectRatio: "1080 / 716", containerType: "inline-size" }}
      >
        {/* ---------- Background: light card + darker blob with a single open notch ---------- */}
        <svg
          ref={blobRef}
          viewBox="0 0 1080 716"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          {/* outer card — the light sliver you see at the rounded edges */}
          <rect x="0" y="0" width="1080" height="716" rx="30" fill="#eaeaea" />
          {/* inner blob — single evenodd-cut notch, open at the card's own left/bottom edge */}
          <path
            d="M73,0 L700,0 C730,0 718,52 763,52 C808,52 796,0 818,0 L1052,0
               A14,14 0 0 1 1066,14 L1066,702 A14,14 0 0 1 1052,716
               L18,716 L18,55 A55,55 0 0 1 73,0 Z

               M58,248 L150,248 A60,60 0 0 1 210,308
               L210,716 L18,716 L18,288 A40,40 0 0 1 58,248 Z"
            fill="#cdced0"
            fillRule="evenodd"
          />
        </svg>

        {/* ---------- Heading ---------- */}
        <div ref={headingRef} className="absolute left-[3.15%] top-[7.8%] w-[58%]">
          <h1 className="font-sans font-semibold tracking-tight text-[#2b2b2b] leading-[0.98] text-[clamp(28px,5.4cqw,62px)]">
            <span className="inline-flex items-center gap-3">
              Super fast
              <span className="text-[clamp(20px,3.6cqw,40px)]" role="img" aria-label="planet">
                🪐
              </span>
            </span>
            <br />
            <span className="inline-flex items-center gap-3">
              electric Moped
              <span className="text-[clamp(20px,3.6cqw,40px)]" role="img" aria-label="lightning">
                ⚡
              </span>
            </span>
          </h1>
        </div>

        {/* ---------- Reviews widget (top right) ---------- */}
        <div ref={reviewsRef} className="absolute right-[3.7%] top-[8.6%] w-[18%] min-w-[150px]">
          <div className="flex items-center">
            <div className="flex -space-x-3">
              <img data-avatar src={avatar1} alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#eaeaea] object-cover" />
              <img data-avatar src={avatar2} alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#eaeaea] object-cover" />
              <img data-avatar src={avatar3} alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#eaeaea] object-cover" />
            </div>
            <div data-avatar className="-ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base font-medium text-[#3a3a3a] shadow-sm">
              +
            </div>
          </div>

          <p className="mt-2 text-[clamp(11px,1.2cqw,13px)] leading-snug text-[#5d5d5b]">
            10k+ positive reviews we
            <br />
            achieved{" "}
            <span className="tracking-tight text-[#e0a23c]" aria-hidden>
              ★★★★
            </span>
          </p>
        </div>

        {/* ---------- Main scooter image (slide content) ---------- */}
        <div
          ref={scooterRef}
          className="absolute left-[16%] top-[4%] z-10 h-[88%] w-[70%]"
        >
          <img
            ref={scooterImgRef}
            key={active.id}
            src={active.image}
            alt={`${active.name} electric moped`}
            className="h-full w-full origin-bottom select-none object-contain object-bottom drop-shadow-2xl"
            draggable={false}
          />
        </div>

        {/* ---------- Working pagination dot slider (reads as ONE dot, like Figma) ---------- */}
        <div
          role="tablist"
          aria-label="Moped variants"
          className="absolute left-[18.1%] top-[57.4%] z-20 flex items-center gap-1.5"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              ref={(el) => (dotsRef.current[i] = el)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show ${slide.name}`}
              onClick={() => goToSlide(i)}
              className="h-2.5 w-2.5 rounded-full border border-white/80 bg-white outline-none focus-visible:ring-2 focus-visible:ring-white"
            />
          ))}
        </div>

        {/* invisible prev/next hit-areas over the scooter for swipe-like clicking (optional, no visual) */}
        <button
          aria-label="Previous moped"
          onClick={goPrev}
          className="absolute left-[16%] top-[4%] z-10 h-[88%] w-[10%] cursor-w-resize opacity-0"
        />
        <button
          aria-label="Next moped"
          onClick={goNext}
          className="absolute left-[76%] top-[4%] z-10 h-[88%] w-[10%] cursor-e-resize opacity-0"
        />

        {/* ---------- Info block (bottom left, slide content) ---------- */}
        <div ref={infoRef} className="absolute left-[3%] top-[62.7%] z-20 w-[16%] min-w-[150px]">
          <h2 className="text-[clamp(22px,3.3cqw,36px)] font-semibold leading-none text-[#2b2b2b]">
            {active.name}
          </h2>
          <p className="mt-2 text-[clamp(10px,1.2cqw,13px)] text-[#8a8a88]">
            {active.subtitle}
          </p>
          <p className="mt-3 text-[clamp(10.5px,1.25cqw,13.5px)] leading-[1.5] text-[#3c3c3a]">
            {active.description}
          </p>
        </div>

        {/* ---------- Red circular CTA button ---------- */}
        <button
          type="button"
          aria-label={`Explore ${active.name} model`}
          className="group absolute left-[19.5%] top-[77%] z-20 flex h-[5.4%] w-[5.4%] min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#e3676a] shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ---------- DB50QT thumbnail card (bottom right) — floats with its own shadow, no SVG cutout needed ---------- */}
        <div ref={thumbRef} className="absolute left-[81%] top-[62.6%] z-20 flex h-[12.85%] w-[14.9%] min-w-[160px] items-center gap-3 rounded-2xl bg-white px-3 shadow-lg">
          <div className="flex h-[78%] w-[40%] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eceded]">
            <img src={thumbScooterSrc} alt="DB50QT Panther Moped" className="h-full w-full object-contain" draggable={false} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[clamp(12px,1.4cqw,15px)] font-semibold text-[#2b2b2b]">DB50QT</p>
            <p className="truncate text-[clamp(10px,1.1cqw,12px)] text-[#8a8a88]">Panther Moped</p>
          </div>
        </div>
      </div>
    </section>
  );
}