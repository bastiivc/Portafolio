import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(
  new URL("../src/lib/contact.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
});
const { handleContact } = await import(
  `data:text/javascript,${encodeURIComponent(outputText)}`
);
const valid = {
  name: "Prueba",
  email: "test@example.com",
  subject: "Prueba de regresión",
  message: "Mensaje de prueba local.",
};
const request = (body) =>
  new Request("https://bastiivc.vercel.app/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("HTTP 200 with provider success=false must not show a successful send", async (t) => {
  t.after(() => mock.restoreAll());
  mock.method(globalThis, "fetch", async () =>
    Response.json({ success: "false", message: "Form is not active" }),
  );
  const response = await handleContact(request(valid));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).success, false);
});

test("provider acceptance requires both HTTP success and explicit confirmation", async (t) => {
  t.after(() => mock.restoreAll());
  let payload;
  const upstream = mock.method(globalThis, "fetch", async (_url, options) => {
    payload = JSON.parse(options.body);
    return Response.json({ success: "true" });
  });
  const response = await handleContact(request({ ...valid, name: " Prueba " }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(payload.name, "Prueba");
  assert.equal(payload._replyto, valid.email);
  assert.equal(payload._subject, valid.subject);
  assert.equal(upstream.mock.callCount(), 1);
});

test("a failed HTTP status never becomes a success based on the body", async (t) => {
  t.after(() => mock.restoreAll());
  mock.method(globalThis, "fetch", async () =>
    Response.json({ success: true }, { status: 500 }),
  );
  const response = await handleContact(request(valid));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).success, false);
});

test("missing provider confirmation is a failure", async (t) => {
  t.after(() => mock.restoreAll());
  mock.method(globalThis, "fetch", async () =>
    Response.json({ message: "Activation required" }),
  );
  assert.equal((await handleContact(request(valid))).status, 502);
});

test("invalid fields never reach the delivery provider", async (t) => {
  t.after(() => mock.restoreAll());
  const upstream = mock.method(globalThis, "fetch", async () => {
    throw new Error("Must not send");
  });
  for (const data of [
    null,
    [],
    { ...valid, name: "   " },
    { ...valid, email: "invalid" },
    { ...valid, message: 42 },
    { ...valid, subject: {} },
    { ...valid, message: "x".repeat(5001) },
  ]) {
    const response = await handleContact(request(data));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).success, false);
  }
  assert.equal(upstream.mock.callCount(), 0);
});

test("malformed JSON is rejected without sending", async () => {
  const response = await handleContact(
    new Request("https://bastiivc.vercel.app/api/contact", {
      method: "POST",
      body: "{",
    }),
  );
  assert.equal(response.status, 400);
});

test("network failures preserve an error result and do not retry delivery", async (t) => {
  t.after(() => mock.restoreAll());
  const upstream = mock.method(globalThis, "fetch", async () => {
    throw new Error("Network unavailable");
  });
  const response = await handleContact(request(valid));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).success, false);
  assert.equal(upstream.mock.callCount(), 1);
});
