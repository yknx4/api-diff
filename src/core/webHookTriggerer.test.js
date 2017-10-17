import webHookTriggerer from './webHookTriggerer';

const mockRequest = jest.fn();
mockRequest.mockReturnValueOnce(
  Promise.resolve({
    statusCode: 200,
    body: 'Ok'
  })
);
mockRequest.mockReturnValue(Promise.reject(new Error('Test error')));
jest.mock('request-promise-native', () => obj => mockRequest(obj));

describe('web hook triggerer', () => {
  it('should send a request', async () => {
    const response = await webHookTriggerer({
      primaryResponse: { a: 'a' },
      candidateResponse: { a: '1' },
      diff: { a: 'diff' },
      req: { query: {}, params: {}, headers: { a: 'b' }, originalUrl: '/' }
    });
    expect(response).toEqual('webhook sent');
  });
  it('should catch an error send a request', async () => {
    const response = await webHookTriggerer({
      primaryResponse: { a: 'a' },
      candidateResponse: { a: '1' },
      diff: { a: 'diff' },
      req: { query: {}, params: {}, headers: { a: 'b' }, originalUrl: '/' }
    });
    expect(response).toEqual(expect.any(Error));
  });
});
