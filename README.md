# u-compensar — Simple Page (Vue 3 + TypeScript + Strapi)

A simple front-end project created as coursework for Ucompensar University. This repository contains a small static SPA built with Vue 3, TypeScript and Vite intended as an educational/demo template.

## Link to the explanatory video
[https://www.youtube.com/watch?v=WngUz93dITU](https://www.youtube.com/watch?v=WngUz93dITU)

[https://youtu.be/e6-Jw7F6tI0?si=Quufzxk4m5kU3wTY](https://youtu.be/e6-Jw7F6tI0?si=Quufzxk4m5kU3wTY)

## References

<img width="700" alt="Screenshot 2025-11-11 at 9 12 36 PM" src="https://github.com/user-attachments/assets/83cc6449-0aaa-460a-8a34-2f2e868139ed" />
<img width="700" height="1286" alt="Screenshot 2025-11-22 at 10 43 11 PM" src="https://github.com/user-attachments/assets/f1890264-d2ac-493d-9284-c5f3dc21c70a" />
<img width="700" height="1233" alt="Screenshot 2025-11-22 at 10 44 05 PM" src="https://github.com/user-attachments/assets/fba51320-0a13-4e6b-9b08-fa4fefb14eb1" />


## Strapi integration — dynamic content (ADDED)

Support was added to consume content from a headless CMS (Strapi). The main idea is that pages are built from a JSON object returned by Strapi that contains an array of blocks (components) and their data. This allows page structure and content to be managed in the CMS without modifying the front-end source code.

Example endpoint used by the app:
- `GET http://localhost:1337/api/home?populate=*`
  - The `populate=*` query ensures Strapi includes related entities and media objects (images, files) in the payload.

How it works (short flow)
1. Strapi exposes collections/entries (for example `home`) that contain a `data` object with an array `components`.
2. When the main view (`src/Pages/main/index.vue`) loads, if the store doesn't have the page yet the view dispatches the action `dataPage/fetchHomePage`.
3. The action uses the API helper (`src/helpers/api.ts`) to request `/api/home?populate=*` and stores the result in `store/modules/data-page` (mutation `setPage`).
4. The getter `dataPage/getComponents` returns the array of blocks (components) that come from Strapi.
5. `src/Pages/template-dynamic-page/DynamicPageRenderer.vue` receives that array (via a prop or from the getter) and, using each block's `__component` field, maps dynamically to a local Vue component (for example `general.hero` → `HeroSection.vue`).
6. Each Vue component defines typed props (`src/components/*/types`) and renders its UI using the data received.

Why this matters (key benefits)
- Separation of content and presentation: editors can change text, images and block order without deploying the front-end.
- Faster content updates: changes made in the CMS appear immediately in the UI after reload.
- Flexibility: new sections or blocks can be added in Strapi and mapped to Vue components through a registry, with no changes to the renderer core.
- Reusability: shared helpers (API, media) and centralized types reduce duplication and bugs.
- Robustness: the app has centralized call control (timeout/abort) and standardized error handling.

Improvements implemented
- Central API helper: `src/helpers/api.ts` normalizes responses ({ ok, data, error }) and adds timeout/AbortController support.
- Vuex `dataPage` module (`src/store/modules/data-page`): action `fetchHomePage`, getters `getPage` and `getComponents`, and mutation `setPage`.
- `DynamicPageRenderer` for dynamic rendering of blocks based on `__component`.
- `src/helpers/media.ts` to normalize and resolve media URLs (prefix `STRAPI_URL`, extract alt text).
- Types: component props moved to `src/components/*/types` and used with `defineProps<T>()` in SFCs.

Quick configuration and testing
1. Make sure Strapi is running at `http://localhost:1337` or update `src/constants/index.ts` with the correct URL.
2. From the project root run:

```bash
npm install
npm run dev
```

3. Confirm that the `home` collection (or your chosen collection) returns an object with `data.components` where each item contains `__component` and its fields.

Minimal expected payload example (simplified):

```json
{
  "data": {
    "id": 3,
    "components": [
      {
        "__component": "general.hero",
        "id": 4,
        "title": "This is a Title",
        "subTitle": "This is a subtitle",
        "description": "This is a description",
        "image": { "url": "/uploads/hero.png", "alternativeText": "hero" }
      }
    ]
  },
  "meta": {}
}
```

Final notes
- If you rename blocks in Strapi (for example from `general.hero` to something else), update the `registry` in `DynamicPageRenderer` to map the new identifier to the local Vue component.
- If you want, I can add an example `.env` and update `src/helpers/api.ts` to read `VITE_API_BASE_URL` from environment variables. Should I add that now?


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
