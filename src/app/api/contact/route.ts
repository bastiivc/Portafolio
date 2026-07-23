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

    // Submit via FormSubmit AJAX service
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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

    if (response.ok || data.success === 'true' || data.success === true) {
      return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente.' });
    } else {
      throw new Error(data.message || 'Error al procesar el envío.');
    }
  } catch (error: any) {
    console.error('Contact API Error:', error.message);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el mensaje directamente. Por favor utiliza el enlace de correo directo.' },
      { status: 500 }
    );
  }
}
