import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import testRoutes from '../../config/testRoutes.json';

export async function createPostAndVerify(request: APIRequestContext, payload: unknown) {
    const response = await request.post(testRoutes.posts.route, { data: payload });
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(body).toMatchObject(payload as Record<string, unknown>);
    return body;
}

export async function getJSON(request: APIRequestContext, url: string) {
    const response = await request.get(url);
    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toContain('application/json');
    return response.json();
}

export async function deleteAndExpectSuccess(request: APIRequestContext, url: string) {
    const response = await request.delete(url);
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);
}

export async function createResource(
    request: APIRequestContext,
    url: string,
    payload: Record<string, unknown>
): Promise<APIResponse> {
    const response = await request.post(url, { data: payload });
    await expect(response).toBeOK();
    return response;
}