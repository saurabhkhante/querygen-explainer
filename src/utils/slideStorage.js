const STORAGE_KEY = 'querygen_custom_slides';

export function loadSlides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSlides(slides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
