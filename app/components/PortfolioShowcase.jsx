"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Luxury Residence",
    description:
      "Crafting refined living spaces that blend timeless architecture with modern comfort.",
    image: "/portfolio-1.png",
  },
  {
    number: "02",
    title: "Urban Retreat",
    description:
      "A contemporary sanctuary designed to balance city living with tranquility.",
    image: "/portfolio-2.png",
  },
  {
    number: "03",
    title: "Modern Workspace",
    description:
      "Innovative commercial environments that inspire productivity and collaboration.",
    image: "/portfolio-3.png",
  },
  {
    number: "04",
    title: "Coastal Escape",
    description:
      "An architectural expression of luxury and nature seamlessly working together.",
    image: "/portfolio-4.png",
  },
];

export default function PortfolioShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-header",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".portfolio-line", {
        yPercent: 110,
        stagger: 0.15,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".portfolio-header",
          start: "top 80%",
          once: true,
        },
      });

      gsap.utils.toArray(".project-item").forEach((project) => {
        const image = project.querySelector(".project-image-wrap");
        const content = project.querySelector(".project-content");
        const number = project.querySelector(".project-number");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 75%",
            once: true,
          },
        });

        tl.from(number, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        })
          .from(
            image,
            {
              y: 100,
              opacity: 0,
              scale: 1.15,
              duration: 1.4,
              ease: "power4.out",
            },
            "-=0.6"
          )
          .from(
            content,
            {
              y: 40,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=1"
          );

        gsap.to(image.querySelector("img"), {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="portfolio-header mb-24 md:mb-40">
          <span className="portfolio-eyebrow block mb-5 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
            SELECTED WORK
          </span>

          <h2 className="text-[52px] md:text-[90px] lg:text-[140px] leading-[0.88] tracking-[-0.06em] font-light">
            <div className="overflow-hidden">
              <span className="portfolio-line block">Selected</span>
            </div>

            <div className="overflow-hidden">
              <span className="portfolio-line block">Portfolio</span>
            </div>
          </h2>
        </div>

        {/* Projects */}
        <div className="space-y-40 md:space-y-56">
          {projects.map((project, index) => {
            const reverse = index % 2 !== 0;

            return (
              <article
                key={project.number}
                className={`project-item grid gap-12 lg:gap-20 items-center ${
                  reverse
                    ? "lg:grid-cols-[420px_1fr]"
                    : "lg:grid-cols-[1fr_420px]"
                }`}
              >
                {/* Image */}
                <div
                  className={`project-image-wrap relative overflow-hidden rounded-[32px] h-[500px] md:h-[700px] ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div
                  className={`project-content ${
                    reverse ? "lg:order-1" : ""
                  }`}
                >
                  <div className="project-number mb-8 text-[120px] md:text-[180px] lg:text-[220px] leading-none font-light text-black/5">
                    {project.number}
                  </div>

                  <h3 className="text-[40px] md:text-[60px] lg:text-[72px] leading-[0.95] tracking-[-0.04em] font-light">
                    {project.title}
                  </h3>

                  <p className="mt-8 max-w-md text-neutral-500 leading-relaxed">
                    {project.description}
                  </p>

                  <button className="group mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em]">
                    View Project

                    <span className="transition-transform duration-500 group-hover:translate-x-2">
                      →
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}