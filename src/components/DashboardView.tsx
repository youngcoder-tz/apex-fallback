// fallback/src/app/page.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Hammer,
  ShieldCheck,
  HeartHandshake,
  Loader2,
  ArrowRight,
  Globe,
  Database,
  ExternalLink,
  Server,
  Terminal,
  Activity,
  ShieldAlert,
  Search,
  Monitor,
  Smartphone,
  Cpu,
} from "lucide-react";
import Image from "next/image";

// ─── TYPES & INTERFACES ──────────────────────────────────────────────

interface ProjectStatusResponse {
  id: string;
  name: string;
  status:
    | "PENDING_ASSIGNMENT"
    | "IN_DEVELOPMENT"
    | "IN_REVIEW"
    | "COMPLETED"
    | "LIVE"
    | "MAINTENANCE"
    | "SUSPENDED"
    | "OFFLINE_GRACEFUL";
  type: string;
  subdomain: string;
  profile: {
    logoUrl: string | null;
    overview: string | null;
  } | null;
}

interface Cluster {
  name: string;
  code: string;
  region: string;
  latency: number;
  status: "OPTIMAL" | "ONLINE" | "DEGRADED";
}

interface LogEntry {
  timestamp: string;
  type: "ENRICH" | "SECURITY" | "ANOMALY" | "METRICS" | "MON" | "SYSTEM";
  message: string;
}

export default function MultiSiteRouter() {
  const [subdomain, setSubdomain] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectStatusResponse | null>(null);

  const API_BASE = "https://endpoints.gnexus.co.tz";

  // 🚀 1. CLIENT-SIDE SUBDOMAIN PARSER (Bypasses Next router bugs)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");

      // If visiting via official domain on a subdomain, extract first segment
      if (
        parts.length > 2 &&
        parts[0] !== "demo" &&
        parts[0] !== "endpoints" &&
        parts[0] !== "sentry"
      ) {
        setSubdomain(parts[0]);
      } else {
        setSubdomain("demo-node"); // Local development fallback
      }
    }
  }, []);

  // 🚀 2. DYNAMIC FETCH (Fires immediately once subdomain is resolved)
  useEffect(() => {
    if (!subdomain) return;

    fetch(`${API_BASE}/projects/public/subdomain/${subdomain}`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        setProject(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to resolve subdomain status:", err);
        setIsLoading(false);
      });
  }, [subdomain, API_BASE]);

  // Loading Screen (Sleek light-mode loader)
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
        <p className="mt-4 font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Edge Connection Handshake...
        </p>
      </div>
    );
  }

  // Case A: Subdomain is completely unregistered in your database
  if (!project) {
    return <UnregisteredFallback subdomain={subdomain} />;
  }

  // Case B: Project is registered but NOT live yet
  if (project.status !== "LIVE") {
    return <ProvisionedFallback project={project} />;
  }

  // Case C: Project IS live -> Render the fully integrated Telemetry Dashboard
  return <DynamicDashboardView project={project} />;
}

// ─── 📊 LIVE SYSTEM DASHBOARD (CASE C) ────────────────────────────────

function DynamicDashboardView({ project }: { project: ProjectStatusResponse }) {
  const [visitors, setVisitors] = useState<number>(150);
  const [ingestedEvents, setIngestedEvents] = useState<number>(1894227);
  const [clusters, setClusters] = useState<Cluster[]>([
    {
      name: "Dar es Salaam",
      code: "DAR04",
      region: "TZ",
      latency: 12,
      status: "OPTIMAL",
    },
    {
      name: "Johannesburg",
      code: "JNB01",
      region: "ZA",
      latency: 34,
      status: "ONLINE",
    },
    {
      name: "London",
      code: "LHR02",
      region: "UK",
      latency: 72,
      status: "ONLINE",
    },
    {
      name: "Dublin",
      code: "DUB05",
      region: "IE",
      latency: 84,
      status: "ONLINE",
    },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: "3:17:21 PM",
      type: "ENRICH",
      message: "Resolved device: iOS 16 / Mobile Safari / iPhone",
    },
    {
      timestamp: "3:17:23 PM",
      type: "SECURITY",
      message: "Shield WAF check passed (No anomalies detected)",
    },
    {
      timestamp: "3:17:24 PM",
      type: "ANOMALY",
      message: "Calculated geo-velocity: 14.2 km/h (Normal)",
    },
    {
      timestamp: "3:17:26 PM",
      type: "METRICS",
      message: "Appending Core Web Vitals (LCP: 1.2s, CLS: 0.02)",
    },
    {
      timestamp: "3:17:27 PM",
      type: "MON",
      message: "Batching 42 processed events to MongoDB.",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: true });
  };

  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setVisitors((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(120, prev + delta);
      });
    }, 4000);

    const eventsInterval = setInterval(() => {
      setIngestedEvents((prev) => prev + Math.floor(Math.random() * 12) + 1);
    }, 800);

    const latencyInterval = setInterval(() => {
      setClusters((prevClusters) =>
        prevClusters.map((cluster) => {
          const jitter = Math.floor(Math.random() * 5) - 2;
          const nextLatency = Math.max(5, cluster.latency + jitter);
          return { ...cluster, latency: nextLatency };
        }),
      );
    }, 3000);

    const logTemplates = [
      {
        type: "ENRICH" as const,
        message: "Geolocated incoming IP packet to local edge node",
      },
      {
        type: "SECURITY" as const,
        message: "Inbound request matched signature rule: ID 4002 (Clean)",
      },
      {
        type: "METRICS" as const,
        message: "Latency benchmark computed: Edge RTT 8.4ms",
      },
      {
        type: "MON" as const,
        message: "Pipeline buffer synchronized with database engine cluster",
      },
      {
        type: "SYSTEM" as const,
        message: "Completed routing convergence check across global nodes",
      },
      {
        type: "ANOMALY" as const,
        message: "Fingerprint validation: Trust token verified",
      },
    ];

    const logInterval = setInterval(() => {
      const randomTemplate =
        logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const newLog: LogEntry = {
        timestamp: getFormattedTime(),
        type: randomTemplate.type,
        message: randomTemplate.message,
      };

      setLogs((prevLogs) => {
        const updated = [...prevLogs, newLog];
        return updated.slice(-5);
      });
    }, 5000);

    return () => {
      clearInterval(visitorInterval);
      clearInterval(eventsInterval);
      clearInterval(latencyInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case "SECURITY":
        return "text-emerald-400";
      case "ANOMALY":
        return "text-amber-400";
      case "METRICS":
        return "text-cyan-400";
      case "MON":
        return "text-purple-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      {/* Soft light theme background details */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-gradient-to-br from-blue-100/40 to-cyan-100/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100/30 to-transparent blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Header Bar */}
      <header className="border-b border-slate-200/80 bg-white/40 backdrop-blur-md px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.profile?.logoUrl ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-200 bg-white p-1">
                <Image
                  src={project.profile.logoUrl}
                  alt={project.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center border border-cyan-400/30 shadow-[0_4px_12px_rgba(6,182,212,0.15)]">
                <span className="font-extrabold text-white text-lg tracking-wider">
                  {project.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-sm font-bold tracking-wider text-slate-900 uppercase">
                {project.name}
              </h1>
              <p className="text-[9px] tracking-widest text-slate-400 uppercase font-mono">
                Sovereign Gate v0.1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 border border-cyan-500/20 rounded-full px-3 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-cyan-600 uppercase font-mono">
              Live Ingress Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 rounded-full px-4 py-1.5">
            <Activity className="h-3.5 w-3.5 text-cyan-600 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-cyan-600 uppercase font-mono">
              Next-Gen Sentry Protocol
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              The Intelligence
              <span className="block mt-1 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                Telemetry Pipeline.
              </span>
            </h2>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
            NexusHub Analytics Sentry is a decentralized, edge-native telemetry
            engine designed for Africa's boldest software projects. We process
            clickstreams, calculate Core Web Vitals, and assess risk profiles
            globally under sub-10ms latencies.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_14px_rgba(6,182,212,0.3)] active:scale-95">
              Access Master Portal
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs py-3.5 px-6 rounded-xl transition-all">
              Explore API Docs
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Live Visitors */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-cyan-600">
              <span className="text-[9px] font-bold tracking-widest uppercase font-mono text-slate-400">
                Live Visitors
              </span>
              <Globe className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                {visitors.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-medium">
                Active sessions
              </p>
            </div>
          </div>

          {/* Card 2: Ingested Events */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-indigo-600">
              <span className="text-[9px] font-bold tracking-widest uppercase font-mono text-slate-400">
                Ingested Events
              </span>
              <Database className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                {ingestedEvents.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-medium">
                Total Mongo writes
              </p>
            </div>
          </div>

          {/* Card 3: Threat Shield */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-emerald-600">
              <span className="text-[9px] font-bold tracking-widest uppercase font-mono text-slate-400">
                Waf Threat Shield
              </span>
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                99.9%
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-medium">
                Uptime operational
              </p>
            </div>
          </div>

          {/* Console / Terminal Terminal Block */}
          <div className="md:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-600" />
                <h3 className="text-[10px] font-bold tracking-widest text-slate-900 uppercase font-mono">
                  Live Ingestion Terminal
                </h3>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Keeps a high-contrast dark console inside the clean light theme */}
            <div className="bg-slate-900 border border-slate-950 rounded-xl p-4 font-mono text-[10px] leading-relaxed text-slate-300 space-y-2 h-[155px] overflow-y-auto scrollbar-none text-left">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-start gap-1 select-none"
                >
                  <span className="text-slate-600 font-medium">
                    [{log.timestamp}]
                  </span>
                  <span
                    className={`font-bold uppercase tracking-wider ${getLogTypeColor(log.type)}`}
                  >
                    {log.type}:
                  </span>
                  <span className="text-slate-100">{log.message}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Edge Clusters Status Widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between text-left">
            <div className="flex items-center gap-2 text-indigo-600">
              <Server className="h-4 w-4" />
              <h3 className="text-[10px] font-bold tracking-widest text-slate-900 uppercase font-mono">
                Edge Clusters
              </h3>
            </div>

            <div className="space-y-3 flex-grow py-1">
              {clusters.map((cluster) => (
                <div
                  key={cluster.name}
                  className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">
                      {cluster.name}
                    </p>
                    <p className="text-[8px] font-mono uppercase text-slate-400">
                      {cluster.code} ({cluster.region})
                    </p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-xs font-bold text-cyan-600 font-mono">
                      {cluster.latency}ms
                    </p>
                    <span className="text-[8px] font-mono text-emerald-500 uppercase flex items-center justify-end gap-1 font-semibold">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                      {cluster.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[8px] leading-normal text-slate-400 font-mono mt-1">
              Cloudflare Anycast coordinates traffic routing dynamically through
              local East and South African servers.
            </p>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-200/80 bg-white/20 px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} G-Nexus Ltd. — Secure Infrastructure
          </div>
          <div className="flex gap-4">
            <a
              href="#privacy"
              className="hover:text-slate-700 transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-700 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── STYLIZED BRAND FALLBACKS (LIGHT THEME) ─────────────────────────

/**
 * 🛠️ PROVISIONED FALLBACK (Project exists but in build phase)
 */
function ProvisionedFallback({ project }: { project: ProjectStatusResponse }) {
  const statusLabels = {
    PENDING_ASSIGNMENT: "Awaiting Developer Assignment",
    IN_DEVELOPMENT: "Active Construction Phase",
    IN_REVIEW: "Quality Assurance Review",
    COMPLETED: "Pre-Flight Check / Ready to Launch",
    MAINTENANCE: "Graceful System Maintenance",
    SUSPENDED: "Administrative Hold",
    OFFLINE_GRACEFUL: "Temporary Offline Grace Period",
    LIVE: "Operational",
  };

  return (
    <div className="relative min-h-screen w-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 overflow-hidden font-sans">
      <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-cyan-100/50 blur-[120px] -z-10" />
      <div className="absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-blue-100/40 blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-xl w-full text-center space-y-8 relative z-10"
      >
        <div className="flex items-center justify-center gap-2 text-xs font-black tracking-[0.25em] text-cyan-600 uppercase">
          <Sparkles className="h-4 w-4 animate-pulse" />
          NexusHub Infrastructure
        </div>

        <div className="flex flex-col items-center gap-4">
          {project.profile?.logoUrl ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <Image
                src={project.profile.logoUrl}
                alt={project.name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 font-mono text-3xl font-black text-white shadow-lg shadow-cyan-500/10">
              {project.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
            {project.name}
          </h2>
          <p className="text-xs font-mono text-cyan-600 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Status: {statusLabels[project.status]}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-md shadow-sm">
          <p className="text-sm leading-relaxed text-slate-500">
            {project.profile?.overview ||
              `This space has been successfully provisioned on the NexusHub edge network. Our elite developers are actively crafting the interface. Check back soon for the full experience!`}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-cyan-600" /> Secure
            </div>
            <p className="text-[10px] text-slate-400">SSL & DDoS Active</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Hammer className="h-4 w-4 text-cyan-600" /> Compiled
            </div>
            <p className="text-[10px] text-slate-400">Optimized at Edge</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <HeartHandshake className="h-4 w-4 text-cyan-600" /> Trusted
            </div>
            <p className="text-[10px] text-slate-400">Sovereign Build</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          POWERED BY NEXUSHUB CORE — PRE-ALPHA BUILD
        </div>
      </motion.div>
    </div>
  );
}

/**
 * 🚫 UNREGISTERED FALLBACK (Sovereign [subdomain] site not found Screen)
 */
function UnregisteredFallback({ subdomain }: { subdomain: string }) {
  return (
    <div className="min-h-screen w-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 relative overflow-hidden font-sans">
      <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-red-100/50 blur-[120px] -z-10" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto text-red-500 text-3xl">
          ⚠️
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          <span className="text-red-500 block text-lg font-mono lowercase tracking-wider mb-1">
            {subdomain}.gnexus.co.tz
          </span>
          Site Not Found
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          This specific virtual subdomain is currently unallocated or not mapped
          to an active project node in the NexusHub database. If you recently
          created this node, please allow 3 minutes for edge cache propagation.
        </p>
        <a
          href="https://apex.gnexus.co.tz"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-6 shadow-[0_4px_14px_rgba(15,23,42,0.15)] transition-all"
        >
          Go to Master Hub <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
