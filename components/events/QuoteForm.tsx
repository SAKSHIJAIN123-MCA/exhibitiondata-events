"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircleIcon } from "@/components/ui/icons";
import { submitQuoteRequest } from "@/lib/quote";
import {
  QUOTE_FIELD_ORDER,
  QUOTE_LIMITS,
  parseQuoteForm,
  validateField,
} from "@/lib/validation";
import {
  DATA_NEEDED_OPTIONS,
  type DataNeeded,
  type QuoteEventRef,
  type QuoteField,
  type QuoteFormErrors,
  type QuoteFormValues,
  type QuoteRequestPayload,
  type QuoteRequestResult,
} from "@/types/quote";

type Status = "idle" | "submitting" | "success";

const EMPTY_VALUES: QuoteFormValues = {
  name: "",
  email: "",
  company: "",
  dataNeeded: "",
  message: "",
};

const DATA_NEEDED_SELECT_OPTIONS = DATA_NEEDED_OPTIONS.map((option) => ({
  value: option,
  label: option,
}));

/** How each choice reads inside the success sentence. */
const DATA_NEEDED_PHRASE: Record<DataNeeded, string> = {
  "Exhibitor List": "the exhibitor list",
  "Attendee List": "the attendee list",
  Both: "both the exhibitor and attendee lists",
};

interface QuoteFormProps {
  /** The event this request is for. Shown in the form and sent with the request. */
  event: QuoteEventRef;
  /** Optional extra line under the event name, e.g. "6–9 Jan 2027 · Las Vegas, United States". */
  eventDetails?: string;
  /**
   * Sends the request. Defaults to the mock in `lib/quote.ts`. Pass your own
   * to connect a real API (or a fast fake in tests); it should resolve with a
   * reference id on success and throw/reject on failure.
   */
  onSubmit?: (payload: QuoteRequestPayload) => Promise<QuoteRequestResult>;
}

/** Details kept for the success message, because the form itself is cleared. */
interface SubmittedRequest {
  name: string;
  email: string;
  dataNeeded: DataNeeded;
  referenceId: string;
}

/**
 * "Get a Quote" form for one event.
 *
 * All form state lives here in React state (no form library):
 *  - `values`   what the visitor has typed
 *  - `errors`   the message to show under each invalid field
 *  - `status`   idle -> submitting -> success
 *
 * When errors appear:
 *  - on submit: every field is checked; if any fail, nothing is sent and focus
 *    moves to the first invalid field
 *  - on blur: a field is checked once the visitor has typed in it (tabbing
 *    past an empty field doesn't scold them)
 *  - on change: a field that is already showing an error is re-checked on each
 *    keystroke, so the message disappears as soon as the problem is fixed
 *
 * The browser's built-in validation is switched off (`noValidate`) so the
 * messages are ours: consistent, styled and announced to screen readers.
 */
export function QuoteForm({
  event,
  eventDetails,
  onSubmit = submitQuoteRequest,
}: QuoteFormProps) {
  const formId = useId();
  const fieldId = (field: QuoteField) => `${formId}-${field}`;

  const [values, setValues] = useState<QuoteFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedRequest | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  /** Fields the visitor has typed in (not render state, so a ref). */
  const touched = useRef<Partial<Record<QuoteField, boolean>>>({});
  /** Set when returning from the success screen, so focus goes to the first field. */
  const refocusForm = useRef(false);

  // Move focus when the view changes, so keyboard and screen reader users
  // land on the new content instead of on a button that has disappeared.
  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    } else if (status === "idle" && refocusForm.current) {
      refocusForm.current = false;
      const first = formRef.current?.elements.namedItem(QUOTE_FIELD_ORDER[0]);
      if (first instanceof HTMLElement) first.focus();
    }
  }, [status]);

  function setFieldError(field: QuoteField, message: string | undefined) {
    setErrors((previous) => {
      const next = { ...previous };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function handleChange(field: QuoteField, value: string) {
    touched.current[field] = true;
    setValues((previous) => ({ ...previous, [field]: value }));
    // Only re-check fields already showing an error; others wait for blur/submit.
    if (errors[field]) setFieldError(field, validateField(field, value));
  }

  function handleBlur(field: QuoteField) {
    if (touched.current[field]) {
      setFieldError(field, validateField(field, values[field]));
    }
  }

  async function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    // Stop the browser from submitting the form itself (which would reload the page).
    submitEvent.preventDefault();
    if (status === "submitting") return; // ignore double clicks

    const result = parseQuoteForm(values);

    if (!result.ok) {
      setErrors(result.errors);
      const firstInvalid = QUOTE_FIELD_ORDER.find(
        (field) => result.errors[field],
      );
      const control = firstInvalid
        ? formRef.current?.elements.namedItem(firstInvalid)
        : null;
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    setErrors({});
    setSubmitError(null);
    setStatus("submitting");

    try {
      const { referenceId } = await onSubmit({ event, values: result.values });

      setSubmitted({
        name: result.values.name,
        email: result.values.email,
        dataNeeded: result.values.dataNeeded,
        referenceId,
      });
      // Clear the form, so it's blank if the visitor sends another request.
      setValues(EMPTY_VALUES);
      touched.current = {};
      setStatus("success");
    } catch {
      // Keep what they typed so nothing is lost; let them try again.
      setSubmitError(
        "We couldn't send your request. Please check your connection and try again.",
      );
      setStatus("idle");
    }
  }

  function startAnotherRequest() {
    refocusForm.current = true;
    setSubmitted(null);
    setStatus("idle");
  }

  // ------------------------------------------------------------------ success
  if (status === "success" && submitted) {
    const firstName = submitted.name.split(" ")[0];

    return (
      <div className="rounded-2xl bg-emerald-50 p-5 ring-1 ring-inset ring-emerald-200 sm:p-8">
        <div className="flex items-start gap-4">
          <CheckCircleIcon className="size-8 shrink-0 text-emerald-600" />
          <div className="min-w-0">
            <h3
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-xl font-semibold text-emerald-950 outline-none"
            >
              Quote request sent
            </h3>
            <p className="mt-2 text-emerald-900">
              Thank you, {firstName}. We&apos;ve received your request for{" "}
              {DATA_NEEDED_PHRASE[submitted.dataNeeded]} for{" "}
              <strong className="font-semibold">{event.name}</strong>. Our team
              will review it and reply to{" "}
              <strong className="break-all font-semibold">
                {submitted.email}
              </strong>
              .
            </p>

            <dl className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-emerald-800">Event</dt>
                <dd className="font-medium text-emerald-950">{event.name}</dd>
              </div>
              <div>
                <dt className="text-emerald-800">Reference</dt>
                <dd className="font-medium text-emerald-950">
                  {submitted.referenceId}
                </dd>
              </div>
            </dl>

            <Button
              variant="secondary"
              onClick={startAnotherRequest}
              className="mt-6 w-full sm:w-auto"
            >
              Submit another request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------- form
  const isSubmitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label={`Get a quote for ${event.name}`}
      className="space-y-6"
    >
      {/* Which event this request is for. */}
      <div className="rounded-xl bg-indigo-50 px-4 py-3 ring-1 ring-inset ring-indigo-100">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
          Quote request for
        </p>
        <p className="mt-0.5 text-base font-semibold text-slate-900">
          {event.name}
        </p>
        {eventDetails && (
          <p className="mt-0.5 text-sm text-slate-600">{eventDetails}</p>
        )}
      </div>

      <p className="text-sm text-slate-600">All fields are required.</p>

      {/* Disabling the fieldset locks every control while the request is sent. */}
      <fieldset disabled={isSubmitting} className="min-w-0 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id={fieldId("name")}
            name="name"
            label="Name"
            autoComplete="name"
            required
            maxLength={QUOTE_LIMITS.name}
            value={values.name}
            error={errors.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
          />
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            label="Business Email"
            placeholder="name@company.com"
            autoComplete="email"
            required
            maxLength={QUOTE_LIMITS.email}
            value={values.email}
            error={errors.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          <Input
            id={fieldId("company")}
            name="company"
            label="Company"
            autoComplete="organization"
            required
            maxLength={QUOTE_LIMITS.company}
            value={values.company}
            error={errors.company}
            onChange={(e) => handleChange("company", e.target.value)}
            onBlur={() => handleBlur("company")}
          />
          <Select
            id={fieldId("dataNeeded")}
            name="dataNeeded"
            label="Data Needed"
            placeholder="Select an option"
            options={DATA_NEEDED_SELECT_OPTIONS}
            required
            value={values.dataNeeded}
            error={errors.dataNeeded}
            onChange={(value) => handleChange("dataNeeded", value)}
            onBlur={() => handleBlur("dataNeeded")}
          />
        </div>

        <Textarea
          id={fieldId("message")}
          name="message"
          label="Message"
          placeholder="Tell us about your requirements, such as regions, job titles or timelines."
          required
          maxLength={QUOTE_LIMITS.message}
          value={values.message}
          error={errors.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
        />
      </fieldset>

      {submitError && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-inset ring-red-200"
        >
          {submitError}
        </p>
      )}

      <div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Sending…" : "Request Quote"}
        </Button>
        {/* Always in the page, so screen readers announce the text when it changes. */}
        <p role="status" className="sr-only">
          {isSubmitting ? "Sending your request" : ""}
        </p>
      </div>
    </form>
  );
}
