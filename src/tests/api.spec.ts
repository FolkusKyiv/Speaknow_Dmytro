import { test, expect } from '@playwright/test';
import testData from '../../config/testData.json';
import testRoutes from '../../config/testRoutes.json';
import { createPostAndVerify } from '../utils/apiUtils';


// Positive scenario: GET all posts
test('TC-01 GET /posts returns list of posts', async ({ request }) => {
    const response = await request.get(`${testRoutes.posts.route}`);
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
test('TC-02 POST /posts creates a new post', async ({ request }) => {
    const payload = { title: 'foo', body: 'bar', userId: 1 };
    await createPostAndVerify(request, payload);
});

// Data-driven POST using external file
for (const payload of testData) {
    test(`TC-03 POST /posts creates post for user ${payload.userId}`, async ({ request }) => {
        await createPostAndVerify(request, payload);
    });
}

// Negative scenario: invalid post id
test('TC-04 GET /posts/0 returns 404 for invalid id', async ({ request }) => {
    const response = await request.get(`${testRoutes.posts.route}/0`);
    expect(response.status()).toBe(404);
});

// Error handling: malformed JSON
test('TC-05 POST /posts with malformed json returns 400', async ({ request }) => {
    const response = await request.fetch(`${testRoutes.posts.route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: '{ "title": "foo" ' // missing closing brace
    });
    expect([500, 400]).toContain(response.status());
});

// Error handling: unsupported method
test('TC-06 DELETE /posts is not allowed', async ({ request }) => {
    const response = await request.delete(`${testRoutes.posts.route}`);
    expect([404, 405]).toContain(response.status());
});

// Edge case: large payload
test('TC-07 POST /posts with large payload', async ({ request }) => {
    const largeBody = 'x'.repeat(10000);
    const payload = { title: 'large', body: largeBody, userId: 1 };
    await createPostAndVerify(request, payload);
});

// Missing field in payload
test('TC-08 POST /posts with missing field returns error', async ({ request }) => {
    const payload = { title: 'foo' }; // body and userId omitted
    const response = await request.post(`${testRoutes.posts.route}`, { data: payload });
    expect([400, 422, 500]).toContain(response.status());
});

// Wrong content type
test('TC-09 POST /posts with wrong content type', async ({ request }) => {
    const response = await request.post(`${testRoutes.posts.route}`, {
        headers: { 'Content-Type': 'text/plain' },
        data: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
    });
    expect([400, 415, 500]).toContain(response.status());
});

// Verify retrieving a single post
test('TC-10 GET /posts/1 returns single post', async ({ request }) => {
    const response = await request.get(`${testRoutes.posts.route}/1`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
});

// Verify listing comments for a post
test('TC-11 GET /posts/1/comments returns comments for post', async ({ request }) => {
    const response = await request.get(`${testRoutes.posts.route}/1/comments`);
    await expect(response).toBeOK();
    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);
    expect(comments[0]).toHaveProperty('postId', 1);
});

// Verify filtering comments by postId
test('TC-12 GET /comments?postId=1 filters comments', async ({ request }) => {
    const response = await request.get(`${testRoutes.comments.route}?postId=1`);
    await expect(response).toBeOK();
    const comments = await response.json();
    expect(comments.every((c: { postId: number }) => c.postId === 1)).toBe(true);
});

// Verify full update of a post
test('TC-13 PUT /posts/1 updates post', async ({ request }) => {
    const payload = { id: 1, title: 'updated', body: 'updated', userId: 1 };
    const response = await request.put(`${testRoutes.posts.route}/1`, { data: payload });
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toMatchObject(payload);
});

// Verify partial update of a post
test('TC-14 PATCH /posts/1 partially updates post', async ({ request }) => {
    const response = await request.patch(`${testRoutes.posts.route}/1`, { data: { title: 'patched' } });
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data.title).toBe('patched');
});

// Verify deleting a post
test('TC-15 DELETE /posts/1 deletes post', async ({ request }) => {
    const response = await request.delete(`${testRoutes.posts.route}/1`);
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);
});

// Comments route tests
test('TC-16 GET /comments returns list of comments', async ({ request }) => {
    const response = await request.get(`${testRoutes.comments.route}`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
});

test('TC-17 GET /comments/1 returns single comment', async ({ request }) => {
    const response = await request.get(`${testRoutes.comments.route}/1`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
});

// Albums route tests
test('TC-18 GET /albums returns list of albums', async ({ request }) => {
    const response = await request.get(`${testRoutes.albums.route}`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
});

test('TC-19 GET /albums/1 returns single album', async ({ request }) => {
    const response = await request.get(`${testRoutes.albums.route}/1`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
});

// Photos route tests
test('TC-20 GET /photos returns list of photos', async ({ request }) => {
    const response = await request.get(`${testRoutes.photos.route}`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
});

test('TC-21 GET /photos/1 returns single photo', async ({ request }) => {
    const response = await request.get(`${testRoutes.photos.route}/1`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
});

// Todos route tests
test('TC-22 GET /todos returns list of todos', async ({ request }) => {
    const response = await request.get(`${testRoutes.todos.route}`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
});

test('TC-23 GET /todos/1 returns single todo', async ({ request }) => {
    const response = await request.get(`${testRoutes.todos.route}/1`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
});

// Users route tests
test('TC-24 GET /users returns list of users', async ({ request }) => {
    const response = await request.get(`${testRoutes.users.route}`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
});

test('TC-25 GET /users/1 returns single user', async ({ request }) => {
    const response = await request.get(`${testRoutes.users.route}/1`);
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
});

// Negative scenario: binary data should not be accepted
test('TC-26 POST /posts with binary data returns error', async ({ request }) => {
    const response = await request.post(`${testRoutes.posts.route}`, {
        headers: { 'Content-Type': 'application/octet-stream' },
        data: Buffer.from([0x89, 0x50, 0x4E, 0x47])
    });
    expect([400, 415, 500]).toContain(response.status());
});

// Additional CRUD and edge case tests for other routes
const resources = ['comments', 'albums', 'photos', 'todos', 'users'] as const;
let tc = 26;

for (const resource of resources) {
    const base = testRoutes[resource].route;
    const example: Record<string, any> = testRoutes[resource].example;
    const name = resource.slice(0, -1);
    const stringKey = Object.keys(example).find(k => typeof example[k] === 'string') || 'title';

    // Create
    test(`TC-${tc++} POST ${base} creates new ${name}`, async ({ request }) => {
        const response = await request.post(base, { data: example });
        await expect(response).toBeOK();
        const data = await response.json();
        const { id, ...rest } = example;
        expect(data).toMatchObject(rest);
        expect(data).toHaveProperty('id');
    });

    // Update via PUT
    test(`TC-${tc++} PUT ${base}/1 updates ${name}`, async ({ request }) => {
        const payload = { ...example, id: 1 };
        const response = await request.put(`${base}/1`, { data: payload });
        await expect(response).toBeOK();
        const data = await response.json();
        expect(data).toMatchObject(payload);
    });

    // Partial update via PATCH
    test(`TC-${tc++} PATCH ${base}/1 partially updates ${name}`, async ({ request }) => {
        const response = await request.patch(`${base}/1`, { data: { [stringKey]: 'patched' } });
        await expect(response).toBeOK();
        const data = await response.json();
        expect(data[stringKey]).toBe('patched');
    });

    // Delete resource
    test(`TC-${tc++} DELETE ${base}/1 deletes ${name}`, async ({ request }) => {
        const response = await request.delete(`${base}/1`);
        expect(response.status()).toBeGreaterThanOrEqual(200);
        expect(response.status()).toBeLessThan(300);
    });

    // Invalid id
    test(`TC-${tc++} GET ${base}/0 returns 404`, async ({ request }) => {
        const response = await request.get(`${base}/0`);
        expect(response.status()).toBe(404);
    });

    // Malformed JSON
    test(`TC-${tc++} POST ${base} with malformed json returns error`, async ({ request }) => {
        const response = await request.fetch(base, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: '{ "foo": "bar" '
        });
        expect([400, 500]).toContain(response.status());
    });

    // Large payload handling
    test(`TC-${tc++} POST ${base} with large payload`, async ({ request }) => {
        const largeString = 'x'.repeat(10000);
        const payload = { ...example, [stringKey]: largeString };
        const response = await request.post(base, { data: payload });
        await expect(response).toBeOK();
        const data = await response.json();
        expect(data[stringKey]).toBe(largeString);
    });

    // Missing required fields
    test(`TC-${tc++} POST ${base} missing fields returns error`, async ({ request }) => {
        const omitKey = Object.keys(example)[0];
        const payload = { ...example } as Record<string, any>;
        delete payload[omitKey];
        const response = await request.post(base, { data: payload });
        expect([400, 422, 500]).toContain(response.status());
    });

    // Wrong content type
    test(`TC-${tc++} POST ${base} wrong content type`, async ({ request }) => {
        const response = await request.post(base, {
            headers: { 'Content-Type': 'text/plain' },
            data: JSON.stringify(example)
        });
        expect([400, 415, 500]).toContain(response.status());
    });
}