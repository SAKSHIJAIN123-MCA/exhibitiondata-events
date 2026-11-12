# ExhibitionData Events

A mini **Events** section for a B2B exhibition-data website: a searchable, filterable listing of international trade shows, a statically generated detail page for each event, and a "Get a Quote" request form.

Built as a frontend practical assignment for ExhibitionData with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** and a **mock JSON** data source.

## Contents

1. [Project overview](#1-project-overview)
2. [Features](#2-features)
3. [Technology stack](#3-technology-stack)
4. [Installation](#4-installation)
5. [Running locally](#5-running-locally)
6. [Folder structure](#6-folder-structure)
7. [Data source: why mock JSON](#7-data-source-why-mock-json)
8. [Component architecture](#8-component-architecture)
9. [How event data is retrieved](#9-how-event-data-is-retrieved)
10. [How `generateStaticParams()` works](#10-how-generatestaticparams-works)
11. [How search and filters work](#11-how-search-and-industrymonth-filters-work)
12. [How URL-based filter state works](#12-how-url-based-filter-state-works)
13. [How the quote form validation works](#13-how-the-quote-form-validation-works)
14. [Testing](#14-testing)
15. [Deployment](#15-deployment)
16. [Known limitations](#16-known-limitations)
17. [What I would improve with more time](#17-what-i-would-improve-with-more-time)
18. [AI tools used](#18-ai-tools-used)

---

## 1. Project overview

| Route | What it does |
| --- | --- |
| `/events` | Listing of all events with search, industry and month filters. Filter state lives in the URL. |
| `/events/[slug]` | Detail page for one event (e.g. `/events/ces-2027`), pre-rendered at build time, with breadcrumbs, related events and the quote form. |
| `/`, `/about`, `/contact` | Minimal pages so the header navigation has no dead links. Their copy is placeholder text. |
| any unknown URL | Custom 404 page. An unknown event slug shows an event-specific 404. |

The dataset contains **12 events across 4 industries** (Packaging, Healthcare, Technology, Food & Beverage), 3 per industry, starting in 8 different months.

### Assignment requirements

| # | Requirement | Status |
| --- | --- | --- |
| 1 | Events listing page at `/events` | Done |
| 2 | Event detail pages at `/events/[slug]` | Done |
| 3 | At least 8 events across 4 industries | Done (12 events) |
| 4 | Search by event name | Done |
| 5 | Industry and month filters | Done |
| 6 | Filters work together | Done |
| 7 | Get a Quote form with validation | Done (submission is mocked, see [section 13](#13-how-the-quote-form-validation-works)) |
| 8 | Static generation for detail pages | Done |
| 9 | Related events | Done |
| 10 | Custom 404 page | Done |
| 11 | Responsive design (375px, tablet, desktop) | Done |
| 12 | Optimized images | Done (`next/image`) |
| 13 | URL-based filters | Done |
| 14 | Reusable components | Done |
| 15 | Basic tests | **Not yet included**, see [section 14](#14-testing) |

## 2. Features

**Listing page (`/events`)**
- Hero section, then a filter bar and a responsive card grid (1 column on mobile, 2 on tablet, 3 on desktop).
- Real-time search by event name (no Enter key needed) plus industry and month dropdowns.
- All three filters combine (logical AND). A "Clear Filters" button resets them.
- Result counter ("Showing 2 of 12 events") and a clear "No events found" state with a reset button.
- Each card shows the image, name, date range, city and country, an industry badge and a "View Details" link. The whole card is clickable but has a single keyboard tab stop.
- Filters are stored in the URL, so a filtered page can be shared, bookmarked or refreshed.

**Detail page (`/events/[slug]`)**
- Event name, hero image, start and end date, venue, city, country, industry, short and full description.
- Breadcrumbs (Home > Events > Event name).
- A prominent "Get a Quote" button (in the page header and in the details card) that scrolls to the quote form. It is a plain `#quote` anchor, so it also works without JavaScript.
- "Related events": other events in the same industry, each linking to its own detail page.
- Per-event page title, meta description and Open Graph tags.

**Quote form**
- Name, Business Email, Company, Data Needed (Exhibitor List / Attendee List / Both) and Message, all required.
- Inline validation with accessible error messages, a loading state, and a success message that names the event.
- Shows which event the request is for and clears itself after a successful submission. **No backend is called.**

**General**
- Shared header (logo text "ExhibitionData", Home / Events / About / Contact) and footer on every page.
- Custom 404 pages (`app/not-found.tsx` and `app/events/not-found.tsx`).
- Accessibility basics: skip-to-content link, labelled form controls, `aria-current` on navigation and breadcrumbs, labelled landmark sections, descriptive image alt text, visible focus styles, reduced-motion support, and form controls and buttons that are at least 44px tall.
- Images use `next/image` with `sizes`; above-the-fold images load eagerly and the rest are lazy.

## 3. Technology stack

- **Next.js** (App Router), developed and checked against Next.js 16 with React 19
- **TypeScript** (strict)
- **Tailwind CSS** v4
- **ESLint** (`eslint-config-next`)

No runtime dependencies were added beyond Next.js, React and React DOM. There is no UI library, form library, state library or icon package. The few icons are inline SVG in `components/ui/icons.tsx`. Check `package.json` for the exact versions installed in your copy.

## 4. Installation

**Prerequisites:** Node.js **20.9 or newer** (required by Next.js 16) and npm.

```bash
git clone <your-repository-url>
cd <project-folder>
npm install
```

**Image hosts.** The seed data uses placeholder images from `picsum.photos`. `next/image` only loads remote images from hosts you allow, so `next.config.ts` must contain:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};
```

If you change the image URLs in `data/events.json`, update this list to match.

**Environment variables (optional).** `NEXT_PUBLIC_SITE_URL` sets the base URL used to resolve absolute URLs in metadata (Open Graph). It defaults to `http://localhost:3000`. Set it to your real domain when deploying. Nothing else is required.

## 5. Running locally

```bash
npm run dev      # development server with hot reload, http://localhost:3000
npm run build    # production build (also type-checks and pre-renders pages)
npm run start    # serve the production build (run `build` first)
npm run lint     # ESLint
```

Then open <http://localhost:3000/events>. Some URLs worth trying:

- `/events?q=pack` search by name
- `/events?industry=healthcare&month=2` industry and month together
- `/events/ces-2027` a detail page
- `/events/does-not-exist` the event 404 page

## 6. Folder structure

The project uses the Next.js App Router directly from the root directory. There is no `src/` directory. All application routes, components, libraries, types and mock data are organized at the project root.

```text
project-root/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout: header, footer, metadata
│   ├── globals.css                   # Tailwind import + global styles
│   ├── page.tsx                      # Home page
│   ├── about/
│   │   └── page.tsx                  # About page
│   ├── contact/
│   │   └── page.tsx                  # Contact page
│   ├── not-found.tsx                 # Global 404 page
│   └── events/
│       ├── page.tsx                  # Events listing page
│       ├── not-found.tsx             # Event-specific 404 page
│       └── [slug]/
│           └── page.tsx              # Event detail page
│
├── components/
│   ├── ui/                           # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Container.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── FormField.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── EmptyState.tsx
│   │   └── icons.tsx
│   │
│   ├── layout/                       # Shared site layout
│   │   ├── Header.tsx
│   │   ├── NavLinks.tsx
│   │   ├── Footer.tsx
│   │   ├── NotFoundView.tsx
│   │   └── PageIntro.tsx
│   │
│   └── events/                       # Event-specific components
│       ├── EventsHero.tsx
│       ├── EventsExplorer.tsx
│       ├── EventFilters.tsx
│       ├── EventsExplorerSkeleton.tsx
│       ├── EventGrid.tsx
│       ├── EventCard.tsx
│       ├── IndustryBadge.tsx
│       ├── EventHeader.tsx
│       ├── EventHeroImage.tsx
│       ├── EventDetails.tsx
│       ├── GetQuoteButton.tsx
│       ├── QuoteSection.tsx
│       ├── QuoteForm.tsx
│       └── RelatedEvents.tsx
│
├── lib/                              # Application logic and utilities
│   ├── events.ts                     # Event data access
│   ├── filters.ts                    # Search and filter logic
│   ├── validation.ts                 # Quote form validation
│   ├── quote.ts                      # Mock quote submission
│   ├── format.ts                     # Date formatting
│   ├── constants.ts                  # Shared constants
│   └── cn.ts                         # Class name utility
│
├── types/
│   ├── event.ts                      # Event-related TypeScript types
│   └── quote.ts                      # Quote form types
│
├── data/
│   └── events.json                   # Mock event dataset (12 events)
│
├── public/                           # Static assets
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json
├── eslint.config.mjs
└── README.md
```

All imports use the root-based `@/*` alias (for example, `@/lib/events` and `@/components/events/EventCard`).



## 7. Data source: why mock JSON

I used a local JSON file (`data/events.json`) instead of the WordPress REST API or WPGraphQL. My reasons:

1. **The assignment is about frontend skills.** Standing up a WordPress instance with a custom post type, custom fields and a GraphQL plugin would have used much of the available time on setup instead of on the UI, routing, filtering and form work being evaluated.
2. **Zero setup for the reviewer.** `npm install && npm run dev` is enough. There is no WordPress site to host, no plugins, credentials, CORS rules or environment variables.
3. **Deterministic builds.** `generateStaticParams()` runs at build time. With a remote API, a slow, rate-limited or unavailable server could break the build or make results differ between runs. Local data cannot.
4. **Control over the dataset.** I could guarantee at least 8 events, 4 industries, a spread of months, and several events sharing a month or industry so that combined filters can be exercised properly.

**Trade-offs I accept with this choice**

- There is no CMS for editing content, and no real, live data.
- The whole dataset is loaded for the listing and filtered in the browser. That is fine for 12 events but would not scale to thousands (see [section 17](#17-what-i-would-improve-with-more-time)).
- `events.json` is cast to the `TradeEvent` type. It is not validated at runtime, so a malformed entry would not be caught until it caused an error.

**Moving to WordPress later.** I designed the data layer so this would be a contained change. `lib/events.ts` is the only file that imports the JSON, and every function in it is already `async`, as a network call would be. Switching would mean replacing its internals with a fetch to the REST API (or a WPGraphQL query), mapping the response into the existing `TradeEvent` shape in one function, and adding caching or revalidation. Components, routes and filtering would not need to change. I have not built either integration. This describes the intended approach, not existing code.

**About the data itself.** Event names, cities and venues are based on real trade shows, but they were not verified against the organisers' current information, and the 2027 dates in particular are illustrative. The descriptions were written for this assignment. Images are random placeholders from `picsum.photos`, so each `altText` describes the subject the image is meant to show, not what the placeholder currently displays.

Event shape (`types/event.ts`):

```ts
export interface TradeEvent {
  id: string;
  name: string;
  slug: string;            // unique, URL-safe
  startDate: string;       // ISO 8601: YYYY-MM-DD
  endDate: string;         // ISO 8601: YYYY-MM-DD
  city: string;
  country: string;
  venue: string;
  industry: "Packaging" | "Healthcare" | "Technology" | "Food & Beverage";
  shortDescription: string;
  fullDescription: string;
  image: string;
  altText: string;
}
```

I named it `TradeEvent` rather than `Event` so it does not shadow the browser's global `Event` type.

## 8. Component architecture

**Three layers**

| Layer | Folder | Rule |
| --- | --- | --- |
| Primitives | `components/ui` | Generic and reusable. No imports from `events/`. |
| Site chrome | `components/layout` | Header, footer, 404 layout. |
| Feature | `components/events` | Event-specific pieces composed from the primitives. |

**Server and client split.** Components are Server Components by default. Only the parts that need state or browser APIs are Client Components, which keeps the JavaScript sent to the browser small.

| Component | Runs on | Why |
| --- | --- | --- |
| `app/events/page.tsx`, `app/events/[slug]/page.tsx` | Server | Read data and compose the page. |
| `EventsExplorer` (with `EventFilters`, `EventGrid` and `EventCard` inside it) | Client | Holds filter state and filters as you type. |
| `QuoteForm` | Client | Form state, validation, submit handling. |
| `NavLinks` | Client | Uses `usePathname()` to highlight the current page. |
| `Header`, `Footer`, `EventsHero`, `EventHeader`, `EventDetails`, `QuoteSection`, `RelatedEvents`, 404 pages | Server | Static presentation. |

The `ui` primitives have no `"use client"` directive. They run on the server or the client depending on where they are imported.

**Design decisions**

- **Logic is separate from UI.** Filtering (`lib/filters.ts`) and validation (`lib/validation.ts`) are pure functions with no React or browser APIs, so they are easy to test and reuse.
- **`EventFilters` is a controlled component.** It owns no state and knows nothing about the URL or the event list. The parent passes the current filters and receives changes.
- **Lean data for the browser.** The listing passes `EventSummary` objects (an event without `fullDescription`) to the client component, so the long descriptions are not sent to the browser.
- **Links styled as buttons.** `buttonStyles()` is exported from `Button.tsx`, so a `<Link>` can look like a button without nesting a `<button>` inside an `<a>`.
- **`QuoteSection` stays a Server Component.** The client-side `QuoteForm` is passed to it as `children`.
- **Whole-card links.** `EventCard` uses one link stretched over the card (an `::after` overlay), so the whole card is clickable with a single tab stop and screen readers hear "View Details for <event>".
- **Timezone-safe dates.** `lib/format.ts` formats ISO dates from their string parts instead of through `new Date()`, so the server and the browser always render the same text and there are no hydration mismatches.

## 9. How event data is retrieved

All access goes through `lib/events.ts`. Pages and components never import the JSON directly.

| Function | Returns | Used by |
| --- | --- | --- |
| `getEventSummaries()` | All events without the long description, soonest first | `/events` (hero stats and the explorer) |
| `getEventBySlug(slug)` | One event, or `undefined` | Detail page and its metadata |
| `getAllEventSlugs()` | Every slug | `generateStaticParams()` |
| `getRelatedEvents(slug, limit = 3)` | Events in the same industry, excluding the current one | Detail page |
| `getAllEvents()` | All full events, soonest first | Used internally by `getEventSummaries()` |

Details:

- Events are sorted by `startDate`. Because dates are ISO strings, plain string comparison sorts them correctly.
- Every function is `async`, to match what a real data source would look like.
- Functions return copies, so callers cannot accidentally change the shared data.
- **Related events:** same industry, excluding the current event, ordered by how close the start date is to the current event's, capped at 3. With 3 events per industry in the dataset, each event shows 2 related events. An unknown slug returns an empty list.

## 10. How `generateStaticParams()` works

In `app/events/[slug]/page.tsx`:

```ts
export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

At `next build`, Next.js calls this function, gets one `{ slug }` per event and renders `/events/<slug>` for each one into static HTML. In the `next build` output every event page is listed as prerendered, and the build folder contains one HTML file per slug. Adding an event to `events.json` adds its page on the next build. `generateMetadata()` receives the same `params`, so each page also gets its own title, description and Open Graph tags.

**Unknown slugs.** The page looks the slug up and calls `notFound()` when there is no match. That stops rendering and shows `app/events/not-found.tsx` (the custom event 404 page). Slug matching is case-sensitive, so `/events/CES-2027` is a 404.

**A caveat with Cache Components.** Check `next.config.ts` for `cacheComponents: true` (the `create-next-app` template this project was developed with had it enabled). In that mode `dynamicParams = false` is not available, and the very first request to an unknown slug returns the correct 404 page with a `noindex` tag but an HTTP status of **200**. Later requests to the same URL return a real **404**. This was observed in testing and matches the Next.js documentation. Without Cache Components, `export const dynamicParams = false` would give a hard 404 immediately.

**The listing page** is partially prerendered. The static shell (hero) is generated at build time, and the part that reads `searchParams` renders inside a `<Suspense>` boundary at request time, with a skeleton as the fallback.

## 11. How search and industry/month filters work

The logic lives in `lib/filters.ts` as the pure function `filterEvents(events, filters)`.

| Filter | Behaviour |
| --- | --- |
| **Search** | Case-insensitive and accent-insensitive. The text is split into words and **every word** must appear in the event name, so `pack east` finds "PACK EXPO East 2027" and `dusseldorf` would match a name containing "Düsseldorf". **Only the event name is searched**, not city, country or description. |
| **Industry** | Exact match on one industry, or "All industries". |
| **Month** | Matches the month the event **starts** in. An event running from 30 March to 2 April counts as March. The dropdown lists all 12 months, whether or not they have events. |
| **Combined** | All active filters must match (logical AND). Results keep the soonest-first order. |

`EventsExplorer` holds the filter state and applies `filterEvents` in the browser on every change, so results update instantly while typing, with no server round trip.

## 12. How URL-based filter state works

The URL is the shareable record of the filter state:

```
/events?q=pack&industry=food-beverage&month=6
```

- **Only non-default values appear.** No filters gives a clean `/events`. Industry values are readable slugs (`food-beverage`, not `Food%20%26%20Beverage`). The month is a number from 1 to 12.
- **Server to client (load, refresh, shared link).** `app/events/page.tsx` reads `searchParams`, `parseFilters()` turns them into valid filters, and these become the initial state of `EventsExplorer`. The first HTML the server sends already shows the filtered results, and the inputs are pre-filled.
- **Client to URL (while using the page).** After each change, `EventsExplorer` waits **250 ms** and then updates the address bar with `window.history.replaceState`. The URL stays shareable, and the debounce avoids rewriting it on every keystroke. `replaceState` also avoids adding one history entry per keystroke.
- **Invalid or malicious values are ignored.** `?industry=bogus` or `?month=99` fall back to "no filter" and are removed from the address bar. Search text is trimmed, collapsed and capped at 100 characters.
- **Clicking "Events" in the navigation** while on a filtered URL resets the filters. The explorer is given a `key` derived from the server-side filters, so it remounts with fresh state.
- **Footer and home links** such as `/events?industry=healthcare` use the same mechanism.

**Trade-off:** because the URL uses `replaceState`, the browser Back button does not step back through earlier filter states. Back leaves the events page instead. The filter bar is a standard `<form method="get" action="/events">` intended as a basic fallback if JavaScript has not loaded. I did not test that path separately, and the dropdowns need JavaScript to apply.

## 13. How the quote form validation works

`QuoteForm` (client component) keeps all state in React (`useState`). The rules are pure functions in `lib/validation.ts`.

**Rules**

| Field | Rule |
| --- | --- |
| Name | Required. Whitespace-only counts as empty. Maximum 100 characters. |
| Business Email | Required. Must be a valid format: a local part, an `@`, and a domain with at least one dot and a final label of 2 or more letters. Rejects `name@company`, `a..b@x.com`, `.a@x.com` and addresses with spaces. Maximum 254 characters. Format only: it does not check that the mailbox exists or reject free providers such as Gmail. |
| Company | Required. Maximum 100 characters. |
| Data Needed | Required. Must be one of Exhibitor List, Attendee List or Both. |
| Message | Required. Maximum 1000 characters. |

**When errors appear**

- **On submit:** every field is checked. If anything fails, nothing is sent and focus moves to the first invalid field.
- **On blur:** a field is checked only after you have typed in it, so tabbing past an empty field does not show an error.
- **On change:** a field that already shows an error is re-checked on every keystroke, so the message disappears as soon as the problem is fixed.

**Accessibility.** Every control has a visible label. Invalid fields get `aria-invalid="true"` and `aria-describedby` pointing at their error message. Messages are text with an icon, not colour alone. The browser's own validation bubbles are turned off (`noValidate`) so the messages are consistent. A status region announces "Sending your request", and focus moves to the success message when the form is replaced.

**How submission works without a backend**

1. `onSubmit` calls `preventDefault()` first, so the page never reloads. Pressing Enter in a field submits the form.
2. `parseQuoteForm()` validates and trims the values. If it fails, the errors are shown and nothing is sent.
3. The form calls `submitQuoteRequest()` in `lib/quote.ts`. **This is a mock:** it waits about 900 ms to simulate a network request and returns a reference number such as `QR-K3J9XA`. **No data leaves the browser.** While it waits, the button reads "Sending…" and the fields are locked, so a double-click sends only one request.
4. On success, the form is cleared and a success message shows the event name, what was requested, the email the reply would go to, and the reference number. "Submit another request" shows a blank form again.
5. If the call throws, an error message is shown and what the visitor typed is kept so they can retry.

The success message ("Our team will review it…") is interface copy only. No request is stored or received anywhere.

`QuoteForm` takes an `event` prop (shown in the form and included in the request) and an optional `onSubmit` prop. To connect a real backend, replace the body of `submitQuoteRequest()` with a `fetch` call or a Server Action, and run `parseQuoteForm()` again on the server because client-side validation can always be bypassed. Spam protection, rate limiting and email delivery are **not** implemented.

## 14. Testing

**Automated tests are not included yet.** The assignment lists basic tests as a requirement, and this repository does not have a test suite or a `test` script. I would rather state that plainly than imply otherwise. The pure modules (`lib/filters.ts`, `lib/validation.ts`, `lib/events.ts`, `lib/format.ts`) were written to be easy to unit test, and a test setup is the first item in [section 17](#17-what-i-would-improve-with-more-time).

**Automated checks that do exist**

```bash
npm run lint     # ESLint
npm run build    # compiles, type-checks and pre-renders every page; fails on errors
```

**Manual test checklist** (after `npm run dev`)

| Area | Steps | Expected result |
| --- | --- | --- |
| Listing | Open `/events` | 12 event cards, "Showing 12 of 12 events" |
| Search | Type `pack` | 2 results (PACK EXPO East 2027, FACHPACK 2027); the URL becomes `?q=pack` |
| Industry | Choose Healthcare | 3 results |
| Month | Choose February | Only events starting in February |
| Combined | Healthcare and February | 1 result (WHX Dubai 2027) |
| Empty state | Open `/events?q=zzz` | "No events found" with a Clear Filters button |
| Clear | Click Clear Filters | All 12 events, URL back to `/events` |
| Refresh | Apply filters, reload | Same filters and results |
| Shared link | Open `/events?industry=food-beverage&month=6` in a new tab | Summer Fancy Food Show 2027 only |
| Bad params | Open `/events?industry=bogus&month=99` | All events, params removed from the URL |
| Detail page | Open `/events/ces-2027` | All event info, breadcrumbs Home > Events > CES 2027 |
| Quote scroll | Click "Get a Quote" | Page scrolls to the quote form |
| Related events | Check the section at the bottom | Same-industry events only, each linking to its own page |
| 404 | Open `/events/does-not-exist` and `/nope` | Custom 404 pages with header and footer |
| Form errors | Click "Request Quote" with empty fields | 5 inline errors, focus on Name, no reload |
| Email format | Enter `name@company` | "Please enter a valid email address…" |
| Form success | Fill every field validly and submit | "Sending…", then a success message naming the event; the form is cleared |
| Responsive | Browser dev tools at 375px, 768px and 1280px wide | No horizontal scrolling; 1, 2 and 3 card columns |

## 15. Deployment

This project has not been deployed, so there is no live URL yet.

**Vercel (simplest for Next.js)**

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New > Project** and import the repository. Vercel detects the Next.js framework and uses the default build command (`npm run build`) automatically.
3. Optionally add the environment variable `NEXT_PUBLIC_SITE_URL` set to your production URL.
4. Deploy. Event pages are generated during the build.

**Any Node.js host**

```bash
npm install
npm run build
npm run start     # serves on port 3000; set the PORT environment variable to change it
```

Use Node.js 20.9 or newer. Make sure `next.config.ts` allows your image host (see [Installation](#4-installation)). If you add events or change the data, rebuild so the detail pages are regenerated.

## 16. Known limitations

- **Mock submission.** The quote form sends nothing, and there is no server-side validation (see [section 13](#13-how-the-quote-form-validation-works)).
- **No automated tests yet** (see [section 14](#14-testing)).
- **Unknown-slug status code.** With Cache Components enabled, the first request to an unknown event slug returns HTTP 200 with the 404 page and a `noindex` tag (see [section 10](#10-how-generatestaticparams-works)).
- **Search covers event names only.** The month filter uses the start month only.
- **All events are sent to the browser.** The listing filters client-side, which suits a dataset of this size.
- **Data is illustrative.** Dates are not verified against organisers' calendars, and images are random placeholders (see [section 7](#7-data-source-why-mock-json)).
- **Past events are not hidden.** All events are shown regardless of date. The sample dates are all in 2027, so once those dates pass the events will still be listed.
- **Placeholder pages.** Home, About and Contact are minimal, and the contact email uses an example domain.
- **Back button and filters.** Filter changes use `replaceState`, so Back does not undo them.
- **No accessibility audit has been run.** Accessibility was handled through semantic HTML and ARIA practices, but it has not been checked with audit tools (axe, Lighthouse) or with assistive technology.

## 17. What I would improve with more time

1. **Automated tests.** Set up Jest (via `next/jest`) or Vitest with React Testing Library. Start with unit tests for `filters.ts`, `validation.ts`, `events.ts` and `format.ts`, then component tests for `EventCard`, `EventFilters` and `QuoteForm`, then a few Playwright end-to-end tests for search, combined filters, refresh persistence and the quote flow.
2. **Real data source.** Replace the JSON with the WordPress REST API or WPGraphQL behind the existing `lib/events.ts` functions, with a mapper into `TradeEvent`, runtime validation of the response (for example with Zod) and cache revalidation.
3. **Real quote submission.** A Server Action or API route that re-validates with `parseQuoteForm()`, plus spam protection (honeypot, rate limiting or CAPTCHA), email notification and storage.
4. **Scale the listing.** Server-side filtering with pagination or "load more" once the dataset grows beyond what is comfortable to send to the browser.
5. **Hard 404 for unknown slugs from the first request**, for example by checking the slug in a proxy (middleware) before rendering, so crawlers never see a 200.
6. **SEO.** `Event` structured data (JSON-LD), a sitemap and `robots.txt`.
7. **Filter UX.** Multi-select industries, sorting, an optional "upcoming only" toggle, and a choice to push history entries so Back steps through filters.
8. **Better data and images.** Verified dates, real or self-hosted optimized images, and a fix for placeholder alt text that does not match the image.
9. **Accessibility audit.** Run axe and Lighthouse and test with screen readers, then fix what they find.
10. **Content.** Real About and Contact pages, and a proper error boundary page for unexpected errors.

## 18. AI tools used

I used **Claude** (by Anthropic) for development assistance, code suggestions, debugging and documentation, including drafting this README. I reviewed and tested the implementation myself.
