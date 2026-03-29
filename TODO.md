# Project TODO List (based on upstream issues)

This list is compiled from the issues of the original [dev-tools](https://github.com/CorentinTh/dev-tools/issues) repository. It includes bug fixes for existing tools and feature requests for new tools.

## 🔴 High Priority / Security
- [x] **Security Audit**: Investigated and patched Docker image (apk upgrade) (#1708, #1649).
- [x] **Fix "Add to Favorite"**: Resolved path mismatch in router and layout (#1707, #1692, #1639).
- [x] **JSON Long Precision**: Implemented BigInt-aware regex wrapping to preserve precision (#1653, #1615).
- [x] **Docker Stability**: Fixed permission issues by implementing non-root user support (#1582, #1584).

## 🐛 Bug Fixes (Existing Tools)
- [x] **Integer Base Converter**: Added case-insensitive support for common bases (#1728).
- [x] **Crontab Generator**: Standardized on 6-part expressions to match validator (#1706).
- [x] **ASCII Art Text Generator**: Fixed CDN font path reference (#1696).
- [x] **JSON Diff**: Improved reliability of the diffing process.
- [x] **Search Engine**: Increased result limit to 10 items per category (#1583).
- [x] **About Page**: Corrected grammatical errors and typos (#1730).
- [x] **Nerd UI Redesign**: Transformed UX with a high-contrast hacker aesthetic, neon accents, and CRT effects.
- [x] **Docker & Dependency Stability**: Resolved critical build-time blockers including `@vueuse/head` conflicts, missing icon exports, and `uuid` v10 migration.

## ✨ New Tool Requests (Feature Requests)
- [x] **Aspect Ratio Calculator** (#1750)
- [x] **IPv6 Reverse DNS Record Generator** (#1748)
- [x] **K8s RBAC Generator** (#1742)
- [x] **Web to Markdown Converter** (#1741)
- [x] **Jasypt Encryption/Decryption** (#1738)
- [x] **Bech32 Toolkit** (#1736)
- [x] **API Client** (#1732)
- [x] **ObjGen Support** (#1731)
- [x] **Dead Pixel Tester** (#1700)
- [x] **Tmux Cheat Sheet** (#1693)
- [x] **Credit Card Number Generator** (#1660)
- [x] **Whois Lookup** (#1656)
- [x] **Mailto Link Generator** (#1623)
- [x] **Citation Generator** (#1592)
- [x] **String Obfuscator Extension**: Added Substring Remover functionality with tag mapping.


## ⚙️ Improvements & Refactoring
- [x] **API Access**: Logic extracted into `models.ts` for programmatic reuse (#1729, #1688).
- [x] **JSON Hierarchical Collapse**: Added new Tree View mode with expand/collapse toggles (#1713).
- [x] **UUID Generator**: Added support for UUID v6 and v7 (#1654).
- [x] **HTML WYSIWYG Editor**: Added H5, H6, and Horizontal Rule support (#1581).
- [x] **Translation**: Added Russian translation (`ru.yml`) (#1594).

---
*Note: This list is a snapshot of the first 3 pages of issues as of March 2026.*
