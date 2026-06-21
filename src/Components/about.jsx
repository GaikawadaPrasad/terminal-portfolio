import React from "react";

export default function About() {
  return (
    <div className="section-card">
      <div className="section-title">
        <span className="icon">[+]</span> About Me
      </div>

      <div className="info-row">
        <span className="info-label">Name</span>
        <span className="info-value">Prasad Gaikawada</span>
      </div>
      <div className="info-row">
        <span className="info-label">Role</span>
        <span className="info-value">Frontend Developer</span>
      </div>
      <div className="info-row">
        <span className="info-label">Focus</span>
        <span className="info-value">React · Next.js · Full-Stack</span>
      </div>
      <div className="info-row">
        <span className="info-label">Location</span>
        <span className="info-value">India</span>
      </div>
      <div className="info-row">
        <span className="info-label">Portfolio</span>
        <span className="info-value">
          <a href="https://princeprasad24.github.io/prasad-portfolio/" target="_blank" rel="noreferrer">
            prasad-portfolio [link]
          </a>
        </span>
      </div>
      <div className="info-row">
        <span className="info-label">Status</span>
        <span className="info-value" style={{ color: "var(--green)" }}>
          [OPEN] Available for work
        </span>
      </div>

      <hr className="divider" />

      <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", lineHeight: "1.8" }}>
        I'm a passionate frontend developer who loves crafting clean, performant
        and visually stunning web apps. I enjoy turning ideas into reality through
        code -- from sleek UIs to powerful full-stack applications.
      </p>
    </div>
  );
}
