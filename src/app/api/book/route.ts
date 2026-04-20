import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([{
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        address_line1: body.address_line1,
        address_line2: body.address_line2 || null,
        city: body.city,
        postcode: body.postcode,
        service: body.service,
        appointment_date: body.appointment_date,
        appointment_time: body.appointment_time,
        notes: body.notes || null,
        status: 'pending',
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error full details:', JSON.stringify(error, null, 2))
      return NextResponse.json({
        error: 'Failed to save booking',
        details: error.message,
        code: error.code,
        hint: error.hint
      }, { status: 500 })
    }

    const serviceNames: Record<string, string> = {
      lllt: 'LLLT Therapy',
      prp: 'PRP Therapy',
      microneedling: 'Scalp Microneedling',
      supplements: 'Supplement Consultation',
      bundle: 'Full Assessment Bundle',
    }

    const serviceName = serviceNames[body.service] || body.service
    const formattedDate = new Date(body.appointment_date).toLocaleDateString('en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })

    try {
      await resend.emails.send({
        from: 'Rooted <onboarding@resend.dev>',
        to: body.email,
        subject: `Your Rooted appointment is confirmed — ${formattedDate}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: #1D9E75; padding: 32px; text-align: center;">
              <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.03em;">Rooted</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Growth, delivered.</p>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="font-size: 22px; font-weight: 600; color: #2C2C2A; margin: 0 0 8px;">
                You're booked in, ${body.first_name}
              </h2>
              <p style="color: #6B7280; font-size: 15px; margin: 0 0 32px; line-height: 1.6;">
                Your appointment has been confirmed. Our specialist will come to you — no need to travel anywhere.
              </p>
              <div style="background: #F3F4F6; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                  <tr>
                    <td style="color: #6B7280; padding: 6px 0; width: 40%;">Service</td>
                    <td style="color: #2C2C2A; font-weight: 600; padding: 6px 0;">${serviceName}</td>
                  </tr>
                  <tr>
                    <td style="color: #6B7280; padding: 6px 0;">Date</td>
                    <td style="color: #2C2C2A; font-weight: 600; padding: 6px 0;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="color: #6B7280; padding: 6px 0;">Time</td>
                    <td style="color: #2C2C2A; font-weight: 600; padding: 6px 0;">${body.appointment_time}</td>
                  </tr>
                  <tr>
                    <td style="color: #6B7280; padding: 6px 0;">Address</td>
                    <td style="color: #2C2C2A; font-weight: 600; padding: 6px 0;">
                      ${body.address_line1}${body.address_line2 ? ', ' + body.address_line2 : ''}, ${body.city}, ${body.postcode}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #6B7280; padding: 6px 0;">Reference</td>
                    <td style="color: #1D9E75; font-weight: 600; padding: 6px 0; font-family: monospace;">
                      ${booking.id.split('-')[0].toUpperCase()}
                    </td>
                  </tr>
                </table>
              </div>
              <div style="background: #FFF7F4; border-left: 4px solid #D85A30; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 32px;">
                <p style="margin: 0; font-size: 14px; color: #2C2C2A; line-height: 1.6;">
                  <strong>What to expect:</strong> Your specialist will arrive at your address at the scheduled time with all equipment. Please ensure you have a quiet space available for the treatment.
                </p>
              </div>
              <p style="font-size: 13px; color: #9CA3AF; text-align: center; margin: 0;">
                Questions? Reply to this email or contact us at hello@rootedhealth.co.uk<br>
                <strong style="color: #6B7280;">Rooted</strong> · Growth, delivered · Built by Procivo
              </p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Resend email failed (non-fatal):', emailError)
    }

    try {
      await fetch(process.env.N8N_WEBHOOK_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: booking.id,
          client_name: `${body.first_name} ${body.last_name}`,
          client_email: body.email,
          client_phone: body.phone,
          service: serviceName,
          date: formattedDate,
          time: body.appointment_time,
          address: `${body.address_line1}${body.address_line2 ? ', ' + body.address_line2 : ''}, ${body.city}, ${body.postcode}`,
          notes: body.notes || 'None',
          reference: booking.id.split('-')[0].toUpperCase(),
        }),
      })
    } catch (webhookError) {
      console.error('n8n webhook failed (non-fatal):', webhookError)
    }

    await supabase
      .from('bookings')
      .update({ confirmation_sent_at: new Date().toISOString() })
      .eq('id', booking.id)

    return NextResponse.json({
      success: true,
      booking_id: booking.id,
      reference: booking.id.split('-')[0].toUpperCase(),
    })

  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
