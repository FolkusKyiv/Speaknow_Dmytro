import { test, expect } from '@playwright/test';
import testRoutes from '../../config/testRoutes.json';

const resources: { key: keyof typeof testRoutes; start: number }[] = [
    { key: 'comments', start: 27 },
    { key: 'albums', start: 36 },
    { key: 'photos', start: 45 },
    { key: 'todos', start: 54 },
    { key: 'users', start: 63 }
];

// TC-13 for posts
test('TC-13 PUT /posts/1 updates post', async ({ request }) => {
    const payload = { id: 1, title: 'updated', body: 'updated', userId: 1 };
    const response = await request.put(`${testRoutes.posts.route}/1`, { data: payload });
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data).toMatchObject(payload);
});

for (const { key, start } of resources) {
    const base = testRoutes[key].route;
    const example: Record<string, any> = testRoutes[key].example;

    test(`TC-${start + 1} PUT ${base}/1 updates ${key.slice(0, -1)}`, async ({ request }) => {
        const payload = { ...example, id: 1 };
        const response = await request.put(`${base}/1`, { data: payload });
        await expect(response).toBeOK();
        const data = await response.json();
        expect(data).toMatchObject(payload);
    });
}