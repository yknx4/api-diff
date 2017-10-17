import semanticDiff from './semanticDiff';

describe('semanticDiff', () => {
  it('should return undefined', async () => {
    const result = semanticDiff(
      {
        headers: { a: 1 },
        body: { a: 1 }
      },
      {
        headers: { a: 1 },
        body: { a: 1 }
      },
      {
        headers: { a: 1 },
        body: { a: 1 }
      }
    );
    expect(result).toEqual(undefined);
  });
  it('should return a diff', async () => {
    const result = semanticDiff(
      {
        headers: { a: 1, b: 1 },
        body: { a: 1, b: 1 }
      },
      {
        headers: { a: 2, b: 1 },
        body: { a: 2, b: 1 }
      },
      {
        headers: { a: 1, b: 1 },
        body: { a: 1, b: 2 }
      }
    );
    expect(result).toEqual({ body: { b: { __new: 2, __old: 1 } } });
  });
});
