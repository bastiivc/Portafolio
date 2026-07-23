import { NextResponse } from 'next/server';

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

    // Activated FormSubmit Token for bastian.mejias.c@mail.pucv.cl
    const formToken = '6fccd57629dd513354bb7aca10999b24';
    
    // Detect request origin or referer header from Vercel / Client
    const origin = request.headers.get('origin') || request.headers.get('referer') || 'https://portafolio-bastiivc.vercel.app';

    // Submit via FormSubmit AJAX service
    const response = await fetch(`https://formsubmit.co/ajax/${formToken}`, {
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

    if (response.ok || data.success === 'true' || data.success === true) {
      return NextResponse.json({
        success: true,
        message: '¡Mensaje enviado con éxito! Te responderé a la brevedad.'
      });
    }

    return NextResponse.json(
      { success: false, error: data.message || 'Error al procesar el envío.' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Contact API Error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Error al enviar el mensaje. Inténtalo más tarde.' },
      { status: 500 }
    );
  }
}
