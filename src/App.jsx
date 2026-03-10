import { useState, useEffect, useRef } from "react";

const skills = [
  { category: "Programming", items: ["Java", "Python", "react js"], icon: "☕" },
  { category: "Automation Tools", items: ["Selenium WebDriver"], icon: "🤖" },
  { category: "Frameworks", items: ["Cucumber (BDD)", "POM", "TestNG"], icon: "🏗️" },
  { category: "Build & CI/CD", items: ["Maven", "Jenkins"], icon: "⚙️" },
  { category: "Defect Tracking", items: ["JIRA", "DevOps", "TFS"], icon: "🐛" },
  { category: "Version Control", items: ["Git"], icon: "🔀" },
  { category: "Database", items: ["JDBC", "MySQL", "Mangodb"], icon: "🗄️" },
];

const projects = [
  {
    title: "KENZO",
    duration: "Sept 2023 – Nov 2026",
    tech: ["Java", "Selenium", "POM", "Cucumber", "Git"],
    description:
      "Web application automation for a luxury fashion brand's boutique e-commerce platform. Automated testing across desktop, mobile and tablet devices for merchandise and services.",
    responsibilities: [
      "Test Automation using Selenium WebDriver Cucumber Framework",
      "Cross Browser Testing (Firefox, Chrome, IE, Safari)",
      "Data Driven Tests and Framework execution",
      "End to End scenario identification and code modularity",
      "Defect analysis, reporting and regression tracking",
    ],
    color: "from-violet-600 to-indigo-600",
    accent: "#7c3aed",
  },
  {
    title: "BO-Concept",
    duration: "May 2021 – Sept 2023",
    tech: ["Java", "Selenium", "POM", "TestNG", "Git", "MySQL"],
    description:
      "E-commerce automation for a global furniture brand with 300+ stores in 60+ countries. Covered buying, contract and franchise of products across online services.",
    responsibilities: [
      "System, Smoke, Functional and Regression Testing",
      "UI Automation using Selenium with Java and TestNG",
      "MySQL data validation and integration testing",
      "Knowledge Transfer to new team members",
      "Black-box testing and test script reviews",
    ],
    color: "from-emerald-600 to-teal-600",
    accent: "#059669",
  },
];

const expertise = [
  "Selenium WebDriver",
  "BDD Cucumber",
  "Page Object Model",
  "Data Driven Testing",
  "TestNG Framework",
  "XPATH Creation",
  "JIRA / DevOps",
  "Agile / Scrum",
  "Smoke Testing",
  "Regression Testing",
  "Functional Testing",
  "End-to-End Testing",
];

function Card3D({ children, className = "" }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const rx = (-dy / (rect.height / 2)) * 10;
    const ry = (dx / (rect.width / 2)) * 10;
    setTransform(`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`);
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x: px, y: py, opacity: 0.12 });
  };

  const handleMouseLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: "transform 0.15s ease",
        transformStyle: "preserve-3d",
        position: "relative",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      {children}
    </div>
  );
}

function FloatingOrb({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        ...style,
        filter: "blur(80px)",
        animation: "floatOrb 8s ease-in-out infinite alternate",
      }}
    />
  );
}

export default function ArunaPortfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((v) => ({ ...v, [e.target.id]: true }));
            setActiveSection(e.target.id);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2e 50%, #0a0a1a 100%)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
        
        @keyframes floatOrb {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, -40px) scale(1.1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .reveal { opacity: 0; transform: translateY(40px); }
        .reveal.visible { animation: fadeSlideUp 0.7s ease forwards; }
        .reveal-left { opacity: 0; transform: translateX(-40px); }
        .reveal-left.visible { animation: fadeSlideLeft 0.7s ease forwards; }
        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #a78bfa);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .glass-strong {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .nav-pill {
          transition: all 0.3s ease;
        }
        .nav-pill:hover, .nav-pill.active {
          background: rgba(167,139,250,0.2);
          color: #a78bfa;
        }
        .tech-tag {
          background: rgba(167,139,250,0.15);
          border: 1px solid rgba(167,139,250,0.3);
          transition: all 0.2s;
        }
        .tech-tag:hover {
          background: rgba(167,139,250,0.3);
          transform: translateY(-2px);
        }
        .skill-bar-fill {
          animation: none;
        }
        .skill-card:hover .skill-bar-fill {
          transition: width 1s ease;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a1a; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 2px; }
      `}</style>

      {/* BG Orbs */}
      <FloatingOrb style={{ top: "5%", left: "10%", width: 400, height: 400, background: "rgba(124,58,237,0.15)" }} />
      <FloatingOrb style={{ top: "40%", right: "5%", width: 500, height: 500, background: "rgba(59,130,246,0.1)", animationDelay: "3s" }} />
      <FloatingOrb style={{ bottom: "10%", left: "30%", width: 350, height: 350, background: "rgba(52,211,153,0.08)", animationDelay: "5s" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
        <div className="glass rounded-full px-6 py-3 flex gap-1">
          {["home", "about", "skills", "projects", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`nav-pill px-4 py-1.5 rounded-full text-sm font-medium capitalize ${activeSection === s ? "active" : "text-gray-400"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center relative px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-16" style={{ perspective: "1200px" }}>

          {/* LEFT — Text content */}
          <div className="flex-1 text-left" style={{ animation: "fadeSlideUp 1s ease 0.1s both" }}>
            <p className="text-sm font-medium tracking-[0.3em] text-violet-400 mb-4 uppercase">
              Software Test Engineer
            </p>
            <h1
              className="text-5xl md:text-7xl font-black mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="shimmer-text">Aruna R</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              5 years of expertise in {"versuche technologies pvt ltd, Chennai "}
              <span className="text-violet-400 font-semibold">Automation & Manual Testing</span>{" "}
              — crafting quality software through precision, frameworks, and relentless attention to detail.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {["Selenium", "Java", "BDD Cucumber", "TestNG", "POM", "Jenkins"].map((t) => (
                <span key={t} className="tech-tag px-4 py-1.5 rounded-full text-sm font-medium text-violet-300">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-3 rounded-full font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", boxShadow: "0 8px 30px rgba(124,58,237,0.4)" }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-3 rounded-full font-semibold text-sm glass text-gray-300 hover:text-white transition-colors"
              >
                Contact Me
              </button>
              <a
                href="/Arunaresume.docx"
                download="Aruna_R_CV.docx"
                className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0f172a, #1e1040)",
                  border: "1.5px solid rgba(167,139,250,0.5)",
                  color: "#a78bfa",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.2)",
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-12">
              {[["5+", "Years Exp"], ["2", "Projects"], ["10+", "Tools"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-3xl font-black shimmer-text">{num}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D Avatar card */}
          <div className="flex-shrink-0 flex items-center justify-center" style={{ animation: "fadeSlideUp 1s ease 0.3s both" }}>
            <div style={{ perspective: "800px" }}>
              <Card3D className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "conic-gradient(from 0deg, #7c3aed, #3b82f6, #34d399, #7c3aed)",
                    animation: "spin-slow 6s linear infinite",
                    padding: 3,
                    borderRadius: "50%",
                    filter: "blur(2px)",
                  }}
                />
                {/* Avatar circle */}
                <div
                  className="relative flex items-center justify-center rounded-full select-none"
                  style={{
                    width: 280,
                    height: 280,
                    background: "linear-gradient(135deg, #13102a 0%, #1a1040 50%, #0d1b2e 100%)",
                    border: "3px solid transparent",
                    backgroundClip: "padding-box",
                    boxShadow: "0 0 80px rgba(124,58,237,0.5), 0 0 160px rgba(59,130,246,0.25), inset 0 0 60px rgba(124,58,237,0.1)",
                    animation: "float 6s ease-in-out infinite",
                  }}
                >
                  {/* Decorative inner ring */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      inset: 12,
                      border: "1px solid rgba(167,139,250,0.2)",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      inset: 24,
                      border: "1px dashed rgba(96,165,250,0.15)",
                      borderRadius: "50%",
                      animation: "spin-slow 12s linear infinite reverse",
                    }}
                  />

                  {/* Initials */}
                  <div className="relative z-10 text-center">
                    <p
                      className="font-black leading-none shimmer-text"
                      style={{ fontSize: 72, fontFamily: "'Playfair Display', serif" }}
                    >
                      AR
                    </p>
                    <p className="text-violet-400 text-xs tracking-[0.25em] uppercase mt-1 font-medium">
                      Test Engineer
                    </p>
                    <p className="text-xs">versuche technologies pvt ltd</p>
                  </div>

                  {/* Floating skill badges around the circle */}
                  {[
                    { label: "Java", angle: -60, dist: 155 },
                    { label: "Selenium", angle: 10, dist: 165 },
                    { label: "BDD", angle: 80, dist: 155 },
                    { label: "Git", angle: 150, dist: 158 },
                    { label: "JIRA", angle: 220, dist: 155 },
                    { label: "TestNG", angle: 290, dist: 160 },
                  ].map(({ label, angle, dist }) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * dist;
                    const y = Math.sin(rad) * dist;
                    return (
                      <div
                        key={label}
                        className="absolute px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          background: "rgba(124,58,237,0.4)",
                          border: "1px solid rgba(167,139,250,0.5)",
                          backdropFilter: "blur(8px)",
                          whiteSpace: "nowrap",
                          boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                        }}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>

                {/* Pulse rings */}
                {[0, 0.6, 1.2].map((delay) => (
                  <div
                    key={delay}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      border: "1.5px solid rgba(167,139,250,0.3)",
                      borderRadius: "50%",
                      animation: `pulse-ring 3s ease-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                ))}
              </Card3D>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, transparent, #7c3aed)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 max-w-6xl mx-auto">
        <div className={`reveal ${visible["about"] ? "visible" : ""}`}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Professional <span className="shimmer-text">Synopsis</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card3D className="glass-strong rounded-3xl p-8" style={{}}>
            <div className={`reveal ${visible["about"] ? "visible" : ""}`} style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                  🎯
                </div>
                <h3 className="text-xl font-bold">Objective</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Seeking a challenging software engineering position in an organization that rewards dedication and proficiency in <span className="text-violet-300 font-semibold">Testing with Automation</span>.
              </p>
            </div>
          </Card3D>

          <Card3D className="glass-strong rounded-3xl p-8">
            <div className={`reveal ${visible["about"] ? "visible" : ""}`} style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #059669, #0d9488)" }}>
                  🎓
                </div>
                <h3 className="text-xl font-bold">Education</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="font-semibold text-white">MCA — 88%</p>
                  <p className="text-violet-400 text-sm">Anjalai Ammal Mahalingam Engineering College</p>
                  <p className="text-gray-500 text-xs mt-1">2011 – 2014</p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <p className="font-semibold text-white">BSc — 84%</p>
                  <p className="text-violet-400 text-sm">Sengamala Thayaar Educational Trust Women's College</p>
                  <p className="text-gray-500 text-xs mt-1">2008 – 2011</p>
                </div>
              </div>
            </div>
          </Card3D>

          <Card3D className="glass-strong rounded-3xl p-8 md:col-span-2">
            <div className={`reveal ${visible["about"] ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #d97706, #dc2626)" }}>
                  💼
                </div>
                <h3 className="text-xl font-bold">Work Experience</h3>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="glass rounded-2xl px-6 py-4 text-center">
                  <p className="text-4xl font-black shimmer-text">5+</p>
                  <p className="text-gray-400 text-sm">Years Experience</p>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold text-white">Software Test Engineer</p>
                  <p className="text-violet-400 font-medium">Versuche technologies pvt ltd, Chennai</p>
                  <p className="text-gray-500 text-sm mt-1">Feb 2021 - Present</p>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                    Participated in all Agile ceremonies — planning, daily scrum, sprint delivery and reporting. Collaborated with developers, testers, and stakeholders to enhance software product quality.
                  </p>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-6 max-w-6xl mx-auto">
        <div className={`reveal ${visible["skills"] ? "visible" : ""}`}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Technical <span className="shimmer-text">Skills</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {skills.map((s, i) => (
            <Card3D
              key={s.category}
              className={`glass-strong rounded-2xl p-5 skill-card reveal ${visible["skills"] ? "visible" : ""}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">{s.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-full text-white/80" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </Card3D>
          ))}
        </div>

        {/* Expertise tags cloud */}
        <div className={`reveal ${visible["skills"] ? "visible" : ""}`} style={{ animationDelay: "0.5s" }}>
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">Testing Expertise</p>
          <div className="flex flex-wrap gap-3">
            {expertise.map((e, i) => (
              <span
                key={e}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 transition-all hover:scale-105 cursor-default"
                style={{
                  background: `hsla(${(i * 27 + 250) % 360}, 60%, 25%, 0.3)`,
                  border: `1px solid hsla(${(i * 27 + 250) % 360}, 60%, 50%, 0.3)`,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 px-6 max-w-6xl mx-auto">
        <div className={`reveal ${visible["projects"] ? "visible" : ""}`}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Featured <span className="shimmer-text">Projects</span>
          </h2>
        </div>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <Card3D
              key={p.title}
              className={`glass-strong rounded-3xl overflow-hidden reveal ${visible["projects"] ? "visible" : ""}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left accent bar */}
                <div
                  className={`md:w-2 h-2 md:h-auto bg-gradient-to-b ${p.color} flex-shrink-0`}
                  style={{ background: `linear-gradient(to bottom, ${p.accent}, transparent)` }}
                />
                <div className="p-8 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-1">{p.title}</h3>
                      <p className="text-sm text-gray-500">{p.duration}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="tech-tag px-3 py-1 rounded-full text-xs font-medium text-violet-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-6">{p.description}</p>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Responsibilities</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {p.responsibilities.map((r) => (
                        <div key={r} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 max-w-3xl mx-auto text-center">
        <div className={`reveal ${visible["contact"] ? "visible" : ""}`}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's <span className="shimmer-text">Connect</span>
          </h2>
          <p className="text-gray-400 mb-12 leading-relaxed">
            Open to new opportunities. Committed, result-oriented, and always interested in learning new technologies.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          <Card3D className={`glass-strong rounded-2xl p-6 reveal ${visible["contact"] ? "visible" : ""}`} style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl mb-3">📞</div>
            <p className="text-gray-500 text-sm mb-1">Phone</p>
            <p className="text-white font-semibold">+91 7418449906</p>
          </Card3D>
          <Card3D className={`glass-strong rounded-2xl p-6 reveal ${visible["contact"] ? "visible" : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl mb-3">📧</div>
            <p className="text-gray-500 text-sm mb-1">Email</p>
            <a href="mailto:aruna.baby31@gmail.com" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors break-all">
              aruna.baby31@gmail.com
            </a>
          </Card3D>
        </div>

        <Card3D className={`glass-strong rounded-3xl p-8 text-center reveal ${visible["contact"] ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
          <p className="text-gray-400 text-sm leading-relaxed mb-2 italic">
            "I hereby declare that the details furnished above are true to the best of my knowledge."
          </p>
          <p className="text-white font-bold text-lg mt-4">— Aruna R</p>
          <p className="text-violet-400 text-sm">Software Test Engineer • Chennai, India</p>
        </Card3D>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-white/5">
        <p>© 2026 Aruna R — Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}