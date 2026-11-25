import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { themes } from "../themes/proof.json";

const browser = Bun.argv[2];
if (!browser) throw new Error("Usage: bun run preview /path/to/chromium");

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const sample = [
  [["comment", "// Preview a release before it ships."]],
  [
    ["keyword", "export function"],
    ["", " "],
    ["function", "preview"],
    ["", "(name: "],
    ["type", "string"],
    ["", ") {"],
  ],
  [
    ["", "  "],
    ["keyword", "const"],
    ["", " passes = "],
    ["number", "2"],
    ["", ";"],
  ],
  [
    ["", "  "],
    ["keyword", "return"],
    ["", " { "],
    ["selected", "name"],
    ["", ", passes, "],
    ["property", "ready"],
    ["", ": "],
    ["boolean", "true"],
    ["", " };"],
  ],
  [["", "}"]],
  [["", ""]],
  [
    ["function", "preview"],
    ["", "("],
    ["string", '"Proof"'],
    ["", ");"],
  ],
];

const cards = themes
  .map(({ name, appearance, style }) => {
    const syntax = style.syntax as Record<string, { color: string }>;
    const ink = style["editor.foreground"];
    const css = [
      ["paper", style["editor.background"]],
      ["ink", ink],
      ["chrome", style["surface.background"]],
      ["edge", style["border.variant"]],
      ["muted", style["text.muted"]],
      ["accent", style["text.accent"]],
      ["selection", style["element.selected"]],
    ]
      .map(([key, value]) => `--${key}:${value}`)
      .join(";");
    const code = sample
      .map(
        (line, index) =>
          `<div class="line"><span class="num">${index + 1}</span>${line
            .map(([scope, text]) =>
              scope === "selected"
                ? `<mark>${escape(text)}</mark>`
                : `<span style="color:${scope ? syntax[scope].color : ink}">${escape(text)}</span>`,
            )
            .join("")}</div>`,
      )
      .join("");
    const swatches = [
      "keyword",
      "function",
      "string",
      "type",
      "number",
      "comment",
    ]
      .map(
        (role) =>
          `<div class="swatch"><span style="--swatch:${syntax[role].color}"></span>${role}</div>`,
      )
      .join("");
    return `<section class="card ${appearance}" style="${css}">
    <header><h2>${name}</h2><span class="variant" aria-hidden="true">${appearance === "light" ? "☀" : "☾"}</span></header>
    <div class="editor"><div class="tab">preview.ts</div><div class="code">${code}</div></div>
    <div class="swatches">${swatches}</div>
  </section>`;
  })
  .join("");

const html = `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Proof Theme</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #e8ece4; color: #282e28;
    font: 16px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  }
  main { max-width: 1280px; margin: auto; padding: 42px 44px 44px; }
  h1 { margin: 0; font-size: 76px; line-height: .98; letter-spacing: -.075em; font-weight: 720; }
  p { margin: 15px 0 0; font-size: 20px; line-height: 1.4; color: #424c40; }
  .variants { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 30px; }
  .card {
    padding: 20px; border-radius: 26px; border: 1px solid var(--edge);
    background: var(--chrome); color: var(--ink);
    box-shadow: 0 2px 3px #2535210b, 0 12px 24px #25352113;
  }
  header { display: flex; justify-content: space-between; align-items: center; margin: 0 0 15px; }
  h2 { margin: 0; font-size: 25px; letter-spacing: -.035em; font-weight: 650; }
  .variant {
    display: grid; place-items: center; width: 34px; height: 34px;
    border-radius: 50%; background: var(--selection); color: var(--ink); font-size: 22px;
  }
  .editor { border: 1px solid var(--edge); border-radius: 15px; overflow: hidden; background: var(--paper); }
  .tab {
    padding: 11px 16px; background: var(--chrome); color: var(--muted); border-bottom: 1px solid var(--edge);
    font: 600 14px ui-monospace, Menlo, monospace;
  }
  .code { padding: 13px 0 16px; font: 16px/1.7 ui-monospace, Menlo, monospace; }
  .line { white-space: pre; }
  .num { display: inline-block; text-align: right; width: 30px; margin-right: 16px; color: var(--muted); }
  mark { background: var(--selection); color: var(--ink); box-shadow: inset 0 -2px var(--accent); }
  .swatches { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 16px; }
  .swatch { font-size: 13px; line-height: 1.5; color: var(--muted); }
  .swatch span { display: block; height: 8px; margin-bottom: 5px; border-radius: 4px; background: var(--swatch); }
  @media (max-width: 850px) {
    main { max-width: 640px; padding: 26px 18px; }
    .variants { grid-template-columns: 1fr; gap: 16px; }
    h1 { font-size: 56px; }
    .code { overflow-x: auto; }
  }
</style>
<main>
  <h1>Proof</h1>
  <p>A warm, green-accented palette for editors and terminals.</p>
  <div class="variants">${cards}</div>
</main>
</html>`;

const temporary = await mkdtemp(join(tmpdir(), "proof-preview-"));
try {
  const page = join(temporary, "preview.html");
  await Bun.write(page, html);
  const output = fileURLToPath(
    new URL("../assets/preview.png", import.meta.url),
  );
  const render = Bun.spawn(
    [
      browser,
      "--headless",
      "--hide-scrollbars",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${temporary}/chromium`,
      "--window-size=1280,626",
      "--force-device-scale-factor=2",
      `--screenshot=${output}`,
      pathToFileURL(page).href,
    ],
    { stderr: "inherit" },
  );
  if ((await render.exited) !== 0)
    throw new Error("Chromium failed to render the preview");
} finally {
  await rm(temporary, { recursive: true, force: true });
}
