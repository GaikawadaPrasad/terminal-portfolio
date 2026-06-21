import React from "react";

const PROJECTS = [
  {
    id: "01",
    name: "AI-Based IoT System for Early Failure Detection",
    desc: "Developed an AI-powered IoT system to monitor electrical appliances using current, voltage, temperature, and vibration sensors. Built a React.js dashboard with Chart.js for real-time monitoring, appliance health analysis, and visualization of sensor data. Integrated ESP32 with Firebase for live data collection, cloud storage, and remote monitoring. Implemented machine learning models for anomaly detection and early prediction of appliance failures to support preventive maintenance.",
    tech: [
      "React.js",
      "Chart.js",
      "ESP32",
      "Python",
      "Firebase",
      "Machine Learning",
      "IoT Sensors",
    ],
    link: "https://github.com/GaikawadaPrasad/IntelliSense-web",
  },

  {
    id: "02",
    name: "Chat App (Chat Karo)",
    desc: "A real-time chat application built using the MERN stack that enables secure one-to-one messaging with user authentication and instant communication using Socket.io.",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Socket.io",
      "React Hot Toast",
    ],
    link: "https://github.com/GaikawadaPrasad/chat-frontend",
  },

  {
    id: "03",
    name: "Sri Sri Associates",
    desc: "A comprehensive, secure B2B SaaS platform custom-built for a financial consulting and loan brokerage firm. Enables agents to submit customer leads with multi-document upload support, tracks lead status throughout a disbursed-to-rejected pipeline, integrates an interactive EMI calculator, and automates employee attendance (Punch In/Out), leave management, and monthly performance target tracking.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "JWT Auth",
      "Cloudinary API",
      "Framer Motion",
    ],
    link: "",
  },
  {
    id: "04",
    name: "GUI Portfolio",
    desc: "Modern animated portfolio with dark mode, skill bars and smooth scroll.",
    tech: ["React", "CSS Animations"],
    link: "https://gaikawadaprasad.github.io/prasad-portfolio/",
  },
  {
    id: "05",
    name: "More Project",
    desc: "To see more projects .",
    tech: [""],
    link: "https://gaikawadaprasad.github.io/prasad-portfolio/#projects",
  },

];

export default function Projects() {
  return (
    <fieldset className="cli-fieldset">
      <legend className="cli-legend">[*] projects.txt</legend>

      <div className="projects-container">
        {PROJECTS.map((p, idx) => (
          <div key={p.id} className="cli-project-item">
            {idx > 0 && (
              <div className="cli-item-separator">
                ├──────────────────────────────────────────────────┤
              </div>
            )}
            <div className="project-header-row">
              <span className="project-id">[{p.id}]</span>
              <span className="project-title-text">{p.name}</span>
            </div>
            <div className="project-details">
              <div className="project-detail-row">
                <span className="detail-label">Desc:</span>
                <span className="detail-value">{p.desc}</span>
              </div>
              <div className="project-detail-row">
                <span className="detail-label">Tech:</span>
                <span className="detail-value tech-value">
                  {p.tech.join(" · ")}
                </span>
              </div>
              {p.link && (
                <div className="project-detail-row">
                  <span className="detail-label">Link:</span>
                  <span className="detail-value">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="cli-link"
                    >
                      {p.link}
                    </a>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
