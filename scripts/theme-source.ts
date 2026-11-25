import { basename, join } from "node:path";

type Syntax = { color: string; font_style?: string; font_weight?: number };
type Theme = {
  name: string;
  appearance: "light" | "dark";
  style: Record<string, unknown> & { syntax: Record<string, Syntax> };
};

export async function loadTheme(root: string) {
  const files = await Array.fromAsync(new Bun.Glob("themes/*.json").scan(root));
  if (files.length !== 1) {
    throw new Error(
      `${root}: expected one Zed theme JSON, found ${files.length}`,
    );
  }

  const [path] = files;
  const { themes } = (await Bun.file(join(root, path)).json()) as {
    themes: Theme[];
  };
  if (
    themes.length !== 2 ||
    new Set(themes.map(({ appearance }) => appearance)).size !== 2 ||
    !themes.every(
      ({ name, appearance }) =>
        name && (appearance === "light" || appearance === "dark"),
    )
  ) {
    throw new Error(
      `${path}: expected one named light theme and one named dark theme`,
    );
  }

  return { family: basename(path, ".json"), themes };
}

const inheritedScopes: Record<string, string> = {
  "constant.builtin": "constant",
  "type.builtin": "type",
  "variable.parameter": "variable",
};

export function syntaxRole(theme: Theme, role: string): Syntax {
  const syntax = theme.style.syntax;
  const entry = syntax[role] ?? syntax[inheritedScopes[role]];
  if (!entry?.color || !/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(entry.color)) {
    throw new Error(`${theme.name}: invalid syntax color for ${role}`);
  }
  return entry;
}
