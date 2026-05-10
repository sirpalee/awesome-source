// Datasets category — open data sources and benchmarks.

export default {
  id:    "dataset",
  name:  "Datasets",
  blurb: "Open data sources and benchmarks",

  tags: [
    { id: "general", name: "general", blurb: "General-purpose / cross-cutting" },
    { id: "terrain", name: "terrain", blurb: "Terrain generation, simulation and data" },
  ],

  resources: [
    {
      title: "McGuire Computer Graphics Archive",
      url:    "http://casual-effects.com/data/index.html",
      source: "Morgan McGuire",
      year:   2017,
      tags:   ["general", "tool"],
      blurb:  "Curated 3D scenes and meshes used as a reference benchmark by graphics researchers.",
    },
    {
      title: "NASA Scientific Visualization Studio — CGI Moon Kit",
      url:    "https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=4720",
      source: "NASA SVS",
      year:   2020,
      tags:   ["terrain", "tool"],
      blurb:  "High-resolution displacement and color maps of the Moon, free for any use.",
    },
  ],
};
