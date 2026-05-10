// Rust category — systems programming in Rust.

export default {
  id:    "rust",
  name:  "Rust",
  blurb: "Systems programming in Rust",

  tags: [
    { id: "libraries", name: "libraries", blurb: "Libraries, crates and bindings" },
  ],

  resources: [
    {
      title: "Ash",
      url:    "https://crates.io/crates/ash",
      source: "ash-rs",
      year:   2024,
      tags:   ["libraries", "repo", "tool"],
      blurb:  "Lean and unsafe Vulkan bindings for Rust.",
    },
    {
      title: "Winit",
      url:    "https://crates.io/crates/winit",
      source: "rust-windowing",
      year:   2024,
      tags:   ["libraries", "repo", "tool"],
      blurb:  "Lightweight and multi-platform windowing library for Rust.",
    },
  ],
};
