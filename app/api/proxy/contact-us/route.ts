import { NextResponse } from "next/server";

// Forwards the site's enquiry forms to the backend's /contact-us endpoint.
// Every form sends platform "COM" (see lib/site.ts), so the backend files
// these messages under socialwork-consultancy.com.
export async function POST(req: Request) {
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_API_URL || "").replace(
    /\/+$/,
    "",
  );
  if (!baseUrl) {
    console.error("contact-us proxy: NEXT_PUBLIC_API_URL is not set");
    return NextResponse.json(
      { message: "Our enquiry service isn’t available right now. Please try again later." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "The enquiry could not be read." }, { status: 400 });
  }

  try {
    const res = await fetch(`${baseUrl}/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error(`contact-us proxy: backend answered ${res.status}`, data);
    }
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(`contact-us proxy: could not reach ${baseUrl}/contact-us`, error);
    return NextResponse.json(
      { message: "We couldn’t send your message. Please try again shortly." },
      { status: 502 },
    );
  }
}
