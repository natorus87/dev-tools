<picture>
    <source srcset="./.github/logo-dark.png" media="(prefers-color-scheme: light)">
    <source srcset="./.github/logo-white.png" media="(prefers-color-scheme: dark)">
    <img src="./.github/logo-dark.png" alt="logo">
</picture>

<h1 align="center">Dev-Tools (Nerd UI Fork)</h1>

<p align="center">
Handy tools for developers and IT professionals, now with a specialized <b>Nerd UI</b>. <br>
<i>A fork of the excellent <a href="https://github.com/CorentinTh/it-tools">IT-Tools</a> by Corentin Thomasset.</i>
</p>

## 🚀 About this Fork

This is a specialized fork of **IT-Tools**, rebranded as **Dev-Tools**. While maintaining all the powerful features of the original, this version focuses on:

- **🎨 Nerd-friendly Hacker Aesthetic**: A complete visual overhaul for those who live in the terminal.
- **⚡ Performance & Customizations**: Optimized workflows for power users.
- **🛠️ Extended Toolset**: Including custom tools and integrations specifically for the development lifecycle.

## 🎨 Design System: The Nerd UI

The project features a **Nerd-friendly Hacker Aesthetic**:
- **Deep Dark Theme**: Optimized for long coding sessions and eye comfort.
- **Neon Accents**: High-contrast neon green (`#39ff14`) for primary actions and highlights.
- **Typography**: Uses **Fira Code** for technical data (with ligatures) and **Inter** for UI readability.
- **Retro Feel**: Subtle CRT effects, scanlines, and flicker for a retro-terminal atmosphere.

---

## 🏎️ Quick Start (Self-Host)

Deploy your own instance of Dev-Tools in seconds.

**From GitHub Packages:**

```sh
docker run -d --name dev-tools --restart unless-stopped -p 8080:80 ghcr.io/natorus87/dev-tools:latest
```

**From Docker Hub (if applicable):**

```sh
docker run -d --name dev-tools --restart unless-stopped -p 8080:80 natorus87/dev-tools:latest
```

---

## 🛠️ Development

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) with the following extensions:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)

### Project Commands

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Create a new tool boilerplate
pnpm run script:create:tool my-tool-name
```

---

## 🤝 Contribute

We welcome contributions to the Nerd UI fork! Please check the [issues](https://github.com/natorus87/dev-tools/issues) for planned features.

You have an idea for a tool or an aesthetic improvement? Submit a [feature request](https://github.com/natorus87/dev-tools/issues/new/choose)!

---

## ❤️ Credits & Original Authors

This project is a fork of **IT-Tools**, originally coded with ❤️ by [Corentin Thomasset](https://corentin.tech). We are grateful for his incredible work and the community around it.

[![original-contributors](https://contrib.rocks/image?repo=CorentinTh/it-tools&limit=20)](https://github.com/CorentinTh/it-tools/graphs/contributors)

Maintainer of this fork: **natorus87** & **Antigravity (AI)**

---

## 📄 License

This project is licensed under the [GNU GPLv3](LICENSE).
