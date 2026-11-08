type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/** FormSubmit's AJAX integration runs directly in the browser; never retry automatically. */
export async function submitContact(form: ContactMessage): Promise<boolean> {
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();
  if (!name || !email || !message) return false;
  const response = await fetch(
    "https://formsubmit.co/ajax/6fccd57629dd513354bb7aca10999b24",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject:
          form.subject.trim() || `Nuevo mensaje de portafolio de ${name}`,
        _replyto: email,
        _template: "table",
      }),
    },
  );
  const result: unknown = await response.json();
  return Boolean(
    response.ok &&
    result &&
    typeof result === "object" &&
    "success" in result &&
    (result.success === true || result.success === "true"),
  );
}
