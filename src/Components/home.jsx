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
    <div className="section-card" style={{ border: "none", background: "transparent", padding: "8px 0" }}>
      <pre className="ascii-art">{ASCII_BANNER}</pre>
      <div style={{ marginTop: "12px", fontSize: "0.85rem" }}>
        <p>
          <span style={{ color: "var(--cyan)" }}>visitor@terminal</span>
          <span style={{ color: "var(--text-dim)" }}>:~$ </span>
          <span>whoami</span>
        </p>
        <p style={{ marginTop: "4px", color: "var(--text-dim)" }}>
          -&gt; <span style={{ color: "var(--green)" }}>Prasad Gaikawada</span> -- Frontend Developer &amp; Creative Coder
        </p>
        <p style={{ color: "var(--text-dim)", marginTop: "4px" }}>
          -&gt; Based in India | Open to opportunities
        </p>
        <p style={{ color: "var(--text-dim)", marginTop: "4px" }}>
          -&gt; Building fast, clean &amp; responsive web experiences
        </p>
      </div>
      <hr className="divider" />
      <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
        Type <span style={{ color: "var(--green)" }}>help</span> to see all commands. Use{" "}
        <span style={{ color: "var(--amber)" }}>Up/Down</span> to browse history.{" "}
        Press <span style={{ color: "var(--amber)" }}>Tab</span> to autocomplete.
      </p>
    </div>
  );
}
