import fishBrain from './fishBrain';

describe('fishbrain', () => {
  it('should have no results', () => {
    expect(fishBrain.get()).toEqual({
      paginatedItems: [],
      pagination: { itemsByPage: 10, page: 1, totalItems: 0, totalPages: 0 },
      total_requests: 0
    });
  });
  it('should have 1 result', () => {
    fishBrain.set({ test: true }, { a: true, b: 'b', c: 3 });
    expect(fishBrain.get()).toEqual({
      paginatedItems: [
        {
          diff: {
            test: true
          },
          keys: {
            a: true,
            b: 'b',
            c: 3,
            timeStamp: expect.any(Date)
          }
        }
      ],
      pagination: { itemsByPage: 10, page: 1, totalItems: 1, totalPages: 1 },
      total_requests: 1
    });
  });
});
