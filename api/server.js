const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend('re_7DP8P81U_NvNxPZU3JoX3qkVNth1mgD7z');

const MASTERCLASS_MEET_LINK = 'https://meet.google.com/abc-defg-hij';
const MASTERCLASS_DATE = '2026-04-25T18:00:00-04:00';

app.post('/api/send-confirmation', async (req, res) => {
    const { email, name } = req.body;
    
    if (!email || !name) {
        return res.status(400).json({ error: 'Email y nombre son requeridos' });
    }

    try {
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

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/send-reminder', async (req, res) => {
    const { email, name } = req.body;
    
    try {
        await resend.emails.send({
            from: 'Claudio Hornig <onboarding@resend.dev>',
            to: [email],
            subject: 'Recordatorio: Masterclass hoy a las 18:00',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #003857;">¡Hola ${name.split(' ')[0]}!</h1>
                    <p>Hoy es el día de nuestra Masterclass <strong>"Sanación Emocional Profunda"</strong>.</p>
                    <div style="background: #f3f3f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p style="margin: 0;"><strong>Hoy a las 18:00</strong> (Hora de Chile)</p>
                    </div>
                    <p><strong>Enlace de acceso:</strong> <a href="${MASTERCLASS_MEET_LINK}" style="color: #39665f;">${MASTERCLASS_MEET_LINK}</a></p>
                    <p>Nos vemos allí.</p>
                </div>
            `
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/send-recording', async (req, res) => {
    const { email, name } = req.body;
    const RECORDING_LINK = 'https://drive.google.com/example-recording';
    
    try {
        await resend.emails.send({
            from: 'Claudio Hornig <onboarding@resend.dev>',
            to: [email],
            subject: 'Recording de la Masterclass - Sanación Emocional',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #003857;">¡Hola ${name.split(' ')[0]}!</h1>
                    <p>Gracias por acompañarnos en la Masterclass <strong>"Sanación Emocional Profunda"</strong>.</p>
                    <p>Aquí tienes la grabación de la clase:</p>
                    <a href="${RECORDING_LINK}" style="display: inline-block; background: #003857; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; margin: 20px 0;">Ver Grabación</a>
                    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                </div>
            `
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));