const deliveryError =
  "No se pudo confirmar el envío. Conservamos tu mensaje; puedes intentarlo más tarde o escribirme por correo.";

export async function handleContact(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "La solicitud no es válida." },
      { status: 400 },
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { success: false, error: "Completa los campos requeridos." },
      { status: 400 },
    );
  }
  const data = body as Record<string, unknown>;
  if (
    typeof data.name !== "string" ||
    typeof data.email !== "string" ||
    typeof data.message !== "string" ||
    (data.subject !== undefined && typeof data.subject !== "string")
  ) {
    return Response.json(
      { success: false, error: "Los campos del formulario no son válidos." },
      { status: 400 },
    );
  }
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  const subject = typeof data.subject === "string" ? data.subject.trim() : "";
  if (
    !name ||
    name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !message ||
    message.length > 5000 ||
    subject.length > 200
  ) {
    return Response.json(
      {
        success: false,
        error: "Revisa tu nombre, correo y mensaje antes de enviar.",
      },
      { status: 400 },
    );
  }
  try {
    const origin = new URL(request.url).origin;
    const response = await fetch(
      "https://formsubmit.co/ajax/6fccd57629dd513354bb7aca10999b24",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/`,
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: subject || `Nuevo mensaje de portafolio de ${name}`,
          _template: "table",
        }),
        signal: AbortSignal.timeout(15000),
      },
    );
    const result: unknown = await response.json();
    const accepted =
      result &&
      typeof result === "object" &&
      "success" in result &&
      (result.success === true || result.success === "true");
    if (!response.ok || !accepted) {
      return Response.json(
        { success: false, error: deliveryError },
        { status: 502 },
      );
    }
    return Response.json({ success: true });
  } catch {
    // No automatic retry: a lost response does not mean delivery was rejected.
    return Response.json(
      { success: false, error: deliveryError },
      { status: 502 },
    );
  }
}
