/** Tiny className joiner: skips falsy values. Avoids adding a dependency. */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
