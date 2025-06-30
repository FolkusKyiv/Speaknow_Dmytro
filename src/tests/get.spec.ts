import { test, expect } from '@playwright/test';
import testRoutes from '../../config/testRoutes.json';
import { getJSON } from '../utils/apiUtils';

// TC-01
test('TC-01 GET /posts returns list of posts', async ({ request }) => {
    const data = await getJSON(request, testRoutes.posts.route);
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('userId');
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('body');
});

// TC-04
test('TC-04 GET /posts/0 returns 404 for invalid id', async ({ request }) => {
    const response = await request.get(`${testRoutes.posts.route}/0`);
    expect(response.status()).toBe(404);
});

// TC-10
test('TC-10 GET /posts/1 returns single post', async ({ request }) => {
    const data = await getJSON(request, `${testRoutes.posts.route}/1`);
    expect(data).toHaveProperty('id', 1);
});

// TC-11
test('TC-11 GET /posts/1/comments returns comments for post', async ({ request }) => {
    const comments = await getJSON(request, `${testRoutes.posts.route}/1/comments`);
    expect(Array.isArray(comments)).toBe(true);
    expect(comments[0]).toHaveProperty('postId', 1);
});

// TC-12
test('TC-12 GET /comments?postId=1 filters comments', async ({ request }) => {
    const comments = await getJSON(request, `${testRoutes.comments.route}?postId=1`);
    expect(comments.every((c: { postId: number }) => c.postId === 1)).toBe(true);
});

// TC-16
test('TC-16 GET /comments returns list of comments', async ({ request }) => {
    const data = await getJSON(request, testRoutes.comments.route);
    expect(Array.isArray(data)).toBe(true);
});

// TC-17
test('TC-17 GET /comments/1 returns single comment', async ({ request }) => {
    const data = await getJSON(request, `${testRoutes.comments.route}/1`);
    expect(data).toHaveProperty('id', 1);
});

// TC-18
test('TC-18 GET /albums returns list of albums', async ({ request }) => {
    const data = await getJSON(request, testRoutes.albums.route);
    expect(Array.isArray(data)).toBe(true);
});

// TC-19
test('TC-19 GET /albums/1 returns single album', async ({ request }) => {
    const data = await getJSON(request, `${testRoutes.albums.route}/1`);
    expect(data).toHaveProperty('id', 1);
});

// TC-20
test('TC-20 GET /photos returns list of photos', async ({ request }) => {
    const data = await getJSON(request, testRoutes.photos.route);
    expect(Array.isArray(data)).toBe(true);
});

// TC-21
test('TC-21 GET /photos/1 returns single photo', async ({ request }) => {
    const data = await getJSON(request, `${testRoutes.photos.route}/1`);
    expect(data).toHaveProperty('id', 1);
});

// TC-22
test('TC-22 GET /todos returns list of todos', async ({ request }) => {
    const data = await getJSON(request, testRoutes.todos.route);
    expect(Array.isArray(data)).toBe(true);
});

// TC-23
test('TC-23 GET /todos/1 returns single todo', async ({ request }) => {
    const data = await getJSON(request, `${testRoutes.todos.route}/1`);
    expect(data).toHaveProperty('id', 1);
});

// TC-24
test('TC-24 GET /users returns list of users', async ({ request }) => {
    const data = await getJSON(request, testRoutes.users.route);
    expect(Array.isArray(data)).toBe(true);
});

// TC-25
test('TC-25 GET /users/1 returns single user', async ({ request }) => {
    const data = await getJSON(request, `${testRoutes.users.route}/1`);
    expect(data).toHaveProperty('id', 1);
});

// Invalid ID checks from loops
const invalidResources: { resource: keyof typeof testRoutes; tc: number }[] = [
    { resource: 'comments', tc: 31 },
    { resource: 'albums', tc: 40 },
    { resource: 'photos', tc: 49 },
    { resource: 'todos', tc: 58 },
    { resource: 'users', tc: 67 }
];

for (const { resource, tc } of invalidResources) {
    const base = testRoutes[resource].route;
    test(`TC-${tc} GET ${base}/0 returns 404`, async ({ request }) => {
        const response = await request.get(`${base}/0`);
        expect(response.status()).toBe(404);
    });
}

// Nested resource tests
test('TC-72 GET /albums/1/photos returns album photos', async ({ request }) => {
    const photos = await getJSON(request, `${testRoutes.albums.route}/1/photos`);
    expect(Array.isArray(photos)).toBe(true);
    expect(photos[0]).toHaveProperty('albumId', 1);
});

test('TC-73 GET /albums/0/photos returns 404 or an empty array', async ({ request }) => {
    const response = await request.get(`${testRoutes.albums.route}/0/photos`);
    const status = response.status();
    if (status === 404) {
        expect(status).toBe(404);
    } else {
        expect(status).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }
});

test('TC-74 GET /users/1/albums returns user albums', async ({ request }) => {
    const albums = await getJSON(request, `${testRoutes.users.route}/1/albums`);
    expect(Array.isArray(albums)).toBe(true);
    expect(albums[0]).toHaveProperty('userId', 1);
});

test('TC-75 GET /users/0/albums returns 404 or and empty array', async ({ request }) => {
    const response = await request.get(`${testRoutes.users.route}/0/albums`);
    const status = response.status();
    if (status === 404) {
        expect(status).toBe(404);
    } else {
        expect(status).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }
});

test('TC-76 GET /users/1/todos returns user todos', async ({ request }) => {
    const todos = await getJSON(request, `${testRoutes.users.route}/1/todos`);
    expect(Array.isArray(todos)).toBe(true);
    expect(todos[0]).toHaveProperty('userId', 1);
});

test('TC-77 GET /users/0/todos returns 404 or an empty array', async ({ request }) => {
    const response = await request.get(`${testRoutes.users.route}/0/todos`);
    const status = response.status();
    if (status === 404) {
        expect(status).toBe(404);
    } else {
        expect(status).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }
});

test('TC-78 GET /users/1/posts returns user posts', async ({ request }) => {
    const posts = await getJSON(request, `${testRoutes.users.route}/1/posts`);
    expect(Array.isArray(posts)).toBe(true);
    expect(posts[0]).toHaveProperty('userId', 1);
});

test('TC-79 GET /users/0/posts returns 404 or an empty array', async ({ request }) => {
    const response = await request.get(`${testRoutes.users.route}/0/posts`);
    const status = response.status();
    if (status === 404) {
        expect(status).toBe(404);
    } else {
        expect(status).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }
});

test('TC-80 GET /posts/0/comments returns 404 or an empty array', async ({ request }) => {
    const response = await request.get(`${testRoutes.posts.route}/0/comments`);
    const status = response.status();
    if (status === 404) {
        expect(status).toBe(404);
    } else {
        expect(status).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }
});

// Unsupported nested routes
test('TC-81 GET /posts/1/albums returns 404 or an empty array', async ({ request }) => {
    const response = await request.get(`${testRoutes.posts.route}/1/albums`);
    const status = response.status();
    if (status === 404) {
        expect(status).toBe(404);
    } else {
        expect(status).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }
});

test('TC-82 GET /comments/1/posts returns 404 or an empty array', async ({ request }) => {
    const response = await request.get(`${testRoutes.comments.route}/1/posts`);
    const status = response.status();
    if (status === 404) {
        expect(status).toBe(404);
    } else {
        expect(status).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }
});
