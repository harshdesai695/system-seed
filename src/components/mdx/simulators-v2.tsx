"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  RotateCcw,
  Play,
  Pause,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Globe,
  Server,
  Car,
  ArrowUp,
  ArrowDown,
  Database,
  Mail,
  Package,
} from "lucide-react";

/* ─── Message Queue Simulator ─── */

export function MessageQueueSim() {
  const [queue, setQueue] = useState<{ id: number; msg: string; time: number }[]>([]);
  const [processed, setProcessed] = useState<string[]>([]);
  const [producing, setProducing] = useState(false);
  const [consuming, setConsuming] = useState(false);
  const [msgCounter, setMsgCounter] = useState(0);
  const [stats, setStats] = useState({ produced: 0, consumed: 0, maxQueueSize: 0 });
  const prodRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const consRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const topics = ["order.created", "user.signup", "payment.success", "item.shipped", "review.posted"];

  useEffect(() => {
    if (producing) {
      prodRef.current = setInterval(() => {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        setMsgCounter((prev) => prev + 1);
        setQueue((prev) => {
          const next = [...prev, { id: Date.now(), msg: topic, time: Date.now() }];
          setStats((s) => ({ ...s, produced: s.produced + 1, maxQueueSize: Math.max(s.maxQueueSize, next.length) }));
          return next;
        });
      }, 800);
    } else if (prodRef.current) {
      clearInterval(prodRef.current);
    }
    return () => { if (prodRef.current) clearInterval(prodRef.current); };
  }, [producing]);

  useEffect(() => {
    if (consuming) {
      consRef.current = setInterval(() => {
        setQueue((prev) => {
          if (prev.length === 0) return prev;
          const [first, ...rest] = prev;
          setProcessed((p) => [`✅ Processed: ${first.msg}`, ...p].slice(0, 8));
          setStats((s) => ({ ...s, consumed: s.consumed + 1 }));
          return rest;
        });
      }, 1200);
    } else if (consRef.current) {
      clearInterval(consRef.current);
    }
    return () => { if (consRef.current) clearInterval(consRef.current); };
  }, [consuming]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Mail className="h-4 w-4 text-blue-500" />
          Interactive: Message Queue Simulator
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          See how producers and consumers interact through a queue
        </p>
      </div>

      <div className="p-5">
        {/* Producer → Queue → Consumer */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Producer */}
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-colors",
              producing ? "border-blue-500 bg-blue-500/10" : "border-border bg-muted/30"
            )}>
              <Package className={cn("h-6 w-6", producing ? "text-blue-500" : "text-muted-foreground")} />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">Producer</span>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />

          {/* Queue */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 overflow-x-auto py-2 px-1 rounded-lg bg-muted/30 border border-border min-h-[52px]">
              <AnimatePresence mode="popLayout">
                {queue.length === 0 ? (
                  <span className="text-[10px] text-muted-foreground/50 w-full text-center">Queue empty</span>
                ) : (
                  queue.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      exit={{ scale: 0, x: 20 }}
                      className="shrink-0 px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-[9px] font-mono text-blue-600 dark:text-blue-400"
                    >
                      {item.msg.split(".")[1]}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            <div className="text-center text-[10px] text-muted-foreground mt-1">
              Queue depth: <span className="font-bold text-foreground">{queue.length}</span>
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />

          {/* Consumer */}
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-colors",
              consuming ? "border-emerald-500 bg-emerald-500/10" : "border-border bg-muted/30"
            )}>
              <Server className={cn("h-6 w-6", consuming ? "text-emerald-500" : "text-muted-foreground")} />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">Consumer</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setProducing(!producing)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              producing ? "bg-blue-500 text-white" : "bg-muted text-foreground hover:bg-accent"
            )}
          >
            {producing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {producing ? "Stop Producing" : "Start Producing"}
          </button>
          <button
            onClick={() => setConsuming(!consuming)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              consuming ? "bg-emerald-500 text-white" : "bg-muted text-foreground hover:bg-accent"
            )}
          >
            {consuming ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {consuming ? "Stop Consuming" : "Start Consuming"}
          </button>
          <button
            onClick={() => {
              setProducing(false); setConsuming(false);
              setQueue([]); setProcessed([]); setMsgCounter(0);
              setStats({ produced: 0, consumed: 0, maxQueueSize: 0 });
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-blue-500/10">
            <div className="text-lg font-bold text-blue-500">{stats.produced}</div>
            <div className="text-[10px] text-muted-foreground">Produced</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-emerald-500/10">
            <div className="text-lg font-bold text-emerald-500">{stats.consumed}</div>
            <div className="text-[10px] text-muted-foreground">Consumed</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-amber-500/10">
            <div className="text-lg font-bold text-amber-500">{stats.maxQueueSize}</div>
            <div className="text-[10px] text-muted-foreground">Max Depth</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── CAP Theorem Simulator ─── */

export function CAPTheoremSim() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["C", "A"]));
  const [scenario, setScenario] = useState("");
  const [examples, setExamples] = useState<string[]>([]);

  const toggleProp = (prop: string) => {
    const next = new Set(selected);
    if (next.has(prop)) {
      next.delete(prop);
    } else {
      if (next.size >= 2) {
        // Can only pick 2 — remove the oldest
        const arr = Array.from(next);
        next.delete(arr[0]);
      }
      next.add(prop);
    }
    setSelected(next);
  };

  useEffect(() => {
    const key = Array.from(selected).sort().join("");
    switch (key) {
      case "AC":
        setScenario("CP - Consistency + Availability (no Partition tolerance)");
        setExamples(["Traditional RDBMS (single-node PostgreSQL, MySQL)", "Only works if network never fails — not realistic in distributed systems"]);
        break;
      case "AP":
        setScenario("AP - Availability + Partition tolerance (eventual consistency)");
        setExamples(["DynamoDB, Cassandra, CouchDB", "DNS, CDN caches", "Responds to every request but data may be stale"]);
        break;
      case "CP":
        setScenario("CP - Consistency + Partition tolerance (may reject requests)");
        setExamples(["MongoDB, HBase, Redis Cluster", "ZooKeeper, etcd", "Always correct data but may be temporarily unavailable"]);
        break;
      default:
        setScenario("Pick exactly 2 properties");
        setExamples([]);
    }
  }, [selected]);

  const props = [
    { id: "C", label: "Consistency", desc: "Every read gets the most recent write", color: "blue" },
    { id: "A", label: "Availability", desc: "Every request gets a response", color: "emerald" },
    { id: "P", label: "Partition Tolerance", desc: "System works despite network failures", color: "amber" },
  ];

  const colorMap: Record<string, string> = {
    blue: "border-blue-500 bg-blue-500/10 text-blue-500",
    emerald: "border-emerald-500 bg-emerald-500/10 text-emerald-500",
    amber: "border-amber-500 bg-amber-500/10 text-amber-500",
  };
  const inactiveColor = "border-border bg-muted/30 text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Interactive: CAP Theorem Explorer
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Pick any 2 properties — you can&apos;t have all 3 in a distributed system
        </p>
      </div>

      <div className="p-5">
        {/* Triangle of properties */}
        <div className="flex justify-center gap-4 mb-5">
          {props.map((prop) => (
            <button
              key={prop.id}
              onClick={() => toggleProp(prop.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all w-28",
                selected.has(prop.id) ? colorMap[prop.color] : inactiveColor
              )}
            >
              <span className="text-2xl font-bold">{prop.id}</span>
              <span className="text-xs font-semibold">{prop.label}</span>
              <span className="text-[9px] text-center opacity-70">{prop.desc}</span>
            </button>
          ))}
        </div>

        {/* Result */}
        {scenario && (
          <motion.div
            key={scenario}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-muted/50 border border-border"
          >
            <div className="text-sm font-semibold mb-2">{scenario}</div>
            {examples.length > 0 && (
              <ul className="space-y-1">
                {examples.map((ex, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="shrink-0 mt-0.5">•</span>
                    {ex}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Circuit Breaker Simulator ─── */

type CBLogType = "success" | "fail" | "blocked" | "info";
type CBLogEntry = { msg: string; type: CBLogType };

export function CircuitBreakerSim() {
  const [state, setState] = useState<"CLOSED" | "OPEN" | "HALF_OPEN">("CLOSED");
  const [failCount, setFailCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [threshold] = useState(3);
  const [log, setLog] = useState<CBLogEntry[]>([]);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addLog = (msg: string, type: CBLogType) => {
    setLog((l) => [{ msg, type }, ...l].slice(0, 12));
  };

  const COOLDOWN = 5; // seconds

  useEffect(() => {
    if (state === "OPEN" && cooldownTimer > 0) {
      timerRef.current = setInterval(() => {
        setCooldownTimer((prev) => {
          if (prev <= 1) {
            setState("HALF_OPEN");
            addLog("⏱️ Cooldown expired → HALF-OPEN (testing...)", "info");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    return undefined;
  }, [state, cooldownTimer]);

  const sendRequest = (forceResult?: "success" | "fail") => {
    const result = forceResult ?? (Math.random() > 0.4 ? "success" : "fail");

    if (state === "OPEN") {
      addLog("🚫 Request BLOCKED — circuit is OPEN", "blocked");
      return;
    }

    if (result === "success") {
      setSuccessCount((p) => p + 1);
      if (state === "HALF_OPEN") {
        setState("CLOSED");
        setFailCount(0);
        addLog("✅ Success! Circuit → CLOSED", "success");
      } else {
        addLog("✅ Request succeeded", "success");
      }
    } else {
      const newFails = failCount + 1;
      setFailCount(newFails);
      if (state === "HALF_OPEN") {
        setState("OPEN");
        setCooldownTimer(COOLDOWN);
        addLog("❌ Failed in HALF-OPEN → Circuit back to OPEN", "fail");
      } else if (newFails >= threshold) {
        setState("OPEN");
        setCooldownTimer(COOLDOWN);
        addLog(`❌ Failed! ${newFails}/${threshold} failures → Circuit OPEN`, "fail");
      } else {
        addLog(`❌ Failed! (${newFails}/${threshold} failures)`, "fail");
      }
    }
  };

  const stateColors: Record<string, string> = {
    CLOSED: "bg-emerald-500",
    OPEN: "bg-rose-500",
    HALF_OPEN: "bg-amber-500",
  };

  const logColors: Record<string, string> = {
    success: "text-emerald-500",
    fail: "text-rose-500",
    blocked: "text-rose-400",
    info: "text-amber-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-500" />
          Interactive: Circuit Breaker Simulator
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          {threshold} failures → OPEN, {COOLDOWN}s cooldown → HALF-OPEN → test request
        </p>
      </div>

      <div className="p-5">
        {/* State indicator */}
        <div className="flex items-center justify-center gap-3 mb-5">
          {(["CLOSED", "OPEN", "HALF_OPEN"] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full transition-all",
                state === s ? stateColors[s] : "bg-muted-foreground/20"
              )} />
              <span className={cn(
                "text-xs font-medium",
                state === s ? "text-foreground" : "text-muted-foreground"
              )}>
                {s.replace("_", "-")}
              </span>
            </div>
          ))}
        </div>

        {/* Timer for OPEN state */}
        {state === "OPEN" && cooldownTimer > 0 && (
          <div className="text-center mb-4">
            <span className="text-sm text-rose-500 font-medium">
              Circuit opens in {cooldownTimer}s...
            </span>
          </div>
        )}

        {/* Failure counter visualization */}
        <div className="flex items-center justify-center gap-1.5 mb-5">
          {Array.from({ length: threshold }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all",
                i < failCount
                  ? "bg-rose-500/20 border border-rose-500/40 text-rose-500"
                  : "bg-muted border border-border text-muted-foreground/30"
              )}
            >
              {i < failCount ? "✕" : "○"}
            </div>
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            {failCount}/{threshold} failures
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => sendRequest("success")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white"
          >
            <CheckCircle2 className="h-3 w-3 inline mr-1" />
            Send Success
          </button>
          <button
            onClick={() => sendRequest("fail")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500 text-white"
          >
            <XCircle className="h-3 w-3 inline mr-1" />
            Send Failure
          </button>
          <button
            onClick={() => sendRequest()}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white"
          >
            🎲 Random Request
          </button>
          <button
            onClick={() => {
              setState("CLOSED"); setFailCount(0); setSuccessCount(0);
              setLog([]); setCooldownTimer(0);
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="p-3 rounded-lg bg-muted/50 max-h-36 overflow-y-auto">
            <div className="text-xs font-mono space-y-0.5">
              {log.map((entry, i) => (
                <div key={i} className={logColors[entry.type]}>
                  {entry.msg}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── DNS Resolution Simulator ─── */

export function DNSSim() {
  const [step, setStep] = useState(-1);
  const [domain, setDomain] = useState("www.example.com");
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { label: "Browser Cache", icon: "🖥️", desc: "Check if domain is cached locally", result: "Not found" },
    { label: "OS Cache", icon: "💻", desc: "Query operating system DNS cache", result: "Not found" },
    { label: "Recursive Resolver", icon: "🔄", desc: "ISP's DNS resolver takes over", result: "Querying root..." },
    { label: "Root Server", icon: "🌍", desc: "\"I don't know example.com, but ask .com TLD\"", result: "→ .com TLD" },
    { label: "TLD Server (.com)", icon: "📋", desc: "\"example.com? Ask ns1.example.com\"", result: "→ Authoritative NS" },
    { label: "Authoritative NS", icon: "✅", desc: "\"example.com = 93.184.216.34\"", result: "IP found!" },
    { label: "Response", icon: "🏠", desc: "IP returned & cached at each level", result: "93.184.216.34" },
  ];

  const animate = async () => {
    setStep(-1);
    setIsAnimating(true);
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      setStep(i);
    }
    setIsAnimating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 text-blue-500" />
          Interactive: DNS Resolution Walkthrough
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Watch how a domain name gets resolved step-by-step
        </p>
      </div>

      <div className="p-5">
        {/* Domain input */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs text-muted-foreground">Resolving:</span>
          <code className="text-sm font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded">
            {domain}
          </code>
          <button
            onClick={animate}
            disabled={isAnimating}
            className="ml-auto px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {isAnimating ? "Resolving..." : "▶ Start Resolution"}
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: step >= i ? 1 : 0.3,
                x: step >= i ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors",
                step === i ? "border-blue-500/40 bg-blue-500/5" :
                  step > i ? "border-emerald-500/20 bg-emerald-500/5" : "border-border bg-muted/20"
              )}
            >
              <span className="text-lg shrink-0">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold">{s.label}</div>
                <div className="text-[10px] text-muted-foreground">{s.desc}</div>
              </div>
              {step >= i && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded shrink-0",
                    i === steps.length - 1 ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"
                  )}
                >
                  {s.result}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Parking Lot Simulator ─── */

export function ParkingLotSim() {
  const [floors] = useState(2);
  const [spotsPerFloor] = useState(8);
  const [spots, setSpots] = useState<{ id: string; type: "compact" | "regular" | "handicapped"; occupied: boolean; vehicle?: string }[]>(
    () => {
      const s: { id: string; type: "compact" | "regular" | "handicapped"; occupied: boolean; vehicle?: string }[] = [];
      for (let f = 0; f < 2; f++) {
        for (let i = 0; i < 8; i++) {
          const type = i === 0 ? "handicapped" : i < 3 ? "compact" : "regular";
          s.push({ id: `F${f + 1}-S${i + 1}`, type, occupied: false });
        }
      }
      return s;
    }
  );
  const [log, setLog] = useState<string[]>([]);
  const [stats, setStats] = useState({ totalParked: 0, totalExited: 0 });

  const vehicles = ["🚗", "🚙", "🏎️", "🚕", "🛻", "🚐"];

  const parkVehicle = () => {
    const available = spots.filter((s) => !s.occupied);
    if (available.length === 0) {
      setLog((l) => ["❌ Parking lot is FULL!", ...l].slice(0, 8));
      return;
    }
    const spot = available[Math.floor(Math.random() * available.length)];
    const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
    setSpots((prev) =>
      prev.map((s) => s.id === spot.id ? { ...s, occupied: true, vehicle } : s)
    );
    setLog((l) => [`${vehicle} Parked at ${spot.id} (${spot.type})`, ...l].slice(0, 8));
    setStats((s) => ({ ...s, totalParked: s.totalParked + 1 }));
  };

  const exitVehicle = () => {
    const occupied = spots.filter((s) => s.occupied);
    if (occupied.length === 0) {
      setLog((l) => ["⚠️ No vehicles to exit", ...l].slice(0, 8));
      return;
    }
    const spot = occupied[Math.floor(Math.random() * occupied.length)];
    setSpots((prev) =>
      prev.map((s) => s.id === spot.id ? { ...s, occupied: false, vehicle: undefined } : s)
    );
    setLog((l) => [`${spot.vehicle} Exited from ${spot.id}`, ...l].slice(0, 8));
    setStats((s) => ({ ...s, totalExited: s.totalExited + 1 }));
  };

  const occupiedCount = spots.filter((s) => s.occupied).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Car className="h-4 w-4 text-blue-500" />
          Interactive: Parking Lot Simulator
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          {occupiedCount}/{spots.length} spots occupied
        </p>
      </div>

      <div className="p-5">
        {/* Parking grid */}
        {[0, 1].map((floor) => (
          <div key={floor} className="mb-3">
            <div className="text-[10px] font-semibold text-muted-foreground mb-1">Floor {floor + 1}</div>
            <div className="grid grid-cols-8 gap-1">
              {spots.slice(floor * 8, (floor + 1) * 8).map((spot) => (
                <motion.div
                  key={spot.id}
                  animate={{ scale: spot.occupied ? 1 : 0.95 }}
                  className={cn(
                    "aspect-square rounded-md border-2 flex items-center justify-center text-sm transition-colors",
                    spot.occupied
                      ? "border-blue-500/40 bg-blue-500/10"
                      : spot.type === "handicapped"
                        ? "border-purple-500/30 bg-purple-500/5"
                        : spot.type === "compact"
                          ? "border-amber-500/20 bg-amber-500/5"
                          : "border-border bg-muted/20"
                  )}
                  title={`${spot.id} (${spot.type})`}
                >
                  {spot.occupied ? spot.vehicle : (
                    <span className="text-[8px] text-muted-foreground/40">
                      {spot.type === "handicapped" ? "♿" : spot.type === "compact" ? "c" : ""}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-2 mt-3 mb-3">
          <button onClick={parkVehicle} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white">
            🚗 Park Vehicle
          </button>
          <button onClick={exitVehicle} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-white">
            🚙 Exit Vehicle
          </button>
          <button
            onClick={() => {
              setSpots((prev) => prev.map((s) => ({ ...s, occupied: false, vehicle: undefined })));
              setLog([]); setStats({ totalParked: 0, totalExited: 0 });
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="p-2 rounded-lg bg-muted/50 max-h-28 overflow-y-auto text-xs font-mono space-y-0.5">
            {log.map((entry, i) => (
              <div key={i} className="text-muted-foreground">{entry}</div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Elevator System Simulator ─── */

export function ElevatorSim() {
  const [floors] = useState(8);
  const [elevators, setElevators] = useState([
    { id: "A", floor: 1, direction: "idle" as "up" | "down" | "idle", queue: [] as number[] },
    { id: "B", floor: 1, direction: "idle" as "up" | "down" | "idle", queue: [] as number[] },
  ]);
  const [log, setLog] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const callElevator = (targetFloor: number) => {
    // Find closest idle or moving-toward elevator
    setElevators((prev) => {
      const best = prev.reduce((bestIdx, e, i, arr) => {
        const bestDist = Math.abs(arr[bestIdx].floor - targetFloor);
        const thisDist = Math.abs(e.floor - targetFloor);
        if (e.direction === "idle" && arr[bestIdx].direction !== "idle") return i;
        return thisDist < bestDist ? i : bestIdx;
      }, 0);

      return prev.map((e, i) => {
        if (i !== best) return e;
        if (e.queue.includes(targetFloor) || e.floor === targetFloor) return e;
        const newQueue = [...e.queue, targetFloor].sort((a, b) =>
          e.direction === "down" ? b - a : a - b
        );
        setLog((l) => [`📥 Floor ${targetFloor} → Elevator ${e.id}`, ...l].slice(0, 10));
        return { ...e, queue: newQueue, direction: targetFloor > e.floor ? "up" : targetFloor < e.floor ? "down" : e.direction };
      });
    });
  };

  // Move elevators every tick
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElevators((prev) =>
        prev.map((e) => {
          if (e.queue.length === 0) return { ...e, direction: "idle" };
          const target = e.queue[0];
          let newFloor = e.floor;
          if (target > e.floor) newFloor = e.floor + 1;
          else if (target < e.floor) newFloor = e.floor - 1;

          if (newFloor === target) {
            // Arrived
            const newQueue = e.queue.slice(1);
            setLog((l) => [`🛗 Elevator ${e.id} arrived at floor ${newFloor}`, ...l].slice(0, 10));
            return {
              ...e,
              floor: newFloor,
              queue: newQueue,
              direction: newQueue.length === 0 ? "idle" : newQueue[0] > newFloor ? "up" : "down",
            };
          }

          return {
            ...e,
            floor: newFloor,
            direction: target > newFloor ? "up" : "down",
          };
        })
      );
    }, 700);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ArrowUp className="h-4 w-4 text-blue-500" />
          Interactive: Elevator System Simulator
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Click a floor button to call an elevator
        </p>
      </div>

      <div className="p-5">
        <div className="flex gap-4">
          {/* Floor buttons */}
          <div className="flex flex-col-reverse gap-1">
            {Array.from({ length: floors }, (_, i) => i + 1).map((floor) => (
              <button
                key={floor}
                onClick={() => callElevator(floor)}
                className="w-10 h-8 rounded text-xs font-bold bg-muted hover:bg-accent border border-border transition-colors"
              >
                {floor}
              </button>
            ))}
          </div>

          {/* Elevator shafts */}
          {elevators.map((e) => (
            <div key={e.id} className="flex-1">
              <div className="text-[10px] font-semibold text-center text-muted-foreground mb-1">
                Elevator {e.id} {e.direction === "up" ? "↑" : e.direction === "down" ? "↓" : "●"}
              </div>
              <div className="relative border border-border rounded-lg overflow-hidden">
                {Array.from({ length: floors }, (_, i) => floors - i).map((floor) => (
                  <div
                    key={floor}
                    className={cn(
                      "h-8 border-b border-border/30 flex items-center justify-center text-[10px]",
                      e.queue.includes(floor) ? "bg-amber-500/10" : ""
                    )}
                  >
                    {e.floor === floor && (
                      <motion.div
                        layoutId={`elevator-${e.id}`}
                        className={cn(
                          "w-full h-full flex items-center justify-center font-bold rounded-sm",
                          e.direction === "idle"
                            ? "bg-blue-500/30 text-blue-500"
                            : "bg-emerald-500/30 text-emerald-500"
                        )}
                      >
                        🛗
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="mt-3 p-2 rounded-lg bg-muted/50 max-h-24 overflow-y-auto text-xs font-mono space-y-0.5">
            {log.map((entry, i) => (
              <div key={i} className="text-muted-foreground">{entry}</div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── LRU Cache Visual Simulator ─── */

export function LRUCacheVisualSim() {
  const [capacity] = useState(4);
  const [cache, setCache] = useState<{ key: string; value: string }[]>([]);
  const [hashMap, setHashMap] = useState<Map<string, number>>(new Map());
  const [lastOp, setLastOp] = useState<{ type: "hit" | "miss" | "evict"; key: string; detail?: string } | null>(null);
  const [stats, setStats] = useState({ hits: 0, misses: 0, evictions: 0 });

  const sampleOps = [
    { key: "A", value: "100" },
    { key: "B", value: "200" },
    { key: "C", value: "300" },
    { key: "D", value: "400" },
    { key: "E", value: "500" },
    { key: "A", value: "100" },
    { key: "F", value: "600" },
    { key: "B", value: "200" },
  ];
  const [opIndex, setOpIndex] = useState(0);

  const executeOp = (key: string, value: string) => {
    setCache((prev) => {
      const existing = prev.findIndex((item) => item.key === key);

      if (existing !== -1) {
        // Cache hit: move to end (most recently used)
        const item = prev[existing];
        const next = [...prev.filter((_, i) => i !== existing), item];
        setLastOp({ type: "hit", key, detail: `Moved "${key}" to MRU position` });
        setStats((s) => ({ ...s, hits: s.hits + 1 }));
        return next;
      }

      // Cache miss
      if (prev.length >= capacity) {
        // Evict LRU (first item)
        const evicted = prev[0];
        const next = [...prev.slice(1), { key, value }];
        setLastOp({ type: "evict", key, detail: `Evicted "${evicted.key}", added "${key}"` });
        setStats((s) => ({ ...s, misses: s.misses + 1, evictions: s.evictions + 1 }));
        return next;
      }

      setLastOp({ type: "miss", key, detail: `Added "${key}" to cache` });
      setStats((s) => ({ ...s, misses: s.misses + 1 }));
      return [...prev, { key, value }];
    });
  };

  const stepForward = () => {
    if (opIndex < sampleOps.length) {
      const op = sampleOps[opIndex];
      executeOp(op.key, op.value);
      setOpIndex((p) => p + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Database className="h-4 w-4 text-purple-500" />
          Interactive: LRU Cache Visualizer
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Capacity: {capacity} | LRU (left) → MRU (right)
        </p>
      </div>

      <div className="p-5">
        {/* Cache visualization as linked list */}
        <div className="flex items-center justify-center gap-1 mb-4 min-h-[60px] flex-wrap">
          <span className="text-[10px] text-muted-foreground mr-1">LRU</span>
          {Array.from({ length: capacity }).map((_, i) => {
            const item = cache[i];
            return (
              <div key={i} className="flex items-center gap-1">
                <motion.div
                  animate={{
                    borderColor: item
                      ? i === cache.length - 1
                        ? "rgb(34 197 94)"
                        : i === 0
                          ? "rgb(239 68 68)"
                          : "rgb(59 130 246)"
                      : "rgb(63 63 70)",
                  }}
                  className={cn(
                    "w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-all",
                    item ? "bg-card" : "bg-muted/20 border-dashed"
                  )}
                >
                  {item ? (
                    <>
                      <span className="text-sm font-bold">{item.key}</span>
                      <span className="text-[10px] text-muted-foreground">{item.value}</span>
                    </>
                  ) : (
                    <span className="text-[10px] text-muted-foreground/40">empty</span>
                  )}
                </motion.div>
                {i < capacity - 1 && (
                  <ArrowRight className="h-3 w-3 text-muted-foreground/30 shrink-0" />
                )}
              </div>
            );
          })}
          <span className="text-[10px] text-muted-foreground ml-1">MRU</span>
        </div>

        {/* Last operation result */}
        <AnimatePresence mode="wait">
          {lastOp && (
            <motion.div
              key={lastOp.key + lastOp.type + stats.hits + stats.misses}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "p-2 rounded-lg text-xs mb-4 text-center",
                lastOp.type === "hit"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : lastOp.type === "evict"
                    ? "bg-rose-500/10 text-rose-500"
                    : "bg-amber-500/10 text-amber-500"
              )}
            >
              {lastOp.type === "hit" ? "✅ HIT" : lastOp.type === "evict" ? "🔄 EVICT + INSERT" : "❌ MISS"}: {lastOp.detail}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming operations */}
        <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
          {sampleOps.map((op, i) => (
            <button
              key={i}
              onClick={() => { executeOp(op.key, op.value); setOpIndex(Math.max(opIndex, i + 1)); }}
              className={cn(
                "px-2 py-1 rounded text-xs font-mono border transition-all",
                i < opIndex
                  ? "border-border/30 bg-muted/20 text-muted-foreground/40 line-through"
                  : i === opIndex
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-500 font-bold"
                    : "border-border bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              get({op.key})
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={stepForward}
            disabled={opIndex >= sampleOps.length}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white disabled:opacity-30"
          >
            ▶ Step Forward
          </button>
          <button
            onClick={() => { setCache([]); setOpIndex(0); setLastOp(null); setStats({ hits: 0, misses: 0, evictions: 0 }); }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-emerald-500/10">
            <div className="text-lg font-bold text-emerald-500">{stats.hits}</div>
            <div className="text-[10px] text-muted-foreground">Hits</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-amber-500/10">
            <div className="text-lg font-bold text-amber-500">{stats.misses}</div>
            <div className="text-[10px] text-muted-foreground">Misses</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-rose-500/10">
            <div className="text-lg font-bold text-rose-500">{stats.evictions}</div>
            <div className="text-[10px] text-muted-foreground">Evictions</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
