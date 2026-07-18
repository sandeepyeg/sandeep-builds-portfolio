import { describe, it, expect } from 'vitest';
import { PROJECT_STATUS_LABEL } from './portfolio.models';

describe('Portfolio Models', () => {
  describe('PROJECT_STATUS_LABEL', () => {
    it('maps all three statuses', () => {
      expect(PROJECT_STATUS_LABEL.published).toBe('Published');
      expect(PROJECT_STATUS_LABEL['in-development']).toBe('In Development');
      expect(PROJECT_STATUS_LABEL.planned).toBe('Planned');
    });
  });
});
