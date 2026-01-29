# PostHog post-wizard report

The wizard has completed a deep integration of your Funky landing page project. PostHog has been set up using the recommended `instrumentation-client.ts` approach for Next.js 16.1.6 with the App Router. The integration includes automatic pageview tracking, session replay, error tracking, and custom event capture for key user interactions.

## Integration summary

- **Client-side SDK**: `posthog-js` installed and initialized via `instrumentation-client.ts`
- **Reverse proxy**: Configured in `next.config.ts` to route PostHog requests through `/ingest/*` to avoid ad blockers
- **Environment variables**: Configured in `.env` with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
- **Error tracking**: Enabled via `capture_exceptions: true`
- **Debug mode**: Enabled in development environment

## Events implemented

| Event Name | Description | File |
|------------|-------------|------|
| `cta_clicked` | User clicks the Request Invitation CTA button | `app/components/Hero.tsx` |
| `cta_clicked` | User clicks the Request Invitation button in navbar | `app/components/Navbar.tsx` |
| `demo_requested` | User clicks the Schedule a Demo button | `app/components/Navbar.tsx` |
| `nav_link_clicked` | User clicks navigation links (Features, Methodology, Docs) | `app/components/Navbar.tsx` |
| `mobile_menu_toggled` | User opens or closes the mobile navigation menu | `app/components/Navbar.tsx` |
| `discord_clicked` | User clicks the Discord link in the footer | `app/components/Footer.tsx` |

## Files modified

| File | Changes |
|------|---------|
| `.env` | Created with PostHog environment variables |
| `instrumentation-client.ts` | Created - PostHog client-side initialization |
| `next.config.ts` | Added rewrites for PostHog reverse proxy |
| `app/components/Hero.tsx` | Added `'use client'` directive and CTA click tracking |
| `app/components/Navbar.tsx` | Added event tracking for navigation, CTAs, and mobile menu |
| `app/components/Footer.tsx` | Added `'use client'` directive and Discord click tracking |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/300978/dashboard/1160104) - Your main analytics dashboard with all key metrics

### Insights
- [CTA Clicks Over Time](https://us.posthog.com/project/300978/insights/rHMqbVAR) - Track Request Invitation button clicks
- [Demo Requests](https://us.posthog.com/project/300978/insights/dyXpeSfF) - Track Schedule a Demo button clicks
- [Navigation Link Clicks](https://us.posthog.com/project/300978/insights/0PJkymvQ) - See which nav links users click most
- [Mobile Menu Usage](https://us.posthog.com/project/300978/insights/8giSK9C3) - Track mobile menu interactions
- [Discord Engagement](https://us.posthog.com/project/300978/insights/OZHjUQOb) - Track Discord link clicks

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
