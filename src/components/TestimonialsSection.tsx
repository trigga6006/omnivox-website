"use client";

import { ArrowUpRight } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Tara Tan",
    title: "Founding Partner at Strange Ventures",
    quote:
      "You're making texting actually delightful right now! Can see it becoming a can't live without product fast.",
    initials: "TT",
    color: "#E8B4D8",
  },
  {
    name: "Rahul Vohra",
    title: "CEO, Superhuman",
    quote: "This is the best AI product I've used since ChatGPT.",
    initials: "RV",
    color: "#7EC8E3",
  },
  {
    name: "Suzanne Xie",
    title: "Partner, Neo",
    quote:
      "I've been using Wispr almost every day since I downloaded it. It's probably my favorite part of the day, especially at the end when I go through my inbox with Wispr.",
    initials: "SX",
    color: "#C4A4E8",
  },
  {
    name: "Shashank Vemuri",
    title: "Scout at Soma Capital",
    quote:
      "I can make quick edits while speaking to it because flow really understands me perfectly and can make the necessary changes. Flow's accuracy and speed make it a real game changer.",
    initials: "SV",
    color: "#A4D8C4",
  },
  {
    name: "Rich Pankey",
    title: "Indirect Sourcing Manager",
    quote:
      "I have Parkinson's, and this app has just made my life so much easier using my Mac. I can't even explain the change that it has provided for me.",
    initials: "RP",
    color: "#D8C4A4",
  },
  {
    name: "Hargun Mujral",
    title: "ML Platforms at X",
    quote:
      "Hey! Flow is currently blowing my mind with how fast and useful it is!",
    initials: "HM",
    color: "#E8D4A4",
  },
  {
    name: "Jeff Seibert",
    title: "CEO, Digits AI",
    quote:
      "I was able to dictate ~70% of our Q2 board doc with Wispr, it was a massive time saver!",
    initials: "JS",
    color: "#A4C8E8",
  },
  {
    name: "Jeannette Tan",
    title: "Fiction Writer",
    quote:
      "Flow is that extra little part of your brain that helps you formulate full sentences when you might be stuck in thought and have a jittery response.",
    initials: "JT",
    color: "#E8A4B4",
  },
  {
    name: "Agam Walia",
    title: "Student, UC Berkeley",
    quote:
      "Stuttering and it still works really well. I think it's really quick, I love it.",
    initials: "AW",
    color: "#B4D8A4",
  },
  {
    name: "Greg Dickson",
    title: "Bestselling Author and Business Coach",
    quote:
      "I'm afraid I'm getting addicted to this great platform. It allows me to get into a flow state and not have autocorrect or voice dictation stop and interrupt me while I'm attempting to articulate my ideas.",
    initials: "GD",
    color: "#C4C4E8",
  },
];

interface CaseStudy {
  stat: string;
  subtitle: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

const caseStudies: CaseStudy[] = [
  {
    stat: "4x faster responses",
    subtitle: 'The "surprisingly fast" advisor.',
    name: "Gaurav Vohra",
    role: "Startup Advisor & Growth Leader",
    initials: "GV",
    color: "#7EC8E3",
  },
  {
    stat: "50+ hours saved",
    subtitle:
      "Before Vox, writing was a battle. Now, it\u2019s a conversation.",
    name: "Greg Dickson",
    role: "Author",
    initials: "GD",
    color: "#C4C4E8",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center rounded-2xl p-8"
      style={{
        backgroundColor: "var(--section-light-bg)",
        width: 368,
        minHeight: 250,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full text-sm font-semibold"
        style={{
          width: 56,
          height: 56,
          backgroundColor: testimonial.color,
          color: "#1A1A1A",
        }}
      >
        {testimonial.initials}
      </div>
      <p
        className="text-center leading-6 mt-4 mb-4"
        style={{
          fontSize: 16,
          color: "var(--foreground)",
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto text-center">
        <p
          className="font-semibold"
          style={{ fontSize: 14, color: "var(--foreground)" }}
        >
          {testimonial.name}
        </p>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)" }}>
          {testimonial.title}
        </p>
      </div>
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div
      className="relative rounded-3xl p-10"
      style={{ backgroundColor: "var(--section-green-bg)" }}
    >
      <div className="absolute top-6 right-6">
        <ArrowUpRight
          size={24}
          style={{ color: "rgba(3, 79, 70, 1)" }}
          className="opacity-60"
          strokeWidth={2}
        />
      </div>
      <p
        className="font-[family-name:var(--font-heading)]"
        style={{ fontSize: 36, color: "#F0D7FF" }}
      >
        {study.stat}
      </p>
      <p
        className="mt-2"
        style={{ fontSize: 16, color: "rgba(255, 255, 235, 0.7)" }}
      >
        {study.subtitle}
      </p>
      <div className="flex items-center gap-3 mt-8">
        <div
          className="flex items-center justify-center rounded-full text-sm font-semibold"
          style={{
            width: 48,
            height: 48,
            backgroundColor: study.color,
            color: "#1A1A1A",
          }}
        >
          {study.initials}
        </div>
        <div>
          <p
            className="font-semibold"
            style={{ fontSize: 14, color: "#FFFFEB" }}
          >
            {study.name}
          </p>
          <p style={{ fontSize: 14, color: "rgba(255, 255, 235, 0.5)" }}>
            {study.role}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Decorative sparkle lines around the heading */
function SparkleLines() {
  const lines = [
    { top: "10%", left: "20%", rotate: -30, height: 28 },
    { top: "5%", left: "35%", rotate: 45, height: 22 },
    { top: "15%", right: "25%", rotate: -60, height: 36 },
    { top: "8%", right: "18%", rotate: 20, height: 24 },
    { bottom: "20%", left: "22%", rotate: 50, height: 32 },
    { bottom: "15%", right: "30%", rotate: -40, height: 26 },
    { top: "30%", left: "12%", rotate: 70, height: 20 },
    { top: "25%", right: "12%", rotate: -15, height: 30 },
  ];

  return (
    <>
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: line.top,
            left: line.left,
            right: line.right,
            bottom: line.bottom,
            width: 2,
            height: line.height,
            backgroundColor: "var(--section-green-bg)",
            transform: `rotate(${line.rotate}deg)`,
          }}
        />
      ))}
    </>
  );
}

export function TestimonialsSection() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className="overflow-hidden"
      style={{
        backgroundColor: "var(--section-dark-bg)",
        borderRadius: "32px 32px 0 0",
        padding: "80px 24px",
      }}
    >
      {/* Heading with sparkle lines */}
      <div className="relative mx-auto max-w-3xl text-center mb-16">
        <SparkleLines />
        <h2
          className="font-[family-name:var(--font-heading)]"
          style={{
            fontSize: 80,
            fontWeight: 400,
            color: "#FFFFEB",
            lineHeight: 1.1,
          }}
        >
          Love letters to Vox
        </h2>
      </div>

      {/* Testimonial Marquee */}
      <div className="overflow-hidden w-full mb-10">
        <div
          className="flex gap-6"
          style={{
            width: "fit-content",
            animation: "marqueeScroll 40s linear infinite",
          }}
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <TestimonialCard
              key={`${testimonial.initials}-${i}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>

      {/* Featured Case Study Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto"
        style={{ maxWidth: 1200, marginTop: 40 }}
      >
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.name} study={study} />
        ))}
      </div>
    </section>
  );
}
