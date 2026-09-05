import { describe, it, expect } from 'vitest';
import { photos } from '../src/content/gallery';
describe('gallery data', () => {
  it('every photo has positive dimensions, alt text, and a public path', () => {
    expect(photos.length).toBeGreaterThan(0);
    for (const p of photos){
      expect(p.width).toBeGreaterThan(0);
      expect(p.height).toBeGreaterThan(0);
      expect(p.alt.trim().length).toBeGreaterThan(0);
      expect(p.src.startsWith('/')).toBe(true);
    }
  });
});
