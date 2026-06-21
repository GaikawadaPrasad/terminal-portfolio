import React from "react";

const CONTACTS = [
  {
    icon: "in",
    label: "LinkedIn",
    display: "prasadgaikawada",
    href: "https://www.linkedin.com/in/prasadgaikawada/",
  },
  {
    icon: "gh",
    label: "GitHub",
    display: "GaikawadaPrasad",
    href: "https://github.com/GaikawadaPrasad",
  },
  {
    icon: "email",
    label: "Email",
    display: "venkatdurgaprasad755@gmail.com",
    href: "mailto:venkatdurgaprasad755@gmail.com",
  },
  {
    icon: "web",
    label: "Website",
    display: "prasad-portfolio [link]",
    href: "https://gaikawadaprasad.github.io/prasad-portfolio/",
  },
];

export default function Contact() {
  return (
    <fieldset className="cli-fieldset">
      <legend className="cli-legend">[~] contact.txt</legend>

      <div className="contact-container">
        {CONTACTS.map((c) => (
          <div key={c.label} className="contact-row">
            <span className="contact-label">{c.label.padEnd(10)}:</span>
            <span className="contact-value">
              <a href={c.href} target="_blank" rel="noreferrer" className="cli-link">
                {c.display}
              </a>
            </span>
          </div>
        ))}
      </div>

      <div className="cli-divider">--------------------------------------------------</div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
        Open to freelance, full-time and collaboration opportunities.
      </p>
    </fieldset>
  );
}
