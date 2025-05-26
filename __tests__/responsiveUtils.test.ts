import {
  widthPercent,
  heightPercent,
  scaledFontSize,
} from '../src/utils/responsive';

describe('Responsive Utilities', () => {
  it('should calculate width percent correctly', () => {
    const result = widthPercent(50);
    expect(typeof result).toBe('number');
  });

  it('should calculate height percent correctly', () => {
    const result = heightPercent(50);
    expect(typeof result).toBe('number');
  });

  it('should scale font size properly', () => {
    const result = scaledFontSize(16);
    expect(typeof result).toBe('number');
  });
});