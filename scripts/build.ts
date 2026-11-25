import source from "../themes/proof.json";

type Syntax = { color: string; font_style?: string; font_weight?: number };
type Theme = {
  name: string;
  appearance: string;
  style: Record<string, unknown> & { syntax: Record<string, Syntax> };
};

const ansi = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
];
const textMateScopes = {
  attribute: "entity.other.attribute-name, meta.attribute",
  boolean: "constant.language.boolean",
  comment: "comment",
  "comment.doc": "comment.documentation",
  constant: "constant.other, variable.other.constant",
  "constant.builtin": "constant.language",
  constructor: "entity.name.function.constructor",
  function: "entity.name.function, variable.function",
  "function.builtin": "support.function",
  keyword: "keyword, storage",
  link_text: "markup.underline.link",
  link_uri: "string.other.link",
  namespace: "entity.name.namespace",
  number: "constant.numeric",
  operator: "keyword.operator",
  property: "variable.other.property, support.type.property-name",
  punctuation: "punctuation",
  string: "string",
  "string.escape": "constant.character.escape",
  "string.regex": "string.regexp",
  tag: "entity.name.tag",
  type: "entity.name.type, entity.name.class",
  "type.builtin": "support.type, support.class",
  variable: "variable",
  "variable.parameter": "variable.parameter",
  "variable.special": "variable.language",
  title: "markup.heading",
  emphasis: "markup.italic, markup.quote",
  "emphasis.strong": "markup.bold",
};

const workbench = {
  focusBorder: "border.focused",
  foreground: "text",
  descriptionForeground: "text.muted",
  errorForeground: "error",
  "editor.background": "editor.background",
  "editor.foreground": "editor.foreground",
  "editorCursor.foreground": "text.accent",
  "editor.selectionBackground": "element.selected",
  "editor.inactiveSelectionBackground": "ghost_element.selected",
  "editor.lineHighlightBackground": "editor.active_line.background",
  "editor.findMatchBackground": "search.match_background",
  "editor.findMatchHighlightBackground": "warning.background",
  "editorLineNumber.foreground": "editor.line_number",
  "editorLineNumber.activeForeground": "editor.active_line_number",
  "editorIndentGuide.background1": "editor.indent_guide",
  "editorIndentGuide.activeBackground1": "editor.indent_guide_active",
  "editorWhitespace.foreground": "editor.invisible",
  "editorBracketMatch.background":
    "editor.document_highlight.bracket_background",
  "editorError.foreground": "error",
  "editorWarning.foreground": "warning",
  "editorInfo.foreground": "info",
  "editorHint.foreground": "hint",
  "editorGutter.addedBackground": "created",
  "editorGutter.modifiedBackground": "modified",
  "editorGutter.deletedBackground": "deleted",
  "diffEditor.insertedTextBackground": "created.background",
  "diffEditor.removedTextBackground": "deleted.background",
  "sideBar.background": "panel.background",
  "sideBar.foreground": "text",
  "sideBar.border": "border.variant",
  "activityBar.background": "surface.background",
  "activityBar.foreground": "text.accent",
  "activityBar.inactiveForeground": "text.muted",
  "activityBarBadge.background": "text.accent",
  "activityBarBadge.foreground": "editor.background",
  "titleBar.activeBackground": "title_bar.background",
  "titleBar.activeForeground": "text",
  "titleBar.inactiveBackground": "title_bar.inactive_background",
  "titleBar.inactiveForeground": "text.muted",
  "editorGroupHeader.tabsBackground": "tab_bar.background",
  "tab.activeBackground": "tab.active_background",
  "tab.activeForeground": "text",
  "tab.inactiveBackground": "tab.inactive_background",
  "tab.inactiveForeground": "text.muted",
  "statusBar.background": "status_bar.background",
  "statusBar.foreground": "text",
  "panel.background": "panel.background",
  "panel.border": "border.variant",
  "list.activeSelectionBackground": "element.selected",
  "list.activeSelectionForeground": "text",
  "list.inactiveSelectionBackground": "ghost_element.selected",
  "list.hoverBackground": "element.hover",
  "input.background": "editor.background",
  "input.foreground": "text",
  "input.border": "border",
  "button.background": "text.accent",
  "button.foreground": "editor.background",
  "dropdown.background": "elevated_surface.background",
  "dropdown.foreground": "text",
  "editorWidget.background": "elevated_surface.background",
  "editorWidget.border": "border",
  "terminal.background": "terminal.background",
  "terminal.foreground": "terminal.foreground",
  "terminalCursor.foreground": "text.accent",
  "terminal.selectionBackground": "element.selected",
};

const semantic = {
  class: "type",
  enum: "enum",
  interface: "type",
  type: "type",
  typeParameter: "type",
  struct: "type",
  namespace: "namespace",
  function: "function",
  method: "function",
  macro: "preproc",
  variable: "variable",
  parameter: "variable.parameter",
  property: "property",
  enumMember: "variant",
  number: "number",
  string: "string",
  regexp: "string.regex",
  keyword: "keyword",
  operator: "operator",
  comment: "comment",
  decorator: "attribute",
};

const helixUi = {
  "ui.background": { bg: "editor.background" },
  "ui.text": { fg: "text" },
  "ui.text.focus": { fg: "text.accent" },
  "ui.text.inactive": { fg: "text.muted" },
  "ui.gutter": { bg: "editor.gutter.background" },
  "ui.linenr": { fg: "editor.line_number" },
  "ui.linenr.selected": { fg: "editor.active_line_number" },
  "ui.cursor": { fg: "editor.background", bg: "editor.foreground" },
  "ui.cursor.primary": { fg: "editor.background", bg: "text.accent" },
  "ui.cursor.match": { fg: "text.accent", bg: "element.selected" },
  "ui.cursorline.primary": { bg: "editor.active_line.background" },
  "ui.selection": { bg: "ghost_element.selected" },
  "ui.selection.primary": { bg: "element.selected" },
  "ui.statusline": { fg: "text", bg: "status_bar.background" },
  "ui.statusline.inactive": { fg: "text.muted", bg: "surface.background" },
  "ui.bufferline": { fg: "text.muted", bg: "tab_bar.background" },
  "ui.bufferline.active": { fg: "text", bg: "tab.active_background" },
  "ui.popup": { fg: "text", bg: "elevated_surface.background" },
  "ui.window": { fg: "border.variant" },
  "ui.menu": { fg: "text", bg: "elevated_surface.background" },
  "ui.menu.selected": { fg: "text", bg: "element.selected" },
  "ui.virtual.whitespace": { fg: "editor.invisible" },
  "ui.virtual.indent-guide": { fg: "editor.indent_guide" },
  "ui.virtual.inlay-hint": { fg: "hint" },
  "diff.plus": { fg: "created" },
  "diff.delta": { fg: "modified" },
  "diff.minus": { fg: "deleted" },
  error: { fg: "error" },
  warning: { fg: "warning" },
  info: { fg: "info" },
  hint: { fg: "hint" },
};

const helixSyntax = {
  attribute: "attribute",
  comment: "comment",
  "comment.documentation": "comment.doc",
  constant: "constant",
  "constant.builtin.boolean": "boolean",
  "constant.numeric": "number",
  constructor: "constructor",
  function: "function",
  "function.builtin": "function.builtin",
  "function.macro": "preproc",
  keyword: "keyword",
  label: "label",
  namespace: "namespace",
  operator: "operator",
  punctuation: "punctuation",
  "punctuation.bracket": "punctuation.bracket",
  "punctuation.delimiter": "punctuation.delimiter",
  string: "string",
  "string.regexp": "string.regex",
  "constant.character.escape": "string.escape",
  tag: "tag",
  type: "type",
  "type.builtin": "type.builtin",
  "type.enum.variant": "variant",
  variable: "variable",
  "variable.builtin": "variable.special",
  "variable.parameter": "variable.parameter",
  "variable.other.member": "property",
  "markup.heading": "title",
  "markup.bold": "emphasis.strong",
  "markup.italic": "emphasis",
  "markup.link.url": "link_uri",
};

const xcodeColors = {
  DVTSourceTextBackground: "editor.background",
  DVTSourceTextInsertionPointColor: "text.accent",
  DVTSourceTextSelectionColor: "element.selected",
  DVTSourceTextCurrentLineHighlightColor: "editor.active_line.background",
  DVTSourceTextInvisiblesColor: "editor.invisible",
  DVTSourceTextBlockDimBackgroundColor: "surface.background",
  DVTSourceTextFoldedPlaceholderColor: "text.muted",
  DVTSourceTextFoldedPlaceholderBackgroundColor: "element.hover",
  DVTDebuggerInstructionPointerColor: "element.selected",
  DVTConsoleTextBackgroundColor: "terminal.background",
  DVTConsoleTextInsertionPointColor: "text.accent",
  DVTConsoleTextSelectionColor: "element.selected",
  DVTConsoleDebuggerInputTextColor: "terminal.foreground",
  DVTConsoleDebuggerOutputTextColor: "terminal.foreground",
  DVTConsoleDebuggerPromptTextColor: "text.accent",
  DVTConsoleExectuableInputTextColor: "terminal.foreground",
  DVTConsoleExectuableOutputTextColor: "terminal.foreground",
};

const xcodeSyntax = {
  attribute: "attribute",
  character: "string",
  comment: "comment",
  "comment.doc": "comment.doc",
  "comment.doc.keyword": "title",
  keyword: "keyword",
  "declaration.other": "function",
  "declaration.type": "type",
  mark: "title",
  "markup.aside.kind": "title",
  "markup.code": "text.literal",
  number: "number",
  preprocessor: "preproc",
  string: "string",
  regex: "string.regex",
  "regex.capture-name": "property",
  "regex.charname": "string.escape",
  "regex.number": "number",
  "regex.other": "operator",
  "identifier.class": "type",
  "identifier.class.system": "type.builtin",
  "identifier.constant": "constant",
  "identifier.constant.system": "constant.builtin",
  "identifier.function": "function",
  "identifier.function.system": "function.builtin",
  "identifier.macro": "preproc",
  "identifier.macro.system": "preproc",
  "identifier.type": "type",
  "identifier.type.system": "type.builtin",
  "identifier.variable": "variable",
  "identifier.variable.system": "variable.special",
  url: "link_uri",
};

function mapValues<T, U>(
  values: Record<string, T>,
  convert: (value: T, key: string) => U,
) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, convert(value, key)]),
  );
}

type Plist = string | number | Plist[] | { [key: string]: Plist };

function plist(value: Plist) {
  const escape = (text: string) =>
    text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  function element(value: Plist, level: number): string {
    const indent = "  ".repeat(level);
    if (typeof value === "string")
      return `${indent}<string>${escape(value)}</string>`;
    if (typeof value === "number")
      return `${indent}<integer>${value}</integer>`;
    if (Array.isArray(value)) {
      return [
        `${indent}<array>`,
        ...value.map((item) => element(item, level + 1)),
        `${indent}</array>`,
      ].join("\n");
    }
    const entries = Object.entries(value).flatMap(([key, entry]) => [
      `${indent}  <key>${escape(key)}</key>`,
      element(entry, level + 1),
    ]);
    return [`${indent}<dict>`, ...entries, `${indent}</dict>`].join("\n");
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
${element(value, 0)}
</plist>
`;
}

const outputs = new Map<string, string>();
for (const { name, appearance, style } of source.themes as Theme[]) {
  const slug = `proof-${appearance}`;
  const color = (role: string) => {
    const value = style[role];
    if (
      typeof value !== "string" ||
      !/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value)
    ) {
      throw new Error(
        `${name}: expected a hex color for ${role}, got ${value}`,
      );
    }
    return value;
  };
  const syntax = (role: string) => {
    const entry = style.syntax[role];
    if (!entry?.color || !/^#[0-9a-f]{6}$/i.test(entry.color)) {
      throw new Error(`${name}: invalid syntax color for ${role}`);
    }
    return entry;
  };
  const ansiColors = [...ansi, ...ansi.map((name) => `bright_${name}`)].map(
    (name) => color(`terminal.ansi.${name}`),
  );
  const editorBackground = color("editor.background");
  const onEditor = (value: string) => {
    if (value.length === 7) return value;
    const opacity = parseInt(value.slice(7), 16) / 255;
    const channels = [1, 3, 5].map((index) => {
      const foreground = parseInt(value.slice(index, index + 2), 16);
      const background = parseInt(editorBackground.slice(index, index + 2), 16);
      return Math.round(foreground * opacity + background * (1 - opacity))
        .toString(16)
        .padStart(2, "0");
    });
    return "#" + channels.join("");
  };
  const tokenColors = Object.entries(textMateScopes).map(([role, scope]) => {
    const token = syntax(role);
    const fontStyle = [token.font_style, token.font_weight && "bold"]
      .filter(Boolean)
      .join(" ");
    const settings: Record<string, string> = { foreground: token.color };
    if (fontStyle) settings.fontStyle = fontStyle;
    return { scope, settings };
  });

  const colors = mapValues(workbench, color);
  ansiColors.forEach((value, index) => {
    const colorName = ansi[index % ansi.length];
    const label = colorName[0].toUpperCase() + colorName.slice(1);
    colors[`terminal.ansi${index >= ansi.length ? "Bright" : ""}${label}`] =
      value;
  });
  outputs.set(
    `ports/vscode/${slug}-color-theme.json`,
    JSON.stringify(
      {
        name,
        type: appearance,
        colors,
        tokenColors,
        semanticHighlighting: true,
        semanticTokenColors: mapValues(semantic, (role) => syntax(role).color),
      },
      null,
      2,
    ) + "\n",
  );

  const diffScopes = ["markup.inserted", "markup.deleted"].map(
    (scope, index) => {
      const role = index === 0 ? "created" : "deleted";
      return {
        scope,
        settings: {
          foreground: color(role),
          background: onEditor(color(`${role}.background`)),
        },
      };
    },
  );
  outputs.set(
    `ports/codex/${slug}.tmTheme`,
    plist({
      name,
      settings: [
        {
          settings: {
            background: editorBackground,
            foreground: color("editor.foreground"),
            caret: color("text.accent"),
            selection: color("element.selected"),
          },
        },
        ...tokenColors,
        ...diffScopes,
      ],
    }),
  );

  const toml = (entries: Record<string, string>) =>
    Object.entries(entries)
      .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
      .join("\n");
  const helix = [
    ...Object.entries(helixUi).map(([key, roles]) => {
      const entries = Object.entries(roles).map(
        ([field, role]) => `${field} = "${onEditor(color(role))}"`,
      );
      return `"${key}" = { ${entries.join(", ")} }`;
    }),
    ...Object.entries(helixSyntax).map(([key, role]) => {
      const token = syntax(role);
      const modifiers = [token.font_style, token.font_weight && "bold"].filter(
        Boolean,
      );
      return modifiers.length
        ? `"${key}" = { fg = "${token.color}", modifiers = ${JSON.stringify(modifiers)} }`
        : `"${key}" = "${token.color}"`;
    }),
  ];
  outputs.set(`ports/helix/${slug}.toml`, helix.join("\n") + "\n");

  const rgba = (value: string) => {
    const digits = value.length === 7 ? value.slice(1) + "ff" : value.slice(1);
    return digits
      .match(/../g)!
      .map((byte) => Number((parseInt(byte, 16) / 255).toFixed(6)))
      .join(" ");
  };
  const xcode = mapValues(xcodeColors, (role) => rgba(color(role)));
  const syntaxColors = {
    "xcode.syntax.plain": rgba(color("editor.foreground")),
  };
  for (const [key, role] of Object.entries(xcodeSyntax)) {
    Object.assign(syntaxColors, {
      [`xcode.syntax.${key}`]: rgba(syntax(role).color),
    });
  }
  const font = "SFMono-Regular - 13.0";
  outputs.set(
    `ports/xcode/${name}.xccolortheme`,
    plist({
      DVTFontAndColorVersion: 1,
      ...xcode,
      ...Object.fromEntries(
        Object.keys(xcode)
          .filter((key) => /^DVTConsole.*TextColor$/.test(key))
          .map((key) => [key.replace(/Color$/, "Font"), font]),
      ),
      DVTSourceTextSyntaxColors: syntaxColors,
      DVTSourceTextSyntaxFonts: mapValues(syntaxColors, (_value, key) =>
        key.startsWith("xcode.syntax.comment")
          ? "SFMono-RegularItalic - 13.0"
          : font,
      ),
    }),
  );

  const terminal = {
    background: color("terminal.background"),
    foreground: color("terminal.foreground"),
    "selection-background": color("element.selected"),
    "selection-foreground": color("terminal.foreground"),
  };
  const cursor = color("text.accent");
  outputs.set(
    `ports/ghostty/${name}`,
    [
      ...Object.entries({ ...terminal, "cursor-color": cursor }).map(
        ([key, value]) => `${key} = ${value}`,
      ),
      ...ansiColors.map((value, index) => `palette = ${index}=${value}`),
    ].join("\n") + "\n",
  );
  outputs.set(
    `ports/rio/${slug}.toml`,
    "[colors]\n" +
      toml({
        ...terminal,
        cursor,
        "vi-cursor": cursor,
        tabs: color("text.muted"),
        "tabs-active": color("text"),
        "dim-foreground": color("terminal.dim_foreground"),
        "light-foreground": color("terminal.bright_foreground"),
        ...Object.fromEntries(
          ansiColors.map((value, index) => [
            `${index >= ansi.length ? "light-" : ""}${ansi[index % ansi.length]}`,
            value,
          ]),
        ),
      }) +
      "\n",
  );
}

for (const [path, contents] of outputs) {
  const file = Bun.file(new URL(`../${path}`, import.meta.url));
  if (Bun.argv.includes("--check")) {
    if (!(await file.exists()) || (await file.text()) !== contents) {
      console.error(`${path} is out of date. Run bun run build.`);
      process.exitCode = 1;
    }
  } else {
    await Bun.write(file, contents);
  }
}
