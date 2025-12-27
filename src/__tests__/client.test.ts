import { Shipmozo } from '../client';
import { ShipmozoError } from '../errors';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Shipmozo Client', () => {
  let mock: MockAdapter;
  const config = {
    publicKey: 'test-public-key',
    privateKey: 'test-private-key'
  };

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('should throw error if publicKey is missing', () => {
    expect(() => new Shipmozo({ publicKey: '', privateKey: 'pk' }))
      .toThrow(ShipmozoError);
  });

  test('info() should return success data', async () => {
    const client = new Shipmozo(config);
    const mockResponse = {
      result: "1",
      message: "Success",
      data: { Info: "Hello World" }
    };

    mock.onGet('https://shipping-api.com/app/api/v1/info').reply(200, mockResponse);

    const response = await client.info();
    expect(response.result).toBe("1");
    expect(response.data.Info).toBe("Hello World");
  });

  test('should throw ShipmozoError when result is "0"', async () => {
    const client = new Shipmozo(config);
    const mockResponse = {
      result: "0",
      message: "Invalid Key",
      data: {}
    };

    mock.onGet('https://shipping-api.com/app/api/v1/info').reply(200, mockResponse);

    await expect(client.info()).rejects.toThrow(ShipmozoError);
    await expect(client.info()).rejects.toThrow("Invalid Key");
  });

  test('should throw ShipmozoError on 500 error', async () => {
    const client = new Shipmozo(config);

    mock.onGet('https://shipping-api.com/app/api/v1/info').reply(500);

    await expect(client.info()).rejects.toThrow(ShipmozoError);
  });
});
