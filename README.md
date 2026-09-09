# PollApp

A small web app for creating surveys and watching the results come in live.
Built with **Angular 22** and **Supabase** as a school project.

> **Educational project.** PollApp was written as a school assignment for
> learning purposes only. It is not a product, it is not maintained for
> production use, and it is not monetised in any way — no profit is or will be
> made from this repository.

## What it does

- Browse a list of surveys, filtered by category
- Open a survey and submit an answer
- **Live results:** answers appear immediately for everyone viewing the survey,
  without a page reload
- Surveys can expire, so the list separates active from finished polls

The live behaviour comes from Supabase Realtime: the app subscribes to Postgres
changes on the `surveys` and `options` tables and pushes them straight into
Angular signals, so the UI updates as soon as the database does.

## Requirements

- **Node.js 20.19+** (22.12+ or 24+ also work) and npm
- A free **Supabase** project (URL + publishable/anon key)

## Getting started

**1. Clone the repository**

```bash
git clone https://github.com/Lehnerma/PollApp.git
cd PollApp
```

**2. Install dependencies** — there are two `package.json` files: the root one
holds the lint/format tooling, `poll-app/` holds the Angular app.

```bash
npm install
cd poll-app && npm install
```

**3. Add your Supabase credentials**

The app does *not* use a `.env` file — Angular reads its config from
`poll-app/src/environments/`. Fill in both files:

```ts
// poll-app/src/environments/environment.ts        (production build)
// poll-app/src/environments/environment.development.ts  (dev build)
export const environment = {
  supabaseUrl: 'https://<your-project>.supabase.co',
  supabaseKey: '<your-publishable-key>',
};
```

`angular.json` swaps `environment.ts` for `environment.development.ts` in the
`development` configuration.

> The publishable (anon) key is meant to be shipped to the browser, so it lives
> in the repository. That is only safe with **Row Level Security enabled** on
> every table — make sure your Supabase policies are set up accordingly.

**4. Start the dev server**

```bash
cd poll-app
npm start          # ng serve -o → http://localhost:4200
```

## Scripts

Run from `poll-app/`:

| Command | Description |
| --- | --- |
| `npm start` | Dev server on port 4200 |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |

Run from the repository root:

| Command | Description |
| --- | --- |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run lint:styles` / `npm run lint:styles:fix` | Stylelint (SCSS) |
| `npm run format` / `npm run format:check` | Prettier |

## Project structure

```
PollApp/
├── package.json              # lint / format tooling
└── poll-app/                 # the Angular application
    └── src/
        ├── app/shared/
        │   ├── pages/        # routed views: home, single-view
        │   ├── components/   # survey-card, live-results, fillout, …
        │   ├── services/     # Supabase client + realtime subscriptions
        │   ├── interfaces/   # types mirroring the Supabase tables
        │   └── models/
        ├── environments/     # Supabase URL and key
        └── styles/           # global SCSS (abstracts, base, layout, components)
```

Routes: `/` (survey overview) and `/fillout/:id` (single survey).

The app is a standalone Angular setup — no `NgModule`s, state handled with
`signal()` and component inputs with `input()`.

## License

No open-source license is granted. The code is published for review and
learning purposes as part of a school assignment; please do not reuse it
commercially.
