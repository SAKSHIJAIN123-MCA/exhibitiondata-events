/** What the visitor can ask for. Single source for the dropdown and the type. */
export const DATA_NEEDED_OPTIONS = [
  "Exhibitor List",
  "Attendee List",
  "Both",
] as const;

export type DataNeeded = (typeof DATA_NEEDED_OPTIONS)[number];

/**
 * Raw form state while the visitor is typing. `dataNeeded` is "" until a
 * choice is made, which is what the dropdown's placeholder option holds.
 */
export interface QuoteFormValues {
  name: string;
  email: string;
  company: string;
  dataNeeded: DataNeeded | "";
  message: string;
}

export type QuoteField = keyof QuoteFormValues;

/** Error message per field; a field with no entry is valid. */
export type QuoteFormErrors = Partial<Record<QuoteField, string>>;

/** The same values once validated: trimmed, and `dataNeeded` is a real choice. */
export interface QuoteRequestValues
  extends Omit<QuoteFormValues, "dataNeeded"> {
  dataNeeded: DataNeeded;
}

/** The event a quote request is about. */
export interface QuoteEventRef {
  id: string;
  slug: string;
  name: string;
}

export interface QuoteRequestPayload {
  event: QuoteEventRef;
  values: QuoteRequestValues;
}

export interface QuoteRequestResult {
  /** Reference number shown to the visitor, e.g. "QR-K3J9XA". */
  referenceId: string;
}
