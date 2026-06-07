"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const members = [
  {
    name: "Krishna S",
    role: "Frontend Engineer",
    image: "/team/alex.png",
    profile: "/team/alex-profile.png",
    accent: "#f59e0b",
    about:
      "Engineering immersive interfaces powered by cinematic motion systems, luxury interaction systems and storytelling driven experiences.",
  },

  {
    name: "Emma Stone",
    role: "Creative Director",
    image: "/team/emma.png",
    profile: "/team/emma-profile.png",
    accent: "#8b5cf6",
    about:
      "Crafting emotionally driven digital experiences with premium editorial composition and cinematic UI direction.",
  },

  {
    name: "Sara Wilson",
    role: "Motion Designer",
    image: "/team/sara.png",
    profile: "/team/sara-profile.png",
    accent: "#ec4899",
    about:
      "Creating cinematic motion systems and fluid interaction choreography for modern luxury brands.",
  },

  {
    name: "Prince Mathews",
    role: "3D Artist",
    image: "/team/prince.png",
    profile: "/team/prince-profile.png",
    accent: "#06b6d4",
    about:
      "Designing stylized 3D worlds and immersive visual systems blending realism with emotion.",
  },
];

export default function PremiumTeamSection() {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [open, setOpen] = useState(false);

  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const cardRef = useRef(null);

  // ======================================================
  // INTRO ANIMATION
  // ======================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-tag", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".team-line", {
        yPercent: 120,
        stagger: 0.12,
        duration: 1.4,
        ease: "power4.out",
      });

      gsap.from(".team-copy", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".team-character", {
        y: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 1.6,
        ease: "power4.out",
      });

      // FLOAT

      gsap.to(".team-character", {
        y: 18,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ======================================================
  // SPOTLIGHT
  // ======================================================

  const handleMouseMove = (e) => {
    const bounds = sectionRef.current.getBoundingClientRect();

    gsap.to(spotlightRef.current, {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  // ======================================================
  // REALISTIC CARD SHUFFLE
  // ======================================================

  const animateCardShuffle = (nextIndex) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayed(nextIndex);

        gsap.fromTo(
          cardRef.current,
          {
            rotateZ: 9,
            rotateX: -8,
            rotateY: 10,
            x: 180,
            y: 40,
            scale: 1.08,
            opacity: 0,
            filter: "blur(12px)",
          },
          {
            rotateZ: 0,
            rotateX: 0,
            rotateY: 0,
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power4.out",
          },
        );

        // CARD SETTLE

        gsap.fromTo(
          cardRef.current,
          {
            y: 0,
          },
          {
            y: -8,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          },
        );

        // LIGHT SWEEP

        gsap.fromTo(
          ".light-sweep",
          {
            xPercent: -180,
            opacity: 0,
          },
          {
            xPercent: 240,
            opacity: 1,
            duration: 1.8,
            ease: "power2.out",
          },
        );
      },
    });

    // MAIN CARD EXIT

    tl.to(cardRef.current, {
      rotateZ: -7,
      rotateX: 8,
      rotateY: -12,
      x: -160,
      y: 30,
      scale: 0.88,
      opacity: 0,
      filter: "blur(14px)",
      duration: 0.45,
      ease: "power3.in",
    });

    // GHOST STACKS

    tl.to(
      ".ghost-1",
      {
        x: -18,
        y: 18,
        rotate: -4,
        duration: 0.6,
        ease: "power3.out",
      },
      0,
    );

    tl.to(
      ".ghost-2",
      {
        x: -32,
        y: 32,
        rotate: -7,
        duration: 0.7,
        ease: "power3.out",
      },
      0,
    );
  };

  // ======================================================
  // HOVER
  // ======================================================

  const handleHover = (index) => {
    if (index === displayed) return;

    setActive(index);

    animateCardShuffle(index);

    // OTHER CHARACTERS

    gsap.to(".team-character", {
      scale: 0.84,
      opacity: 0.18,
      filter: "blur(5px)",
      duration: 0.9,
      ease: "power4.out",
    });

    // ACTIVE

    gsap.to(`.character-${index}`, {
      scale: 1.14,
      opacity: 1,
      y: -26,
      filter: "blur(0px)",
      duration: 1,
      ease: "power4.out",
      zIndex: 20,
    });
  };

  // ======================================================
  // RESET
  // ======================================================

  const resetCharacters = () => {
    gsap.to(".team-character", {
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power4.out",
    });
  };

  const member = members[displayed];

  return (
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
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/80
          blur-[140px]
        "
      />

      {/* NOISE */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/noise.png')]" />

      {/* CONTAINER */}

      <div className="relative z-10 mx-auto max-w-[1900px] px-6 md:px-10 lg:px-16">
        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <div className="mb-24 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[1200px]">
            <span className="team-tag mb-5 block text-[11px] uppercase tracking-[0.35em] text-neutral-500">
              OUR TEAM
            </span>

            <h2 className="text-[56px] leading-[0.9] tracking-[-0.06em] text-black md:text-[110px] lg:text-[150px] font-light">
              <div className="overflow-hidden">
                <span className="team-line block">
                  Meet the people
                </span>
              </div>

              <div className="overflow-hidden">
                <span className="team-line block">
                  behind the magic.
                </span>
              </div>
            </h2>
          </div>

          <p className="team-copy max-w-[340px] pt-4 text-sm leading-relaxed text-neutral-500">
            A collective of designers, engineers and storytellers crafting
            premium digital experiences through cinematic interaction systems.
          </p>
        </div>

        {/* ====================================================== */}
        {/* MAIN */}
        {/* ====================================================== */}

        <div className="grid gap-16 lg:grid-cols-[1fr_520px] items-center">
          {/* ====================================================== */}
          {/* CHARACTERS */}
          {/* ====================================================== */}

          <div
            className="relative h-[620px] md:h-[820px]"
            onMouseLeave={resetCharacters}
          >
            {members.map((member, index) => (
              <div
                key={index}
                onMouseEnter={() => handleHover(index)}
                className={`
                  team-character
                  character-${index}
                  absolute
                  cursor-pointer
                  will-change-transform
                `}
                style={{
                  left:
                    index === 0
                      ? "0%"
                      : index === 1
                        ? "24%"
                        : index === 2
                          ? "48%"
                          : "70%",

                  top:
                    index === 0
                      ? "24%"
                      : index === 1
                        ? "0%"
                        : index === 2
                          ? "40%"
                          : "10%",
                }}
              >
                {/* GLOW */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[260px]
                    w-[260px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    blur-[100px]
                  "
                  style={{
                    background: `${member.accent}55`,
                  }}
                />

                {/* CHARACTER */}

                <img
                  src={member.image}
                  alt={member.name}
                  className="
                    relative
                    z-10
                    w-[180px]
                    md:w-[240px]
                    lg:w-[320px]
                    object-contain
                    drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)]
                    select-none
                    pointer-events-none
                  "
                />
              </div>
            ))}
          </div>

          {/* ====================================================== */}
          {/* PROFILE CARD */}
          {/* ====================================================== */}

         {/* ====================================================== */}
{/* PROFILE CARD */}
{/* ====================================================== */}

<div className="relative">
  {/* GHOST CARD 2 */}

  <div
    className="
      ghost-2
      absolute
      inset-0
      rounded-[36px]
      backdrop-blur-xl
      transition-all
      duration-700
    "
    style={{
      background: `${member.accent}12`,
      border: `1px solid ${member.accent}15`,
      transform: "translate(30px,30px) rotate(-5deg)",
    }}
  />

  {/* GHOST CARD 1 */}

  <div
    className="
      ghost-1
      absolute
      inset-0
      rounded-[36px]
      backdrop-blur-xl
      transition-all
      duration-700
    "
    style={{
      background: `${member.accent}18`,
      border: `1px solid ${member.accent}20`,
      transform: "translate(15px,15px) rotate(-2deg)",
    }}
  />

  {/* MAIN CARD */}

  <div
    ref={cardRef}
    className="
      relative
      overflow-hidden
      rounded-[36px]
      bg-white/55
      backdrop-blur-3xl

      before:absolute
      before:inset-0
      before:bg-gradient-to-br
      before:from-white/60
      before:via-white/10
      before:to-transparent
      before:pointer-events-none
    "
    style={{
      border: `1px solid ${member.accent}25`,
      boxShadow: `
        0 30px 120px ${member.accent}18,
        0 10px 40px rgba(0,0,0,0.08)
      `,
    }}
  >
    {/* TOP ACCENT */}

    <div
      className="absolute inset-x-0 top-0 h-[2px]"
      style={{
        background: member.accent,
      }}
    />

    {/* AMBIENT GLOW */}

    <div
      className="
        absolute
        -bottom-24
        left-1/2
        h-[240px]
        w-[240px]
        -translate-x-1/2
        rounded-full
        blur-[90px]
        opacity-40
      "
      style={{
        background: member.accent,
      }}
    />

    {/* LIGHT SWEEP */}

    <div
      className="
        light-sweep
        pointer-events-none
        absolute
        inset-y-0
        left-[-40%]
        w-[40%]
        rotate-[12deg]
        bg-gradient-to-r
        from-transparent
        via-white/70
        to-transparent
        blur-[18px]
      "
    />

    {/* IMAGE */}

    <div className="overflow-hidden">
      <img
        src={member.profile}
        alt={member.name}
        className="
          h-[300px]
          md:h-[380px]
          w-full
          object-cover
          object-top
        "
      />
    </div>

    {/* CONTENT */}

    <div className="relative z-10 p-6 md:p-8 lg:p-10">
      <span
        className="text-[11px] uppercase tracking-[0.32em]"
        style={{
          color: member.accent,
        }}
      >
        {member.role}
      </span>

      <h3 className="mt-4 text-[42px] md:text-[58px] leading-[0.95] tracking-[-0.05em] text-black font-light">
        {member.name}
      </h3>

      <p className="mt-5 text-sm leading-relaxed text-neutral-600">
        {member.about}
      </p>

      {/* CTA */}

      <button
        onClick={() => setOpen(true)}
        className="
          group
          mt-10
          inline-flex
          items-center
          gap-3
          text-[11px]
          uppercase
          tracking-[0.32em]
          text-black
        "
      >
        Explore Profile

        <span className="transition-all duration-700 group-hover:translate-x-2">
          →
        </span>
      </button>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MODAL */}
      {/* ====================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-xl
            p-4
          "
        >
          <div
            className="
              relative
              grid
              w-full
              max-w-[1500px]
              overflow-hidden
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.08]
              backdrop-blur-3xl
              lg:grid-cols-[0.9fr_1fr]
            "
          >
            {/* CLOSE */}

            <button
              onClick={() => setOpen(false)}
              className="
                absolute
                right-6
                top-6
                z-50
                h-12
                w-12
                rounded-full
                border
                border-white/10
                bg-white/10
                text-white
                backdrop-blur-xl
              "
            >
              ✕
            </button>

            {/* IMAGE */}

            <div className="relative h-[320px] bg-white lg:h-[90vh]">
              <img
                src={member.profile}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* CONTENT */}

            <div className="flex items-center p-8 md:p-12 lg:p-20">
              <div>
                <span
                  className="text-[11px] uppercase tracking-[0.35em]"
                  style={{
                    color: member.accent,
                  }}
                >
                  {member.role}
                </span>

                <h2 className="mt-5 text-[56px] md:text-[90px] leading-[0.9] tracking-[-0.06em] text-white font-light">
                  {member.name}
                </h2>

                <p className="mt-8 max-w-[620px] text-base md:text-lg leading-relaxed text-white/70">
                  {member.about}
                </p>

                {/* STATS */}

                <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                  <div>
                    <div className="text-[48px] md:text-[64px] leading-none text-white font-light">
                      08+
                    </div>

                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">
                      Years Experience
                    </p>
                  </div>

                  <div>
                    <div className="text-[48px] md:text-[64px] leading-none text-white font-light">
                      120+
                    </div>

                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">
                      Projects Delivered
                    </p>
                  </div>
                </div>

                {/* BUTTONS */}

                <div className="mt-14 flex flex-wrap gap-4">
                  <button
                    className="
                      rounded-full
                      bg-white
                      px-8
                      py-4
                      text-sm
                      font-medium
                      text-black
                    "
                  >
                    Schedule Meeting
                  </button>

                  <button
                    className="
                      rounded-full
                      border
                      border-white/15
                      bg-white/5
                      px-8
                      py-4
                      text-sm
                      text-white
                    "
                  >
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}