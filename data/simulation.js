// Simulation category — physics, fluids, cloth, particles.

export default {
  id:    "simulation",
  name:  "Simulation",
  blurb: "Physics, fluids, cloth, particles",

  tags: [
    { id: "terrain", name: "terrain", blurb: "Terrain generation, simulation and data" },
    { id: "water",   name: "water",   blurb: "Water and fluid simulation" },
  ],

  resources: [
    {
      title: "A Review of Digital Terrain Modeling",
      url:    "https://hal.archives-ouvertes.fr/hal-02097510/document",
      source: "Galin et al.",
      year:   2019,
      tags:   ["terrain", "paper"],
      blurb:  "Survey of digital terrain modeling techniques in computer graphics.",
    },
    {
      title: "Models of dune field morphology",
      url:    "https://smallpond.ca/jim/sand/dunefieldMorphology/index.html",
      source: "smallpond.ca",
      year:   2018,
      tags:   ["terrain", "blog", "tool"],
      blurb:  "Hands-on exploration of computational models for dune-field morphology.",
    },
    {
      title: "Desertscape Simulation",
      url:    "https://hal.archives-ouvertes.fr/hal-02273039/document",
      source: "Paris et al.",
      year:   2019,
      tags:   ["terrain", "paper"],
      blurb:  "Physically based simulation of large-scale desert landscapes.",
    },
    {
      title: "Saltation transport on Mars",
      url:    "https://arxiv.org/pdf/0705.1776.pdf",
      source: "arXiv",
      year:   2007,
      tags:   ["terrain", "paper"],
      blurb:  "Physical study of saltation-driven sand transport in Martian conditions.",
    },
    {
      title: "Large-Scale Water Simulation in Games",
      url:    "https://trepo.tuni.fi/handle/10024/115052",
      source: "Tampere University",
      year:   2020,
      tags:   ["water", "paper"],
      blurb:  "Thesis on large-scale water simulation techniques tailored for game environments.",
    },
  ],
};
