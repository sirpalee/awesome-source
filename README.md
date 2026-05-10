# awesome-source

A small, opinionated wiki of dev resources at <https://awesome-source.wiki/>,
browsable as a terminal-style single-page app (`Ctrl+K` to search, `j`/`k` to
move, `Enter` to open, `?` for help).

## Project layout

```
site/
├── index.html          Static shell that loads React from CDN
├── data.js             Aggregator (ES module): imports per-category files,
│                       defines generic resource-type tags, builds AWESOME_DATA
├── data/
│   ├── ai.js           One category per file. Each default-exports
│   ├── rendering.js    { id, name, blurb, tags, resources }.
│   ├── vulkan.js
│   ├── rust.js
│   ├── performance.js
│   ├── simulation.js
│   ├── procgen.js
│   ├── dataset.js
│   ├── general.js
│   └── blogs.js
└── terminal-app.js     Compiled JS for the React SPA (auto-generated)

src/
└── terminal-app.jsx    JSX source — edit here, then recompile
```

The deployable site is the `site/` directory. To rebuild the SPA after editing
the JSX source:

```sh
npx babel src/terminal-app.jsx -o site/terminal-app.js --presets=@babel/preset-react
```

## Adding a resource

Open the right file under `site/data/` and append a resource:

```js
{
  title:  "...",
  url:    "https://...",
  source: "Author / org",
  year:   2024,
  tags:   ["voxels", "paper"],   // first = topic (matches an entry in this
                                 // file's `tags`), second = resource type
                                 // (paper, video, talk, repo, tool, blog,
                                 // book, doc, course)
  blurb:  "One-line description.",
}
```

Resources don't carry their own `cat` — that's added by `data.js` from the file
they live in. Synthetic ids (`${cat}-${index}`) are generated at load time, so
authors only ever edit content.

## Adding a category

1. Drop a new module under `site/data/`, default-exporting
   `{ id, name, blurb, tags, resources }`.
2. Import it in `site/data.js` and add it to `CATEGORY_MODULES` in the order
   you want it to appear on the home view.

## Adding a tag

- A topic tag (e.g. `voxels`, `llm`, `best practices`) belongs in the `tags`
  array of the category file that uses it. If two categories use the same
  topic tag, define it in both — `data.js` dedupes by `id`.
- A new generic resource-type tag (e.g. `podcast`) goes in `GENERIC_TAGS` in
  `site/data.js`.
- Either way, every tag entry is `{ id, name, blurb }`. The blurb shows up
  as a tooltip on filter chips and resource pills.

## Local preview

```sh
cd site && python3 -m http.server 8000
```

…then open <http://localhost:8000/>.

## Deployment

Pushes to `main` trigger `.github/workflows/main.yml`, which copies `site/` to
the `deploy` branch via `peaceiris/actions-gh-pages`. GitHub Pages serves from
that branch.
