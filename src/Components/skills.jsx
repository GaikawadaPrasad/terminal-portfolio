import React from "react";

// Skills section — no emojis
const SKILLS = [
  {
    category: "Languages",
    tags: ["JavaScript", "HTML5", "CSS3", "TypeScript"],
  },
  {
    category: "Frameworks & Libraries",
    tags: ["React.js", "Next.js", "Express.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Backend & Database",
    tags: ["Node.js", "MongoDB", "REST APIs", "Mongoose"],
  },
  {
    category: "Tools & Platforms",
    tags: ["Git", "GitHub", "VS Code", "Netlify", "Vercel", "Vite", "Capacitor"],
  },
];

export default function Skills() {
  return (
    <div className="section-card">
      <div className="section-title">
        <span className="icon">[/]</span> Technical Skills
      </div>

      <div className="skills-grid">
        {SKILLS.map((group) => (
          <div key={group.category} className="skill-category-block">
            <div className="skill-cat-title">{group.category}</div>
            <div className="skill-tags">
              {group.tags.map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="divider" />
      <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
        Always learning -- Currently exploring:{" "}
        <span style={{ color: "var(--cyan)" }}>React Native · Docker · PostgreSQL</span>
      </p>
    </div>
  );
}
