import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Compile the real helper using the project's TypeScript dependency so the
// regression tests do not depend on Node's version-specific TS loader.
const source = await readFile(
  new URL("../src/lib/active-section.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
});
const { getActiveSection } = await import(
  `data:text/javascript,${encodeURIComponent(outputText)}`
);

test("tablet anchor arrival selects Experience even while Projects is still visible", () => {
  assert.equal(
    getActiveSection(
      [
        { id: "inicio", top: -2500 },
        { id: "proyectos", top: -1764 },
        { id: "experiencia", top: 209.86 },
        { id: "formacion", top: 1600 },
      ],
      210,
    ),
    "experiencia",
  );
});

test("scrolling back above the anchor threshold reactivates the previous section", () => {
  assert.equal(
    getActiveSection(
      [
        { id: "inicio", top: -2500 },
        { id: "proyectos", top: -1764 },
        { id: "experiencia", top: 240 },
      ],
      210,
    ),
    "proyectos",
  );
});

test("a taller mobile header uses its own navigation offset", () => {
  assert.equal(
    getActiveSection(
      [
        { id: "inicio", top: -3000 },
        { id: "proyectos", top: -1700 },
        { id: "experiencia", top: 249.9 },
      ],
      250,
    ),
    "experiencia",
  );
});

test("falls back to the first section before any section reaches the activation line", () => {
  assert.equal(getActiveSection([{ id: "inicio", top: 81 }], 0), "inicio");
});

test("chooses the section closest above the line regardless of input order", () => {
  assert.equal(
    getActiveSection(
      [
        { id: "experiencia", top: 209 },
        { id: "inicio", top: -3000 },
        { id: "proyectos", top: -1700 },
      ],
      210,
    ),
    "experiencia",
  );
});
