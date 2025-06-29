import { APIRequestContext, expect } from '@playwright/test';
import testRoutes from '../../config/testRoutes.json';

export async function createPostAndVerify(request: APIRequestContext, payload: unknown) {
    const response = await request.post(testRoutes.posts.route, { data: payload });
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(body).toMatchObject(payload as Record<string, unknown>);
    return body;
}