// General category — foundational reads & cross-cutting tools.

export default {
  id:    "general",
  name:  "General",
  blurb: "Foundational reads & cross-cutting tools",

  tags: [
    { id: "actor",    name: "actor",    blurb: "Actor-model concurrency" },
    { id: "agent",    name: "agent",    blurb: "Agent-based modeling and simulation" },
    { id: "research", name: "research", blurb: "Research portals and aggregators" },
    { id: "tools",    name: "tools",    blurb: "Tool catalogs and utility apps" },
  ],

  resources: [
    {
      title: "Actors with Tokio",
      url:    "https://ryhl.io/blog/actors-with-tokio/",
      source: "Alice Ryhl",
      year:   2021,
      tags:   ["actor", "blog"],
      blurb:  "Idiomatic patterns for building actor-style concurrency on top of Tokio.",
    },
    {
      title: "ABMU: An Agent-Based Modelling Framework for Unity3D",
      url:    "https://www.sciencedirect.com/science/article/pii/S2352711021000881",
      source: "Hassan et al.",
      year:   2021,
      tags:   ["agent", "paper"],
      blurb:  "Reusable framework for agent-based modelling layered on top of Unity3D.",
    },
    {
      title: "An Agent-Based Model for Game Development",
      url:    "https://www.researchgate.net/publication/322158842_An_Agent-Based_Model_for_Game_Development",
      source: "Pereira et al.",
      year:   2017,
      tags:   ["agent", "paper"],
      blurb:  "Applies agent-based modelling techniques to gameplay and AI behaviours.",
    },
    {
      title: "NVIDIA research publications",
      url:    "https://research.nvidia.com/publications",
      source: "NVIDIA",
      year:   2024,
      tags:   ["research", "tool", "doc"],
      blurb:  "Searchable index of NVIDIA Research papers across graphics, AI and systems.",
    },
    {
      title: "Game Development Articles, Publications, …",
      url:    "https://www.gamedevs.org",
      source: "gamedevs.org",
      year:   2024,
      tags:   ["research", "tool"],
      blurb:  "Long-running archive of articles and conference talks on game development.",
    },
    {
      title: "Easing Functions Cheat Sheet",
      url:    "https://easings.net/",
      source: "easings.net",
      year:   2024,
      tags:   ["tools", "tool"],
      blurb:  "Visual reference for common easing functions with copy-pasteable code.",
    },
  ],
};
