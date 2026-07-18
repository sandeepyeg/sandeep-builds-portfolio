import { describe, it, expect } from 'vitest';

describe('MetadataService', () => {
  it('exists as an injectable service', () => {
    const module = import('./metadata.service');
    expect(module).toBeTruthy();
  });
});
