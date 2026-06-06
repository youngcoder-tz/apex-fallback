// fallback/src/app/page.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Activity,
  Terminal,
  Server,
  Cpu,
  Lock,
  Loader2,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Zap,
  Globe,
  Database,
  BarChart3,
  Network,
} from "lucide-react";

// ─── TYPES & INTERFACES ──────────────────────────────────────────────

interface EdgeNode {
  city: string;
  region: string;
  ping: number;
  status: "ONLINE" | "OPTIMAL" | "MAINTENANCE";
}

// ─── MAIN LANDING PAGE ────────────────────────────────────────────────
export default function NexusEdgeCommandCenter() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "firewall">(
    "telemetry",
  );
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [activeUsersCount, setActiveUsersCount] = useState(148);
  const [processedEvents, setProcessedEvents] = useState(1894220);

  // 1. Simulated Global Edge Nodes (East/South Africa and Europe)
  const edgeNodes: EdgeNode[] = useMemo(
    () => [
      {
        city: "Dar es Salaam",
        region: "dar04 (TZ)",
        ping: 12,
        status: "OPTIMAL",
      },
      {
        city: "Johannesburg",
        region: "jnb01 (ZA)",
        ping: 34,
        status: "ONLINE",
      },
      { city: "London", region: "lhr02 (UK)", ping: 72, status: "ONLINE" },
      { city: "Dublin", region: "dub05 (IE)", ping: 84, status: "ONLINE" },
    ],
    [],
  );

  // 2. Real-Time Counter Fluctuations (Wow-Factor)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsersCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setProcessedEvents((prev) => prev + Math.floor(Math.random() * 8) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 3. Simulated Real-Time Ingestion Logs (Mirrors your actual Sentry logs!)
  useEffect(() => {
    const logTemplates = [
      "INCOMING: 197.186.66.3 -> /api/collect (Dar es Salaam, TZ)",
      "ENRICH: Resolved device: iOS 16 / Mobile Safari / iPhone",
      "SECURITY: Shield WAF check passed (No anomalies detected)",
      "ANOMALY: Calculated geo-velocity: 14.2 km/h (Normal)",
      "METRICS: Appending Core Web Vitals (LCP: 1.2s, CLS: 0.02)",
      "MON: Batching 42 processed events to MongoDB...",
      "MON: Database write-batch committed successfully",
      "REDIS: Updated active sessions set for project cmoama8r...",
      "PUB_SUB: Broadcasting live telemetry packet to NestJS...",
      "INCOMING: 41.218.12.84 -> /api/collect (Johannesburg, ZA)",
      "ENRICH: Resolved device: Linux / Firefox 151 / Desktop",
      'SECURITY: Flagged Tor Exit Node ip: Some("185.220.101.4")',
      "SECURITY: Blocking suspicious packet. Moved to Ingest_DLQ.",
    ];

    setConsoleLogs([]);
    let logIndex = 0;

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      setConsoleLogs((prev) => {
        const updated = [
          ...prev,
          `[${timestamp}] ${logTemplates[logIndex % logTemplates.length]}`,
        ];
        return updated.slice(-20); // Keep only latest 20 logs
      });
      logIndex++;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-screen bg-[#020617] flex flex-col justify-between p-4 md:p-6 lg:p-8 text-white overflow-x-hidden font-sans">
      {/* 🔮 Glow Effects */}
      <div className="absolute -left-60 -top-60 h-[800px] w-[800px] rounded-full bg-cyan-500/5 blur-[160px]" />
      <div className="absolute -right-60 -bottom-60 h-[800px] w-[800px] rounded-full bg-violet-500/5 blur-[160px]" />

      {/* ─── HEADER ─── */}
      <header className="max-w-[1400px] w-full mx-auto flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center font-mono font-black text-white shadow-lg shadow-cyan-500/20">
            N
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight text-white">
              NexusHub Edge
            </h2>
            <p className="text-[9px] text-gray-500 font-mono tracking-wider uppercase">
              Sovereign Gate v0.1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            Live Ingress Active
          </span>
        </div>
      </header>

      {/* ─── HERO & GRID CONSOLE ─── */}
      <main className="max-w-[1400px] w-full mx-auto my-auto grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10 py-8">
        {/* Left Hand: Majestic Narrative (Span 5) */}
        <div className="xl:col-span-5 flex flex-col justify-center text-left space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1.5 text-xs font-mono font-bold text-violet-400">
            <Zap className="h-4 w-4 animate-bounce" />
            Next-Gen Sentry Protocol
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            The Intelligence <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Telemetry Pipeline.
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-gray-400 max-w-lg">
            NexusHub Analytics Sentry is a decentralized, edge-native telemetry
            engine designed for Africa’s boldest software projects. We process
            clickstreams, calculate Core Web Vitals, and assess risk profiles
            globally under sub-10ms latencies.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://gnexus.co.tz"
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 px-6 py-3.5 text-sm font-bold text-[#020617] shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Access Master Portal <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://endpoints.gnexus.co.tz/api-docs"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            >
              Explore API Docs <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Hand: Interactive Sentry HUD Dashboard (Span 7) */}
        <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Card 1: Active Ingress Counters (Span 12) */}
          <div className="md:col-span-12 grid grid-cols-3 gap-4">
            <MetricWidget
              title="Live Visitors"
              value={activeUsersCount}
              sub="Active sessions"
              icon={Globe}
              color="text-cyan-400"
            />
            <MetricWidget
              title="Ingested Events"
              value={processedEvents.toLocaleString()}
              sub="Total Mongo writes"
              icon={Database}
              color="text-violet-500"
            />
            <MetricWidget
              title="WAF Threat Shield"
              value="99.9%"
              sub="Uptime operational"
              icon={ShieldCheck}
              color="text-emerald-500"
            />
          </div>

          {/* Card 2: Simulated Live Ingestion Terminal (Span 7) */}
          <div className="md:col-span-7 rounded-2xl border border-white/5 bg-[#090d1a]/80 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <h3 className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
                <Terminal className="h-4 w-4 text-cyan-400" /> Live Ingestion
                Terminal
              </h3>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="h-[240px] w-full bg-[#030712] rounded-xl border border-white/5 p-3.5 font-mono text-[9px] leading-relaxed text-gray-400 overflow-y-auto space-y-1.5 custom-scrollbar text-left">
              {consoleLogs.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-600 gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin text-cyan-500" />
                  Awaiting Edge handshake...
                </div>
              ) : (
                consoleLogs.map((log, i) => (
                  <div key={i} className="truncate">
                    <span className="text-cyan-500">&gt;</span> {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Card 3: Global Edge Clusters Ping HUD (Span 5) */}
          <div className="md:col-span-5 rounded-2xl border border-white/5 bg-[#090d1a]/80 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between text-left">
            <h3 className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
              <Network className="h-4 w-4 text-violet-500" /> Edge Clusters
            </h3>

            <div className="space-y-3 my-4">
              {edgeNodes.map((node, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-[#030712]/50 border border-white/5 p-2"
                >
                  <div>
                    <p className="text-[10px] font-bold text-white leading-none">
                      {node.city}
                    </p>
                    <p className="text-[8px] font-mono text-gray-500 mt-1 uppercase">
                      {node.region}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono font-bold text-cyan-400 leading-none">
                      {node.ping}ms
                    </p>
                    <span className="text-[8px] font-bold text-emerald-500 uppercase mt-1 inline-block">
                      ● {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[9px] text-gray-500 leading-normal">
              Cloudflare Anycast coordinates traffic routing dynamically through
              local East and South African servers.
            </p>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="max-w-[1400px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5 pt-6 text-[10px] font-mono text-gray-500 tracking-widest relative z-10">
        <span>
          © {new Date().getFullYear()} G-NEXUS LTD. — SECURE INFRASTRUCTURE
        </span>
        <div className="flex gap-4">
          <a
            href="https://gnexus.co.tz/privacy"
            className="hover:text-cyan-400 transition-colors"
          >
            Privacy Policy
          </a>
          <span>•</span>
          <a
            href="https://gnexus.co.tz/terms"
            className="hover:text-cyan-400 transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </footer>

      {/* Custom Scrollbar Styles (Injected locally for zero config) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </div>
  );
}

// ─── HELPER METRIC ROW COMPONENT ────────────────────────────────────

interface MetricWidgetProps {
  title: string;
  value: string | number;
  sub: string;
  icon: any;
  color: string;
}

function MetricWidget({
  title,
  value,
  sub,
  icon: Icon,
  color,
}: MetricWidgetProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#090d1a]/80 p-4 shadow-xl backdrop-blur-xl text-left hover:border-cyan-500/20 transition-all">
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-all" />
      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-500 relative z-10">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        {title}
      </div>
      <h3 className="mt-2 font-mono text-xl md:text-2xl font-black text-white relative z-10">
        {value}
      </h3>
      <p className="mt-1 text-[8px] text-gray-500 font-medium relative z-10">
        {sub}
      </p>
    </div>
  );
}
