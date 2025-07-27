# My Tools

A modern web app providing a suite of handy developer utilities, built with React, TypeScript, and Tailwind CSS.

This is deployed to [Github Pages](https://ferrandelgado.github.io/my-tools/)

## 🚀 Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **UI Components:** [Radix UI Primitives](https://www.radix-ui.com/primitives) (`@radix-ui/react-hover-card`, `@radix-ui/react-navigation-menu`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UUID Generation:** [uuid](https://www.npmjs.com/package/uuid)
- **EXIF Reading:** [exifreader](https://www.npmjs.com/package/exifreader)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Linting:** [ESLint](https://eslint.org/)

## 🛠️ Built-in Tools

- **JWT Reader**
  - Instantly decode JWT tokens and view their header and payload.
  - Copy and clear tokens, with local storage for convenience.

- **EXIF Reader**
  - Drop or select an image to view its EXIF metadata in a table.
  - Supports previewing embedded images (MPF, e.g., motion photos).
  - Download images with EXIF data stripped, including embedded images.

- **UUID Generator**
  - Generate random UUID v4 values.
  - Generate deterministic UUID v5 values from a namespace and value.
  - Copy UUIDs to clipboard with one click.
  - Input validation for UUID v5 namespace.

## 📝 Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Lint the code
npm run lint
```

## 📦 Deployment

This project is set up for static deployment (e.g., GitHub Pages) using the `gh-pages` branch.

---



