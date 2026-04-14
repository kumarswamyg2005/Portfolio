import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiAcademicCap, HiCodeBracket, HiLightBulb } from "react-icons/hi2";

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
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "-5%",
              width: "550px",
              height: "550px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(99,102,241,0.05) 0%, transparent 65%)",
              filter: "blur(65px)",
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
              className="font-display font-extrabold tracking-tight"
              style={{
                fontSize: "clamp(2rem,5vw,3.25rem)",
                lineHeight: "1.1",
                color: "var(--text-primary)",
              }}
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
            {/* Left — Identity */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center md:items-start gap-5"
            >
              <div className="text-center md:text-left w-full">
                <h3
                  className="font-display font-bold tracking-tight"
                  style={{
                    fontSize: "1.6rem",
                    color: "var(--text-primary)",
                    letterSpacing: "0.02em",
                  }}
                >
                  G.N. Kumaraswamy
                </h3>
                <p
                  className="font-body text-sm mt-1"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}
                >
                  IIIT Sri City · Andhra Pradesh, India
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 my-3">
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start">
                  <span className="status-tag">Open to Internships</span>
                  <span className="status-tag status-tag-teal">
                    B.Tech CSE, IIIT Sri City
                  </span>
                </div>
              </div>
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
