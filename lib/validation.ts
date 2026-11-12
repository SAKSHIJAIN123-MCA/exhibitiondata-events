import {
  DATA_NEEDED_OPTIONS,
  type DataNeeded,
  type QuoteField,
  type QuoteFormErrors,
  type QuoteFormValues,
  type QuoteRequestValues,
} from "@/types/quote";

/**
 * Validation for the quote form. Pure functions only: no React, no DOM, so the
 * rules can be unit tested on their own and reused anywhere (a future server
 * action should run the same `parseQuoteForm`, because client-side checks
 * alone can always be bypassed).
 */

/** Maximum lengths. The inputs use the same numbers for their `maxLength`. */
export const QUOTE_LIMITS = {
  name: 100,
  email: 254, // the practical maximum length of an email address
  company: 100,
  message: 1000,
} as const;

/** Order the fields appear in the form; used to focus the first invalid one. */
export const QUOTE_FIELD_ORDER: readonly QuoteField[] = [
  "name",
  "email",
  "company",
  "dataNeeded",
  "message",
];

// Local part allows the characters in the HTML living standard's email
// pattern; the domain must have at least one dot (so "user@localhost" and
// "user@company" are rejected, which is what you want for a business email).
const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

/** True for a plausibly valid email address (format only, not deliverability). */
export function isValidEmail(email: string): boolean {
  const value = email.trim();
  if (value.length === 0 || value.length > QUOTE_LIMITS.email) return false;
  if (!EMAIL_PATTERN.test(value)) return false;

  const [local, domain] = value.split("@");
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return false;
  }
  // The last domain label (the TLD) must be at least 2 letters: "a@b.c" is not valid.
  const tld = domain.slice(domain.lastIndexOf(".") + 1);
  return /^[A-Za-z]{2,}$/.test(tld);
}

export function isDataNeeded(value: string): value is DataNeeded {
  return (DATA_NEEDED_OPTIONS as readonly string[]).includes(value);
}

/**
 * Validates one field. Returns an error message, or `undefined` when valid.
 * Whitespace is trimmed first, so "   " counts as empty.
 */
export function validateField(
  field: QuoteField,
  rawValue: string,
): string | undefined {
  const value = rawValue.trim();

  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length > QUOTE_LIMITS.name) {
        return `Name must be ${QUOTE_LIMITS.name} characters or fewer.`;
      }
      return undefined;

    case "email":
      if (!value) return "Please enter your business email.";
      if (!isValidEmail(value)) {
        return "Please enter a valid email address, for example name@company.com.";
      }
      return undefined;

    case "company":
      if (!value) return "Please enter your company name.";
      if (value.length > QUOTE_LIMITS.company) {
        return `Company name must be ${QUOTE_LIMITS.company} characters or fewer.`;
      }
      return undefined;

    case "dataNeeded":
      return isDataNeeded(value) ? undefined : "Please select the data you need.";

    case "message":
      if (!value) return "Please tell us a little about your request.";
      if (value.length > QUOTE_LIMITS.message) {
        return `Message must be ${QUOTE_LIMITS.message} characters or fewer.`;
      }
      return undefined;
  }
}

/** Validates every field and returns only the ones with errors. */
export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  for (const field of QUOTE_FIELD_ORDER) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export function hasErrors(errors: QuoteFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export type ParseQuoteResult =
  | { ok: true; values: QuoteRequestValues }
  | { ok: false; errors: QuoteFormErrors };

/**
 * Validates the form and, on success, returns clean values (trimmed, with
 * `dataNeeded` narrowed to a real option). Using a result type instead of a
 * boolean means callers can't use the values without checking `ok` first.
 */
export function parseQuoteForm(values: QuoteFormValues): ParseQuoteResult {
  const errors = validateQuoteForm(values);
  if (hasErrors(errors) || !isDataNeeded(values.dataNeeded)) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    values: {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      dataNeeded: values.dataNeeded,
      message: values.message.trim(),
    },
  };
}
