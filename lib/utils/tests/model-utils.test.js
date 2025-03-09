import { describe, it, expect } from 'vitest';
import { detectChanges, fromList } from '../model-utils.js';

describe('detectChanges', () => {
  it('should detect not thing changes', () => {
    expect(detectChanges({}, {})).toBe(null);
  });

  it('should detect one field of object changed', () => {
    expect(detectChanges({ testkey: 0 }, { testkey: 1 })).toMatchObject({ testkey: 1 });
  });

  it('should detect null changes because next object has another keys', () => {
    expect(detectChanges({ testkey: 0 }, { testfield: 1 })).toBe(null);
  });

  it('should only one changes because next object has another keys', () => {
    expect(detectChanges({ testkey: 0 }, { testkey: 1, testfield: 1 })).toMatchObject({ testkey: 1 });
  });
});

describe('fromList', () => {
  it('should convert default list to list of Objects', () => {
    expect(fromList([])).toEqual([]);
  });
});
