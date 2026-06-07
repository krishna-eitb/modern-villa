"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const services = [
  {
    title: "INSTANT\nPROPERTY SEARCH",
    description: "DISCOVER HOMES AND APARTMENTS WITH JUST A FEW CLICKS",
    image: "portfolio-1.png",
  },
  {
    title: "VERIFIED\nPRO LISTINGS",
    description: "100% VERIFIED AND UPDATED PROPERTY DETAILS",
    image: "portfolio-2.png",
  },
  {
    title: "SMART\nINVESTING INSIGHTS",
    description: "PERSONALIZED RECOMMENDATIONS TO GROW YOUR WEALTH",
    image: "/building-3.jpg",
  },
  {
    title: "REAL TIME\nPROPERTY UPDATES",
    description: "GET INSTANT ALERTS ON NEW LISTINGS AND PRICE CHANGES",
    image: "/buidling-4.jpg",
  },
];

export default function ServicesSlider() {
  const [active, setActive] = useState(0);

  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);

  const currentIndexRef = useRef(0);

  useEffect(() => {
    gsap.set(nextImageRef.current, {
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-header",
        start: "top 75%",
        once: true,
      },
    });

    tl.from(".services-tag", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".title-line",
        {
          yPercent: 110,
          stagger: 0.15,
          duration: 1.3,
          ease: "power4.out",
        },
        "-=0.3",
      )
      .from(
        ".services-copy",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.8",
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleHover = (index) => {
    if (index === currentIndexRef.current) return;

    setActive(index);

    gsap.killTweensOf([currentImageRef.current, nextImageRef.current]);

    nextImageRef.current.src = services[index].image;

    gsap.set(nextImageRef.current, {
      opacity: 0,
      scale: 1.08,
      x: 60,
      filter: "blur(12px)",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        currentImageRef.current.src = services[index].image;

        gsap.set(currentImageRef.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          filter: "blur(0px)",
        });

        gsap.set(nextImageRef.current, {
          opacity: 0,
          scale: 1,
          x: 0,
          filter: "blur(0px)",
        });

        currentIndexRef.current = index;
      },
    });

    tl.to(
      currentImageRef.current,
      {
        opacity: 0,
        scale: 1.08,
        x: -40,
        filter: "blur(12px)",
        duration: 0.8,
        ease: "power3.out",
      },
      0,
    ).to(
      nextImageRef.current,
      {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      },
      0,
    );
  };

  return (
    <section className="w-full pb-20 bg-white">
      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-16 pt-24 md:pt-32">
        <div className="services-header mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <span className="services-tag block mb-5 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
                OUR SERVICES
              </span>

              <h2 className="max-w-[1000px] text-[42px] md:text-[72px] lg:text-[96px] leading-[0.9] tracking-[-0.05em] font-light text-black">
                <div className="overflow-hidden">
                  <span className="title-line block">
                    Helping clients discover,
                  </span>
                </div>

                <div className="overflow-hidden">
                  <span className="title-line block">
                    evaluate and invest in
                  </span>
                </div>

                <div className="overflow-hidden">
                  <span className="title-line block">
                    exceptional properties.
                  </span>
                </div>
              </h2>
            </div>

            <p className="services-copy max-w-[340px] text-sm leading-relaxed text-neutral-500">
              From property discovery to investment insights, we provide the
              tools and expertise needed to make confident real estate
              decisions.
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[420px_1fr] h-[700px]">
          {/* LEFT SIDE */}

          <div className="flex flex-col gap-3">
            {services.map((item, index) => {
              const isActive = active === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => handleHover(index)}
                  className={`
                    group
                    relative
                    flex-1
                    overflow-hidden
                    rounded-2xl
                    cursor-pointer
                    border
                    transition-all
                    duration-500
                    ${
                      isActive
                        ? "bg-black border-black text-white"
                        : "bg-[#f5f5f5] border-[#e5e5e5] text-black"
                    }
                  `}
                >
                  <div className="flex h-full flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <h3 className="text-right text-[30px] font-light leading-none tracking-wide whitespace-pre-line">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-end justify-between">
                      <p
                        className={`max-w-[180px] text-[10px] uppercase tracking-wide ${
                          isActive ? "text-white/60" : "text-neutral-500"
                        }`}
                      >
                        {item.description}
                      </p>

                      <div
                        className={`
                          text-3xl
                          transition-all
                          duration-500
                          ${isActive ? "-translate-y-1 translate-x-1" : ""}
                        `}
                      >
                        ↗
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE */}

          <div className="relative overflow-hidden rounded-3xl bg-black">
            {/* CURRENT IMAGE */}

            <img
              ref={currentImageRef}
              src={services[0].image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
            />

            {/* NEXT IMAGE */}

            <img
              ref={nextImageRef}
              src={services[0].image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
            />

            {/* PREMIUM OVERLAY */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />

            {/* VIGNETTE */}

            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.18)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
