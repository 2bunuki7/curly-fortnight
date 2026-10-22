# Buna Draga — Portfolio redesign

A complete, responsive, static portfolio, redesigned from the reference PDF.

## Run locally

Extract the folder and open `index.html` in Firefox/Chrome, or open the folder in VS Code and start Live Server. No build tools are needed.

## Files

- `index.html` — all sections and links
- `style.css` — visuals, layouts, responsive breakpoints
- `script.js` — mobile navigation, scroll progress, current nav link, copy Discord username
- `assets/home-background.webp` — PDF page 6, used only on Home
- `assets/content-background.webp` — PDF page 7, used on About, Currently Doing, Experience
- `assets/contact-background.webp` — PDF page 8, used on Contact

## Typography and navigation

Google Fonts **Urbanist**, predominantly weight **500**. The large name in the Home section uses **Urbanist Medium Italic**. Desktop navigation uses exactly **56px CSS gap** (`.primary-nav`).

## Customization

The content can be edited directly in `index.html`. Colors and breakpoints are in `style.css`. Social links point to the original profiles and Discord copies the username (rather than inventing an invite link). The Selected experiments section is text-based and links to the overall GitHub profile; swap in individual repository links if desired.

## Deploy

Works on GitHub Pages or any static host: upload the whole directory, preserving the `assets/` folder.
