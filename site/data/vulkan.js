// Vulkan category — specs, samples, and best practices.

export default {
  id:    "vulkan",
  name:  "Vulkan",
  blurb: "Specs, samples, and best practices",

  tags: [
    { id: "best practices", name: "best practices", blurb: "Best-practice guidance from vendors and practitioners" },
    { id: "blogs",          name: "blogs",          blurb: "Curated blog rolls / individual blogs to follow" },
    { id: "tools",          name: "tools",          blurb: "Tool catalogs and utility apps" },
  ],

  resources: [
    {
      title: "Vulkan Do's and Don'ts",
      url:    "https://developer.nvidia.com/blog/vulkan-dos-donts/",
      source: "NVIDIA",
      year:   2019,
      tags:   ["best practices", "blog", "doc"],
      blurb:  "Pragmatic guidance from NVIDIA on writing performant, correct Vulkan code.",
    },
    {
      title: "GPUOpen Performance",
      url:    "https://gpuopen.com/performance/",
      source: "AMD GPUOpen",
      year:   2024,
      tags:   ["best practices", "doc"],
      blurb:  "AMD's collection of GPU performance guidance for graphics developers.",
    },
    {
      title: "How I learned Vulkan and wrote a small game engine with it",
      url:    "https://edw.is/learning-vulkan/",
      source: "edw.is",
      year:   2021,
      tags:   ["blogs", "blog"],
      blurb:  "Learning narrative covering the path from Vulkan basics to a small custom engine.",
    },
    {
      title: "Vulkan Hardware Database",
      url:    "http://vulkan.gpuinfo.org",
      source: "Sascha Willems",
      year:   2024,
      tags:   ["tools", "tool"],
      blurb:  "Searchable database of Vulkan capability reports across consumer hardware.",
    },
    {
      title: "AMD Radeon Developer Tools",
      url:    "https://gpuopen.com/tools/",
      source: "AMD GPUOpen",
      year:   2024,
      tags:   ["tools", "tool"],
      blurb:  "AMD's profilers, debuggers and analysis tools for graphics developers.",
    },
    {
      title: "NVIDIA Nsight",
      url:    "https://developer.nvidia.com/tools-overview",
      source: "NVIDIA",
      year:   2024,
      tags:   ["tools", "tool"],
      blurb:  "NVIDIA's family of GPU debugging and profiling tools across APIs.",
    },
  ],
};
