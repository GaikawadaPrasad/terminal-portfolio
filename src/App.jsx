import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

import { COMMANDS } from "./help";
import Home from "./Components/home";
import About from "./Components/about";
import Skills from "./Components/skills";
import Contact from "./Components/contact";
import Projects from "./Components/projects";

const ALL_COMMANDS = COMMANDS.flatMap((g) =>
  g.items.map((i) => i.cmd.split(" ")[0])
);

const BOOT_LINES = [
  { text: "BIOS v2.1 -- Initializing hardware ...", delay: 0 },
  { text: "[  OK  ] Memory check passed (16 GB)", delay: 120, ok: true },
  { text: "[  OK  ] Loading kernel modules ...", delay: 240, ok: true },
  { text: "[  OK  ] Mounting filesystem ...", delay: 360, ok: true },
  { text: "[ WARN ] GUI mode disabled -- terminal mode active", delay: 480, warn: true },
  { text: "[  OK  ] Network interface up (127.0.0.1)", delay: 600, ok: true },
  { text: "[  OK  ] Starting terminal-portfolio@0.3.0 ...", delay: 720, ok: true },
  { text: "\u2500".repeat(60), delay: 840 },
];

// Unique key counter — avoids key collisions during rapid sequential pushes
let _keyCounter = 0;
const nextKey = () => `ol-${++_keyCounter}`;

// ── Prompt ─────────────────────────────────────────────────────────────────
function Prompt() {
  return (
    <span className="prompt">
      <span className="user-part">prasad</span>
      <span className="at-part">@</span>
      <span className="host-part">portfolio</span>
      <span className="at-part">:</span>
      <span className="dir-part">~</span>
      <span className="dollar">$ </span>
    </span>
  );
}

// ── Boot screen ────────────────────────────────────────────────────────────
function BootScreen({ onDone }) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisible((prev) => [...prev, i]), line.delay);
    });
    const doneTimer = setTimeout(onDone, 960);
    return () => clearTimeout(doneTimer);
  }, [onDone]);

  return (
    <>
      {BOOT_LINES.map((line, i) =>
        visible.includes(i) ? (
          <div
            key={i}
            className={`output-line boot-line ${line.ok ? "boot-ok" : ""} ${
              line.warn ? "boot-warn" : ""
            }`}
          >
            {line.text}
          </div>
        ) : null
      )}
    </>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [input, setInput]       = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [booted, setBooted]     = useState(false);
  const [time, setTime]         = useState(new Date());
  const [theme, setTheme]       = useState("green");
  const [tabHints, setTabHints] = useState([]);
  const [output, setOutput]     = useState([]);
  const [history, setHistory]   = useState([]);
  const [histIdx, setHistIdx]   = useState(-1);

  const inputRef  = useRef(null);
  const bottomRef = useRef(null);

  // ── Clock ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // ── Auto-scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [output, booted, tabHints]);

  // ── Boot done callback ───────────────────────────────────────────────────
  const handleBooted = useCallback(() => {
    setBooted(true);
    // Push welcome output sequentially
    const welcome = [
      { type: "component", value: <Home /> },
      { type: "text", value: "Type 'help' to see available commands.", cls: "info" },
    ];
    welcome.forEach((item, i) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, { ...item, key: nextKey() }]);
      }, i * 60);
    });
  }, []);

  // ── Focus input on click ─────────────────────────────────────────────────
  const focusInput = () => {
    if (window.getSelection()?.toString() === "") {
      inputRef.current?.focus();
    }
  };

  // ── Sequential push — items appear one by one, `delay` ms apart ──────────
  const pushSequential = useCallback((items, delay = 45) => {
    items.forEach((item, i) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, { ...item, key: nextKey() }]);
      }, i * delay);
    });
  }, []);

  // ── Tab completion ───────────────────────────────────────────────────────
  const handleTab = useCallback(
    (e) => {
      e.preventDefault();
      const val = input.toLowerCase();
      const trimmedVal = val.trim();
      if (!trimmedVal) return;

      // File autocomplete for cat
      if (trimmedVal.startsWith("cat ")) {
        const filePart = trimmedVal.slice(4).trim();
        const files = ["about.txt", "skills.txt", "projects.txt", "contact.txt", "resume.txt"];
        const matches = files.filter((f) => f.startsWith(filePart));
        if (matches.length === 1) {
          const completed = `cat ${matches[0]}`;
          setInput(completed);
          setCursorPos(completed.length);
          setTabHints([]);
        } else if (matches.length > 1) {
          setTabHints(matches);
        }
        return;
      }

      const matches = ALL_COMMANDS.filter((c) => c.startsWith(trimmedVal));
      if (matches.length === 1) {
        setInput(matches[0]);
        setCursorPos(matches[0].length);
        setTabHints([]);
      } else if (matches.length > 1) {
        setTabHints(matches);
      }
    },
    [input]
  );

  // ── Run a command ────────────────────────────────────────────────────────
  const runCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim();
      setTabHints([]);

      // Prompt echo (appears immediately)
      const promptEcho = { type: "prompt-echo", cmd: trimmed, key: nextKey() };

      if (!trimmed) {
        setOutput((prev) => [...prev, promptEcho]);
        return;
      }

      // Add to history
      setHistory((prev) => {
        const next = [...prev, trimmed];
        setHistIdx(next.length);
        return next;
      });

      const parts = trimmed.split(/\s+/);
      const baseCmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      // Clear is special — wipe immediately
      if (baseCmd === "clear") {
        setOutput([]);
        return;
      }

      setOutput((prev) => [...prev, promptEcho]);

      let items = [];

      switch (baseCmd) {
        case "help": {
          items.push({ type: "text", value: "Available Commands:", cls: "help-header-line" });
          COMMANDS.forEach((group) => {
            items.push({ type: "text", value: "", cls: "" }); // blank spacer
            items.push({ type: "text", value: `-- ${group.category} --`, cls: "help-cat" });
            group.items.forEach((item) => {
              const cmdPad = item.cmd.padEnd(28);
              items.push({ type: "text", value: `  ${cmdPad}${item.desc}`, cls: "help-row" });
            });
          });
          items.push({ type: "text", value: "", cls: "" });
          items.push({ type: "text", value: "Tip: Tab to autocomplete  |  Up/Down for history", cls: "info" });
          break;
        }

        case "ls":
        case "dir":
          items = [
            {
              type: "text",
              value: "about.txt    skills.txt    projects.txt    contact.txt    resume.txt",
              cls: "files-list",
            },
          ];
          break;

        case "cat": {
          const filename = args[0] ? args[0].toLowerCase() : "";
          if (!filename) {
            items = [{ type: "text", value: "cat: missing operand. Usage: cat [filename]", cls: "error" }];
          } else if (filename === "about.txt") {
            items = [{ type: "component", value: <About /> }];
          } else if (filename === "skills.txt") {
            items = [{ type: "component", value: <Skills /> }];
          } else if (filename === "projects.txt") {
            items = [{ type: "component", value: <Projects /> }];
          } else if (filename === "contact.txt") {
            items = [{ type: "component", value: <Contact /> }];
          } else if (filename === "resume.txt") {
            items = [{ type: "text", value: "-> Opening resume in new tab ...", cls: "info" }];
            window.open("https://princeprasad24.github.io/prasad-portfolio/", "_blank");
          } else {
            items = [{ type: "text", value: `cat: ${args[0]}: No such file or directory`, cls: "error" }];
          }
          break;
        }

        case "cd": {
          const dir = args[0];
          if (!dir || dir === "~" || dir === ".") {
            items = [{ type: "text", value: "bash: cd: already in root directory (~)", cls: "info" }];
          } else {
            items = [
              {
                type: "text",
                value: `bash: cd: ${dir}: Permission denied (directory traversal restricted)`,
                cls: "error",
              },
            ];
          }
          break;
        }

        case "home":
          items = [{ type: "component", value: <Home /> }];
          break;

        case "about":
          items = [{ type: "component", value: <About /> }];
          break;

        case "skills":
          items = [{ type: "component", value: <Skills /> }];
          break;

        case "projects":
          items = [{ type: "component", value: <Projects /> }];
          break;

        case "contact":
          items = [{ type: "component", value: <Contact /> }];
          break;

        case "whoami":
          items = [
            { type: "text", value: "-> You are a visitor exploring Prasad's terminal portfolio.", cls: "info" },
            { type: "text", value: "-> User: guest | Permissions: read-only | Shell: /bin/bash", cls: "info" },
          ];
          break;

        case "time":
          items = [
            {
              type: "text",
              value: `[TIME]  ${time.toLocaleTimeString("en-US", { hour12: true })}`,
              cls: "success",
            },
          ];
          break;

        case "date":
          items = [
            {
              type: "text",
              value: `[DATE]  ${time.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`,
              cls: "success",
            },
          ];
          break;

        case "banner":
          items = [{ type: "component", value: <Home /> }];
          break;

        case "resume":
          items = [{ type: "text", value: "-> Opening resume in new tab ...", cls: "info" }];
          window.open("https://princeprasad24.github.io/prasad-portfolio/", "_blank");
          break;

        case "theme": {
          const t = args[0];
          if (["green", "amber", "cyan"].includes(t)) {
            setTheme(t);
            items = [{ type: "text", value: `[OK] Theme switched to "${t}".`, cls: "success" }];
          } else {
            items = [{ type: "text", value: "Usage: theme [green|amber|cyan]", cls: "error" }];
          }
          break;
        }

        case "switchGUI":
          items = [{ type: "text", value: "-> Launching GUI portfolio in new tab ...", cls: "info" }];
          window.open("https://princeprasad24.github.io/prasad-portfolio/", "_blank");
          break;

        case "exit":
          items = [{ type: "text", value: "Goodbye! Closing session ...", cls: "info" }];
          setTimeout(() => (window.location.href = "about:blank"), 800);
          break;

        default:
          items = [
            { type: "text", value: `bash: ${baseCmd}: command not found`, cls: "error" },
            { type: "text", value: "Type 'help' or 'ls' for available commands.", cls: "" },
          ];
      }

      const startDelay = 30;
      items.forEach((item, i) => {
        setTimeout(() => {
          setOutput((prev) => [...prev, { ...item, key: nextKey() }]);
        }, startDelay + i * 45);
      });
    },
    [pushSequential, time]
  );

  // ── Keyboard ─────────────────────────────────────────────────────────────
  const syncCursor = (e) => {
    setCursorPos(e.target.selectionStart ?? 0);
  };

  const keyDown = (e) => {
    if (e.key === "Tab") { handleTab(e); return; }
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setCursorPos(0);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistory((hist) => {
        const newIdx = Math.max(histIdx - 1, 0);
        setHistIdx(newIdx);
        const val = hist[newIdx] ?? "";
        setInput(val);
        setCursorPos(val.length);
        return hist;
      });
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistory((hist) => {
        const newIdx = Math.min(histIdx + 1, hist.length);
        setHistIdx(newIdx);
        const val = hist[newIdx] ?? "";
        setInput(val);
        setCursorPos(val.length);
        return hist;
      });
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setTabHints([]);
    setCursorPos(e.target.selectionStart ?? 0);
  };

  // ── Render ───────────────────────────────────────────────────────────────
  const before = input.slice(0, cursorPos);
  const charAtCursor = input.slice(cursorPos, cursorPos + 1) || " ";
  const after = input.slice(cursorPos + 1);

  return (
    <div className={`crt-wrapper ${theme !== "green" ? `theme-${theme}` : ""}`}>
      <div className="terminal-window">

        {/* Title bar */}
        <div className="title-bar">
          <div className="title-bar-dots">
            <span className="dot red" title="Close" onClick={() => (window.location.href = "about:blank")} />
            <span className="dot yellow" title="Minimize" />
            <span className="dot green" title="Maximize" />
          </div>
          <span className="title-bar-title">prasad@portfolio -- terminal</span>
          <div className="title-bar-status">
            <span className="status-dot" />
            <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>

        {/* Single scrollable terminal body */}
        <div className="terminal-body" onClick={focusInput}>

          {/* Boot */}
          {!booted && <BootScreen onDone={handleBooted} />}

          {/* Output history */}
          {booted && output.map((item) => {
            if (item.type === "prompt-echo") {
              return (
                <div key={item.key} className="output-line">
                  <Prompt />
                  <span className="echoed-cmd">{item.cmd}</span>
                </div>
              );
            }
            if (item.type === "text") {
              return (
                <div key={item.key} className={`output-line ${item.cls || ""}`}>
                  {item.value}
                </div>
              );
            }
            if (item.type === "component") {
              return (
                <div key={item.key} className="output-line component-line">
                  {item.value}
                </div>
              );
            }
            return null;
          })}

          {/* Live input line — inline, right after output */}
          {booted && (
            <>
              {tabHints.length > 0 && (
                <div className="tab-hint">
                  {tabHints.map((h) => (
                    <span
                      key={h}
                      onClick={() => {
                        setInput(h);
                        setCursorPos(h.length);
                        setTabHints([]);
                        inputRef.current?.focus();
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}

              <div className="input-line">
                <Prompt />
                <div className="input-wrapper">
                  <div className="input-display">
                    <span className="input-text-before">{before}</span>
                    <span className="fake-cursor">{charAtCursor}</span>
                    <span className="input-text-after">{after}</span>
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onSelect={syncCursor}
                    onKeyUp={syncCursor}
                    onMouseUp={syncCursor}
                    onKeyDown={keyDown}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                    className="real-input"
                  />
                </div>
              </div>
            </>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
