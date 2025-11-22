# u-compensar — Simple Page (Vue 3 + TypeScript + Vite)

A simple front-end project created as coursework for Ucompensar University. This repository contains a small static SPA built with Vue 3, TypeScript and Vite intended as an educational/demo template.

Quick summary
- Framework: Vue 3
- Language: TypeScript
- Dev server / Bundler: Vite
- State management: Vuex 4 (module-based)
- Routing: Vue Router
- Styles: SCSS / Sass

Project architecture and folder structure
The main source code lives in the `src/` folder and is organized to separate responsibilities and make teamwork easier:

- `src/`
  - `main.ts` — application entry point.
  - `App.vue` — root component.
  - `router/` — route configuration (Vue Router).
  - `store/` — Vuex store with modules (for example `store/modules/device`).
  - `components/` — reusable components grouped by feature/domain (see details below).
  - `Pages/` — top-level views/pages (e.g. `main`, `404`).
  - `HOC/` — higher-order components or reusable wrappers.
  - `helpers/` and `utils/` — utility functions (for example device detection).
  - `assets/` — images, SVGs and other static assets.
  - `styles/` — global styles and SCSS variables (`base`, `_variables.scss`, `_mixins.scss`).
  - `types/` — TypeScript types and declarations (e.g. `vuex.d.ts`, `shims-vuex.d.ts`).

Conventions and patterns
- Vue 3 with Composition API and `<script setup>` in single-file components.
- Strong typing with TypeScript and project type declarations placed in `src/types`.
- Centralized state with Vuex 4 using modular (namespaced) modules.
- SCSS for styling with global variables and mixins under `src/styles`.
- Feature-folder organization: components and their styles/resources live together in subfolders.

components/ folder architecture
The `src/components/` folder groups feature-based, reusable components. The structure in this project is:

- `components/` — root folder for components
  - `clients/`
    - `Clients.vue` — component for the clients section or cards.
    - `styles/Clients.scss` — component-specific styles.
  - `community/`
    - `community.vue` — community section component.
    - `styles/community.scss` — styles for the community component.
  - `customer/`
    - `Customer.vue` — customer/user related component.
    - `styles/customer.scss` — component styles.
  - `footer/`
    - `FooterRouter.vue` — footer component with navigation.
    - `styles/footer.scss` — footer styles.
  - `hero/`
    - `HeroSection.vue` — hero/banner component.
    - `styles/hero.scss` — hero styles.
  - `menu/`
    - `menu.vue` — main navigation/menu component.
    - `index.ts` — optional re-export or helper for the menu.
    - `styles/menu.scss` — menu styles.

Observed conventions
- Component filenames use PascalCase (e.g. `Clients.vue`, `HeroSection.vue`) while some files use lowercase — prefer settling on a single convention for future contributions.
- Each component keeps its SCSS in a `styles/` subfolder next to the component file.
- `index.ts` files (where present) are used to re-export components or expose helper functions.

Typical usage flow
1. A page from `src/Pages/` imports components from `src/components/<feature>/Component.vue`.
2. Components import their SCSS or use scoped styles inside the SFC.
3. Components consume shared state from `store/` or utilities from `helpers/` and `utils/` if needed.

Technologies (from `package.json`)
- vue ^3
- typescript ~5.x
- vite ^6.x
- @vitejs/plugin-vue
- vuex ^4
- vue-router ^4
- sass (for SCSS compilation)
- vue-tsc (TypeScript checking)

Useful scripts
- Install dependencies

```bash
npm install
```

- Start development server

```bash
npm run dev
```

- Build for production

```bash
npm run build
```

- Preview production build locally

```bash
npm run preview
```

Notes for development and delivery (Ucompensar)
- Recommended delivery: include the repository with clear instructions and a build (`npm run build`).
- Make sure `package.json` uses stable versions and the README contains the steps to run locally.
- For deployment, consider adding a host-specific config (`netlify.toml`, Vercel settings, or GitHub Pages instructions).

Suggested improvements (optional)
- Migrate to Pinia for a modern alternative to Vuex if desired.
- Add unit tests (Vitest/Jest) and E2E tests (Cypress) to demonstrate code quality.
- Add CI (GitHub Actions) to run lint/typecheck and build on push/PR.

Author / contact
- Project created for Ucompensar University coursework.
- Keep this README updated with author and submission details when delivering to the instructor.
