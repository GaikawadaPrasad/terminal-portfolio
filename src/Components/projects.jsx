import React from "react";

const PROJECTS = [
  {
    name: "[01] VDP Gaming Hub",
    desc: "A gaming news and discovery platform with modern UI and smooth animations.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://vdp-gaming-hub.netlify.app/",
  },
  {
    name: "[02] Password Strength Checker",
    desc: "Real-time password strength analyzer with entropy scoring and suggestions.",
    tech: ["React", "JavaScript"],
    link: "https://private-key.netlify.app/",
  },
  {
    name: "[03] Chat App (Chat Karo)",
    desc: "Full-stack real-time chat with rooms, auth, and Socket.io websockets.",
    tech: ["Node.js", "Socket.io", "MongoDB", "Express"],
    link: "https://vdp-chat-karo.up.railway.app/",
  },
  {
    name: "[04] Melodix Music Player",
    desc: "Offline-first music player with IndexedDB, playlists and Capacitor mobile build.",
    tech: ["React", "Zustand", "IndexedDB", "Capacitor"],
    link: null,
  },
  {
    name: "[05] GUI Portfolio",
    desc: "Modern animated portfolio with dark mode, skill bars and smooth scroll.",
    tech: ["React", "CSS Animations"],
    link: "https://princeprasad24.github.io/prasad-portfolio/",
  },
];

export default function Projects() {
  return (
    <div className="section-card">
      <div className="section-title">
        <span className="icon">[*]</span> Projects
      </div>

      <div className="project-list">
        {PROJECTS.map((p) => (
          <div key={p.name} className="project-card">
            <div className="project-name">{p.name}</div>
            <div className="project-desc">{p.desc}</div>
            <div className="project-tech">
              {p.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
            {p.link && (
              <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                -&gt; View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
