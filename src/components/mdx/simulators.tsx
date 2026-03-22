"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Server,
  ArrowRight,
  RotateCcw,
  Play,
  Pause,
  Globe,
  Database,
  Zap,
  Shield,
  Timer,
  Hash,
} from "lucide-react";

/* ─── Load Balancer Simulator ─── */

export function LoadBalancerSim() {
  const [algorithm, setAlgorithm] = useState<"round-robin" | "least-conn" | "random">("round-robin");
  const [servers, setServers] = useState([
    { id: 1, name: "Server A", connections: 0, totalRequests: 0 },
    { id: 2, name: "Server B", connections: 0, totalRequests: 0 },
    { id: 3, name: "Server C", connections: 0, totalRequests: 0 },
  ]);
  const [rrIndex, setRrIndex] = useState(0);
  const [requestLog, setRequestLog] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sendRequest = () => {
    let targetIdx: number;

    if (algorithm === "round-robin") {
      targetIdx = rrIndex % servers.length;
      setRrIndex((prev) => prev + 1);
    } else if (algorithm === "least-conn") {
      targetIdx = servers.reduce((minIdx, s, i, arr) =>
        s.connections < arr[minIdx].connections ? i : minIdx, 0);
    } else {
      targetIdx = Math.floor(Math.random() * servers.length);
    }

    setServers((prev) =>
      prev.map((s, i) =>
        i === targetIdx
          ? { ...s, connections: s.connections + 1, totalRequests: s.totalRequests + 1 }
          : s
      )
    );

    setRequestLog((prev) =>
      [`→ Request routed to ${servers[targetIdx].name}`, ...prev].slice(0, 8)
    );

    // Simulate request completion after 1-3s
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      setServers((prev) =>
        prev.map((s, i) =>
          i === targetIdx ? { ...s, connections: Math.max(0, s.connections - 1) } : s
        )
      );
    }, delay);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(sendRequest, 600);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, algorithm, rrIndex]);

  const reset = () => {
    setIsRunning(false);
    setServers((prev) => prev.map((s) => ({ ...s, connections: 0, totalRequests: 0 })));
    setRequestLog([]);
    setRrIndex(0);
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
          <Zap className="h-4 w-4 text-amber-500" />
          Interactive: Load Balancer Simulator
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Watch how different algorithms distribute traffic across servers
        </p>
      </div>

      <div className="p-5">
        {/* Algorithm picker */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(["round-robin", "least-conn", "random"] as const).map((alg) => (
            <button
              key={alg}
              onClick={() => { setAlgorithm(alg); reset(); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                algorithm === alg
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {alg === "round-robin" ? "Round Robin" : alg === "least-conn" ? "Least Connections" : "Random"}
            </button>
          ))}
        </div>

        {/* Visualization */}
        <div className="flex flex-col items-center gap-4">
          {/* Client */}
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Clients</span>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />

          {/* Load Balancer */}
          <div className="px-4 py-2 rounded-lg bg-amber-500/10 border-2 border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            ⚖️ Load Balancer ({algorithm})
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />

          {/* Servers */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {servers.map((server) => {
              const load = Math.min(server.connections / 5, 1);
              return (
                <motion.div
                  key={server.id}
                  animate={{ scale: server.connections > 0 ? 1.02 : 1 }}
                  className={cn(
                    "flex-1 min-w-[120px] max-w-[160px] rounded-xl border-2 p-3 text-center transition-colors",
                    load > 0.8
                      ? "border-rose-500/40 bg-rose-500/5"
                      : load > 0.4
                        ? "border-amber-500/40 bg-amber-500/5"
                        : "border-emerald-500/40 bg-emerald-500/5"
                  )}
                >
                  <Server className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs font-semibold">{server.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    Active: {server.connections} | Total: {server.totalRequests}
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        load > 0.8 ? "bg-rose-500" : load > 0.4 ? "bg-amber-500" : "bg-emerald-500"
                      )}
                      animate={{ width: `${load * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              isRunning
                ? "bg-rose-500 text-white"
                : "bg-emerald-500 text-white"
            )}
          >
            {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isRunning ? "Pause" : "Start Traffic"}
          </button>
          <button
            onClick={sendRequest}
            disabled={isRunning}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-muted hover:bg-accent transition-colors disabled:opacity-30"
          >
            Send 1 Request
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Request Log */}
        {requestLog.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-muted/50 max-h-32 overflow-y-auto">
            <div className="text-xs font-mono space-y-0.5">
              {requestLog.map((log, i) => (
                <div key={i} className="text-muted-foreground">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Cache Hit/Miss Simulator ─── */

export function CacheSim() {
  const [cache, setCache] = useState<Map<string, string>>(new Map());
  const [cacheSize] = useState(4);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ type: "hit" | "miss"; key: string } | null>(null);
  const [stats, setStats] = useState({ hits: 0, misses: 0 });

  const sampleData: Record<string, string> = {
    "user:1": "Alice",
    "user:2": "Bob",
    "user:3": "Charlie",
    "user:4": "Diana",
    "user:5": "Eve",
    "product:1": "Laptop",
    "product:2": "Phone",
    "product:3": "Tablet",
  };

  const lookup = (key: string) => {
    if (cache.has(key)) {
      setResult({ type: "hit", key });
      setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
    } else {
      setResult({ type: "miss", key });
      setStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
      // Add to cache (LRU eviction if full)
      setCache((prev) => {
        const next = new Map(prev);
        if (next.size >= cacheSize) {
          const firstKey = next.keys().next().value;
          if (firstKey !== undefined) next.delete(firstKey);
        }
        next.set(key, sampleData[key] ?? "unknown");
        return next;
      });
    }
  };

  const hitRate = stats.hits + stats.misses > 0
    ? Math.round((stats.hits / (stats.hits + stats.misses)) * 100)
    : 0;

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
          Interactive: Cache Simulator (LRU, size={cacheSize})
        </h4>
      </div>

      <div className="p-5">
        {/* Quick-access buttons */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {Object.keys(sampleData).map((key) => (
            <button
              key={key}
              onClick={() => lookup(key)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-mono transition-all border",
                cache.has(key)
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-border bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Cache contents */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Array.from({ length: cacheSize }).map((_, i) => {
            const entries = Array.from(cache.entries());
            const entry = entries[i];
            return (
              <div
                key={i}
                className={cn(
                  "rounded-lg border-2 p-2 text-center text-xs min-h-[52px] flex flex-col justify-center",
                  entry
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-dashed border-border bg-muted/30"
                )}
              >
                {entry ? (
                  <>
                    <div className="font-mono text-[10px] text-muted-foreground">{entry[0]}</div>
                    <div className="font-semibold">{entry[1]}</div>
                  </>
                ) : (
                  <span className="text-muted-foreground/50">empty</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.key + result.type + stats.hits + stats.misses}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "p-3 rounded-lg text-sm mb-4",
                result.type === "hit"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400"
              )}
            >
              {result.type === "hit"
                ? `✅ Cache HIT for "${result.key}" — returned instantly!`
                : `❌ Cache MISS for "${result.key}" — fetched from DB, now cached`}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-emerald-500">{stats.hits}</div>
            <div className="text-xs text-muted-foreground">Hits</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-amber-500">{stats.misses}</div>
            <div className="text-xs text-muted-foreground">Misses</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-foreground">{hitRate}%</div>
            <div className="text-xs text-muted-foreground">Hit Rate</div>
          </div>
        </div>

        <button
          onClick={() => { setCache(new Map()); setResult(null); setStats({ hits: 0, misses: 0 }); }}
          className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Clear cache & reset
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Rate Limiter Simulator ─── */

export function RateLimiterSim() {
  const [tokens, setTokens] = useState(10);
  const [maxTokens] = useState(10);
  const [refillRate] = useState(1);
  const [log, setLog] = useState<{ msg: string; allowed: boolean }[]>([]);
  const [totalAllowed, setTotalAllowed] = useState(0);
  const [totalDenied, setTotalDenied] = useState(0);

  // Refill tokens every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) => Math.min(maxTokens, prev + refillRate));
    }, 1000);
    return () => clearInterval(interval);
  }, [maxTokens, refillRate]);

  const sendRequest = () => {
    if (tokens > 0) {
      setTokens((prev) => prev - 1);
      setTotalAllowed((prev) => prev + 1);
      setLog((prev) => [{ msg: "✅ Request allowed (token consumed)", allowed: true }, ...prev].slice(0, 10));
    } else {
      setTotalDenied((prev) => prev + 1);
      setLog((prev) => [{ msg: "❌ Request denied — 429 Too Many Requests", allowed: false }, ...prev].slice(0, 10));
    }
  };

  const burst = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => sendRequest(), i * 100);
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
          <Shield className="h-4 w-4 text-blue-500" />
          Interactive: Token Bucket Rate Limiter
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Bucket: {maxTokens} tokens max, refills {refillRate}/sec
        </p>
      </div>

      <div className="p-5">
        {/* Token bucket visualization */}
        <div className="flex items-end justify-center gap-1 mb-4 h-16">
          {Array.from({ length: maxTokens }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: i < tokens ? "rgb(34 197 94)" : "rgb(63 63 70)",
                scale: i < tokens ? 1 : 0.8,
              }}
              className="w-6 h-6 rounded-full"
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mb-4">
          <span className="font-bold text-foreground">{tokens}</span> / {maxTokens} tokens available
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={sendRequest}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Send Request
          </button>
          <button
            onClick={burst}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-500 text-white hover:bg-rose-600 transition-colors"
          >
            🔥 Burst (5 requests)
          </button>
          <button
            onClick={() => {
              setTokens(maxTokens);
              setLog([]);
              setTotalAllowed(0);
              setTotalDenied(0);
            }}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-emerald-500/10">
            <div className="text-lg font-bold text-emerald-500">{totalAllowed}</div>
            <div className="text-xs text-muted-foreground">Allowed</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-rose-500/10">
            <div className="text-lg font-bold text-rose-500">{totalDenied}</div>
            <div className="text-xs text-muted-foreground">Denied (429)</div>
          </div>
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="p-3 rounded-lg bg-muted/50 max-h-32 overflow-y-auto">
            <div className="text-xs font-mono space-y-0.5">
              {log.map((entry, i) => (
                <div key={i} className={entry.allowed ? "text-emerald-500" : "text-rose-500"}>
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

/* ─── Consistent Hashing Visualizer ─── */

export function ConsistentHashingSim() {
  const [nodes, setNodes] = useState(["Server A", "Server B", "Server C"]);
  const [keys, setKeys] = useState<{ key: string; hash: number; server: string }[]>([]);

  const hashFn = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return ((hash % 360) + 360) % 360;
  };

  const nodePositions = nodes.map((n) => ({ name: n, angle: hashFn(n) }));
  nodePositions.sort((a, b) => a.angle - b.angle);

  const findServer = (keyHash: number): string => {
    for (const node of nodePositions) {
      if (keyHash <= node.angle) return node.name;
    }
    return nodePositions[0]?.name ?? "None";
  };

  const addKey = () => {
    const names = ["user:1", "user:2", "user:3", "order:1", "order:2",
      "product:1", "product:2", "session:1", "session:2", "cart:1"];
    const available = names.filter((n) => !keys.some((k) => k.key === n));
    if (available.length === 0) return;
    const key = available[Math.floor(Math.random() * available.length)];
    const hash = hashFn(key);
    setKeys((prev) => [...prev, { key, hash, server: findServer(hash) }]);
  };

  const addNode = () => {
    const names = ["Server D", "Server E", "Server F"];
    const available = names.filter((n) => !nodes.includes(n));
    if (available.length === 0) return;
    const newNode = available[0];
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    // Recalculate key assignments
    const newPositions = newNodes.map((n) => ({ name: n, angle: hashFn(n) }));
    newPositions.sort((a, b) => a.angle - b.angle);
    setKeys((prev) =>
      prev.map((k) => ({
        ...k,
        server: (() => {
          for (const node of newPositions) {
            if (k.hash <= node.angle) return node.name;
          }
          return newPositions[0]?.name ?? "None";
        })(),
      }))
    );
  };

  const removeNode = () => {
    if (nodes.length <= 2) return;
    const removed = nodes[nodes.length - 1];
    const newNodes = nodes.slice(0, -1);
    setNodes(newNodes);
    const newPositions = newNodes.map((n) => ({ name: n, angle: hashFn(n) }));
    newPositions.sort((a, b) => a.angle - b.angle);
    setKeys((prev) =>
      prev.map((k) => ({
        ...k,
        server: k.server === removed
          ? (() => {
              for (const node of newPositions) {
                if (k.hash <= node.angle) return node.name;
              }
              return newPositions[0]?.name ?? "None";
            })()
          : k.server,
      }))
    );
  };

  const nodeColors = ["text-blue-500", "text-emerald-500", "text-purple-500", "text-amber-500", "text-rose-500", "text-cyan-500"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Hash className="h-4 w-4 text-purple-500" />
          Interactive: Consistent Hashing Ring
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Add/remove servers and watch how keys are redistributed
        </p>
      </div>

      <div className="p-5">
        {/* Hash ring visual */}
        <div className="relative w-48 h-48 mx-auto mb-5">
          {/* Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-border" />

          {/* Nodes on ring */}
          {nodePositions.map((node, i) => {
            const rad = (node.angle - 90) * (Math.PI / 180);
            const x = 50 + 45 * Math.cos(rad);
            const y = 50 + 45 * Math.sin(rad);
            return (
              <motion.div
                key={node.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className={cn("w-4 h-4 rounded-full bg-current", nodeColors[i % nodeColors.length])} />
                <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-medium whitespace-nowrap text-muted-foreground">
                  {node.name.replace("Server ", "")}
                </div>
              </motion.div>
            );
          })}

          {/* Keys on ring */}
          {keys.map((k) => {
            const rad = (k.hash - 90) * (Math.PI / 180);
            const x = 50 + 35 * Math.cos(rad);
            const y = 50 + 35 * Math.sin(rad);
            return (
              <motion.div
                key={k.key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-2 h-2 rounded-full bg-foreground/60"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                title={`${k.key} → ${k.server}`}
              />
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button onClick={addKey} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white">
            + Add Key
          </button>
          <button onClick={addNode} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white">
            + Add Server
          </button>
          <button
            onClick={removeNode}
            disabled={nodes.length <= 2}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500 text-white disabled:opacity-30"
          >
            - Remove Server
          </button>
          <button
            onClick={() => { setKeys([]); setNodes(["Server A", "Server B", "Server C"]); }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Key assignments */}
        {keys.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {keys.map((k) => {
              const nodeIdx = nodes.indexOf(k.server);
              return (
                <div
                  key={k.key}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-xs"
                >
                  <span className="font-mono text-muted-foreground">{k.key}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className={cn("font-semibold", nodeColors[nodeIdx % nodeColors.length])}>
                    {k.server.replace("Server ", "")}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
