# SystemSeed — System Design Learning Platform

An interactive Next.js learning platform for **System Design** covering both High-Level Design (HLD) and Low-Level Design (LLD) concepts with animations, diagrams, multi-language code examples, and real-world analogies.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Content**: MDX for rich interactive content pages
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
system-seed/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (sidebar, navbar, theme)
│   │   ├── page.tsx                # Landing page / dashboard
│   │   └── concepts/
│   │       ├── layout.tsx          # Shared concepts layout
│   │       ├── [category]/         # Dynamic: "hld" or "lld"
│   │       │   ├── page.tsx        # Category listing page
│   │       │   └── [slug]/
│   │       │       └── page.tsx    # Individual concept page
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── animations/             # Framer Motion animation components
│   │   ├── charts/                 # Recharts visualization components
│   │   ├── diagrams/               # Flow & architecture diagram components
│   │   ├── code-block.tsx          # Multi-language code snippet component
│   │   ├── navbar.tsx              # Top navigation bar with search
│   │   ├── sidebar.tsx             # Left sidebar with concept tree
│   │   ├── theme-provider.tsx      # Dark/light theme provider
│   │   └── theme-toggle.tsx        # Theme toggle button
│   ├── config/
│   │   └── concepts.config.ts      # Concept metadata registry
│   ├── content/
│   │   ├── hld/                    # HLD concept MDX files
│   │   │   ├── scalability.mdx
│   │   │   ├── load-balancing.mdx
│   │   │   └── caching.mdx
│   │   └── lld/                    # LLD concept MDX files
│   │       ├── solid-principles.mdx
│   │       ├── creational-patterns.mdx
│   │       └── structural-patterns.mdx
│   ├── lib/
│   │   ├── types.ts                # Shared TypeScript types
│   │   └── utils.ts                # Utility functions
│   └── mdx-components.tsx          # MDX component registry
├── next.config.ts                  # Next.js + MDX configuration
└── package.json
```

## How to Add a New Concept

Adding a new concept requires only **2 steps**:

### Step 1: Create the MDX file

Create a new `.mdx` file in the appropriate content folder:

- HLD concept: `src/content/hld/your-concept.mdx`
- LLD concept: `src/content/lld/your-concept.mdx`

Use the existing MDX files as a template. Available components in MDX:

```mdx
<CodeBlock
  title="Example"
  java={`// Java code`}
  python={`# Python code`}
  go={`// Go code`}
  cpp={`// C++ code`}
  highlightLines={{ java: [1, 2, 3] }}
/>

<ComparisonBarChart
  title="Performance Comparison"
  data={[{ name: "SQL", reads: 1000, writes: 500 }]}
  bars={[
    { dataKey: "reads", color: "#3b82f6", label: "Reads/sec" },
    { dataKey: "writes", color: "#10b981", label: "Writes/sec" },
  ]}
/>

<FlowDiagram
  title="Request Flow"
  nodes={[
    { id: "1", label: "Client" },
    { id: "2", label: "Load Balancer" },
    { id: "3", label: "Server" },
  ]}
/>
```

### Step 2: Add metadata to the config

Add an entry to `src/config/concepts.config.ts`:

```typescript
{
  slug: "your-concept",        // Must match filename (without .mdx)
  title: "Your Concept Title",
  description: "A brief description of the concept.",
  category: "hld",             // "hld" or "lld"
  difficulty: "beginner",      // "beginner" | "intermediate" | "advanced"
  tags: ["tag1", "tag2"],
  order: 26,                   // Display order within the category
  estimatedReadTime: 12,       // Minutes
}
```

**That's it!** No routing changes, no layout changes, no imports needed.

## Features

- **Dark/Light Theme**: Toggle via the sun/moon button in the navbar
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Search**: Search across all concepts from the navbar
- **Code Blocks**: Multi-language tabbed code with syntax highlighting, line numbers, and copy button
- **Animations**: Scroll-triggered reveal animations via Framer Motion
- **Reading Progress**: Progress bar at the top of concept pages
- **Navigation**: Previous/Next concept links, breadcrumbs, collapsible sidebar
- **Charts**: Bar charts and line charts for performance comparisons
- **Flow Diagrams**: Animated step-by-step flow diagrams

## Concepts Covered

### HLD (25 concepts)
Scalability, Load Balancing, Caching, Database Design, Database Sharding, Database Replication, CAP Theorem, Consistent Hashing, Message Queues, Microservices, API Design, Rate Limiting, CDN, Proxy, DNS, Distributed Systems, MapReduce, Heartbeat, Checksum, Event-Driven Architecture, Blob Storage, Search Systems, Real-Time Communication, Circuit Breaker, Distributed Tracing

### LLD (20 concepts)
SOLID Principles, Creational Patterns, Structural Patterns, Behavioral Patterns, UML Diagrams, Parking Lot, Elevator System, Library Management, URL Shortener, Tic-Tac-Toe, Hotel Booking, Vending Machine, ATM System, File System, Social Media Feed, Notification System, Logging Framework, Rate Limiter, Cache (LRU/LFU), Connection Pool

## License

MIT
