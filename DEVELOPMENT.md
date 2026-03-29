# dev-tools Development Guide

This document serves as a central knowledge base for the **dev-tools** project.

## 🚀 Project Overview

dev-tools is a collection of handy online tools for developers and IT professionals, built with a focus on great UX and performance.

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Naive UI](https://www.naiveui.com/)
- **Styling**: [UnoCSS](https://unocss.dev/) (Utility-first CSS)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Internationalization**: [Vue I18n](https://vue-i18n.intlify.dev/)
- **Testing**:
  - Unit: [Vitest](https://vitest.dev/)
  - E2E: [Playwright](https://playwright.dev/)
- **Icons**: [Tabler Icons](https://tabler-icons.io/) and [Lucide](https://lucide.dev/) (via [Iconify](https://iconify.design/))
- **Typography**: **Fira Code** (monospaced with ligatures) for technical data, **Inter** for UI.
- **Aesthetics**: Custom CRT-style scanlines and neon-glow effects (Hacker/Nerd UI).

## 📦 Project Structure

- `src/tools/`: **Core of the application.** Each subdirectory contains a specific tool.
- `src/components/`: Shared generic UI components.
- `src/ui/`: Higher-level UI framework components (Layouts, Sidebar, etc.).
- `src/stores/`: Pinia stores for global state (e.g., settings, favorites).
- `src/composable/`: Shared Vue composables.
- `src/utils/`: General-purpose utility functions.
- `src/locales/`: Global translation files.
- `scripts/`: Maintenance and generation scripts (e.g., creating new tools).

## 🏗️ Architecture & Patterns

### Atomic Tools
Each tool is self-contained within its own directory in `src/tools/`. A typical tool includes its own UI, business logic (`.service.ts`), and tests. This modular approach makes it easy to add or remove features without affecting the rest of the system.

### Global State (Pinia)
We use Pinia to manage global application state, such as:
- User preferences (dark mode, language).
- Favorite tools.
- Recently used tools.

### Auto-Imports
The project uses `unplugin-auto-import` and `unplugin-vue-components`. This means you don't need to manually import common Vue APIs (like `ref`, `computed`) or standard components. They are automatically available during development and build.

### Internationalization (i18n)
All user-facing strings should be localized. Global strings are in `locales/`, while tool-specific strings can be placed within the tool's directory (if configured).

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Check `.nvmrc` for the recommended version, currently v18)
- [pnpm](https://pnpm.io/) (Recommended package manager)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## ➕ Adding a New Tool

The project includes a generator script to create the boilerplate for a new tool.

1. **Run the generator**:
   ```bash
   pnpm run script:create:tool <my-tool-name>
   ```
   *Replace `<my-tool-name>` with a kebab-case name (e.g., `json-formatter`).*

2. **Generated Files**:
   - `src/tools/<name>/<name>.vue`: The tool's UI component.
   - `src/tools/<name>/index.ts`: Tool definition (name, path, keywords, etc.).
   - `src/tools/<name>/<name>.service.ts`: Business logic for the tool.
   - `src/tools/<name>/<name>.service.test.ts`: Vitest unit tests for the logic.
   - `src/tools/<name>/<name>.e2e.spec.ts`: Playwright E2E tests for the tool.

3. **Register the Tool**:
   Open `src/tools/index.ts` and add your newly imported tool to the `toolsByCategory` array in the appropriate category.

## 🛡️ Security & Hardening

### Docker Environment
- **Non-Root Execution**: The production Docker image (`nginx:stable-alpine`) is configured to run as the `nginx` user (UID 100).
- **Vulnerability Patching**: The `Dockerfile` includes `apk update && apk upgrade` to ensure all OS-level packages (like `libssl`, `libcurl`) are up-to-date with the latest security patches.
- **Permissions**: Essential directories like `/var/cache/nginx` and `/var/run/nginx.pid` are explicitly `chown`ed to the `nginx` user.

### Dependency Troubleshooting
The project relies on a specific set of dependencies that can occasionally conflict during production builds:
- **@vueuse/head**: Must be kept at `^2.0.0` or higher to resolve `resolveUnref` export issues in `@unhead/vue`.
- **@vicons/tabler**: Some icons (like `Network`) may be missing in older version. Use verified icons like `World` or `Server`.
- **uuid**: Requires `^10.0.0` for valid ESM exports of `v6` and `v7`.
- **objgen**: The `objgen` package includes a Node.js shebang that can break Vite bundling in Docker. The `Dockerfile` includes a `sed` patch to strip this.

## 💎 Advanced Implementation Details

### JSON Precision Handling
To prevent the loss of precision for large integers (exceeding `Number.MAX_SAFE_INTEGER`), tools should use a **regex-based wrapping technique** before parsing with `JSON5`:
1. Wrap large integers in a marker string: `___@BIGINT@___<digits>`.
2. Parse the JSON.
3. Process (sort, etc.).
4. Stringify and unwrap the marker using regex.

### Hierarchical Tree View
The `JsonTreeViewer` component uses a recursive `JsonNode` structure to render JSON hierarchically. This is preferred for large documents where a textarea is insufficient for navigation.

### String Obfuscator: Substring Remover Extension
The String Obfuscator tool includes a pre-processing step that removes specific user-defined substrings (e.g., proprietary markers or noise) using a global, case-insensitive regular expression before the actual masking logic is applied. This is managed via a dynamic input list in the UI.

### Nerd UI: Aesthetic Layer
The project features a specialized CSS layer to provide a "Hacker terminal" feel:
- **Neon Glow**: Text and borders use high-contrast primary colors with `drop-shadow`.
- **Scanlines**: A pseudo-element overlay on the body provides a retro CRT scanline effect.
- **Flicker**: Subtle animations mimic the refresh rate of older monitors.

## 🧪 Testing

### Unit Tests
```bash
pnpm test:unit
```

### E2E Tests
```bash
pnpm test:e2e
```

## 📄 License

This project is licensed under the [GNU GPLv3](LICENSE).
