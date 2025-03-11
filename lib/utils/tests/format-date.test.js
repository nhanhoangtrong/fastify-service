import { describe, expect, it } from 'vitest';
import { formatVNDay } from '../format-date';

it('should convert to formatted vn-day', () => {
  expect(typeof formatVNDay()).toBe('string');
});

it('should convert expected day to match format string', () => {
  const expectedDay = '2022-04-15T09:25:39.699Z';
  const expectedString = '16:25:39 15/4/2022';
  expect(formatVNDay(new Date(expectedDay))).toBe(expectedString);
});
