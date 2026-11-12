import type {
  QuoteRequestPayload,
  QuoteRequestResult,
} from "@/types/quote";

/** How long the simulated request takes. Long enough to see the loading state. */
const SIMULATED_DELAY_MS = 900;

/**
 * MOCK submission. There is no backend in this project, so nothing is sent
 * anywhere: this waits a moment (like a network request would) and returns a
 * reference number, so the form's loading and success states behave as they
 * will with a real API.
 *
 * To connect a real backend later, replace the body of this function with a
 * `fetch("/api/quotes", { method: "POST", body: JSON.stringify(payload) })`
 * (or call a Server Action) and keep the same signature. The form component
 * won't need to change.
 */
export async function submitQuoteRequest(
  // The payload is unused until a real backend exists.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payload: QuoteRequestPayload,
): Promise<QuoteRequestResult> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  const suffix = (Date.now().toString(36) + Math.random().toString(36).slice(2))
    .slice(-6)
    .toUpperCase();

  return { referenceId: `QR-${suffix}` };
}
