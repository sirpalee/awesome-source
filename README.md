# awesome-source

A small, opinionated wiki of dev resources at <https://awesome-source.wiki/>,
browsable as a terminal-style single-page app (`Ctrl+K` to search, `j`/`k` to
move, `Enter` to open, `?` for help).

## Project layout

```
site/
├── index.html        Static shell that loads React + Babel from CDN
├── data.js           Hand-maintained resources & categories
└── terminal-app.js   The React SPA (compiled in-browser by Babel standalone)
```

The whole site is the `site/` directory — three files, no build step.

## Adding a resource

Edit `site/data.js` and append an object to `RESOURCES`:

```js
{
  id: "r-rendering-something-1",     // unique
  cat: "rendering",                  // must match a CATEGORIES id
  title: "...",
  url: "https://...",
  source: "Author / org",
  year: 2024,
  tags: ["paper"],                   // see vocabulary below
  blurb: "One-line description.",
}
```

Tag vocabulary: `paper`, `video`, `talk`, `repo`, `tool`, `blog`, `book`,
`doc`, `course`. Adding a new tag automatically surfaces it as a filter chip.

To add a category, append to `CATEGORIES`. The home view renders categories
in array order.

## Local preview

```sh
cd site && python3 -m http.server 8000
```

…then open <http://localhost:8000/>.

## Deployment

Pushes to `main` trigger `.github/workflows/main.yml`, which copies `site/` to
the `deploy` branch via `peaceiris/actions-gh-pages`. GitHub Pages serves from
that branch.
