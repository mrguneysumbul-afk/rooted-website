import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { postcode } = await req.json()
    const cleaned = postcode.toUpperCase().trim().replace(/\s+/g, '')
    const prefix = cleaned.match(/^[A-Z]+/)?.[0] || ''

    const { data, error } = await supabase
      .from('postcode_coverage')
      .select('active')
      .eq('postcode_prefix', prefix)
      .single()

    if (error || !data) {
      return NextResponse.json({ covered: false })
    }

    return NextResponse.json({ covered: data.active })
  } catch {
    return NextResponse.json({ covered: false })
  }
}
