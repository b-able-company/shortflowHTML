// Shared design tokens. All variations read from here so the Tweaks panel
// can recolor everything by rewriting TOKENS via useTweaks.

const BASE_TOKENS = {
  // typography
  sans: '"Geist", "Pretendard", -apple-system, system-ui, sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, Menlo, monospace',

  // neutrals — warm-cool gray, near-black fg
  bg: '#FFFFFF',          // page background — pure white
  surface: '#FFFFFF',
  surfaceAlt: '#FAFAF7',
  ink: '#0F1115',         // primary fg
  inkMute: '#5C6068',
  inkFaint: '#9CA0A6',
  line: '#E7E5DF',
  lineStrong: '#D4D2CB',

  // highlight — the blue "받을 금액" box
  hi: '#E8EFFE',
  hiInk: '#1D3FA8',
  hiAccent: '#2E5BFF',

  // RS / MG semantics
  rsTint: '#E3EEFB',
  rsInk: '#1856A3',
  mgTint: '#E6F4E8',
  mgInk: '#176935',

  // status
  paid: '#176935',
  paidTint: '#E6F4E8',
  upcoming: '#8A6100',
  upcomingTint: '#FCF2D4',
};

// Poster placeholder tones
const POSTER_TONES = {
  rose:   { bg: '#F7E3E4', ink: '#8B3A3F' },
  indigo: { bg: '#DDE1F3', ink: '#3A4185' },
  teal:   { bg: '#D7ECE8', ink: '#265F55' },
  amber:  { bg: '#F5E7C9', ink: '#7A5A15' },
  slate:  { bg: '#E2E4EA', ink: '#3E4552' },
};

Object.assign(window, { BASE_TOKENS, POSTER_TONES });
