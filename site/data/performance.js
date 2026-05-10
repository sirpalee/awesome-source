// Performance category — CPU, memory, profiling, low-level perf.

export default {
  id:    "performance",
  name:  "Performance",
  blurb: "CPU, memory, profiling, low-level perf",

  tags: [
    { id: "cpp", name: "cpp", blurb: "C++ language specifics, benchmarks and idioms" },
    { id: "gpu", name: "gpu", blurb: "GPU programming, profiling and performance" },
  ],

  resources: [
    {
      title: "Hashmap benchmarks",
      url:    "https://martin.ankerl.com/2019/04/01/hashmap-benchmarks-01-overview/",
      source: "Martin Ankerl",
      year:   2019,
      tags:   ["cpp", "blog"],
      blurb:  "Methodology and overview for an extensive series of C++ hashmap benchmarks.",
    },
    {
      title: "Comprehensive C++ Hashmap Benchmarks 2022",
      url:    "https://martin.ankerl.com/2022/08/27/hashmap-bench-01/",
      source: "Martin Ankerl",
      year:   2022,
      tags:   ["cpp", "blog"],
      blurb:  "Refreshed cross-implementation benchmarks of modern C++ hashmaps.",
    },
    {
      title: "std::vector VS std::list VS std::deque",
      url:    "https://baptiste-wicht.com/posts/2012/12/cpp-benchmark-vector-list-deque.html",
      source: "Baptiste Wicht",
      year:   2012,
      tags:   ["cpp", "blog"],
      blurb:  "Empirical comparison of the three standard sequence containers under common workloads.",
    },
    {
      title: "Multi-GPU programming",
      url:    "https://medium.com/gpgpu/multi-gpu-programming-6768eeb42e2c",
      source: "Medium / gpgpu",
      year:   2018,
      tags:   ["gpu", "blog"],
      blurb:  "Overview of strategies for splitting compute work across multiple GPUs.",
    },
  ],
};
