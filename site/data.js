// Aggregator for awesome-source.wiki.
//
// Each category lives in its own file under site/data/. This file imports
// them, defines the generic resource-type tags, dedupes everything, and
// publishes window.AWESOME_DATA for the SPA to consume.
//
// To add a category:
//   1. Drop a new module under site/data/, default-exporting
//      { id, name, blurb, tags, resources }.
//   2. Import it below and add it to CATEGORY_MODULES (in display order).
//   3. Add a corresponding <script type="module" ...> import? — no, this
//      file is the only entry point. Just import here.

import ai          from "./data/ai.js";
import rendering   from "./data/rendering.js";
import vulkan      from "./data/vulkan.js";
import rust        from "./data/rust.js";
import performance from "./data/performance.js";
import simulation  from "./data/simulation.js";
import procgen     from "./data/procgen.js";
import dataset     from "./data/dataset.js";
import general     from "./data/general.js";
import blogs       from "./data/blogs.js";

// Generic resource-type tags shared by every category. Topic tags (the
// markdown filename a resource came from) live with their category file.
const GENERIC_TAGS = [
  { id: "paper",  name: "paper",  blurb: "Academic or technical paper, often as PDF" },
  { id: "video",  name: "video",  blurb: "Recorded video or screencast" },
  { id: "talk",   name: "talk",   blurb: "Conference or meetup talk" },
  { id: "repo",   name: "repo",   blurb: "Source code repository" },
  { id: "tool",   name: "tool",   blurb: "Online tool, service or interactive site" },
  { id: "blog",   name: "blog",   blurb: "Blog post or article" },
  { id: "book",   name: "book",   blurb: "Book (online or in print)" },
  { id: "doc",    name: "doc",    blurb: "Reference documentation" },
  { id: "course", name: "course", blurb: "Course, tutorial series or guided learning" },
];

const CATEGORY_MODULES = [
  ai, rendering, vulkan, rust, performance,
  simulation, procgen, dataset, general, blogs,
];

const CATEGORIES = CATEGORY_MODULES.map(({ id, name, blurb }) => ({ id, name, blurb }));

// Concatenate generic + per-category topic tags, dedupe by id (some topic
// tags like "tools" or "terrain" are reused across multiple categories).
const TAGS = (() => {
  const seen = new Set();
  const out = [];
  for (const t of [...GENERIC_TAGS, ...CATEGORY_MODULES.flatMap(c => c.tags || [])]) {
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    out.push(t);
  }
  return out;
})();

// Resources keyed by category id. The terminal-app flattens this and injects
// `cat` per resource at load time, so individual resource entries never
// mention their category.
const RESOURCES = Object.fromEntries(
  CATEGORY_MODULES.map(c => [c.id, c.resources || []])
);

window.AWESOME_DATA = { categories: CATEGORIES, tags: TAGS, resources: RESOURCES };
