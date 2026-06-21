import React from "react";

export const COMMANDS = [
  {
    category: "Navigation",
    items: [
      { cmd: "home",      desc: "Show welcome banner" },
      { cmd: "about",     desc: "Who am I?" },
      { cmd: "skills",    desc: "Technical skill set" },
      { cmd: "projects",  desc: "Portfolio of projects" },
      { cmd: "contact",   desc: "Contact & social links" },
    ],
  },
  {
    category: "Terminal",
    items: [
      { cmd: "help",                    desc: "Show this command list" },
      { cmd: "clear",                   desc: "Clear the terminal" },
      { cmd: "ls",                      desc: "List directory files (about.txt, skills.txt, etc.)" },
      { cmd: "cat [file]",              desc: "Display file content" },
      { cmd: "banner",                  desc: "Show ASCII banner again" },
      { cmd: "whoami",                  desc: "Who is the visitor?" },
      { cmd: "time",                    desc: "Current time" },
      { cmd: "date",                    desc: "Current date" },
      { cmd: "theme [green|amber|cyan]",desc: "Switch terminal color theme" },
    ],
  },
  {
    category: "External",
    items: [
      { cmd: "resume",    desc: "Open resume / CV" },
      { cmd: "switchGUI", desc: "Open GUI portfolio in new tab" },
      { cmd: "exit",      desc: "Close terminal (about:blank)" },
    ],
  },
];

// Help component is no longer rendered directly —
// help output is now pushed as sequential text lines from App.jsx.
// This file only exports COMMANDS for use by App.jsx and tab-completion.
export default function Help() {
  return null;
}
