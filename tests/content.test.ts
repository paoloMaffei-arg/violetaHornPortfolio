import { describe, it, expect } from 'vitest';
import es from '../messages/es.json';
import en from '../messages/en.json';
function keys(o:Record<string,unknown>,p=''):string[]{
  return Object.entries(o).flatMap(([k,v])=>{
    const key=p?`${p}.${k}`:k;
    return v&&typeof v==='object'&&!Array.isArray(v)?keys(v as Record<string,unknown>,key):[key];
  });
}
describe('i18n messages', () => {
  it('es and en have identical key sets', () => {
    expect(keys(es as any).sort()).toEqual(keys(en as any).sort());
  });
  it('no empty strings', () => {
    const flat=(o:any):string[]=>Object.values(o).flatMap(v=>typeof v==='string'?[v]:v&&typeof v==='object'?flat(v):[]);
    expect(flat(es).every(s=>s.trim().length>0)).toBe(true);
    expect(flat(en).every(s=>s.trim().length>0)).toBe(true);
  });
});
