// Simple line icons (24×24, stroke = currentColor). Decorative identifiers for each policy island.
export const ISLAND_ICONS = {
  civil: '<path d="M3 20h18M5 20V10M9 20V10M15 20V10M19 20V10M3 10l9-6 9 6z"/>',
  institute: '<path d="M4 18h16M6 18v-4a6 6 0 0112 0v4M12 8V4M10 4h4"/><circle cx="12" cy="13" r="1.5"/>',
  renewal: '<path d="M5 21V4h12M5 7l12-3M17 4v6M15 10h4v3h-4zM3 21h10M8 21v-6h4v6"/>',
  transport: '<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M4 11h16M8 19v-3M16 19v-3"/><circle cx="8" cy="19" r="1"/><circle cx="16" cy="19" r="1"/>',
  education: '<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c3 2 7 2 10 0v-5"/>',
  lunch: '<path d="M4 12h16a8 8 0 01-16 0zM9 5c0 2 2 2 2 4M13 5c0 2 2 2 2 4"/>',
  family: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M12 17s-3-1.8-3-3.6a1.6 1.6 0 013-.7 1.6 1.6 0 013 .7c0 1.8-3 3.6-3 3.6z"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
  welfare: '<path d="M12 20s-7-4.3-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.7-7 9-7 9z"/>',
  sport: '<circle cx="12" cy="12" r="8"/><path d="M12 8l3 2-1 4h-4l-1-4zM12 4v4M20 11l-5-1M17 19l-3-5M7 19l3-5M4 11l5-1"/>',
  trails: '<path d="M3 20l6-10 4 6 3-4 5 8z"/><path d="M8 20l2-4"/>',
  forest: '<path d="M12 3l6 9h-4l4 6H6l4-6H6z"/><path d="M12 18v3"/>',
  youth: '<path d="M12 3l2.2 5.5L20 9l-4.5 3.8L17 19l-5-3-5 3 1.5-6.2L4 9l5.8-.5z"/>',
  hakka: '<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C10 6 10.5 3.5 12 3c1.5.5 2 3 0 6.8M14.1 11.3c3.3-2.7 5.8-2.6 6.3-1.1-.4 1.5-2.9 2.6-6.3 1.6M13.3 14c1.5 3.9 1 6.3-.5 6.8-1.3-.8-1.7-3.3.2-6.6M10.7 14c-1.5 3.9-1 6.3.5 6.8 1.3-.8 1.7-3.3-.2-6.6M9.9 11.3C6.6 8.6 4.1 8.7 3.6 10.2c.4 1.5 2.9 2.6 6.3 1.6"/>',
  diplomacy: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>',
};
export const HEART_COLORS = { H: "#4d8b55", E: "#2e6b68", A: "#d97706", R: "#7a5ea8", T: "#e26d2d" };
export function icon(id, cls = "") {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ISLAND_ICONS[id] || '<circle cx="12" cy="12" r="6"/>'}</svg>`;
}
