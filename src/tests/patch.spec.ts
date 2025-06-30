import { test, expect } from '@playwright/test';
import testRoutes from '../../config/testRoutes.json';

const resources: { key: keyof typeof testRoutes; start: number }[] = [
    { key: 'comments', start: 27 },
    { key: 'albums', start: 36 },
    { key: 'photos', start: 45 },
    { key: 'todos', start: 54 },
    { key: 'users', start: 63 }
];

// TC-14 for posts
test('TC-14 PATCH /posts/1 partially updates post', async ({ request }) => {
    const response = await request.patch(`${testRoutes.posts.route}/1`, { data: { title: 'patched' } });
    await expect(response).toBeOK();
    const data = await response.json();
    expect(data.title).toBe('patched');
});

for (const { key, start } of resources) {
    const base = testRoutes[key].route;
    const example: Record<string, any> = testRoutes[key].example;
    const stringKey = Object.keys(example).find(k => typeof example[k] === 'string') || 'title';

    test(`TC-${start + 2} PATCH ${base}/1 partially updates ${key.slice(0, -1)}`, async ({ request }) => {
        const response = await request.patch(`${base}/1`, { data: { [stringKey]: 'patched' } });
        await expect(response).toBeOK();
        const data = await response.json();
        expect(data[stringKey]).toBe('patched');
    });
}