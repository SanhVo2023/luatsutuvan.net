import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * On-demand ISR revalidation endpoint. The Content Hub POSTs here after a
 * rendition / page / navigation / site-settings change so edits appear within
 * seconds instead of waiting out the 1-hour ISR window.
 *
 *   POST /api/revalidate?secret=<REVALIDATE_SECRET>&path=/some-slug
 *
 * The secret is shared with the hub via the REVALIDATE_SECRET env var on both
 * sides. A path of "/" also revalidates the root layout (chrome changes).
 */
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'invalid secret' }, { status: 401 })
  }
  const path = req.nextUrl.searchParams.get('path') || '/'
  try {
    revalidatePath(path)
    if (path === '/') revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true, revalidated: path })
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    )
  }
}
