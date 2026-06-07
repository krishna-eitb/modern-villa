"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const members = [
  {
    name: "Krishna S",
    role: "Frontend Engineer",
    image: "/team/alex.png",
    profile: "/team/alex-profile.png",
    video: "/team/alex-hover.webm",
    accent: "#f59e0b",
    years: "06+",
    projects: "80+",
    about:
      "Engineering immersive interfaces powered by cinematic motion systems, luxury interaction systems and storytelling driven experiences.",
  },
  {
    name: "Emma Stone",
    role: "Creative Director",
    image: "/team/emma.png",
    profile: "/team/emma-profile.png",
    video: "/team/emma-hover.webm",
    accent: "#8b5cf6",
    years: "10+",
    projects: "140+",
    about:
      "Crafting emotionally driven digital experiences with premium editorial composition and cinematic UI direction.",
  },
  {
    name: "Sara Wilson",
    role: "Motion Designer",
    image: "/team/sara.png",
    profile: "/team/sara-profile.png",
    video: "/team/sara-hover.webm",
    accent: "#ec4899",
    years: "07+",
    projects: "95+",
    about:
      "Creating cinematic motion systems and fluid interaction choreography for modern luxury brands.",
  },
  {
    name: "Prince Mathews",
    role: "3D Artist",
    image: "/team/prince.png",
    profile: "/team/prince-profile.png",
    video: "/team/prince-hover.webm",
    accent: "#06b6d4",
    years: "08+",
    projects: "120+",
    about:
      "Designing stylized 3D worlds and immersive visual systems blending realism with emotion.",
  },
];

// ─────────────────────────────────────────────────────────────
// MODAL — self-contained with enter / exit GSAP animations
// ─────────────────────────────────────────────────────────────
function ProfileModal({ member, onClose }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);
  const imgColRef  = useRef(null);
  const contentRef = useRef(null);

  // ── mount: animate in ──────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Lock body scroll
    document.body.style.overflow = "hidden";

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45 },
    )
      .fromTo(
        panelRef.current,
        { y: 60, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.65 },
        "-=0.2",
      )
      .fromTo(
        imgColRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        "-=0.4",
      )
      .fromTo(
        ".modal-content-item",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
        "-=0.5",
      );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── close: animate out then call onClose ───────────────────
  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });

    tl.to(panelRef.current, {
      y: 40,
      scale: 0.97,
      opacity: 0,
      duration: 0.35,
      ease: "power3.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.25, ease: "power2.in" },
      "-=0.15",
    );
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdrop}
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-white/10 backdrop-blur-lg
        p-4 md:p-8
      "
      style={{ opacity: 0 }} // GSAP starts from 0
    >
      <div
        ref={panelRef}
        className="
          relative w-full max-w-[1440px]
          overflow-hidden rounded-[36px] md:rounded-[44px]
          border border-white/10
          bg-white backdrop-blur-xl
          grid lg:grid-cols-[0.85fr_1fr]
        "
        style={{ opacity: 0 }} // GSAP starts from 0
      >
        {/* ── CLOSE BUTTON ─────────────────────────────────── */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="
            absolute right-5 top-5 z-50
            flex h-11 w-11 items-center justify-center
            rounded-full border border-black/40
            bg-white/10 text-black
            hover:bg-white/20 hover:text-white
            transition-all duration-300
            backdrop-blur-xl text-lg
          "
        >
          ✕
        </button>

        {/* ── LEFT — image column ───────────────────────────── */}
        <div
          ref={imgColRef}
          className="relative h-[300px] lg:h-[88vh] overflow-hidden"
          style={{ opacity: 0 }} // GSAP starts from 0
        >
          <img
            src={member.profile}
            alt={member.name}
            className="h-full w-full object-cover object-top"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* accent side-bar */}
          <div
            className="absolute left-0 inset-y-0 w-[3px]"
            style={{ background: member.accent }}
          />

          {/* name watermark bottom-left */}
          <div className="absolute bottom-8 left-8 hidden lg:block">
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: member.accent }}
            >
              {member.role}
            </span>
            <p className="mt-1 text-3xl font-light tracking-tight text-white">
              {member.name}
            </p>
          </div>
        </div>

        {/* ── RIGHT — content ──────────────────────────────── */}
        <div
          ref={contentRef}
          className="flex items-center overflow-y-auto p-8 md:p-12 lg:p-20"
        >
          <div className="w-full">

            {/* role */}
            <span
              className="modal-content-item block text-[11px] uppercase tracking-[0.38em]"
              style={{ color: member.accent }}
            >
              {member.role}
            </span>

            {/* name */}
            <h2 className="modal-content-item mt-5 text-[52px] text-black md:text-[80px] lg:text-[96px] leading-[0.88] tracking-[-0.06em]  font-light">
              {member.name}
            </h2>

            {/* divider */}
            <div
              className="modal-content-item mt-8 h-px w-16"
              style={{ background: member.accent }}
            />

            {/* about */}
            <p className="modal-content-item mt-8 max-w-[560px] text-base md:text-lg leading-relaxed text-black">
              {member.about}
            </p>

            {/* STATS */}
            <div className="modal-content-item mt-14 grid grid-cols-2 gap-8 border-t border-black/8 pt-10">
              <div>
                <div
                  className="text-[52px] md:text-[68px] leading-none font-light"
                  style={{ color: member.accent }}
                >
                  {member.years}
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-black/60">
                  Years Experience
                </p>
              </div>

              <div>
                <div
                  className="text-[52px] md:text-[68px] leading-none font-light"
                  style={{ color: member.accent }}
                >
                  {member.projects}
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-black/60">
                  Projects Delivered
                </p>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="modal-content-item mt-14 flex flex-wrap gap-4">
              <button
                className="
                  rounded-full  px-8 py-4
                  text-lg font-medium text-white
                  hover:bg-white/90 active:scale-95
                  transition-all duration-300
                "style={{ backgroundColor: member.accent }}
              >
                Schedule Meeting
              </button>

              <button
                className="
                  rounded-full border
                  bg-white/5 px-8 py-4
                  text-lg text-white/80
                  hover:bg-white/10 hover:text-white
                  active:scale-95
                  transition-all duration-300
                "
                style={{ color: member.accent }}
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────
export default function PremiumTeamSection() {
  const [active, setActive]       = useState(0);
  const [locked, setLocked]       = useState(false);
  const [modalMember, setModalMember] = useState(null); // null = closed

  const sectionRef   = useRef(null);
  const spotlightRef = useRef(null);
  const cardRef      = useRef(null);

  const videoStateRef = useRef({
    playing: new Set(),
    pending: new Map(),
  });

  const imgRefs = useRef({});
  const vidRefs = useRef({});

  const setImgRef = useCallback((index) => (el) => { imgRefs.current[index] = el; }, []);
  const setVidRef = useCallback((index) => (el) => { vidRefs.current[index] = el; }, []);

  const FADE_IN_DUR  = 0.65;
  const FADE_OUT_DUR = 0.55;

  // ── INTRO ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-tag",  { y: 20, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".team-line", { yPercent: 120, stagger: 0.12, duration: 1.4, ease: "power4.out" });
      gsap.from(".team-copy", { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".team-character", { y: 120, opacity: 0, stagger: 0.12, duration: 1.8, ease: "power4.out" });
      gsap.to(".team-character", {
        y: 14, repeat: -1, yoyo: true, duration: 3, stagger: 0.25, ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── SPOTLIGHT ────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;
    gsap.to(spotlightRef.current, {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      duration: 0.9,
      ease: "power3.out",
    });
  }, []);

  // ── CROSS-FADE helpers ───────────────────────────────────
  const crossFadeIn = useCallback((index) => {
    const img   = imgRefs.current[index];
    const video = vidRefs.current[index];
    if (!img || !video) return;
    gsap.killTweensOf([img, video]);
    gsap.timeline()
      .to(img,   { opacity: 0, duration: FADE_IN_DUR,  ease: "power2.inOut" }, 0)
      .to(video, { opacity: 1, duration: FADE_IN_DUR,  ease: "power2.inOut" }, 0);
  }, []);

  const crossFadeOut = useCallback((index) => {
    const img   = imgRefs.current[index];
    const video = vidRefs.current[index];
    if (!img || !video) return;
    gsap.killTweensOf([img, video]);
    gsap.timeline()
      .to(video, { opacity: 0, duration: FADE_OUT_DUR, ease: "power2.inOut" }, 0)
      .to(img,   { opacity: 1, duration: FADE_OUT_DUR, ease: "power2.inOut" }, 0);
  }, []);

  // ── VIDEO: safeStop ──────────────────────────────────────
  const safeStop = useCallback(async (index) => {
    const { playing, pending } = videoStateRef.current;
    const video = vidRefs.current[index];
    if (!video) return;

    if (pending.has(index)) {
      try { await pending.get(index); } catch {}
      pending.delete(index);
    }
    if (!video.paused) video.pause();
    video.currentTime = 0;
    playing.delete(index);
    crossFadeOut(index);
  }, [crossFadeOut]);

  // ── VIDEO: safePlay ──────────────────────────────────────
  const safePlay = useCallback(async (index) => {
    const { playing, pending } = videoStateRef.current;
    const video = vidRefs.current[index];
    if (!video) return;

    const stopPromises = members
      .map((_, i) => i)
      .filter((i) => i !== index && (playing.has(i) || pending.has(i)))
      .map((i) => safeStop(i));
    await Promise.allSettled(stopPromises);

    if (playing.has(index)) return;

    video.currentTime = 0;
    const playPromise = video.play();
    pending.set(index, playPromise ?? Promise.resolve());

    try {
      await playPromise;
      pending.delete(index);
      playing.add(index);
      crossFadeIn(index);
    } catch (err) {
      pending.delete(index);
      playing.delete(index);
      if (err?.name !== "AbortError") console.warn(`Video ${index} play error:`, err);
    }
  }, [safeStop, crossFadeIn]);

  const resetVideos = useCallback(() => {
    Promise.allSettled(members.map((_, i) => safeStop(i)));
  }, [safeStop]);

  // ── CARD SHUFFLE ─────────────────────────────────────────
  const shuffleCard = useCallback((index) => {
    gsap.timeline({
      onComplete: () => {
        setActive(index);
        gsap.fromTo(
          cardRef.current,
          { x: 180, y: 40, rotateZ: 8, rotateY: 12, scale: 1.08, opacity: 0, filter: "blur(14px)" },
          { x: 0, y: 0, rotateZ: 0, rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
        );
        gsap.fromTo(
          ".light-sweep",
          { xPercent: -180, opacity: 0 },
          { xPercent: 220, opacity: 1, duration: 1.8, ease: "power2.out" },
        );
      },
    }).to(cardRef.current, {
      x: -160, y: 20, rotateZ: -8, rotateY: -10,
      scale: 0.88, opacity: 0, filter: "blur(14px)",
      duration: 0.45, ease: "power3.in",
    });
  }, []);

  // ── HOVER ────────────────────────────────────────────────
  const handleHover = useCallback((index) => {
    if (locked || index === active) return;
    safePlay(index);
    shuffleCard(index);
    gsap.to(".team-character", {
      scale: 0.82, opacity: 0.16, filter: "blur(4px)", duration: 1, ease: "power4.out",
    });
    gsap.to(`.character-${index}`, {
      scale: 1.14, opacity: 1, y: -28, filter: "blur(0px)", duration: 1, ease: "power4.out", zIndex: 20,
    });
  }, [locked, active, safePlay, shuffleCard]);

  // ── RESET ────────────────────────────────────────────────
  const resetCharacters = useCallback(() => {
    if (locked) return;
    resetVideos();
    gsap.to(".team-character", {
      scale: 1, opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power4.out",
    });
  }, [locked, resetVideos]);

  // ── MODAL open / close ───────────────────────────────────
  const openModal  = useCallback(() => setModalMember(members[active]), [active]);
  const closeModal = useCallback(() => setModalMember(null), []);

  const member = members[active];

  return (
    <>
      {/* ── PROFILE MODAL ────────────────────────────────── */}
      {modalMember && (
        <ProfileModal member={modalMember} onClose={closeModal} />
      )}

      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-[#f5f3ef] py-24 md:py-32"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_55%)]" />

        {/* SPOTLIGHT */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute left-0 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-[140px]"
        />

        {/* NOISE */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/noise.png')]" />

        {/* CONTAINER */}
        <div className="relative z-10 mx-auto max-w-[1900px] px-6 md:px-10 lg:px-16">

          {/* HEADER */}
          <div className="mb-24 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[1200px]">
              <span className="team-tag mb-5 block text-[11px] uppercase tracking-[0.35em] text-neutral-500">
                OUR TEAM
              </span>
              <h2 className="text-[56px] leading-[0.9] tracking-[-0.06em] text-black md:text-[110px] lg:text-[150px] font-light">
                <div className="overflow-hidden">
                  <span className="team-line block">Meet the people</span>
                </div>
                <div className="overflow-hidden">
                  <span className="team-line block">behind the magic.</span>
                </div>
              </h2>
            </div>
            <p className="team-copy max-w-[340px] pt-4 text-lg leading-relaxed text-neutral-500">
              A collective of designers, engineers and storytellers crafting
              premium digital experiences through cinematic interaction systems.
            </p>
          </div>

          {/* MAIN */}
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_520px]">

            {/* LEFT — character stage */}
            <div
              className="relative h-[620px] md:h-[820px]"
              onMouseLeave={resetCharacters}
            >
              {members.map((m, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleHover(index)}
                  className={`team-character character-${index} absolute cursor-pointer will-change-transform`}
                  style={{
                    left: ["0%", "24%", "48%", "70%"][index],
                    top:  ["24%", "0%",  "40%", "10%"][index],
                  }}
                >
                  {/* GLOW */}
                  <div
                    className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
                    style={{ background: `${m.accent}55` }}
                  />

                  {/* STATIC IMAGE */}
                  <img
                    ref={setImgRef(index)}
                    src={m.image}
                    alt={m.name}
                    className="relative z-10 w-[180px] md:w-[240px] lg:w-[320px] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)] pointer-events-none select-none"
                    style={{ willChange: "opacity" }}
                  />

                  {/* VIDEO OVERLAY */}
                  <video
                    ref={setVidRef(index)}
                    id={`video-${index}`}
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 z-20 h-full w-full object-contain opacity-0 pointer-events-none"
                    style={{ willChange: "opacity" }}
                    onEnded={() => {
                      videoStateRef.current.playing.delete(index);
                      crossFadeOut(index);
                    }}
                  >
                    <source src={m.video} type="video/webm" />
                  </video>
                </div>
              ))}
            </div>

            {/* RIGHT — detail card */}
            <div
              className="relative"
              onMouseEnter={() => setLocked(true)}
              onMouseLeave={() => { gsap.delayedCall(0.15, () => setLocked(false)); }}
            >
              {/* GHOST CARDS */}
              <div
                className="absolute inset-0 rounded-[36px] backdrop-blur-xl"
                style={{
                  background: `${member.accent}12`,
                  border: `1px solid ${member.accent}15`,
                  transform: "translate(30px,30px) rotate(-5deg)",
                }}
              />
              <div
                className="absolute inset-0 rounded-[36px] backdrop-blur-xl"
                style={{
                  background: `${member.accent}18`,
                  border: `1px solid ${member.accent}20`,
                  transform: "translate(15px,15px) rotate(-2deg)",
                }}
              />

              {/* MAIN CARD */}
              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[36px] bg-white/55 backdrop-blur-3xl"
                style={{
                  border: `1px solid ${member.accent}25`,
                  boxShadow: `0 30px 120px ${member.accent}18, 0 10px 40px rgba(0,0,0,0.08)`,
                }}
              >
                {/* TOP LINE */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: member.accent }}
                />

                {/* BOTTOM GLOW */}
                <div
                  className="absolute -bottom-24 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full blur-[90px] opacity-40"
                  style={{ background: member.accent }}
                />

                {/* LIGHT SWEEP */}
                <div className="light-sweep pointer-events-none absolute inset-y-0 left-[-40%] w-[40%] rotate-[12deg] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[18px]" />

                {/* PROFILE IMAGE */}
                <img
                  src={member.profile}
                  alt={member.name}
                  className="h-[320px] w-full object-cover object-top"
                />

                {/* CONTENT */}
                <div className="relative z-10 p-8 md:p-10">
                  <span
                    className="text-[11px] uppercase tracking-[0.35em]"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </span>

                  <h3 className="mt-5 text-[52px] leading-[0.92] tracking-[-0.05em] text-black font-light">
                    {member.name}
                  </h3>

                  <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                    {member.about}
                  </p>

                  {/* EXPLORE PROFILE BUTTON */}
                  <button
                    onClick={openModal}
                    className="
                      group mt-10 inline-flex items-center gap-3
                      text-[11px] uppercase tracking-[0.32em] text-black
                      hover:opacity-60 transition-opacity duration-300
                    "
                  >
                    Explore Profile
                    <span className="transition-all duration-700 group-hover:translate-x-2">
                      <svg width="50" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 25 H75 M60 10 L75 25 L60 40"
        stroke="black"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"/>
</svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}