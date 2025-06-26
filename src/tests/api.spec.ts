import { test, expect } from '@playwright/test';
import testData from '../../config/testData.json';
import { createPostAndVerify } from '../utils/apiUtils';


// Positive scenario: GET all posts
test('GET /posts returns list of posts', async ({ request }) => {
    const response = await request.get(`/posts`);
    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toContain('application/json');
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('userId');
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('body');
});

// Positive scenario: POST create new post
test('POST /posts creates a new post', async ({ request }) => {
    const payload = { title: 'foo', body: 'bar', userId: 1 };
    await createPostAndVerify(request, payload);
});

// Data-driven POST using external file
for (const payload of testData) {
    test(`POST /posts creates post for user ${payload.userId}`, async ({ request }) => {
        await createPostAndVerify(request, payload);
    });
}

// Negative scenario: invalid post id
test('GET /posts/0 returns 404 for invalid id', async ({ request }) => {
    const response = await request.get(`/posts/0`);
    expect(response.status()).toBe(404);
});

// Error handling: malformed JSON
test('POST /posts with malformed json returns 400', async ({ request }) => {
    const response = await request.fetch(`/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: '{ "title": "foo" ' // missing closing brace
    });
    expect([500, 400]).toContain(response.status());
});

// Error handling: unsupported method
test('DELETE /posts is not allowed', async ({ request }) => {
    const response = await request.delete(`/posts`);
    expect([404, 405]).toContain(response.status());
});

// Edge case: large payload
test('POST /posts with large payload', async ({ request }) => {
    const largeBody = 'x'.repeat(10000);
    const payload = { title: 'large', body: largeBody, userId: 1 };
    await createPostAndVerify(request, payload);
});
