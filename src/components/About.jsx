import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiAcademicCap, HiCodeBracket, HiLightBulb, HiMapPin } from "react-icons/hi2";
import TiltCard from "./TiltCard";

const HIGHLIGHTS = [
  {
    icon: <HiAcademicCap size={19} />,
    title: "Education",
    body: "B.Tech in Computer Science & Engineering, Indian Institute of Information Technology (IIIT), Sri City — 3rd Year.",
  },
  {
    icon: <HiCodeBracket size={19} />,
    title: "Engineering",
    body: "I love building full-stack web apps and AI/ML pipelines — from React frontends and REST APIs to deep learning models trained from scratch.",
  },
  {
    icon: <HiLightBulb size={19} />,
    title: "Research Interest",
    body: "Currently exploring computer vision, NLP, and reinforcement learning — with a focus on applying them to real-world problems.",
  },
];

const ICON_COLORS = ["#6366f1", "#2dd4bf", "#818cf8"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <div className="section-divider" />
      <section
        id="about"
        className="py-28 relative"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              position: "absolute",
              inset: "0 0 auto 0",
              height: "280px",
              background:
                "linear-gradient(120deg, rgba(56,189,248,0.08), transparent 42%, rgba(251,113,133,0.05))",
              opacity: 0.75,
            }}
          />
        </div>

        <div className="section-container" ref={ref}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-3 mb-16"
          >
            <motion.span variants={fadeUp} className="label-editorial">
              01 / WHO I AM
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading"
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              style={{
                height: "1px",
                width: "48px",
                background:
                  "linear-gradient(90deg, var(--accent), transparent)",
              }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            {/* Left — Holo ID card (3D tilt) */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5 md:sticky md:top-28"
            >
              <TiltCard max={10} className="holo-card" data-cursor="pointer">
                <div className="holo-card-shine" aria-hidden="true" />
                <div className="holo-card-header">
                  <span className="holo-card-chip" aria-hidden="true" />
                  <span className="holo-card-label">DEV·ID / 2026</span>
                </div>

                <div className="holo-avatar" aria-hidden="true">
                  <span>GNK</span>
                </div>

                <h3 className="holo-name">G.N. Kumaraswamy</h3>
                <p className="holo-role">AI Product Engineer · Full-Stack ML</p>

                <div className="holo-meta">
                  <span><HiMapPin size={12} /> IIIT Sri City, India</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="status-tag">Open to Internships</span>
                  <span className="status-tag status-tag-teal">B.Tech CSE · 3rd Yr</span>
                </div>

                <div className="holo-barcode" aria-hidden="true">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <i key={i} style={{ opacity: 0.25 + ((i * 7) % 10) / 14 }} />
                  ))}
                </div>
              </TiltCard>
              <p className="holo-hint">tilt me — i follow your cursor ✦</p>
            </motion.div>

            {/* Right — Bio */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-col gap-5"
            >
              <motion.p
                variants={fadeUp}
                className="font-body text-base md:text-[1.05rem]"
                style={{ color: "var(--text-secondary)", lineHeight: "1.85" }}
              >
                I'm a 3rd-year CS undergrad passionate about building things
                that live at the intersection of{" "}
                <span style={{ color: "var(--text-primary)" }}>
                  intelligent systems
                </span>{" "}
                and{" "}
                <span style={{ color: "var(--text-primary)" }}>
                  great user experiences
                </span>
                . I work across the full stack — from writing neural networks in
                PyTorch to shipping polished React interfaces.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-body text-base"
                style={{ color: "var(--text-secondary)", lineHeight: "1.85" }}
              >
                When I'm not coding, I'm reading research papers, contributing
                to open-source, or competing in hackathons. I believe the best
                engineers are relentlessly curious and never stop building.
              </motion.p>

              {HIGHLIGHTS.map(({ icon, title, body }, idx) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="about-card flex gap-4 p-4"
                >
                  <div
                    style={{
                      marginTop: "2px",
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      borderRadius: "6px",
                      background: `${ICON_COLORS[idx]}12`,
                      border: `1px solid ${ICON_COLORS[idx]}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ICON_COLORS[idx],
                    }}
                  >
                    {icon}
                  </div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h4
                      className="font-display font-semibold text-sm mb-1"
                      style={{
                        color: "var(--text-primary)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      className="font-body text-sm"
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: "1.75",
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
