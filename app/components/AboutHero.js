// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import Image from "next/image";
// import gsap from "gsap";

// export default function AboutHero() {
//   const sectionRef    = useRef(null);
//   const contentRef    = useRef(null);
//   const imageWrapRef  = useRef(null);
//   const parallaxRef   = useRef(null);
//   const videoRef      = useRef(null);
//   const overlayRef    = useRef(null);   // full-screen video overlay
//   const videoInnerRef = useRef(null);   // video + vignette wrapper
//   const skipBtnRef    = useRef(null);
//   const videoLabelRef = useRef(null);
//   const floatTweenRef = useRef(null);
//   const isAnimating   = useRef(false);  // guard double-clicks

//   const [videoMounted, setVideoMounted] = useState(false);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE ENTRANCE
//   // ─────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       runEntranceAnimation({ fromVideo: false });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   // ─────────────────────────────────────────────────────────────────────────
//   // CURSOR PARALLAX
//   // ─────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const el = parallaxRef.current;
//     if (!el) return;

//     const onMove = (e) => {
//       const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
//       const ny = (e.clientY / window.innerHeight - 0.5) * 2;
//       gsap.to(el, { x: nx * 14, y: ny * 10, duration: 1.2, ease: "power2.out", overwrite: "auto" });
//     };

//     window.addEventListener("mousemove", onMove);
//     return () => window.removeEventListener("mousemove", onMove);
//   }, []);

//   // ─────────────────────────────────────────────────────────────────────────
//   // HELPERS
//   // ─────────────────────────────────────────────────────────────────────────
//   const startFloat = useCallback(() => {
//     floatTweenRef.current?.kill();
//     floatTweenRef.current = gsap.to(imageWrapRef.current, {
//       y: -20, duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut",
//     });
//   }, []);

//   /** Granular staggered entrance for every hero element */
//   const runEntranceAnimation = useCallback(({ fromVideo = false }) => {
//     const delay = fromVideo ? 0 : 0;
//     const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

//     // Image — slides from right
//     tl.fromTo(imageWrapRef.current,
//       { x: fromVideo ? 0 : 90, opacity: 0, scale: fromVideo ? 1.06 : 1.06, filter: "blur(10px)" },
//       { x: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: fromVideo ? 1.6 : 1.9,
//         ease: "power4.out", onComplete: startFloat },
//       delay
//     );

//     // Stats
//     tl.fromTo(".hero-stat",
//       { y: 44, opacity: 0 },
//       { y: 0, opacity: 1, stagger: 0.12, duration: 1 },
//       fromVideo ? delay + 0.2 : delay + 0.1
//     );

//     // Role
//     tl.fromTo(".hero-role",
//       { y: 22, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
//       fromVideo ? delay + 0.35 : delay + 0.25
//     );

//     // Name lines — clip reveal
//     tl.fromTo(".hero-name-line",
//       { yPercent: 105 },
//       { yPercent: 0, stagger: 0.14, duration: 1.5 },
//       fromVideo ? delay + 0.4 : delay + 0.25
//     );

//     // Divider
//     tl.fromTo(".hero-divider",
//       { scaleX: 0, transformOrigin: "left" },
//       { scaleX: 1, duration: 1.3 },
//       fromVideo ? delay + 0.75 : delay + 0.7
//     );

//     // Copy
//     tl.fromTo(".hero-copy",
//       { y: 34, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
//       fromVideo ? delay + 0.9 : delay + 0.9
//     );

//     // CTA
//     tl.fromTo(".hero-cta",
//       { y: 34, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
//       fromVideo ? delay + 1.05 : delay + 1.05
//     );

//     return tl;
//   }, [startFloat]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PLAY — hero dissolves → video blooms in
//   // ─────────────────────────────────────────────────────────────────────────
//   const handlePlay = useCallback(() => {
//     if (isAnimating.current) return;
//     isAnimating.current = true;

//     floatTweenRef.current?.pause();
//     setVideoMounted(true); // mount DOM so refs exist

//     // Wait one frame for DOM to paint
//     requestAnimationFrame(() => requestAnimationFrame(() => {
//       const tl = gsap.timeline({
//         onComplete: () => {
//           videoRef.current?.play();
//           isAnimating.current = false;
//         },
//       });

//       // ── EXIT: individual elements stagger upward and fade ──
//       tl.to(".hero-stat", {
//         y: -30, opacity: 0, stagger: { each: 0.07, from: "end" },
//         duration: 0.55, ease: "power3.in",
//       }, 0);

//       tl.to(".hero-role", {
//         y: -18, opacity: 0, duration: 0.45, ease: "power3.in",
//       }, 0.05);

//       tl.to(".hero-name-line", {
//         yPercent: -105, stagger: 0.1,
//         duration: 0.7, ease: "power3.in",
//       }, 0.05);

//       tl.to(".hero-divider", {
//         scaleX: 0, transformOrigin: "right",
//         duration: 0.5, ease: "power3.in",
//       }, 0.1);

//       tl.to(".hero-copy", {
//         y: -22, opacity: 0, duration: 0.5, ease: "power3.in",
//       }, 0.15);

//       tl.to(".hero-cta", {
//         y: -22, opacity: 0, duration: 0.5, ease: "power3.in",
//       }, 0.2);

//       // Image — scale + blur out
//       tl.to(imageWrapRef.current, {
//         scale: 1.1, filter: "blur(20px)", opacity: 0,
//         duration: 0.9, ease: "power3.inOut",
//       }, 0.05);

//       // Background brightens before black overlay
//       tl.to(sectionRef.current, {
//         backgroundColor: "#ffffff",
//         duration: 0.7, ease: "power2.inOut",
//       }, 0.3);

//       // ── VIDEO OVERLAY: black fills screen ──
//       tl.fromTo(overlayRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 0.6, ease: "power2.inOut" },
//         0.55
//       );

//       // Video scales from small to full — cinematic bloom
//       tl.fromTo(videoInnerRef.current,
//         { scale: 0.88, opacity: 0, filter: "blur(18px)" },
//         { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "expo.out" },
//         0.75
//       );

//       // Skip + label slide in
//       tl.fromTo(skipBtnRef.current,
//         { opacity: 0, y: -16 },
//         { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
//         1.2
//       );

//       tl.fromTo(videoLabelRef.current,
//         { opacity: 0, y: 16 },
//         { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
//         1.2
//       );
//     }));
//   }, []);

//   // ─────────────────────────────────────────────────────────────────────────
//   // DISMISS — video shrinks → hero reassembles
//   // ─────────────────────────────────────────────────────────────────────────
//   const dismissVideo = useCallback(() => {
//     if (isAnimating.current) return;
//     isAnimating.current = true;

//     videoRef.current?.pause();

//     const tl = gsap.timeline({
//       onComplete: () => {
//         setVideoMounted(false);
//         // Reset bg colour
//         gsap.set(sectionRef.current, { backgroundColor: "#F5F5F3" });
//         isAnimating.current = false;
//         // Full re-entrance
//         runEntranceAnimation({ fromVideo: true });
//       },
//     });

//     // Skip + label fade out
//     tl.to([skipBtnRef.current, videoLabelRef.current], {
//       opacity: 0, duration: 0.35, ease: "power2.in",
//     }, 0);

//     // Video shrinks back to centre
//     tl.to(videoInnerRef.current, {
//       scale: 0.9, opacity: 0, filter: "blur(14px)",
//       duration: 0.75, ease: "power3.in",
//     }, 0.1);

//     // Overlay fades
//     tl.to(overlayRef.current, {
//       opacity: 0, duration: 0.6, ease: "power2.inOut",
//     }, 0.45);

//     // Background softens back
//     tl.to(sectionRef.current, {
//       backgroundColor: "#F5F5F3",
//       duration: 0.8, ease: "power2.out",
//     }, 0.5);
//   }, [runEntranceAnimation]);

//   const handleVideoEnd  = useCallback(() => dismissVideo(), [dismissVideo]);
//   const handleSkip      = useCallback(() => dismissVideo(), [dismissVideo]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <section
//       ref={sectionRef}
//       className="
//         relative overflow-hidden
//         bg-[#F8F8F8]
//         min-h-screen
//         flex items-center
//       "
//       style={{ backgroundColor: "#F8F8F8" }}
//     >
//       {/* BACKGROUND GRADIENT */}
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,transparent_60%)]" />

//       {/* ─── VIDEO OVERLAY ──────────────────────────────────────────────── */}
//       {videoMounted && (
//         <div
//           ref={overlayRef}
//           className="fixed inset-0 z-[999] bg-black"
//           style={{ opacity: 0 }}
//         >
//           {/* VIDEO */}
//           <div ref={videoInnerRef} className="h-full w-full" style={{ opacity: 0 }}>
//             <video
//               ref={videoRef}
//               playsInline
//               onEnded={handleVideoEnd}
//               className="h-full w-full object-cover"
//             >
//               <source src="/team/krishna.mp4" type="video/mp4" />
//             </video>
//           </div>

//           {/* VIGNETTE */}
//           <div className="pointer-events-none absolute inset-0 bg-black/20" />

//           {/* SKIP BUTTON */}
//           <button
//             ref={skipBtnRef}
//             onClick={handleSkip}
//             style={{ opacity: 0 }}
//             className="
//               group absolute right-5 top-5 sm:right-8 sm:top-8
//               overflow-hidden rounded-full
//               border border-white/20 bg-white/10
//               px-5 py-3 backdrop-blur-xl
//               text-[10px] sm:text-[11px]
//               uppercase tracking-[0.3em] text-white
//               transition-all duration-500
//               hover:bg-white hover:text-black
//             "
//           >
//             <span className="flex items-center gap-3">
//               Skip Intro
//               <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
//             </span>
//           </button>

//           {/* VIDEO LABEL */}
//           <div
//             ref={videoLabelRef}
//             style={{ opacity: 0 }}
//             className="
//               absolute bottom-5 left-5 sm:bottom-8 sm:left-8
//               text-[10px] sm:text-[11px]
//               uppercase tracking-[0.35em] text-white/60
//             "
//           >
//             Krishna S — Introduction
//           </div>
//         </div>
//       )}

//       {/* ─── MAIN CONTENT ───────────────────────────────────────────────── */}
//       <div
//         className="
//           relative z-10
//           mx-auto w-full max-w-[1800px]
//           px-5 sm:px-6 md:px-10 lg:px-16
//           pt-28 sm:pt-32 lg:pt-20
//         "
//       >
//         <div
//           className="
//             grid items-center
//             gap-12 md:gap-16 lg:gap-20
//             lg:grid-cols-[0.95fr_1.05fr]
//           "
//         >
//           {/* LEFT */}
//           <div ref={contentRef} className="order-2 lg:order-1 max-w-[760px]">

//             {/* STATS */}
//             <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
//               <div className="hero-stat">
//                 <div className="text-[42px] sm:text-[52px] leading-none tracking-[-0.05em] font-light text-black">
//                   +3
//                 </div>
//                 <p className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-neutral-500">
//                   Years Experience
//                 </p>
//               </div>
//               <div className="hero-stat">
//                 <div className="text-[42px] sm:text-[52px] leading-none tracking-[-0.05em] font-light text-black">
//                   +50
//                 </div>
//                 <p className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-neutral-500">
//                   Projects Built
//                 </p>
//               </div>
//             </div>

//             {/* ROLE */}
//             <div className="hero-role mt-10 sm:mt-12 text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-neutral-500">
//               Full Stack Developer
//             </div>

//             {/* NAME */}
//             <div className="mt-6 sm:mt-8">
//               <div className="overflow-hidden">
//                 <h1 className="
//                   hero-name-line
//                   text-[72px] xs:text-[86px] sm:text-[110px]
//                   md:text-[140px] lg:text-[170px] xl:text-[200px]
//                   leading-[0.82] tracking-[-0.09em] font-light text-black
//                 ">
//                   Krishna
//                 </h1>
//               </div>
//               <div className="overflow-hidden">
//                 <h1 className="
//                   hero-name-line
//                   text-[72px] xs:text-[86px] sm:text-[110px]
//                   md:text-[140px] lg:text-[170px] xl:text-[200px]
//                   leading-[0.82] tracking-[-0.09em] font-light text-black
//                 ">
//                   S
//                 </h1>
//               </div>
//             </div>

//             {/* DIVIDER */}
//             <div className="hero-divider mt-6 sm:mt-8 h-px w-24 bg-black/20" />

//             {/* COPY */}
//             <div className="hero-copy mt-8 sm:mt-10 max-w-[580px]">
//               <p className="text-[16px] sm:text-[18px] leading-[1.9] text-neutral-600">
//                 I'm Krishna S, a Full Stack Developer with 3 years of experience
//                 building scalable web applications, immersive frontend experiences
//                 and premium digital products using modern technologies.
//               </p>
//             </div>

//             {/* CTA */}
//             <div className="hero-cta mt-10 sm:mt-12 flex flex-wrap items-center gap-5">
//               <button
//                 onClick={handlePlay}
//                 className="
//                   group relative overflow-hidden
//                   rounded-full bg-black
//                   px-8 py-4
//                   text-[11px] uppercase tracking-[0.28em] text-white
//                   transition-all duration-700 hover:scale-[1.03]
//                 "
//               >
//                 <span className="relative z-10 flex items-center gap-3">
//                   Play Introduction
//                   <span className="transition-transform duration-700 group-hover:translate-x-1">▶</span>
//                 </span>
//                 {/* Fill sweep */}
//                 <div className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-700 group-hover:scale-x-100" />
//                 {/* Hover label */}
//                 <span className="
//                   absolute inset-0 z-20 flex items-center justify-center
//                   opacity-0 transition-opacity duration-700 group-hover:opacity-100 text-black
//                 ">
//                   PLAY INTRODUCTION ▶
//                 </span>
//               </button>

//               <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-neutral-500">
//                 Based In India
//               </span>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div
//             ref={imageWrapRef}
//             className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
//           >
//             <div
//               ref={parallaxRef}
//               className="
//                 relative
//                 w-[300px] sm:w-[380px] md:w-[480px]
//                 lg:w-[560px] xl:w-[700px]
//                 aspect-[0.85]
//               "
//             >
//               {/* SOFT LIGHT */}
//               <div className="
//                 absolute inset-0 rounded-[40px]
//                 bg-gradient-to-tr from-white/80 via-white/20 to-transparent
//                 blur-3xl scale-110
//               " />

//               {/* IMAGE */}
//               <div className="relative h-full w-full overflow-hidden rounded-[28px]">
//                 <Image
//                   src="/team/krishna.png"
//                   alt="Krishna S"
//                   fill
//                   priority
//                   className="object-contain object-bottom"
//                 />
//               </div>

//               {/* FLOATING GLASS PILL */}
//               <div className="
//                 absolute bottom-4 left-1/2 -translate-x-1/2
//                 rounded-full border border-white/40 bg-white/50
//                 px-5 py-3 backdrop-blur-xl
//                 text-[10px] sm:text-[11px]
//                 uppercase tracking-[0.3em] text-black/70
//                 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
//               ">
//                 Crafting Premium Experiences
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageWrapRef = useRef(null);
  const parallaxRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const videoInnerRef = useRef(null);
  const skipBtnRef = useRef(null);
  const videoLabelRef = useRef(null);
  const cursorRef = useRef(null);
  const marqueeRef = useRef(null);
  const linesRef = useRef([]);
  const floatTweenRef = useRef(null);

  const [videoMounted, setVideoMounted] = useState(false);

  // ─────────────────────────────────────────
  // PREMIUM ENTRANCE
  // ─────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-stat", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
      });

      tl.from(
        ".hero-role",
        {
          y: 20,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      );

      tl.from(
        ".hero-name-line",
        {
          yPercent: 110,
          stagger: 0.12,
          duration: 1.4,
        },
        "-=0.8"
      );

      tl.from(
        ".hero-divider",
        {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
        },
        "-=1"
      );

      tl.from(
        ".hero-copy",
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      );

      tl.from(
        ".hero-cta",
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      );

      tl.from(
        imageWrapRef.current,
        {
          x: 120,
          opacity: 0,
          scale: 1.1,
          rotate: 2,
          filter: "blur(10px)",
          duration: 1.8,
        },
        0
      );

      // floating image
      floatTweenRef.current = gsap.to(imageWrapRef.current, {
        y: -18,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // animated background lines
      gsap.to(linesRef.current, {
        yPercent: -100,
        repeat: -1,
        duration: 14,
        stagger: 1.2,
        ease: "none",
      });

      // marquee
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────
  // PREMIUM CURSOR
  // ─────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: "power3.out",
      });

      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(parallaxRef.current, {
        x: x * 16,
        y: y * 10,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // ─────────────────────────────────────────
  // PLAY VIDEO
  // ─────────────────────────────────────────
  const handlePlay = useCallback(() => {
    setVideoMounted(true);

    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          videoRef.current?.play();
        },
      });

      tl.to(".hero-hide", {
        opacity: 0,
        y: -40,
        stagger: 0.05,
        duration: 0.7,
        ease: "power3.inOut",
      });

      tl.to(
        imageWrapRef.current,
        {
          scale: 1.08,
          opacity: 0,
          filter: "blur(20px)",
          duration: 1,
          ease: "power4.inOut",
        },
        0
      );

      tl.fromTo(
        overlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.7,
        },
        0.4
      );

      tl.fromTo(
        videoInnerRef.current,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        0.5
      );

      tl.fromTo(
        [skipBtnRef.current, videoLabelRef.current],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
        },
        1
      );
    });
  }, []);

  // ─────────────────────────────────────────
  // DISMISS VIDEO
  // ─────────────────────────────────────────
  const dismissVideo = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVideoMounted(false);

        gsap.to(".hero-hide", {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: "power4.out",
        });

        gsap.to(imageWrapRef.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
        });
      },
    });

    tl.to([skipBtnRef.current, videoLabelRef.current], {
      opacity: 0,
      duration: 0.3,
    });

    tl.to(
      videoInnerRef.current,
      {
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        ease: "power4.inOut",
      },
      0
    );

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.7,
      },
      0.2
    );
  }, []);

  // ─────────────────────────────────────────
  // VIDEO ENDED
  // ─────────────────────────────────────────
  const handleVideoEnd = useCallback(() => {
    dismissVideo();
  }, [dismissVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#FBFBFBFB]"
    >
      {/* PREMIUM CURSOR */}
      <div
        ref={cursorRef}
        className="
          pointer-events-none fixed left-0 top-0 z-[9999]
          h-5 w-5 rounded-full
          border border-black/20
          backdrop-blur-md
          bg-black/10
          mix-blend-difference
        "
      />

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* ANIMATED LINES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            className="absolute top-0 h-[200%] w-px bg-black/5"
            style={{
              left: `${15 + i * 14}%`,
            }}
          />
        ))}
      </div>

      {/* LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,transparent_60%)]" />

      {/* VIDEO */}
      {videoMounted && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[999] bg-black"
          style={{ opacity: 0 }}
        >
          <div
            ref={videoInnerRef}
            className="h-full w-full"
            style={{ opacity: 0 }}
          >
            <video
              ref={videoRef}
              playsInline
              onEnded={handleVideoEnd}
              className="h-full w-full object-cover"
            >
              <source src="/team/krishna.mp4" type="video/mp4" />
            </video>
          </div>

          {/* SKIP */}
          <button
            ref={skipBtnRef}
            onClick={dismissVideo}
            style={{ opacity: 0 }}
            className="
              absolute right-5 top-5 z-50
              rounded-full border border-white/20
              bg-white/10 backdrop-blur-xl
              px-6 py-3
              text-[11px]
              uppercase tracking-[0.3em]
              text-white
              transition-all duration-500
              hover:bg-white hover:text-black
            "
          >
            Skip Intro →
          </button>

          {/* LABEL */}
          <div
            ref={videoLabelRef}
            style={{ opacity: 0 }}
            className="
              absolute bottom-6 left-6
              text-[11px]
              uppercase tracking-[0.35em]
              text-white/60
            "
          >
            Krishna S — Introduction
          </div>
        </div>
      )}

      {/* MAIN */}
      <div
        className="
          relative z-10
          mx-auto
          flex min-h-screen
          max-w-[1800px]
          items-center
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          pt-28
          pb-16
        "
      >
        <div
          className="
            grid w-full items-center
            gap-16 lg:grid-cols-[0.95fr_1.05fr]
          "
        >
          {/* LEFT */}
          <div className="max-w-[760px]">
            {/* ROLE */}
            <div className="hero-role hero-hide mb-10">
              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.45em]
                  text-neutral-500
                "
              >
                Full Stack Developer
              </span>
            </div>

            {/* STATS */}
            <div className="hero-hide flex flex-wrap gap-x-14 gap-y-6">
              <div className="hero-stat">
                <h3 className="text-[42px] sm:text-[52px] leading-none tracking-[-0.05em]">
                  +3
                </h3>

                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                  Years Experience
                </p>
              </div>

              <div className="hero-stat">
                <h3 className="text-[42px] sm:text-[52px] leading-none tracking-[-0.05em]">
                  +50
                </h3>

                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                  Projects Built
                </p>
              </div>
            </div>

            {/* NAME */}
            <div className="mt-10 sm:mt-12">
              <div className="overflow-hidden">
                <h1
                  className="
                    hero-name-line hero-hide
                    text-[78px]
                    sm:text-[120px]
                    md:text-[150px]
                    lg:text-[180px]
                    xl:text-[200px]
                    leading-[0.82]
                    tracking-[-0.1em]
                    font-light
                    text-black
                  "
                >
                  Krishna S
                </h1>
              </div>

              {/* <div className="overflow-hidden">
                <h1
                  className="
                    hero-name-line hero-hide
                    text-[78px]
                    sm:text-[120px]
                    md:text-[150px]
                    lg:text-[180px]
                    xl:text-[220px]
                    leading-[0.82]
                    tracking-[-0.1em]
                    font-light
                    text-black
                  "
                >
                  S
                </h1>
              </div> */}
            </div>

            {/* DIVIDER */}
            <div className="hero-divider hero-hide mt-8 h-px w-24 bg-black/20" />

            {/* COPY */}
            <div className="hero-copy hero-hide mt-10 max-w-[600px]">
              <p className="text-[16px] sm:text-[18px] leading-[2] text-neutral-600">
                I’m Krishna S, a Full Stack Developer with 3 years of
                experience building immersive digital experiences, scalable web
                applications and premium frontend interactions using modern
                technologies.
              </p>
            </div>

            {/* CTA */}
            <div className="hero-cta hero-hide mt-12 flex flex-wrap items-center gap-6">
              <button
                onClick={handlePlay}
                className="
                  group relative overflow-hidden rounded-full
                  bg-black px-9 py-4
                  text-[11px]
                  uppercase tracking-[0.28em]
                  text-white
                "
              >
                <span className="relative z-10 flex items-center gap-3">
                  Play Introduction
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    ▶
                  </span>
                </span>

                <div
                  className="
                    absolute inset-0
                    origin-left scale-x-0
                    bg-white
                    transition-transform duration-700
                    group-hover:scale-x-100
                  "
                />

                <span
                  className="
                    absolute inset-0 z-20
                    flex items-center justify-center
                    opacity-0
                    transition-opacity duration-700
                    group-hover:opacity-100
                    text-black
                  "
                >
                  PLAY INTRODUCTION ▶
                </span>
              </button>

              <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500">
                Based In India
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div
            ref={imageWrapRef}
            className="
              relative flex justify-center lg:justify-end
            "
          >
            <div
              ref={parallaxRef}
              className="
                relative
                w-[320px]
                sm:w-[420px]
                md:w-[520px]
                lg:w-[620px]
                xl:w-[760px]
                aspect-[0.82]
              "
            >
              {/* GLOW */}
              <div
                className="
                  absolute inset-0
                  scale-110
                  rounded-[60px]
                  bg-gradient-to-tr
                  from-white/90
                  via-white/20
                  to-transparent
                  blur-3xl
                "
              />

              {/* IMAGE */}
              <div
                className="
                  relative h-full w-full
                  overflow-hidden
                  rounded-[40px]
                "
              >
                <Image
                  src="/team/krishna.png"
                  alt="Krishna S"
                  fill
                  priority
                  className="
                    object-contain
                    object-bottom
                    grayscale-[0.08]
                    contrast-[1.03]
                    mix-blend-multiply opacity-90
                  "
                />
              </div>

              {/* GLASS CARD */}
              <div
                className="
                  absolute bottom-6 left-1/2
                  -translate-x-1/2

                  rounded-full
                  border border-white/30
                  bg-white/40
                  px-6 py-4
                  backdrop-blur-xl

                  text-[10px]
                  uppercase tracking-[0.32em]
                  text-black/70

                  shadow-[0_8px_40px_rgba(0,0,0,0.08)]
                "
              >
                Crafting Premium Experiences
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div
        className="
          absolute bottom-0 left-0
          w-full overflow-hidden
          border-t border-black/10
          bg-white/40 backdrop-blur-xl
        "
      >
        <div
          ref={marqueeRef}
          className="
            flex w-[200%]
            gap-16 py-5
          "
        >
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="
                flex min-w-max items-center gap-16
                text-[11px]
                uppercase tracking-[0.4em]
                text-black/60
              "
            >
              <span>Full Stack Developer</span>
              <span>React</span>
              <span>Next.js</span>
              <span>GSAP</span>
              <span>Tailwind CSS</span>
              <span>Premium UI/UX</span>
              <span>Frontend Interactions</span>
              <span>Immersive Experiences</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}