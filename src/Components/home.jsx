import React from "react";

const ASCII_BANNER = `
██████╗ ██████╗  █████╗ ███████╗ █████╗ ██████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗
██████╔╝██████╔╝███████║███████╗███████║██║  ██║
██╔═══╝ ██╔══██╗██╔══██║╚════██║██╔══██║██║  ██║
██║     ██║  ██║██║  ██║███████║██║  ██║██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝`.trim();

export default function Home() {
  return (
    <div
      className="section-card"
      style={{ border: "none", background: "transparent", padding: "8px 0" }}
    >
      <pre>
        <p>terminal@user:~$</p>

        <p>terminal@user:~$vdp install terminal-portfolio</p>

        <p>terminal-portfolio@0.0.0 dev</p>
        <p>terminal@user:~$terminal-portfolio -v</p>

        <p>portfolio [Version 0.3.2]</p>

      </pre>
      <pre className="ascii-art">{ASCII_BANNER}</pre>

      
      <hr className="divider" />
      <p>terminal@user:~$terminal-portfolio</p>
      <p>Welcome to my terminal portfolio!</p>
      <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
        Type <span style={{ color: "var(--green)" }}>help</span> to see all
        commands. Use <span style={{ color: "var(--amber)" }}>Up/Down</span> to
        browse history. Press <span style={{ color: "var(--amber)" }}>Tab</span>{" "}
        to autocomplete.
      </p>
    </div>
  );
}
