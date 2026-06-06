// frontend/app/_sites/[subdomain]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Hammer,
  ShieldCheck,
  HeartHandshake,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

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

export default function MultiSiteRouter() {
  const params = useParams();
  const subdomain = params?.subdomain as string;

  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectStatusResponse | null>(null);

  const API_BASE =
    process.env.NEXT_PUBLIC_NEXUS_API_URL || "https://endpoints.gnexus.co.tz";

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

  // Loading Screen (Hides structural flickers)
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#030712] text-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#06b6d4]" />
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

  // Case C: Project IS live (This is where you mount/import your custom dynamic client site components!)
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {project.name}
        </h1>
        <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          Production Node Active / Live
        </p>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          Welcome to your live production space. Hook up your compiled content
          components here.
        </p>
      </div>
    </div>
  );
}

// ─── STYLIZED BRAND FALLBACKS (NO MOCKUPS, PRODUCTION READY) ─────────

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
    <div className="relative min-h-screen w-screen bg-[#030712] flex items-center justify-center p-6 text-white overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute -left-40 -top-40 h-150 w-150 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute -right-40 -bottom-40 h-150 w-150 rounded-full bg-blue-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-xl w-full text-center space-y-8 relative z-10"
      >
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2 text-xs font-black tracking-[0.25em] text-cyan-400 uppercase">
          <Sparkles className="h-4 w-4 animate-pulse" />
          NexusHub Infrastructure
        </div>

        {/* Dynamic Project Brand Mark */}
        <div className="flex flex-col items-center gap-4">
          {project.profile?.logoUrl ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-white/5 p-2">
              <Image
                src={project.profile.logoUrl}
                alt={project.name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 font-mono text-3xl font-black text-white shadow-xl shadow-cyan-500/10">
              {project.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-2">
            {project.name}
          </h2>
          <p className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Status: {statusLabels[project.status]}
          </p>
        </div>

        {/* Narrative / Context */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md">
          <p className="text-sm leading-relaxed text-gray-400">
            {project.profile?.overview ||
              `This space has been successfully provisioned on the NexusHub edge network. Our elite developers are actively crafting the interface. Check back soon for the full experience!`}
          </p>
        </div>

        {/* Features Timeline */}
        <div className="grid grid-cols-3 gap-4 pt-2 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <ShieldCheck className="h-4 w-4 text-cyan-400" /> Secure
            </div>
            <p className="text-[10px] text-gray-400">SSL & DDoS Active</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Hammer className="h-4 w-4 text-cyan-400" /> Compiled
            </div>
            <p className="text-[10px] text-gray-400">Optimized at Edge</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <HeartHandshake className="h-4 w-4 text-cyan-400" /> Trusted
            </div>
            <p className="text-[10px] text-gray-400">Sovereign Build</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-6 text-[10px] font-mono uppercase tracking-widest text-gray-500">
          POWERED BY NEXUSHUB CORE — PRE-ALPHA BUILD
        </div>
      </motion.div>
    </div>
  );
}

/**
 * 🚫 UNREGISTERED FALLBACK (Domain points to server but has no database record)
 */
function UnregisteredFallback({ subdomain }: { subdomain: string }) {
  return (
    <div className="min-h-screen w-screen bg-[#030712] flex items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute -left-40 -top-40 h-150 w-150 rounded-full bg-red-500/5 blur-[120px]" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto text-red-500 text-3xl">
          ⚠️
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Unregistered Subdomain
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          The subdomain{" "}
          <code className="bg-white/5 px-1.5 py-0.5 rounded text-red-400 font-mono text-xs">
            {subdomain}.gnexus.co.tz
          </code>{" "}
          is currently not associated with an active NexusHub project node.
        </p>
        <a
          href="https://apex.gnexus.co.tz"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-90 transition-all"
        >
          Go to Master Hub <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
