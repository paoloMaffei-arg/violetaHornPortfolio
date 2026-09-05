import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl } from '../src/lib/whatsapp';
describe('buildWhatsAppUrl', () => {
  it('builds a wa.me url with encoded message', () => {
    expect(buildWhatsAppUrl('5493442571976','Hola Violeta'))
      .toBe('https://wa.me/5493442571976?text=Hola%20Violeta');
  });
  it('omits text when message is empty', () => {
    expect(buildWhatsAppUrl('5493442571976')).toBe('https://wa.me/5493442571976');
  });
});
