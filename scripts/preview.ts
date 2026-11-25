import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { loadTheme, syntaxRole } from "./theme-source";

const browser = Bun.argv[2];
if (!browser) throw new Error("Usage: bun run preview /path/to/chromium");

const root = process.cwd();
const { family, themes } = await loadTheme(root);
const { displayName, description } = await Bun.file(
  join(root, "package.json"),
).json();
const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const sample = [
  [["comment.doc", "/// An sRGB channel stored as a byte."]],
  [["attribute", "#[derive(Debug, PartialEq, Eq)]"]],
  [
    ["keyword", "struct"],
    ["", " "],
    ["type", "Channel"],
    ["", "("],
    ["type.builtin", "u8"],
    ["", ");"],
  ],
  [["", ""]],
  [
    ["keyword", "impl"],
    ["", " "],
    ["namespace", "std::str"],
    ["", "::"],
    ["type", "FromStr"],
    ["", " "],
    ["keyword", "for"],
    ["", " "],
    ["type", "Channel"],
    ["", " {"],
  ],
  [
    ["", "    "],
    ["keyword", "type"],
    ["", " "],
    ["type", "Err"],
    ["", " "],
    ["operator", "="],
    ["", " "],
    ["namespace", "std::num"],
    ["", "::"],
    ["type", "ParseIntError"],
    ["", ";"],
  ],
  [["", ""]],
  [
    ["", "    "],
    ["keyword", "fn"],
    ["", " "],
    ["function", "from_str"],
    ["", "(hex: &"],
    ["type.builtin", "str"],
    ["", ") "],
    ["operator", "->"],
    ["", " "],
    ["type", "Result"],
    ["", "<"],
    ["type", "Self"],
    ["", ", "],
    ["type", "Self"],
    ["", "::"],
    ["type", "Err"],
    ["", "> {"],
  ],
  [
    ["", "        "],
    ["constructor", "Ok"],
    ["", "("],
    ["constructor", "Self"],
    ["", "("],
    ["type.builtin", "u8"],
    ["", "::"],
    ["function", "from_str_radix"],
    ["", "("],
    ["selected", "hex"],
    ["", ", "],
    ["number", "16"],
    ["", ")"],
    ["operator", "?"],
    ["", "))"],
  ],
  [["", "    }"]],
  [["", "}"]],
  [["", ""]],
  [
    ["keyword", "fn"],
    ["", " "],
    ["function", "main"],
    ["", "() {"],
  ],
  [
    ["", "    "],
    ["keyword", "let"],
    ["", " green = "],
    ["string", '"75"'],
    ["", "."],
    ["function", "parse"],
    ["", "::<"],
    ["type", "Channel"],
    ["", ">();"],
  ],
  [
    ["", "    "],
    ["preproc", "assert_eq!"],
    ["", "(green."],
    ["function", "unwrap"],
    ["", "(), "],
    ["constructor", "Channel"],
    ["", "("],
    ["number", "117"],
    ["", "));"],
  ],
  [["", "}"]],
];

const cards = themes
  .toSorted((left, right) => right.appearance.localeCompare(left.appearance))
  .map((theme) => {
    const { name, appearance, style } = theme;
    const syntax = (role: string) => syntaxRole(theme, role).color;
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
                : `<span style="color:${scope ? syntax(scope) : ink}">${escape(text)}</span>`,
            )
            .join("")}</div>`,
      )
      .join("");
    const swatches = [
      ["comment.doc", "Doc comments"],
      [
        "keyword",
        [
          "Keywords",
          ...(syntax("attribute") === syntax("keyword") ? ["attributes"] : []),
          ...(syntax("preproc") === syntax("keyword") ? ["macros"] : []),
        ].join(" · "),
      ],
      [
        "type",
        syntax("type") === syntax("namespace") ? "Types · paths" : "Types",
      ],
      [
        "function",
        syntax("function") === syntax("constructor")
          ? "Functions · constructors"
          : "Functions",
      ],
      ["string", "Strings"],
      ["number", "Numbers"],
    ]
      .map(
        ([role, label]) =>
          `<div class="swatch"><span style="--swatch:${syntax(role)}"></span>${label}</div>`,
      )
      .join("");
    return `<section class="card ${appearance}" style="${css}">
    <header><h2>${escape(name)}</h2><span class="variant" aria-hidden="true">${appearance === "light" ? "☀" : "☾"}</span></header>
    <div class="editor"><div class="tab">channel.rs</div><div class="code">${code}</div></div>
    <div class="swatches">${swatches}</div>
  </section>`;
  })
  .join("");

const html = `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(displayName)}</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #e8ece4; color: #282e28;
    font: 16px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  }
  main { max-width: 1384px; margin: auto; padding: 42px 44px 44px; }
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
  .swatches { display: grid; grid-template-columns: 1fr 1.35fr 1fr; gap: 12px; margin-top: 16px; }
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
  <h1>${escape(displayName.replace(/ Theme$/, ""))}</h1>
  <p>${escape(description)}</p>
  <div class="variants">${cards}</div>
</main>
</html>`;

const temporary = await mkdtemp(join(tmpdir(), `${family}-preview-`));
try {
  const page = join(temporary, "preview.html");
  await Bun.write(page, html);
  const output = join(root, "assets", "preview.png");
  const render = Bun.spawn(
    [
      browser,
      "--headless",
      "--hide-scrollbars",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${temporary}/chromium`,
      "--window-size=1384,926",
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
