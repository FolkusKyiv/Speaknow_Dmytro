import { APIRequestContext, expect } from '@playwright/test';

export async function createPostAndVerify(request: APIRequestContext, payload: unknown) {
    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(body).toMatchObject(payload as Record<string, unknown>);
    return body;
}