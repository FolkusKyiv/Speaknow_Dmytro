import { test, expect } from '@playwright/test';
import testRoutes from '../../config/testRoutes.json';
import { deleteAndExpectSuccess } from '../utils/apiUtils';

const resources: { key: keyof typeof testRoutes; start: number }[] = [
    { key: 'comments', start: 27 },
    { key: 'albums', start: 36 },
    { key: 'photos', start: 45 },
    { key: 'todos', start: 54 },
    { key: 'users', start: 63 }
];

// TC-06
test('TC-06 DELETE /posts is not allowed', async ({ request }) => {
    const response = await request.delete(testRoutes.posts.route);
    expect([404, 405]).toContain(response.status());
});

// TC-15
test('TC-15 DELETE /posts/1 deletes post', async ({ request }) => {
    await deleteAndExpectSuccess(request, `${testRoutes.posts.route}/1`);
});

for (const { key, start } of resources) {
    const base = testRoutes[key].route;

    test(`TC-${start + 3} DELETE ${base}/1 deletes ${key.slice(0, -1)}`, async ({ request }) => {
        await deleteAndExpectSuccess(request, `${base}/1`);
    });
}