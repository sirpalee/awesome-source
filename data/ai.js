// AI category — models, agents, training & inference notes.

export default {
  id:    "ai",
  name:  "AI",
  blurb: "Models, agents, training & inference notes",

  tags: [
    { id: "llm",              name: "llm",              blurb: "Large language models" },
    { id: "machine learning", name: "machine learning", blurb: "Classical and deep machine learning" },
  ],

  resources: [
    {
      title: "Roleplaying driven by an LLM: observations & open questions",
      url:    "https://ianbicking.org/blog/2024/04/roleplaying-by-llm",
      source: "Ian Bicking",
      year:   2024,
      tags:   ["llm", "blog"],
      blurb:  "Notes from experiments using LLMs to drive interactive roleplay.",
    },
    {
      title: "Generative Agents: Interactive Simulacra of Human Behavior",
      url:    "https://arxiv.org/pdf/2304.03442",
      source: "Park et al.",
      year:   2023,
      tags:   ["llm", "paper"],
      blurb:  "Architecture for believable agents simulating human behavior with LLMs.",
    },
    {
      title: "Neural Networks and Deep Learning",
      url:    "http://neuralnetworksanddeeplearning.com/index.html",
      source: "Michael Nielsen",
      year:   2015,
      tags:   ["machine learning", "book"],
      blurb:  "Free online book introducing neural networks and deep learning fundamentals.",
    },
    {
      title: "NeuralVDB: High-resolution Sparse Volume Representation using Hierarchical Neural Networks",
      url:    "https://arxiv.org/abs/2208.04448",
      source: "Kim et al.",
      year:   2022,
      tags:   ["machine learning", "paper"],
      blurb:  "Hierarchical neural representation for sparse volumetric data on top of OpenVDB.",
    },
  ],
};
