import React from "react";

const CONTACTS = [
  {
    icon: "[in]",
    label: "LinkedIn",
    display: "prasadgaikawada",
    href: "https://www.linkedin.com/in/prasadgaikawada/",
  },
  {
    icon: "[gh]",
    label: "GitHub",
    display: "princeprasad24",
    href: "https://github.com/princeprasad24",
  },
  {
    icon: "[@]",
    label: "Email",
    display: "via portfolio contact form",
    href: "https://princeprasad24.github.io/prasad-portfolio/#contact",
  },
  {
    icon: "[>>]",
    label: "Portfolio",
    display: "prasad-portfolio [link]",
    href: "https://princeprasad24.github.io/prasad-portfolio/",
  },
];

export default function Contact() {
  return (
    <div className="section-card">
      <div className="section-title">
        <span className="icon">[~]</span> Get In Touch
      </div>

      {CONTACTS.map((c) => (
        <div key={c.label} className="contact-item">
          <span className="contact-icon" style={{ fontFamily: "monospace", fontWeight: "bold" }}>
            {c.icon}
          </span>
          <span className="contact-label">{c.label}</span>
          <a href={c.href} target="_blank" rel="noreferrer" className="info-value">
            <span style={{ color: "var(--cyan)", borderBottom: "1px dashed var(--cyan)" }}>
              {c.display}
            </span>
          </a>
        </div>
      ))}

      <hr className="divider" />
      <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
        Open to freelance, full-time and collaboration opportunities.
      </p>
    </div>
  );
}
