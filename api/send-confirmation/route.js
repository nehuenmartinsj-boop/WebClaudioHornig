import { Resend } from 'resend';

const resend = new Resend('re_7DP8P81U_NvNxPZU3JoX3qkVNth1mgD7z');

const MASTERCLASS_MEET_LINK = 'https://meet.google.com/abc-defg-hij';

export async function POST(request) {
  try {
    const { email, name } = await request.json();
    
    if (!email || !name) {
      return Response.json({ error: 'Email y nombre son requeridos' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Claudio Hornig <onboarding@resend.dev>',
      to: [email],
      subject: 'Confirmación de registro - Masterclass Sanación Emocional',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #003857;">¡Hola ${name.split(' ')[0]}!</h1>
          <p>Gracias por registrarte en la Masterclass <strong>"Sanación Emocional Profunda"</strong>.</p>
          <p>Tu lugar ha sido reservado exitosamente.</p>
          <div style="background: #f3f3f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Fecha:</strong> 25 de Abril de 2026</p>
            <p style="margin: 10px 0;"><strong>Hora:</strong> 18:00 (Hora de Chile)</p>
            <p style="margin: 0;"><strong>Plataforma:</strong> Google Meet</p>
          </div>
          <p><strong>Enlace de acceso:</strong> <a href="${MASTERCLASS_MEET_LINK}" style="color: #39665f;">${MASTERCLASS_MEET_LINK}</a></p>
          <p>Te recomendamos unirte 5 minutos antes del inicio.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">Si no realizaste este registro, ignora este correo.</p>
        </div>
      `
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}