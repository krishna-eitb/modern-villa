"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  
} from "lucide-react";

export default function ContactExperience() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    vision: "",
  });

  const contacts = [
    {
      label: "Email",
      value: "hello@yourstudio.com",
      icon: Mail,
    },

    {
      label: "Phone",
      value: "+91 98765 43210",
      icon: Phone,
    },

    {
      label: "Location",
      value: "Melbourne, Australia",
      icon: MapPin,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f5f1ea] text-black">
      {/* PREMIUM BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">
        {/* GRID */}

        <div
          className="
            absolute inset-0 opacity-[0.045]
            [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            [background-size:74px_74px]
          "
        />

        {/* RADIAL LIGHT */}

        <div className="absolute left-[-10%] top-[5%] h-[700px] w-[700px] rounded-full bg-[#b9e7ff]/30 blur-[140px]" />

        <div className="absolute right-[-10%] top-[20%] h-[700px] w-[700px] rounded-full bg-[#ffd7b8]/30 blur-[150px]" />

        <div className="absolute bottom-[-15%] left-[30%] h-[700px] w-[700px] rounded-full bg-white/50 blur-[160px]" />

        {/* PREMIUM MARBLE */}

        <div
          className="
            absolute inset-0 opacity-[0.04]
            mix-blend-multiply
            bg-[url('/noise.png')]
          "
        />

        {/* GRADIENT FADE */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.75)_100%)]" />
      </div>

      {/* MAIN */}

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 pb-32 pt-28 md:px-10 lg:px-16">
        <div className="grid items-start gap-20 lg:grid-cols-[1.1fr_560px]">
          {/* LEFT */}

          <div>
            <span className="mb-8 block text-[11px] uppercase tracking-[0.42em] text-black/35">
              CONTACT EXPERIENCE
            </span>

            <h1
              className="
                max-w-[900px]
                text-[72px]
                font-light
                leading-[0.86]
                tracking-[-0.08em]
                md:text-[120px]
                lg:text-[165px]
              "
            >
              Let’s build
              <br />
              something
              <br />
              extraordinary.
            </h1>

            <p className="mt-10 max-w-[520px] text-[16px] leading-relaxed text-black/50">
              A premium collaboration experience crafted with
              cinematic storytelling, elegant interaction systems
              and refined digital aesthetics.
            </p>

            {/* CONTACT LIST */}

            <div className="mt-24 space-y-8">
              {contacts.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[30px]
                      border
                      border-black/6
                      bg-white/55
                      px-7
                      py-7
                      backdrop-blur-xl
                      transition-all
                      duration-700
                      hover:-translate-y-1
                      hover:border-black/10
                      hover:shadow-[0_20px_80px_rgba(0,0,0,0.06)]
                    "
                  >
                    {/* GLOW */}

                    <div
                      className="
                        absolute
                        right-[-20%]
                        top-[-40%]
                        h-[180px]
                        w-[180px]
                        rounded-full
                        bg-[#b9e7ff]/20
                        blur-[70px]
                        transition-all
                        duration-700
                        group-hover:scale-125
                      "
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-start gap-5">
                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-black/6
                            bg-white
                            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                          "
                        >
                          <Icon size={18} strokeWidth={1.7} />
                        </div>

                        <div>
                          <div className="mb-2 text-[10px] uppercase tracking-[0.35em] text-black/35">
                            {item.label}
                          </div>

                          <div className="text-[30px] font-light tracking-[-0.05em]">
                            {item.value}
                          </div>
                        </div>
                      </div>

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-black/8
                          bg-white/80
                          transition-all
                          duration-500
                          group-hover:rotate-45
                          group-hover:scale-110
                        "
                      >
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.8}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FORM */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[42px]
              border
              border-white/70
              bg-white/65
              p-8
              shadow-[0_30px_120px_rgba(0,0,0,0.08)]
              backdrop-blur-3xl
              md:p-10
            "
          >
            {/* PREMIUM GLOW */}

            <div className="absolute right-[-20%] top-[-10%] h-[320px] w-[320px] rounded-full bg-[#b9e7ff]/25 blur-[100px]" />

            <div className="absolute bottom-[-15%] left-[-10%] h-[260px] w-[260px] rounded-full bg-[#ffd7b8]/25 blur-[90px]" />

            {/* TOP */}

            <div className="relative z-10 mb-14 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-black/35">
                  START A PROJECT
                </span>

                <h3 className="mt-4 text-[42px] font-light tracking-[-0.05em]">
                  Consultation
                </h3>
              </div>

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/8
                  bg-white/80
                "
              >
                <ArrowUpRight size={20} />
              </div>
            </div>

            {/* INPUTS */}

            <div className="relative z-10">
              {[
                {
                  label: "Full Name",
                  key: "name",
                  placeholder:
                    "Enter your full name",
                },

                {
                  label: "Email Address",
                  key: "email",
                  placeholder:
                    "Enter your email",
                },

                {
                  label: "Project Type",
                  key: "project",
                  placeholder:
                    "Website, Branding, 3D Experience...",
                },

                {
                  label: "Project Vision",
                  key: "vision",
                  placeholder:
                    "Tell us about your vision...",
                },
              ].map((field) => (
                <div
                  key={field.key}
                  className="mb-10"
                >
                  <label className="mb-4 block text-[10px] uppercase tracking-[0.35em] text-black/35">
                    {field.label}
                  </label>

                  {field.key !== "vision" ? (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]:
                            e.target.value,
                        })
                      }
                      className="
                        w-full
                        border-b
                        border-black/10
                        bg-transparent
                        pb-5
                        text-[34px]
                        font-light
                        tracking-[-0.05em]
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-black/20
                        focus:border-black/30
                      "
                    />
                  ) : (
                    <textarea
                      rows={5}
                      placeholder={field.placeholder}
                      value={formData.vision}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vision: e.target.value,
                        })
                      }
                      className="
                        w-full
                        resize-none
                        border-b
                        border-black/10
                        bg-transparent
                        pb-5
                        text-[28px]
                        font-light
                        tracking-[-0.05em]
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-black/20
                        focus:border-black/30
                      "
                    />
                  )}
                </div>
              ))}

              {/* BUTTON */}

              <button
                className="
                  group
                  relative
                  mt-6
                  overflow-hidden
                  rounded-full
                  bg-black
                  px-10
                  py-5
                  text-[11px]
                  uppercase
                  tracking-[0.35em]
                  text-white
                  transition-all
                  duration-500
                  hover:scale-[1.03]
                "
              >
                <span className="relative z-10 flex items-center gap-4">
                  Start A Project

                  <span className="transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </span>

                <div
                  className="
                    absolute
                    inset-0
                    translate-y-full
                    bg-gradient-to-r
                    from-[#b9e7ff]
                    to-[#ffd7b8]
                    transition-transform
                    duration-700
                    group-hover:translate-y-0
                  "
                />
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER CTA */}

        <div className="mt-40 border-t border-black/8 pt-24">
          <div className="flex flex-col items-start justify-between gap-14 lg:flex-row lg:items-end">
            <div>
              <span className="mb-6 block text-[11px] uppercase tracking-[0.35em] text-black/35">
                PREMIUM DIGITAL EXPERIENCE
              </span>

              <h2
                className="
                  max-w-[1200px]
                  text-[72px]
                  font-light
                  leading-[0.88]
                  tracking-[-0.08em]
                  md:text-[120px]
                  lg:text-[150px]
                "
              >
                Ready to create
                <br />
                the extraordinary?
              </h2>
            </div>

            <button
              className="
                group
                relative
                overflow-hidden
                rounded-full
                border
                border-black/10
                bg-white/80
                px-10
                py-5
                text-[11px]
                uppercase
                tracking-[0.35em]
                backdrop-blur-xl
              "
            >
              <span className="relative z-10 flex items-center gap-4">
                Let’s Talk

                <span className="transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </span>

              <div
                className="
                  absolute
                  inset-0
                  translate-y-full
                  bg-black
                  transition-transform
                  duration-700
                  group-hover:translate-y-0
                "
              />

              <div className="absolute inset-0 z-20 hidden items-center justify-center text-white group-hover:flex">
                Let’s Talk →
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}