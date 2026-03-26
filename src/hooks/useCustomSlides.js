import { useState, useCallback } from 'react';
import { loadSlides, saveSlides, generateId } from '../utils/slideStorage';

export function useCustomSlides() {
  const [slides, setSlides] = useState(() => loadSlides());

  const persist = useCallback((newSlides) => {
    saveSlides(newSlides);
    setSlides(newSlides);
  }, []);

  const addSlide = useCallback((slideData) => {
    const newSlide = {
      ...slideData,
      id: generateId('cs'),
      createdAt: Date.now(),
    };
    persist([...slides, newSlide]);
    return newSlide.id;
  }, [slides, persist]);

  const updateSlide = useCallback((id, updates) => {
    persist(slides.map(s => s.id === id ? { ...s, ...updates } : s));
    return id;
  }, [slides, persist]);

  const deleteSlide = useCallback((id) => {
    persist(slides.filter(s => s.id !== id));
  }, [slides, persist]);

  const getSlide = useCallback((id) => {
    return slides.find(s => s.id === id) ?? null;
  }, [slides]);

  return { slides, addSlide, updateSlide, deleteSlide, getSlide };
}
