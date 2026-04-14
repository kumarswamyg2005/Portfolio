import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiTensorflow,
  SiPytorch,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiMongodb,
  SiOpencv,
  SiPandas,
} from "react-icons/si";
import skills from "../data/skills";

const ICON_MAP = {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiTensorflow,
  SiPytorch,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiMongodb,
  SiOpencv,
  SiPandas,
};

const CATEGORY_META = {
  Languages:               { color: "#6366f1", label: "Languages" },
  "Frameworks & Libraries":{ color: "#2dd4bf", label: "Frameworks & Libraries" },
  "Tools & Platforms":     { color: "#94a3b8", label: "Tools & Platforms" },
  "AI / ML":               { color: "#818cf8", label: "AI / ML" },
};

function Badge({ name, icon, index, inView, categoryColor }) {
  const IconComponent = ICON_MAP[icon] || SiHtml5;
  const ref = useRef(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const timer = setTimeout(
      () => el.classList.add("animate-power-on"),
      (index % 14) * 75,
    );
    return () => clearTimeout(timer);
  }, [inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 14) * 0.045,
      }}
      className="skill-badge flex items-center gap-2.5 px-4 py-2.5"
      style={{ "--badge-color": categoryColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = categoryColor + "50";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${categoryColor}35, 0 0 14px ${categoryColor}20`;
        const icon = e.currentTarget.querySelector("svg");
        if (icon) icon.style.color = categoryColor;
        const txt = e.currentTarget.querySelector("span");
        if (txt) txt.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
        const icon = e.currentTarget.querySelector("svg");
        if (icon) icon.style.color = "var(--text-muted)";
        const txt = e.currentTarget.querySelector("span");
        if (txt) txt.style.color = "var(--text-secondary)";
      }}
    >
      <IconComponent
        size={16}
        style={{
          color: "var(--text-muted)",
          transition: "color 0.22s ease",
          flexShrink: 0,
        }}
      />
      <span
        className="font-body text-sm whitespace-nowrap"
        style={{
          color: "var(--text-secondary)",
          transition: "color 0.22s ease",
          lineHeight: 1,
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <div className="section-divider" />
      <section
        id="skills"
        className="py-28 relative grid-pattern"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "-8%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(99,102,241,0.05) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div
          className="section-container"
          ref={ref}
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 mb-16"
          >
            <span className="label-editorial">02 / TECH STACK</span>
            <h2
              className="font-display font-extrabold tracking-tight"
              style={{
                fontSize: "clamp(2rem,5vw,3.25rem)",
                lineHeight: "1.1",
                color: "var(--text-primary)",
              }}
            >
              Skills &amp; <span className="gradient-text">Tech Stack</span>
            </h2>
            <div
              style={{
                height: "1px",
                width: "48px",
                background:
                  "linear-gradient(90deg, var(--accent), transparent)",
              }}
            />
          </motion.div>

          <div className="flex flex-col gap-12">
            {skills.map((group, gIdx) => {
              const meta = CATEGORY_META[group.category] || {
                color: "#c1121f",
                label: group.category,
              };
              return (
                <div key={group.category}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: gIdx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span
                      className="category-chip"
                      style={{ "--chip-color": meta.color }}
                    >
                      {meta.label}
                    </span>
                  </motion.div>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((skill, idx) => (
                      <Badge
                        key={skill.name}
                        name={skill.name}
                        icon={skill.icon}
                        index={gIdx * 10 + idx}
                        inView={inView}
                        categoryColor={meta.color}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-14 font-body text-sm text-center tracking-wide"
            style={{ color: "rgba(148,163,184,0.5)" }}
          >
            … and always learning more. Currently exploring{" "}
            <span style={{ color: "var(--accent-light)" }}>Rust</span> and{" "}
            <span style={{ color: "var(--accent-light)" }}>
              Reinforcement Learning
            </span>
            .
          </motion.p>
        </div>
      </section>
    </>
  );
}
