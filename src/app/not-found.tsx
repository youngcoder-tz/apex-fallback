// fallback/src/app/not-found.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  AlertOctagon,
  RefreshCw,
  Home,
  ShieldCheck,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";

export default function EdgeNotFound() {
  const [currentPath, setCurrentPath] = useState("/unknown-sector");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // 1. Capture the exact invalid route the user typed
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // 2. Simulated Sentry Diagnostic Scan Logs
  useEffect(() => {
    const logs = [
      `[TRACE] Initiating route resolution for: ${currentPath}`,
      `[WARN] DNS wildcard match succeeded, but path mapping failed.`,
      `[SYS] Comparing requested coordinates against local MongoDB catalog...`,
      `[SYS] Index search returned 0 matching records for [${currentPath}].`,
      `[NLP] NLP conversational routing engine: No semantic matches.`,
      `[WARN] Coordinate drift detected. Target sector unreachable.`,
      `[SEC] Nexus Shield™: Purging invalid session packets...`,
      `[SYS] Handshake terminated. Connection closed safely.`,
    ];

    setTerminalLogs([]);
    let logIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        const timestamp = new Date().toLocaleTimeString();
        setTerminalLogs((prev) => [
          ...prev,
          `[${timestamp}] ${logs[logIndex]}`,
        ]);
        logIndex++;
      } else {
        clearInterval(interval);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [currentPath]);

  return (
    <div className="relative min-h-screen w-screen bg-[#020617] flex items-center justify-center p-4 md:p-6 lg:p-8 text-white overflow-hidden font-sans">
      {/* Background Ambient Plasma Orbs */}
      <div className="absolute -left-60 -top-60 h-[800px] w-[800px] rounded-full bg-red-500/5 blur-[160px]" />
      <div className="absolute -right-60 -bottom-60 h-[800px] w-[800px] rounded-full bg-amber-500/5 blur-[160px]" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* ─── LEFT PANEL: THE LOST COORDINATE HUD (Span 7) ─── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-red-500/20 bg-[#090d1a]/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/50"
        >
          {/* HUD Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 font-mono text-[9px] font-bold text-red-500 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              Signal Lost / 404
            </span>
            <span className="font-mono text-[9px] text-gray-500 tracking-wider">
              SECTOR: OUTER_RIM
            </span>
          </div>

          {/* Glitching 404 Icon & Identity */}
          <div className="my-8 space-y-4 text-left">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 font-mono text-3xl font-black text-red-500 shadow-xl shadow-red-500/5">
                404
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-none">
                  Coordinate Drift
                </h1>
                <p className="text-[9px] text-red-500 font-mono font-bold tracking-wider uppercase mt-1">
                  Path Resolution Failed
                </p>
              </div>
            </div>

            {/* Error Description */}
            <p className="text-sm text-gray-400 leading-relaxed">
              Your browser attempted to establish an uplink with the sector{" "}
              <code className="bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono text-xs break-all">
                {currentPath}
              </code>
              . Our edge routing cluster completed its trace but found no
              registered nodes matching these coordinates.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 px-4 py-3 text-xs font-bold text-white transition-all active:scale-95"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-scan Route
            </button>
            <a
              href="https://gnexus.co.tz"
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-red-500/15 transition-all active:scale-95"
            >
              <Home className="h-3.5 w-3.5" /> Return Home
            </a>
          </div>
        </motion.div>

        {/* ─── RIGHT PANEL: TERMINAL AUDIT & METRICS (Span 5) ─── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Interactive Diagnostic Hub */}
          <div className="rounded-2xl border border-white/5 bg-[#090d1a]/50 p-4 backdrop-blur-md text-left">
            <h3 className="mb-3 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              <Terminal className="h-3.5 w-3.5 text-red-500" /> Trace Diagnostic
              Logs
            </h3>

            <div className="h-[148px] w-full bg-[#030712] rounded-xl border border-white/5 p-3.5 font-mono text-[9px] leading-relaxed text-gray-400 overflow-y-auto space-y-1.5 custom-scrollbar">
              {terminalLogs.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-600 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Initializing probe...
                </div>
              ) : (
                terminalLogs.map((log, i) => (
                  <div key={i} className="truncate">
                    <span className="text-red-500">&gt;</span> {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sentry Metric Diagnostics */}
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#090d1a]/50 to-[#030712]/30 p-5 backdrop-blur-md space-y-4 text-left">
            <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">
              <Activity className="h-3.5 w-3.5 text-red-500" /> Sentry Vitals
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[#030712]/40 border border-white/5 px-3.5 py-2">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">
                    Network Mapping
                  </p>
                  <p className="font-mono text-xs font-bold text-white mt-0.5">
                    Packet Drift Detected
                  </p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#030712]/40 border border-white/5 px-3.5 py-2">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">
                    Security Shield
                  </p>
                  <p className="font-mono text-xs font-bold text-emerald-400 mt-0.5">
                    Auto-Defense Armed
                  </p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </div>
            </div>

            <p className="text-[9px] text-gray-500 leading-normal">
              Our automated WAF firewall immediately intercepts unresolved
              pathways to prevent brute-force directory-traversal attacks.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
