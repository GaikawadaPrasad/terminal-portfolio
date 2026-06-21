import React from "react";

const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "HTML5/CSS3", level: 90 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Express.js", level: 75 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Vercel/Netlify", level: 90 },
      { name: "Capacitor/Vite", level: 80 },
    ],
  },
];

export default function Skills() {
  const BAR_LENGTH = 15;

  const renderBar = (level) => {
    const filled = Math.round((level / 100) * BAR_LENGTH);
    const empty = BAR_LENGTH - filled;
    return (
      <span className="skill-bar">
        <span className="skill-bar-filled">{"█".repeat(filled)}</span>
        <span className="skill-bar-empty">{"░".repeat(empty)}</span>
      </span>
    );
  };

  return (
    <fieldset className="cli-fieldset">
      <legend className="cli-legend">[/] skills.txt</legend>

      <div className="skills-container">
        {SKILLS.map((group) => (
          <div key={group.category} className="skill-group">
            <div className="skill-group-header"># {group.category}</div>
            <div className="skill-items-list">
              {group.items.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <span className="skill-name">{skill.name.padEnd(16)}</span>
                  {renderBar(skill.level)}
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cli-divider">--------------------------------------------------</div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
        Always learning -- Currently exploring:{" "}
        <span style={{ color: "var(--cyan)" }}>React Native · Docker · PostgreSQL</span>
      </p>
    </fieldset>
  );
}
