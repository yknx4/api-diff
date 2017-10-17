import request from 'supertest';
import app from './app';

const mockSemanticDiff = jest.fn();
mockSemanticDiff.mockReturnValueOnce(null).mockReturnValue({});
jest.mock('./core/semanticDiff', () => () => mockSemanticDiff());
const mockWebHookTriggerer = jest.fn();
jest.mock('./core/webHookTriggerer', () => (...args) =>
  mockWebHookTriggerer(...args)
);
jest.mock('./core/forwardRequest', () => (url, req, res, key) => {
  if (key) {
    res.sendStatus(200);
    return {};
  }
  return {};
});

describe('Main app file', () => {
  it('no diff', async () => {
    await request(app)
      .get('/')
      .expect(200);
  });
  it('yes diff', async () => {
    await request(app)
      .get('/')
      .expect(200);
    expect(mockWebHookTriggerer).toHaveBeenCalledTimes(1);
  });
});
