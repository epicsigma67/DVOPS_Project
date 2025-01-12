const fs = require('fs');  // Import fs here
const request = require('supertest');
const app = require('../index');  // Import the app for testing

// Global mocking of fs.writeFileSync
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => JSON.stringify([])), // Mock to return an empty array
  writeFileSync: jest.fn(() => null), // Mock to prevent actual file writes
}));

describe('POST /api/post', () => {

  // Test Case 1: Add a new product successfully
  it('should successfully add a new product', async () => {
    const newItem = {
      name: 'Laptop',
      price: 999,
      description: 'High-performance laptop',
    };

    const res = await request(app)
      .post('/api/post')  // Updated route to /api/post
      .send(newItem);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Item posted successfully');
    expect(res.body.item.name).toBe('Laptop');
    expect(res.body.item.price).toBe(999);
  });

  // Test Case 2: Return error if product data is incomplete
  it('should return error if product data is incomplete', async () => {
    const invalidItem = {
      price: 999,  // Missing name and description
    };

    const res = await request(app)
      .post('/api/post')  // Updated route to /api/post
      .send(invalidItem);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Both name and description are required');
  });

  // Test Case 3: Return 500 if there is a server error while saving the data
  it('should return 500 if there is a server error while saving the data', async () => {
    // Simulate a failure in fs.writeFileSync
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => {
      throw new Error('Write file error');
    });

    const newItem = {
      name: 'Phone',
      price: 699,
      description: 'Latest smartphone',
    };

    const res = await request(app)
      .post('/api/post')  // Updated route to /api/post
      .send(newItem);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Internal Server Error: Unable to post item');

    // Clean up the mock after the test
    writeFileSyncMock.mockRestore();
  });

  // Test Case 4: Prevent uploading product with invalid data (e.g., price as a string)
  it('should return an error if price is invalid (string instead of number)', async () => {
    const invalidItem = {
      name: 'Smart Watch',
      price: 'not_a_number',  // Invalid price (string instead of number)
      description: 'A smart watch with fitness features',
    };

    const res = await request(app)
      .post('/api/post')  // Updated route to /api/post
      .send(invalidItem);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Price must be a valid number');
  });

  // Test Case 5: Return 400 if price is missing
  it('should return 400 if price is missing', async () => {
    const invalidItem = {
      name: 'Smart Watch',
      description: 'A smart watch with fitness features',
    };

    const res = await request(app)
      .post('/api/post')  // Updated route to /api/post
      .send(invalidItem);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Price must be a valid number');
  });

});
