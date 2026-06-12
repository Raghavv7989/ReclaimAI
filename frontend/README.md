<![CDATA[# Frontend — Next.js 15 Client Application

## Responsibility

The frontend is the user-facing web application for ReclaimAI. It provides:

- **Public pages**: Landing, explore/browse found items, public item view
- **Authentication**: Login, register, password reset flows
- **Dashboard**: User statistics, activity feed, quick actions
- **Item Reporting**: Multi-step forms for lost/found item submission
- **Match Management**: View AI-generated matches, compare items, accept/reject
- **Messaging**: In-context chat between matched users
- **Notifications**: Real-time notification feed

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | React framework with App Router (SSR/SSG) |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Accessible component primitives |
| Framer Motion | Animations and transitions |
| TanStack Query | Server state management (caching, mutations) |
| Zustand | Client state management (auth, UI, notifications) |
| Zod | Runtime schema validation |
| React Hook Form | Form state management |

## Architecture

```
src/
├── app/            → App Router pages and layouts
├── components/     → Reusable UI components
├── hooks/          → Custom React hooks
├── lib/            → Utilities, API client, validators
├── stores/         → Zustand state stores
├── types/          → TypeScript type definitions
└── providers/      → Context providers (query, auth, theme)
```

## State Management Rules

1. **Server state** (items, matches, messages) → TanStack Query only
2. **Client state** (auth, UI toggles) → Zustand only
3. **Never duplicate** server state into Zustand
4. **All API calls** go through TanStack Query hooks — never raw `fetch` in components

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Build for production
npm run build
```
]]>
