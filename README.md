# Proof Theme

A warm, green-accented palette for editors and terminals, inspired by ChatGPT’s Proof palette. Available in **Proof Light** and **Proof Dark**.

![Proof Light and Proof Dark show the same TypeScript sample and six syntax colors on light and dark editor surfaces](assets/preview.png)

## Install

### Zed

Clone this repository, run **zed: install dev extension**, and select the cloned directory. Choose **Proof Light** or **Proof Dark** from Zed’s theme selector. To follow the system appearance, use:

```json
{
  "theme": {
    "mode": "system",
    "light": "Proof Light",
    "dark": "Proof Dark"
  }
}
```

### VS Code and Cursor

Download the `.vsix` from [GitHub Releases](https://github.com/eugenebokhan/proof-theme/releases). Run **Extensions: Install from VSIX…**, then choose **Proof Light** or **Proof Dark** with **Preferences: Color Theme**.

### Helix

Copy the [Helix themes](ports/helix/) to `~/.config/helix/themes/` or `%AppData%\helix\themes\` on Windows. Run `:theme proof-light` or `:theme proof-dark`. To persist your choice, set `theme = "proof-dark"` at the top of `config.toml`.

### Xcode

Copy the [Xcode themes](ports/xcode/) to `~/Library/Developer/Xcode/UserData/FontAndColorThemes/`. Create the folder if needed. In Xcode, open **Settings → Themes** and choose **Proof Light** or **Proof Dark**.

### Codex CLI

Copy the [TextMate themes](ports/codex/) to `$CODEX_HOME/themes/` (`~/.codex/themes/` by default). Restart Codex if needed, run `/theme`, and select the Proof variant that matches your terminal background. This sets syntax highlighting in Codex. Use a terminal profile below for the window background and ANSI colors.

### Ghostty

Copy the [Ghostty themes](ports/ghostty/) to `~/.config/ghostty/themes/`. Add `theme = light:Proof Light,dark:Proof Dark` to your Ghostty config.

### Rio

Copy the [Rio themes](ports/rio/) to `~/.config/rio/themes/`. Add `theme = "proof-dark"` at the top of `config.toml`, or use the adaptive theme setting:

```toml
[adaptive-theme]
light = "proof-light"
dark = "proof-dark"
```

## Build

Edit [the source theme](themes/proof.json), run `bun run build`, and commit the generated ports. `bun run check` verifies the generated files. To rebuild the preview, run `bun run preview /path/to/chromium`.

[MIT License](LICENSE)
