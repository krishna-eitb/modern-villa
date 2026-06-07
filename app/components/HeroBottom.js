"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 120,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    value: 15,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 5,
    suffix: "+",
    label: "Global Offices",
  },
];

export default function HeroBottom() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    tl.from(".hero-reveal", {
      yPercent: 110,
      duration: 1.3,
      stagger: 0.18,
      ease: "power4.out",
    })
      .from(
        ".hero-cta",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        ".hero-desc",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        imageRef.current,
        {
          x: 120,
          scale: 1.08,
          opacity: 0,
          duration: 1.8,
          ease: "power4.out",
        },
        "-=1"
      )
      .call(() => {
        gsap.to(imageRef.current, {
          y: -20,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

    gsap.to(imageRef.current, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    document.querySelectorAll(".counter").forEach((counter) => {
      const end = Number(counter.dataset.value);

      gsap.fromTo(
        counter,
        {
          innerText: 0,
        },
        {
          innerText: end,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power3.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            counter.innerText =
              Math.floor(counter.innerText) +
              counter.dataset.suffix;
          },
        }
      );
    });

    gsap.from(".stat-item", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stats-row",
        start: "top 85%",
        once: true,
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-16 pt-24 md:pt-32">
        {/* HERO */}

        <div className="text-center">
          <h1 className="mx-auto max-w-[1500px] text-[56px] md:text-[92px] lg:text-[140px] leading-[0.88] tracking-[-0.06em] font-light text-black">
            <div className="overflow-hidden">
              <span className="hero-reveal block">
                Stunning{" "}
                <em className="font-serif italic font-normal">
                  architecture
                </em>
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="hero-reveal block">
                for spaces where
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="hero-reveal block">
                people{" "}
                <em className="font-serif italic font-normal">
                  live
                </em>
                ,{" "}
                <em className="font-serif italic font-normal">
                  work
                </em>
                ,
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="hero-reveal block">
                and{" "}
                <em className="font-serif italic font-normal">
                  chill
                </em>
                .
              </span>
            </div>
          </h1>

          <div className="hero-cta mt-12">
            <button
              className="
                group
                rounded-full
                border
                border-black
                px-8
                py-4
                text-[12px]
                uppercase
                tracking-[0.25em]
                transition-all
                duration-500
                hover:bg-black
                hover:text-white
              "
            >
              View Projects
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="mt-24 lg:mt-36 grid lg:grid-cols-[320px_1fr] gap-10 items-end">
          <div className="hero-desc">
            <p className="max-w-[350px] text-xl leading-relaxed text-neutral-500">
              We create timeless architectural experiences that balance innovation, sustainability and
              luxury, shaping spaces people genuinely
              connect with.
            </p>
          </div>

          <div className="relative flex justify-end">
            <img
              ref={imageRef}
              src="/black-shelter.png"
              alt="Architecture"
              className="
                w-full
                max-w-none
                lg:w-[118%]
                object-contain
                will-change-transform
              "
            />
          </div>
        </div>

        {/* STATS */}

        <div className="stats-row mt-16 lg:mt-24 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {stats.map((item, index) => (
              <div
                key={index}
                className="stat-item relative py-10 md:py-12"
              >
                {index !== 0 && (
                  <div className="absolute left-0 top-1/2 hidden md:block h-20 w-px -translate-y-1/2 bg-neutral-200" />
                )}

                <div
                  className="counter text-[64px] md:text-[84px] lg:text-[100px] font-light leading-none tracking-[-0.05em]"
                  data-value={item.value}
                  data-suffix={item.suffix}
                >
                  0+
                </div>

                <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}