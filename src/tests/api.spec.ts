import { test, expect, request } from '@playwright/test';

test('Valid GET Request for Posts', async ({ request }) => {
    // Send a GET request to the JSONPlaceholder API
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    // Assert that the status is 200 (OK)
    expect(response.status()).toBe(200);

    // Parse the response body as JSON
    const data = await response.json();

    // Assert that the response is an array of posts
    expect(Array.isArray(data)).toBe(true);

    // Assert that the first post has required properties
    expect(data[0]).toHaveProperty('userId');
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('body');
});