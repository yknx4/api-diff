import forwardRequest from './forwardRequest';

const mockRequest = jest.fn();
mockRequest.mockReturnValueOnce(
  Promise.resolve({
    headers: {
      'content-type': 'application/json;'
    },
    statusCode: 200,
    body: JSON.stringify({ a: 'b' })
  })
);
mockRequest.mockReturnValueOnce(
  Promise.resolve({
    headers: {
      'content-type': 'text/html'
    },
    statusCode: 200,
    body: 'hello world'
  })
);
mockRequest.mockReturnValueOnce(
  Promise.resolve({
    headers: {
      'content-type': 'text/html'
    },
    statusCode: 200,
    body: 'hello world'
  })
);
mockRequest.mockReturnValueOnce(Promise.reject(new Error('test Error')));
jest.mock('request-promise-native', () => obj => mockRequest(obj));

describe('forwardRequest', () => {
  it('must forward and return response JSON', async () => {
    const send = jest.fn();
    const response = await forwardRequest(
      'nowhere',
      { method: 'get', headers: { a: 'b' } },
      { set: jest.fn(), status: jest.fn(), send },
      true
    );
    expect(send).toHaveBeenCalled();
    expect(response).toEqual({
      body: { a: 'b' },
      headers: { 'content-type': 'application/json;', statusCode: 200 }
    });
  });
  it('must forward and return response TEXT', async () => {
    const send = jest.fn();
    const response = await forwardRequest(
      'nowhere',
      { method: 'get', headers: { a: 'b' } },
      { set: jest.fn(), status: jest.fn(), send },
      true
    );
    expect(send).toHaveBeenCalled();
    expect(response).toEqual({
      body: 'hello world',
      headers: { 'content-type': 'text/html', statusCode: 200 }
    });
  });
  it('must forward and not call send', async () => {
    const send = jest.fn();
    const response = await forwardRequest(
      'nowhere',
      { method: 'get', headers: { a: 'b' } },
      { set: jest.fn(), status: jest.fn(), send },
      false
    );
    expect(send).not.toHaveBeenCalled();
    expect(response).toEqual({
      body: 'hello world',
      headers: { 'content-type': 'text/html', statusCode: 200 }
    });
  });
  it('must return error', async () => {
    const response = await forwardRequest(
      'nowhere',
      { method: 'get', headers: { a: 'b' } },
      { set: jest.fn(), status: jest.fn(), send: jest.fn() },
      true
    );
    expect(response).toEqual(expect.any(Error));
  });
});
