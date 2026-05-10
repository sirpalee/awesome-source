// AUTO-GENERATED from src/terminal-app.jsx — do not edit directly.
// Recompile with: npx babel src/terminal-app.jsx -o site/terminal-app.js --presets=@babel/preset-react

// Terminal SPA for awesome-source.wiki — JSX source.
// Compile to plain JS with: npx babel src/terminal-app.jsx -o site/terminal-app.js --presets=@babel/preset-react
//
// Dark default + light theme toggle (persisted), Ctrl+K to focus search,
// j/k or arrow keys to move selection, Enter to open, / to search, Esc to clear.
//
// Data comes from window.AWESOME_DATA, defined in site/data.js.

const {
  useState,
  useMemo,
  useRef,
  useEffect
} = React;
const DATA = window.AWESOME_DATA || {
  categories: [],
  tags: [],
  resources: {}
};
const CATEGORIES = DATA.categories;
const TAGS = DATA.tags;

// data.js groups resources by category. Flatten to a flat list, injecting cat
// and a stable synthetic id (cat + index) — authors don't write ids by hand,
// they're generated here for use as React keys and keyboard-nav references.
const RESOURCES = Object.entries(DATA.resources || {}).flatMap(([cat, list]) => list.map((r, i) => ({
  ...r,
  cat,
  id: `${cat}-${i}`
})));
const COUNTS = RESOURCES.reduce((m, r) => (m[r.cat] = (m[r.cat] || 0) + 1, m), {});

// id -> { id, name, blurb } for showing tag descriptions on hover.
const TAG_BY_ID = TAGS.reduce((m, t) => (m[t.id] = t, m), {});
const THEMES = {
  dark: {
    bg: '#0e0f10',
    bg2: '#16181a',
    panel: '#1a1c1f',
    ink: '#e6e4dc',
    ink2: '#b8b6ac',
    mute: '#7a7870',
    rule: 'rgba(255,250,235,0.08)',
    ruleSoft: 'rgba(255,250,235,0.05)',
    accent: '#e9b94e',
    // amber
    accent2: '#7dd3fc',
    // cyan
    green: '#7ec07a',
    red: '#e07a7a',
    selBg: 'rgba(233,185,78,0.10)',
    chipBg: 'rgba(233,185,78,0.12)',
    tagBg: 'rgba(125,211,252,0.07)',
    tagBorder: 'rgba(125,211,252,0.18)'
  },
  light: {
    bg: '#f4f1e8',
    bg2: '#ebe7da',
    panel: '#fbf8ee',
    ink: '#2a2924',
    ink2: '#534f46',
    mute: '#8a857a',
    rule: 'rgba(40,38,30,0.12)',
    ruleSoft: 'rgba(40,38,30,0.06)',
    accent: '#a36818',
    accent2: '#1f6f9a',
    green: '#3f7a3a',
    red: '#a04545',
    selBg: 'rgba(163,104,24,0.10)',
    chipBg: 'rgba(163,104,24,0.10)',
    tagBg: 'rgba(31,111,154,0.06)',
    tagBorder: 'rgba(31,111,154,0.20)'
  }
};

// On Linux the user expects Ctrl, not ⌘.
const MOD = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform) ? '⌘' : 'Ctrl';

// Parse the grep-style query: quoted strings are search text, --cat=X / --tag=X
// are filters. Bare unquoted words are ignored — quotes are required so search
// terms can include spaces alongside flags.
function parseQuery(raw) {
  const cats = [];
  const tags = [];
  let rest = raw;
  rest = rest.replace(/--cat=([\w-]+)/gi, (_, v) => {
    cats.push(v.toLowerCase());
    return '';
  });
  rest = rest.replace(/--tag=([\w-]+)/gi, (_, v) => {
    tags.push(v.toLowerCase());
    return '';
  });
  const textParts = [];
  rest.replace(/"([^"]*)"/g, (_, m) => {
    if (m.trim()) textParts.push(m);
    return '';
  });
  return {
    text: textParts.join(' ').trim().toLowerCase(),
    cats,
    tags,
    isEmpty: !textParts.length && !cats.length && !tags.length
  };
}
function TerminalApp() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('as-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('as-theme', theme);
    } catch {}
  }, [theme]);
  const T = THEMES[theme];

  // If the page was loaded under a category URL (e.g. /rendering/), preselect it.
  const initialView = (() => {
    const path = typeof window !== 'undefined' && window.location && window.location.pathname || '/';
    const seg = path.replace(/^\/+|\/+$/g, '').split('/')[0];
    if (seg && CATEGORIES.some(c => c.id === seg)) return {
      kind: 'category',
      id: seg
    };
    return {
      kind: 'home'
    };
  })();
  const [view, setView] = useState(initialView);
  const [query, setQuery] = useState('');
  const [activeCats, setActiveCats] = useState(new Set());
  const [activeTags, setActiveTags] = useState(new Set());
  const [showHelp, setShowHelp] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const parsed = useMemo(() => parseQuery(query), [query]);
  const queryActive = !!(parsed.text || parsed.cats.length || parsed.tags.length);
  const filtered = useMemo(() => {
    const allCats = new Set([...activeCats, ...parsed.cats]);
    const allTags = new Set([...activeTags, ...parsed.tags]);
    const q = parsed.text;
    return RESOURCES.filter(r => {
      if (view.kind === 'category' && r.cat !== view.id) return false;
      if (allCats.size && !allCats.has(r.cat)) return false;
      if (allTags.size && !(r.tags || []).some(t => allTags.has(t))) return false;
      if (!q) return true;
      return r.title.toLowerCase().includes(q) || (r.source || '').toLowerCase().includes(q) || (r.blurb || '').toLowerCase().includes(q) || (r.tags || []).some(t => t.includes(q));
    });
  }, [view, parsed, activeCats, activeTags]);
  const isFiltering = !!(queryActive || activeCats.size || activeTags.size || view.kind === 'category');
  const navList = useMemo(() => {
    if (!isFiltering && view.kind === 'home') {
      return CATEGORIES.map(c => ({
        kind: 'cat',
        id: c.id,
        title: c.name
      }));
    }
    return filtered.map(r => ({
      kind: 'res',
      id: r.id,
      title: r.title,
      url: r.url
    }));
  }, [isFiltering, view, filtered]);
  useEffect(() => {
    setSelectedIdx(i => Math.max(0, Math.min(i, navList.length - 1)));
  }, [navList.length]);
  const toggle = (set, v, setter) => {
    const n = new Set(set);
    n.has(v) ? n.delete(v) : n.add(v);
    setter(n);
  };
  const reset = () => {
    setView({
      kind: 'home'
    });
    setQuery('');
    setActiveCats(new Set());
    setActiveTags(new Set());
    setSelectedIdx(0);
  };
  const searchRef = useRef(null);
  const rowRefs = useRef({});
  useEffect(() => {
    const onKey = e => {
      const inField = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
        return;
      }
      if (!inField && e.key === '?') {
        e.preventDefault();
        setShowHelp(s => !s);
        return;
      }
      if (e.key === 'Escape') {
        if (inField) {
          document.activeElement.blur();
          return;
        }
        if (showHelp) {
          setShowHelp(false);
          return;
        }
        if (isFiltering) {
          reset();
          return;
        }
      }
      if (inField) return;
      if (e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx(i => Math.min(navList.length - 1, i + 1));
        return;
      }
      if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx(i => Math.max(0, i - 1));
        return;
      }
      if (e.key === 'h') {
        reset();
        return;
      }
      if (e.key === 'Enter') {
        const item = navList[selectedIdx];
        if (!item) return;
        if (item.kind === 'cat') {
          setView({
            kind: 'category',
            id: item.id
          });
          setSelectedIdx(0);
        } else if (item.kind === 'res' && item.url) {
          window.open(item.url, '_blank', 'noopener');
        }
        return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navList, selectedIdx, isFiltering, showHelp]);
  useEffect(() => {
    const item = navList[selectedIdx];
    if (!item) return;
    const el = rowRefs.current[`${item.kind}:${item.id}`];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIdx, navList]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: T.bg,
      color: T.ink,
      fontFamily: '"JetBrains Mono", "Geist Mono", ui-monospace, monospace',
      fontSize: 13,
      lineHeight: 1.55,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background 0.2s, color 0.2s'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    T: T,
    theme: theme,
    setTheme: setTheme,
    onHome: reset,
    onHelp: () => setShowHelp(s => !s)
  }), /*#__PURE__*/React.createElement(CmdBar, {
    T: T,
    searchRef: searchRef,
    query: query,
    setQuery: setQuery,
    view: view,
    setView: setView,
    activeCats: activeCats,
    toggleCat: id => toggle(activeCats, id, setActiveCats),
    activeTags: activeTags,
    toggleTag: t => toggle(activeTags, t, setActiveTags),
    clearAll: reset,
    hasFilter: isFiltering
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '24px 36px 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto'
    }
  }, !isFiltering && view.kind === 'home' && /*#__PURE__*/React.createElement(Home, {
    T: T,
    onPickCategory: id => {
      setView({
        kind: 'category',
        id
      });
      setSelectedIdx(0);
    },
    navList: navList,
    selectedIdx: selectedIdx,
    setSelectedIdx: setSelectedIdx,
    rowRefs: rowRefs
  }), (isFiltering || view.kind !== 'home') && /*#__PURE__*/React.createElement(Results, {
    T: T,
    view: view,
    resources: filtered,
    onClearCategory: () => {
      setView({
        kind: 'home'
      });
      setSelectedIdx(0);
    },
    navList: navList,
    selectedIdx: selectedIdx,
    setSelectedIdx: setSelectedIdx,
    rowRefs: rowRefs
  }))), /*#__PURE__*/React.createElement(Status, {
    T: T,
    count: filtered.length,
    view: view,
    query: query,
    cats: activeCats,
    tags: activeTags,
    onHelp: () => setShowHelp(s => !s)
  }), showHelp && /*#__PURE__*/React.createElement(HelpOverlay, {
    T: T,
    onClose: () => setShowHelp(false)
  }));
}
function Header({
  T,
  theme,
  setTheme,
  onHome,
  onHelp
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: `1px solid ${T.rule}`,
      background: T.bg2,
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: theme === 'dark' ? '#3a3a3a' : '#cfcabe'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: theme === 'dark' ? '#3a3a3a' : '#cfcabe'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: theme === 'dark' ? '#3a3a3a' : '#cfcabe'
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onHome,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      color: T.ink,
      fontFamily: 'inherit',
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.green
    }
  }, "~/awesome-source"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute
    }
  }, "$"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.ink
    }
  }, "browse")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 16,
      fontSize: 12,
      color: T.ink2,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/contribution/",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.accent
    }
  }, "--"), "contribute"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/sirpalee/awesome-source",
    target: "_blank",
    rel: "noopener",
    style: {
      color: T.mute,
      textDecoration: 'none'
    }
  }, "[github]"), /*#__PURE__*/React.createElement("a", {
    href: "https://twitter.com/sirpalee",
    target: "_blank",
    rel: "noopener",
    style: {
      color: T.mute,
      textDecoration: 'none'
    }
  }, "[twitter]"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 14,
      background: T.rule,
      margin: '0 2px'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onHelp,
    title: "Keyboard shortcuts (?)",
    style: iconBtn(T)
  }, "?"), /*#__PURE__*/React.createElement(ThemeToggle, {
    T: T,
    theme: theme,
    setTheme: setTheme
  })));
}
function iconBtn(T) {
  return {
    background: 'transparent',
    border: `1px solid ${T.rule}`,
    color: T.ink2,
    fontFamily: 'inherit',
    fontSize: 11,
    cursor: 'pointer',
    width: 22,
    height: 22,
    borderRadius: 4,
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
}
function ThemeToggle({
  T,
  theme,
  setTheme
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      border: `1px solid ${T.rule}`,
      borderRadius: 4,
      padding: 1
    }
  }, ['dark', 'light'].map(k => {
    const active = theme === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setTheme(k),
      title: `${k} theme`,
      style: {
        background: active ? T.accent : 'transparent',
        color: active ? T.bg2 : T.mute,
        border: 'none',
        fontFamily: 'inherit',
        fontSize: 10.5,
        cursor: 'pointer',
        padding: '2px 8px',
        borderRadius: 3,
        fontWeight: active ? 600 : 400
      }
    }, k === 'dark' ? '◐ dark' : '◑ light');
  }));
}
function CmdBar({
  T,
  searchRef,
  query,
  setQuery,
  view,
  setView,
  activeCats,
  toggleCat,
  activeTags,
  toggleTag,
  clearAll,
  hasFilter
}) {
  // Build a ghost "command" preview from active chips/category, shown in muted
  // color next to the typed search term so the full grep command is visible.
  const ghostText = useMemo(() => {
    const bits = [];
    if (view.kind === 'category') bits.push(`--cat=${view.id}`);
    for (const c of activeCats) if (!(view.kind === 'category' && c === view.id)) bits.push(`--cat=${c}`);
    for (const t of activeTags) bits.push(`--tag=${t}`);
    return bits.join(' ');
  }, [view, activeCats, activeTags]);

  // Measure typed text so the input shrink-wraps and the ghost suffix sits
  // right after the caret.
  const mirrorRef = useRef(null);
  const [inputW, setInputW] = useState(0);
  useEffect(() => {
    if (mirrorRef.current) setInputW(mirrorRef.current.offsetWidth);
  }, [query]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.bg,
      borderBottom: `1px solid ${T.rule}`,
      padding: '14px 36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: T.bg2,
      border: `1px solid ${T.rule}`,
      borderRadius: 6,
      padding: '9px 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.green,
      fontSize: 13
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute,
      fontSize: 13
    }
  }, "grep"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      minWidth: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    ref: mirrorRef,
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      visibility: 'hidden',
      whiteSpace: 'pre',
      fontFamily: 'inherit',
      fontSize: 13,
      padding: 0,
      top: 0,
      left: 0
    }
  }, query || ' '), /*#__PURE__*/React.createElement("input", {
    ref: searchRef,
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: ghostText ? '' : '"voxel"',
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: 13,
      color: T.ink,
      caretColor: T.accent,
      width: ghostText ? Math.max(inputW + 2, 4) : '100%',
      minWidth: 4,
      padding: 0
    }
  }), ghostText && /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute,
      fontSize: 13,
      whiteSpace: 'pre',
      marginLeft: query ? 6 : 0,
      pointerEvents: 'none',
      userSelect: 'none',
      fontFamily: 'inherit'
    }
  }, ghostText)), hasFilter && /*#__PURE__*/React.createElement("button", {
    onClick: clearAll,
    style: {
      background: 'none',
      border: `1px solid ${T.rule}`,
      color: T.mute,
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '2px 8px',
      borderRadius: 3,
      cursor: 'pointer'
    }
  }, "clear"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute,
      fontSize: 11,
      border: `1px solid ${T.rule}`,
      padding: '2px 6px',
      borderRadius: 3
    }
  }, MOD, "+K")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      marginTop: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute,
      fontSize: 11,
      marginRight: 6
    }
  }, "--cat"), CATEGORIES.map(c => {
    const active = activeCats.has(c.id) || view.kind === 'category' && view.id === c.id;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => {
        if (view.kind === 'category') setView({
          kind: 'home'
        });
        toggleCat(c.id);
      },
      style: {
        fontFamily: 'inherit',
        fontSize: 11.5,
        padding: '3px 8px',
        borderRadius: 3,
        border: `1px solid ${active ? T.accent : T.rule}`,
        background: active ? T.chipBg : 'transparent',
        color: active ? T.accent : T.ink2,
        cursor: 'pointer'
      }
    }, c.id, /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.5,
        marginLeft: 5
      }
    }, "\xB7", COUNTS[c.id] || 0));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      marginTop: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute,
      fontSize: 11,
      marginRight: 6
    }
  }, "--tag"), TAGS.map(tag => {
    const active = activeTags.has(tag.id);
    return /*#__PURE__*/React.createElement("button", {
      key: tag.id,
      onClick: () => toggleTag(tag.id),
      title: tag.blurb || tag.name,
      style: {
        fontFamily: 'inherit',
        fontSize: 11.5,
        padding: '3px 8px',
        borderRadius: 3,
        border: `1px solid ${active ? T.accent2 : T.rule}`,
        background: active ? T.tagBg : 'transparent',
        color: active ? T.accent2 : T.ink2,
        cursor: 'pointer'
      }
    }, tag.name);
  }))));
}
function Home({
  T,
  onPickCategory,
  navList,
  selectedIdx,
  setSelectedIdx,
  rowRefs
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      fontFamily: 'inherit',
      fontSize: 12,
      color: T.accent,
      lineHeight: 1.4,
      marginBottom: 24,
      whiteSpace: 'pre'
    }
  }, `$ cat README.md
# awesome-source
> a small, opinionated wiki of dev resources
> ${RESOURCES.length} entries across ${CATEGORIES.length} categories`), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      color: T.mute,
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.green
    }
  }, "$"), " ls categories/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "j"), "/", /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "k"), " to navigate \xB7 ", /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "\u21B5"), " to open \xB7 ", /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "/"), " to search")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${T.ruleSoft}`,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, CATEGORIES.map((c, i) => {
    const isSel = selectedIdx === i;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      ref: el => {
        rowRefs.current[`cat:${c.id}`] = el;
      },
      onClick: () => onPickCategory(c.id),
      onMouseEnter: () => setSelectedIdx(i),
      style: {
        all: 'unset',
        cursor: 'pointer',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '24px 22px 130px 1fr 100px 16px',
        alignItems: 'center',
        gap: 10,
        padding: '11px 16px',
        borderTop: i === 0 ? 'none' : `1px solid ${T.ruleSoft}`,
        background: isSel ? T.selBg : 'transparent',
        transition: 'background 0.1s'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: isSel ? T.accent : 'transparent',
        fontSize: 13
      }
    }, isSel ? '›' : ' '), /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.mute,
        fontSize: 11
      }
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accent,
        fontSize: 13
      }
    }, "./", c.id), /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.ink2,
        fontSize: 12
      }
    }, c.blurb), /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.mute,
        fontSize: 11,
        textAlign: 'right'
      }
    }, COUNTS[c.id] || 0, " ", COUNTS[c.id] === 1 ? 'file' : 'files'), /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.mute,
        fontSize: 12
      }
    }, "\u203A"));
  })));
}
function Results({
  T,
  view,
  resources,
  onClearCategory,
  navList,
  selectedIdx,
  setSelectedIdx,
  rowRefs
}) {
  const cat = view.kind === 'category' ? CATEGORIES.find(c => c.id === view.id) : null;
  return /*#__PURE__*/React.createElement("div", null, cat ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClearCategory,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      color: T.mute,
      fontFamily: 'inherit',
      fontSize: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.green
    }
  }, "$"), " cd .."), /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.accent,
      fontSize: 18,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute
    }
  }, "./"), cat.id), /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.ink2,
      fontSize: 13
    }
  }, cat.blurb)) : /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16,
      color: T.mute,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.green
    }
  }, "$"), " matches: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.accent
    }
  }, resources.length), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 14
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10
    }
  }, /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "j"), "/", /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "k"), " navigate \xB7 ", /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "\u21B5"), " open \xB7 ", /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "esc"), " clear")), resources.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 36,
      color: T.mute,
      textAlign: 'center',
      fontSize: 12
    }
  }, "// no results. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.accent
    }
  }, "0"), " entries match the current filter.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, resources.map((r, i) => {
    const isSel = selectedIdx === i;
    return /*#__PURE__*/React.createElement(ResRow, {
      key: r.id,
      T: T,
      r: r,
      index: i,
      showCat: !cat,
      isSel: isSel,
      onMouseEnter: () => setSelectedIdx(i),
      rowRef: el => {
        rowRefs.current[`res:${r.id}`] = el;
      }
    });
  })));
}
function ResRow({
  T,
  r,
  index,
  showCat,
  isSel,
  onMouseEnter,
  rowRef
}) {
  return /*#__PURE__*/React.createElement("a", {
    ref: rowRef,
    href: r.url || '#',
    target: r.url ? '_blank' : undefined,
    rel: r.url ? 'noopener noreferrer' : undefined,
    onMouseEnter: onMouseEnter,
    style: {
      display: 'grid',
      gridTemplateColumns: '18px 32px 1fr',
      gap: 10,
      alignItems: 'baseline',
      padding: '10px 12px',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      background: isSel ? T.selBg : 'transparent',
      borderRadius: 4,
      borderLeft: `2px solid ${isSel ? T.accent : 'transparent'}`,
      transition: 'background 0.08s, border-color 0.08s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: isSel ? T.accent : 'transparent',
      fontSize: 13
    }
  }, isSel ? '›' : ' '), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute,
      fontSize: 11
    }
  }, String(index + 1).padStart(3, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: T.ink,
      fontWeight: 500
    }
  }, r.title), showCat && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: T.accent
    }
  }, "\xB7", r.cat), r.source && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.mute
    }
  }, "@", String(r.source).toLowerCase().replace(/\s+/g, '-')), r.year ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.mute
    }
  }, ":", r.year) : null), r.blurb && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.ink2,
      marginTop: 3
    }
  }, r.blurb), (r.tags || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 6,
      flexWrap: 'wrap'
    }
  }, (r.tags || []).map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    title: TAG_BY_ID[t] && TAG_BY_ID[t].blurb || t,
    style: {
      fontSize: 10.5,
      color: T.accent2,
      padding: '1px 6px',
      borderRadius: 2,
      background: T.tagBg,
      border: `1px solid ${T.tagBorder}`
    }
  }, "[", t, "]")))));
}
function Status({
  T,
  count,
  view,
  query,
  cats,
  tags,
  onHelp
}) {
  const bits = [];
  if (view.kind === 'category') bits.push(`cat:${view.id}`);
  if (cats.size) bits.push(`+${cats.size} cat`);
  if (tags.size) bits.push(`+${tags.size} tag`);
  if (query) bits.push(`q:"${query}"`);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: `1px solid ${T.rule}`,
      background: T.bg2,
      padding: '6px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 11,
      color: T.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.green
    }
  }, "\u25CF"), " mit"), /*#__PURE__*/React.createElement("span", null, "@sirpalee"), /*#__PURE__*/React.createElement("button", {
    onClick: onHelp,
    style: {
      background: 'none',
      border: 'none',
      color: T.mute,
      fontFamily: 'inherit',
      fontSize: 11,
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, "?"), " shortcuts")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.accent
    }
  }, count), /*#__PURE__*/React.createElement("span", null, bits.length ? bits.join(' ') : 'no filters')));
}
function HelpOverlay({
  T,
  onClose
}) {
  const items = [['Search', [`${MOD}+K`, '/']], ['Move down', ['j', '↓']], ['Move up', ['k', '↑']], ['Open / enter', ['↵']], ['Go home', ['h']], ['Clear / back', ['Esc']], ['Toggle this help', ['?']]];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: T.bg2,
      border: `1px solid ${T.rule}`,
      borderRadius: 8,
      padding: '20px 24px',
      minWidth: 360,
      color: T.ink,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.accent,
      fontSize: 13
    }
  }, "$ man awesome-source"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: iconBtn(T)
  }, "\xD7")), /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("tbody", null, items.map(([label, keys]) => /*#__PURE__*/React.createElement("tr", {
    key: label
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 12px 6px 0',
      color: T.ink2,
      fontSize: 12.5
    }
  }, label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 0',
      textAlign: 'right'
    }
  }, keys.map((k, i) => /*#__PURE__*/React.createElement("span", {
    key: k
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.mute,
      margin: '0 6px',
      fontSize: 11
    }
  }, "or"), /*#__PURE__*/React.createElement(Kbd, {
    T: T
  }, k))))))))));
}
function Kbd({
  T,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      minWidth: 18,
      padding: '1px 5px',
      borderRadius: 3,
      border: `1px solid ${T.rule}`,
      color: T.ink,
      background: T.panel,
      fontSize: 10.5,
      fontFamily: 'inherit',
      textAlign: 'center',
      lineHeight: 1.4
    }
  }, children);
}
window.TerminalApp = TerminalApp;