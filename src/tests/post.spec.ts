import { test, expect } from '@playwright/test';
import testData from '../../config/testData.json';
import testRoutes from '../../config/testRoutes.json';
import { createPostAndVerify, createResource } from '../utils/apiUtils';

// TC-02
test('TC-02 POST /posts creates a new post', async ({ request }) => {
    const payload = { title: 'foo', body: 'bar', userId: 1 };
    await createPostAndVerify(request, payload);
});

// TC-03
for (const payload of testData) {
    test(`TC-03 POST /posts creates post for user ${payload.userId}`, async ({ request }) => {
        await createPostAndVerify(request, payload);
    });
}

// TC-05
test('TC-05 POST /posts with malformed json returns error', async ({ request }) => {
    const response = await request.fetch(testRoutes.posts.route, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: '{ "title": "foo" '
    });
    expect([500, 400]).toContain(response.status());
});

// TC-07
test('TC-07 POST /posts with large payload', async ({ request }) => {
    const largeBody = 'x'.repeat(10000);
    const payload = { title: 'large', body: largeBody, userId: 1 };
    await createPostAndVerify(request, payload);
});

// TC-08
test('TC-08 POST /posts with missing field returns error', async ({ request }) => {
    const payload = { title: 'foo' };
    const response = await request.post(testRoutes.posts.route, { data: payload });
    expect([400, 422, 500]).toContain(response.status());
});

// TC-09
test('TC-09 POST /posts with wrong content type returns error', async ({ request }) => {
    const response = await request.post(testRoutes.posts.route, {
        headers: { 'Content-Type': 'text/plain' },
        data: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
    });
    expect([400, 415, 500]).toContain(response.status());
});

// TC-26
test('TC-26 POST /posts with binary data returns error', async ({ request }) => {
    const response = await request.post(testRoutes.posts.route, {
        headers: { 'Content-Type': 'application/octet-stream' },
        data: Buffer.from([0x89, 0x50, 0x4e, 0x47])
    });
    expect([400, 415, 500]).toContain(response.status());
});

// Additional POST cases for other resources
const postResources: { key: keyof typeof testRoutes; start: number }[] = [
    { key: 'comments', start: 27 },
    { key: 'albums', start: 36 },
    { key: 'photos', start: 45 },
    { key: 'todos', start: 54 },
    { key: 'users', start: 63 }
];

for (const { key, start } of postResources) {
    const base = testRoutes[key].route;
    const example: Record<string, any> = testRoutes[key].example;
    const name = key.slice(0, -1);
    const stringKey = Object.keys(example).find(k => typeof example[k] === 'string') || 'title';

    test(`TC-${start} POST ${base} creates new ${name}`, async ({ request }) => {
        const response = await createResource(request, base, example);
        const data = await response.json();
        const { id, ...rest } = example;
        expect(data).toMatchObject(rest);
        expect(data).toHaveProperty('id');
    });

    test(`TC-${start + 5} POST ${base} with malformed json returns error`, async ({ request }) => {
        const response = await request.fetch(base, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: '{ "foo": "bar" '
        });
        expect([400, 500]).toContain(response.status());
    });

    test(`TC-${start + 6} POST ${base} with large payload`, async ({ request }) => {
        const largeString = 'x'.repeat(10000);
        const payload = { ...example, [stringKey]: largeString };
        const response = await createResource(request, base, payload);
        const data = await response.json();
        expect(data[stringKey]).toBe(largeString);
    });

    test(`TC-${start + 7} POST ${base} missing fields returns error`, async ({ request }) => {
        const omitKey = Object.keys(example)[0];
        const payload = { ...example } as Record<string, any>;
        delete payload[omitKey];
        const response = await request.post(base, { data: payload });
        expect([400, 422, 500]).toContain(response.status());
    });

    test(`TC-${start + 8} POST ${base} wrong content type`, async ({ request }) => {
        const response = await request.post(base, {
            headers: { 'Content-Type': 'text/plain' },
            data: JSON.stringify(example)
        });
        expect([400, 415, 500]).toContain(response.status());
    });
}
