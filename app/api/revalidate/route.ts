import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook -> on-demand ISR. Configure in Sanity: Settings -> API ->
 * Webhooks, URL `https://<your-domain>/api/revalidate`, and set
 * SANITY_REVALIDATE_SECRET to the same value here and in the webhook's
 * signing secret. See SETUP.md.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET not configured" },
      { status: 501 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      request,
      secret,
    );
    if (!isValidSignature) {
      return NextResponse.json({ revalidated: false, message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ revalidated: false, message: "No document type" }, { status: 400 });
    }

    if (body._type === "faqItem") revalidateTag("faq", { expire: 0 });
    if (body._type === "docsSection") revalidateTag("docs", { expire: 0 });

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (error) {
    console.error("[revalidate] webhook error", error);
    return NextResponse.json({ revalidated: false, message: "Error validating request" }, { status: 500 });
  }
}
