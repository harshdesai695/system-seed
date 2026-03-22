import { ConceptMeta } from "@/lib/types";

export const concepts: ConceptMeta[] = [
  // ===================== HLD Concepts =====================
  {
    slug: "scalability",
    title: "Scalability (Vertical vs Horizontal)",
    description:
      "Learn how systems grow to handle more users — by making servers bigger or adding more servers.",
    category: "hld",
    difficulty: "beginner",
    tags: ["scaling", "horizontal", "vertical", "infrastructure"],
    order: 1,
    estimatedReadTime: 12,
  },
  {
    slug: "load-balancing",
    title: "Load Balancing",
    description:
      "Distribute incoming traffic across multiple servers to ensure no single server is overwhelmed.",
    category: "hld",
    difficulty: "beginner",
    tags: ["load balancer", "traffic", "round robin", "distribution"],
    order: 2,
    estimatedReadTime: 15,
  },
  {
    slug: "caching",
    title: "Caching",
    description:
      "Speed up your system by storing frequently accessed data closer to where it's needed.",
    category: "hld",
    difficulty: "beginner",
    tags: ["cache", "redis", "CDN", "performance"],
    order: 3,
    estimatedReadTime: 14,
  },
  {
    slug: "database-design",
    title: "Database Design (SQL vs NoSQL)",
    description:
      "Choose the right database for your system — structured tables or flexible documents.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["SQL", "NoSQL", "database", "schema"],
    order: 4,
    estimatedReadTime: 16,
  },
  {
    slug: "database-sharding",
    title: "Database Sharding",
    description:
      "Split your database across multiple machines to handle massive amounts of data.",
    category: "hld",
    difficulty: "advanced",
    tags: ["sharding", "partitioning", "distributed database"],
    order: 5,
    estimatedReadTime: 18,
  },
  {
    slug: "database-replication",
    title: "Database Replication",
    description:
      "Keep copies of your data on multiple servers for reliability and read performance.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["replication", "master-slave", "availability"],
    order: 6,
    estimatedReadTime: 14,
  },
  {
    slug: "cap-theorem",
    title: "CAP Theorem",
    description:
      "Understand the fundamental tradeoff in distributed systems: Consistency, Availability, and Partition Tolerance.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["CAP", "distributed systems", "tradeoffs"],
    order: 7,
    estimatedReadTime: 12,
  },
  {
    slug: "consistent-hashing",
    title: "Consistent Hashing",
    description:
      "A smart way to distribute data across servers that minimizes disruption when servers are added or removed.",
    category: "hld",
    difficulty: "advanced",
    tags: ["hashing", "distributed", "ring"],
    order: 8,
    estimatedReadTime: 16,
  },
  {
    slug: "message-queues",
    title: "Message Queues",
    description:
      "Decouple services with asynchronous communication using queues like Kafka and RabbitMQ.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["queue", "Kafka", "RabbitMQ", "async"],
    order: 9,
    estimatedReadTime: 15,
  },
  {
    slug: "microservices",
    title: "Microservices Architecture",
    description:
      "Break a large application into small, independent services that can be developed and deployed separately.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["microservices", "architecture", "API gateway"],
    order: 10,
    estimatedReadTime: 18,
  },
  {
    slug: "api-design",
    title: "API Design (REST, GraphQL, gRPC)",
    description:
      "Learn the different ways services communicate with each other over the network.",
    category: "hld",
    difficulty: "beginner",
    tags: ["REST", "GraphQL", "gRPC", "API"],
    order: 11,
    estimatedReadTime: 16,
  },
  {
    slug: "rate-limiting",
    title: "Rate Limiting",
    description:
      "Protect your system from being overwhelmed by too many requests in a short time.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["rate limiter", "throttling", "token bucket"],
    order: 12,
    estimatedReadTime: 13,
  },
  {
    slug: "cdn",
    title: "CDN (Content Delivery Network)",
    description:
      "Serve content from servers located closer to your users for faster load times.",
    category: "hld",
    difficulty: "beginner",
    tags: ["CDN", "edge", "content delivery"],
    order: 13,
    estimatedReadTime: 10,
  },
  {
    slug: "proxy",
    title: "Proxy (Forward & Reverse)",
    description:
      "Intermediate servers that sit between clients and backend servers for security, caching, and load balancing.",
    category: "hld",
    difficulty: "beginner",
    tags: ["proxy", "reverse proxy", "forward proxy", "nginx"],
    order: 14,
    estimatedReadTime: 11,
  },
  {
    slug: "dns",
    title: "DNS & Domain Resolution",
    description:
      "How the internet translates human-readable domain names into IP addresses computers understand.",
    category: "hld",
    difficulty: "beginner",
    tags: ["DNS", "domain", "resolution", "naming"],
    order: 15,
    estimatedReadTime: 10,
  },
  {
    slug: "distributed-systems",
    title: "Distributed Systems",
    description:
      "Systems that run on multiple computers working together as one — the foundation of modern internet services.",
    category: "hld",
    difficulty: "advanced",
    tags: ["distributed", "consensus", "partition", "leader election"],
    order: 16,
    estimatedReadTime: 20,
  },
  {
    slug: "map-reduce",
    title: "MapReduce",
    description:
      "A programming model for processing massive datasets in parallel across many machines.",
    category: "hld",
    difficulty: "advanced",
    tags: ["MapReduce", "big data", "parallel processing"],
    order: 17,
    estimatedReadTime: 14,
  },
  {
    slug: "heartbeat",
    title: "Heartbeat & Health Checks",
    description:
      "How services check if other services are alive and healthy in a distributed system.",
    category: "hld",
    difficulty: "beginner",
    tags: ["heartbeat", "health check", "monitoring"],
    order: 18,
    estimatedReadTime: 8,
  },
  {
    slug: "checksum",
    title: "Checksum & Data Integrity",
    description:
      "Ensuring data hasn't been corrupted during storage or transmission.",
    category: "hld",
    difficulty: "beginner",
    tags: ["checksum", "integrity", "hash", "verification"],
    order: 19,
    estimatedReadTime: 9,
  },
  {
    slug: "event-driven-architecture",
    title: "Event-Driven Architecture",
    description:
      "Build systems where components communicate by producing and reacting to events.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["events", "event bus", "pub/sub", "async"],
    order: 20,
    estimatedReadTime: 14,
  },
  {
    slug: "blob-storage",
    title: "Blob/Object Storage",
    description:
      "Store and retrieve large unstructured data like images, videos, and backups efficiently.",
    category: "hld",
    difficulty: "beginner",
    tags: ["S3", "blob", "object storage", "bucket"],
    order: 21,
    estimatedReadTime: 10,
  },
  {
    slug: "search-systems",
    title: "Search Systems (Elasticsearch)",
    description:
      "Build fast, full-text search capabilities using inverted indexes and search engines.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["search", "Elasticsearch", "inverted index"],
    order: 22,
    estimatedReadTime: 14,
  },
  {
    slug: "real-time-communication",
    title: "SSE, WebSockets, Long Polling",
    description:
      "Different techniques for real-time communication between clients and servers.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["WebSocket", "SSE", "long polling", "real-time"],
    order: 23,
    estimatedReadTime: 15,
  },
  {
    slug: "circuit-breaker",
    title: "Circuit Breaker Pattern",
    description:
      "Prevent cascading failures in distributed systems by detecting and stopping calls to failing services.",
    category: "hld",
    difficulty: "intermediate",
    tags: ["circuit breaker", "resilience", "fault tolerance"],
    order: 24,
    estimatedReadTime: 12,
  },
  {
    slug: "distributed-tracing",
    title: "Distributed Tracing",
    description:
      "Track requests as they flow through multiple services to debug and optimize your system.",
    category: "hld",
    difficulty: "advanced",
    tags: ["tracing", "observability", "Jaeger", "spans"],
    order: 25,
    estimatedReadTime: 14,
  },

  // ===================== LLD Concepts =====================
  {
    slug: "solid-principles",
    title: "SOLID Principles",
    description:
      "Five fundamental principles of object-oriented design that make software flexible and maintainable.",
    category: "lld",
    difficulty: "beginner",
    tags: ["SOLID", "OOP", "design principles"],
    order: 1,
    estimatedReadTime: 20,
  },
  {
    slug: "creational-patterns",
    title: "Design Patterns — Creational",
    description:
      "Patterns for creating objects in flexible, reusable ways: Singleton, Factory, Builder, and more.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["design patterns", "creational", "singleton", "factory", "builder"],
    order: 2,
    estimatedReadTime: 22,
  },
  {
    slug: "structural-patterns",
    title: "Design Patterns — Structural",
    description:
      "Patterns for composing objects into larger structures: Adapter, Decorator, Facade, and more.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["design patterns", "structural", "adapter", "decorator", "facade"],
    order: 3,
    estimatedReadTime: 22,
  },
  {
    slug: "behavioral-patterns",
    title: "Design Patterns — Behavioral",
    description:
      "Patterns for managing algorithms and communication between objects: Observer, Strategy, Command, and more.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["design patterns", "behavioral", "observer", "strategy", "command"],
    order: 4,
    estimatedReadTime: 22,
  },
  {
    slug: "uml-diagrams",
    title: "UML Diagrams",
    description:
      "Visual blueprints for software — learn to read and draw class, sequence, and activity diagrams.",
    category: "lld",
    difficulty: "beginner",
    tags: ["UML", "class diagram", "sequence diagram"],
    order: 5,
    estimatedReadTime: 16,
  },
  {
    slug: "parking-lot",
    title: "Parking Lot System",
    description:
      "Design a parking lot system from scratch — a classic LLD interview question with class diagrams and simulation.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["parking lot", "OOP", "interview"],
    order: 6,
    estimatedReadTime: 18,
  },
  {
    slug: "elevator-system",
    title: "Elevator System",
    description:
      "Design an elevator scheduling system — balancing efficiency, fairness, and multiple algorithms.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["elevator", "scheduling", "state machine"],
    order: 7,
    estimatedReadTime: 18,
  },
  {
    slug: "library-management",
    title: "Library Management System",
    description:
      "Design a complete library system with ER diagrams, class hierarchy, and borrowing workflows.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["library", "ER diagram", "CRUD"],
    order: 8,
    estimatedReadTime: 16,
  },
  {
    slug: "url-shortener-lld",
    title: "URL Shortener (LLD)",
    description:
      "Design the internal mechanics of a URL shortener — Base62 encoding, collision handling, and storage.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["URL shortener", "Base62", "encoding"],
    order: 9,
    estimatedReadTime: 14,
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe / Chess Game",
    description:
      "Design game logic with clean OOP structure — board representation, game state, and win detection.",
    category: "lld",
    difficulty: "beginner",
    tags: ["game", "board", "OOP", "strategy pattern"],
    order: 10,
    estimatedReadTime: 16,
  },
  {
    slug: "hotel-booking",
    title: "Hotel Booking System",
    description:
      "Design a hotel booking system with room lifecycle, reservation states, and booking flows.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["hotel", "booking", "state machine", "reservation"],
    order: 11,
    estimatedReadTime: 16,
  },
  {
    slug: "vending-machine",
    title: "Vending Machine",
    description:
      "Design a vending machine with state machine, coin handling, and product dispensing logic.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["vending machine", "state pattern", "FSM"],
    order: 12,
    estimatedReadTime: 14,
  },
  {
    slug: "atm-system",
    title: "ATM System",
    description:
      "Design an ATM with transaction flows, state management, and security considerations.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["ATM", "transaction", "state management"],
    order: 13,
    estimatedReadTime: 15,
  },
  {
    slug: "file-system",
    title: "File System Design",
    description:
      "Design a file system with tree structure, inodes, directories, and file operations.",
    category: "lld",
    difficulty: "advanced",
    tags: ["file system", "tree", "inode", "directory"],
    order: 14,
    estimatedReadTime: 18,
  },
  {
    slug: "social-media-feed",
    title: "Social Media Feed (LLD)",
    description:
      "Design the feed ranking algorithm and class structure behind social media timelines.",
    category: "lld",
    difficulty: "advanced",
    tags: ["social media", "feed", "ranking", "timeline"],
    order: 15,
    estimatedReadTime: 18,
  },
  {
    slug: "notification-system",
    title: "Notification System",
    description:
      "Design a multi-channel notification system using the Observer pattern and routing logic.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["notification", "observer", "multi-channel"],
    order: 16,
    estimatedReadTime: 14,
  },
  {
    slug: "logging-framework",
    title: "Logging Framework",
    description:
      "Design a flexible logging framework using decorators and chain-of-responsibility pattern.",
    category: "lld",
    difficulty: "intermediate",
    tags: ["logging", "decorator", "chain of responsibility"],
    order: 17,
    estimatedReadTime: 14,
  },
  {
    slug: "rate-limiter-lld",
    title: "Rate Limiter (LLD Implementation)",
    description:
      "Implement rate limiting algorithms from scratch — token bucket, sliding window, and more.",
    category: "lld",
    difficulty: "advanced",
    tags: ["rate limiter", "token bucket", "sliding window", "algorithm"],
    order: 18,
    estimatedReadTime: 16,
  },
  {
    slug: "cache-lru-lfu",
    title: "Cache (LRU/LFU Implementation)",
    description:
      "Implement LRU and LFU caches with doubly-linked lists and hashmaps — a top interview question.",
    category: "lld",
    difficulty: "advanced",
    tags: ["cache", "LRU", "LFU", "linked list", "hashmap"],
    order: 19,
    estimatedReadTime: 18,
  },
  {
    slug: "connection-pool",
    title: "Connection Pool",
    description:
      "Design a connection pool that efficiently manages database connections — acquire, use, and release.",
    category: "lld",
    difficulty: "advanced",
    tags: ["connection pool", "resource management", "lifecycle"],
    order: 20,
    estimatedReadTime: 14,
  },
];

export function getConceptsByCategory(category: "hld" | "lld"): ConceptMeta[] {
  return concepts
    .filter((c) => c.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getConceptBySlug(
  category: string,
  slug: string
): ConceptMeta | undefined {
  return concepts.find((c) => c.category === category && c.slug === slug);
}

export function getAllSlugs(): { category: string; slug: string }[] {
  return concepts.map((c) => ({ category: c.category, slug: c.slug }));
}

export function getAdjacentConcepts(
  category: string,
  slug: string
): { prev: ConceptMeta | null; next: ConceptMeta | null } {
  const categoryConcepts = concepts
    .filter((c) => c.category === category)
    .sort((a, b) => a.order - b.order);
  const index = categoryConcepts.findIndex((c) => c.slug === slug);
  return {
    prev: index > 0 ? categoryConcepts[index - 1] : null,
    next:
      index < categoryConcepts.length - 1
        ? categoryConcepts[index + 1]
        : null,
  };
}
