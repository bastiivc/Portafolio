import { NextResponse } from 'next/server';
import { profileData } from '@/data/profile';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Por favor completa todos los campos requeridos.' },
        { status: 400 }
      );
    }

    const targetEmail = profileData.socials.email || 'bastian.mejias.c@mail.pucv.cl';
    const origin = request.headers.get('origin') || request.headers.get('referer') || 'https://bastiivc.vercel.app';

    // Submit via FormSubmit AJAX service with proper Origin & Referer headers
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': origin,
        'Referer': origin,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Portfolio-App'
      },
      body: JSON.stringify({
        name,
        email,
        _subject: subject || `Nuevo mensaje de portafolio web de ${name}`,
        message,
        _template: 'table'
      })
    });

    const data = await response.json();

    // Check if form activation email was sent or if success
    const isSuccess = response.ok && (data.success === 'true' || data.success === true);
    const isActivationNeeded = data.message && data.message.includes('Activation');

    if (isSuccess || isActivationNeeded) {
      return NextResponse.json({
        success: true,
        activationNeeded: isActivationNeeded,
        message: isActivationNeeded
          ? 'FormSubmit te ha enviado un correo a bastian.mejias.c@mail.pucv.cl con el enlace "Activate Form". Haz clic una sola vez para activar los envíos futuros.'
          : 'Mensaje enviado correctamente.'
      });
    }

    return NextResponse.json(
      { success: false, error: data.message || 'Error al procesar el envío.' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Contact API Error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Error de servidor al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
