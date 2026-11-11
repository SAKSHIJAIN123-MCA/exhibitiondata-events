import Link from "next/link";

export default function EventNotFound() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.25rem" }}>
      <h1>We couldn&rsquo;t find that event</h1>
      <p>
        It may have been renamed or removed. Browse the full list to find what
        you&rsquo;re looking for.
      </p>
      <p>
        <Link href="/events">Browse all events</Link>
      </p>
    </main>
  );
}