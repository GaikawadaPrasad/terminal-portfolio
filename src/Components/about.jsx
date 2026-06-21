import React from "react";

export default function About() {
  return (
    <fieldset className="cli-fieldset">
      <legend className="cli-legend">[+] about.txt</legend>

      <div className="info-row">
        <span className="info-label">Name......:</span>
        <span className="info-value">Prasad Gaikawada</span>
      </div>
      <div className="info-row">
        <span className="info-label">Role......:</span>
        <span className="info-value">Full Stack Developer</span>
      </div>
     
      <div className="info-row">
        <span className="info-label">Location..:</span>
        <span className="info-value">India</span>
      </div>
      <div className="info-row">
        <span className="info-label">Portfolio.:</span>
        <span className="info-value">
          <a href="https://gaikawadaprasad.github.io/prasad-portfolio/" target="_blank" rel="noreferrer">
            prasad-portfolio [link]
          </a>
        </span>
      </div>
      <div className="info-row">
        <span className="info-label">Status....:</span>
        <span className="info-value" style={{ color: "var(--green)" }}>
          [OPEN] Available for work
        </span>
      </div>

      <div className="cli-divider">--------------------------------------------------</div>

      <p className="cli-paragraph">
        I'm a passionate full stack developer who loves crafting clean, performant
        and visually stunning web apps. I enjoy turning ideas into reality through
        code -- from sleek UIs to powerful full-stack applications.
      </p>
    </fieldset>
  );
}
