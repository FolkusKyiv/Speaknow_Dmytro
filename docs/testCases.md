# API Test Cases

| Test Case Name | Description | Precondition | Steps | Expected Result |
|----------------|-------------|--------------|-------|-----------------|
| TC01 - Get All Posts | Verify that GET `/posts` returns a list of posts. | API is reachable | 1. Send GET request to `/posts` | Response status 200, content-type `application/json`, body is array of posts |
| TC02 - Create Post | Verify that POST `/posts` with valid payload creates a post. | API is reachable | 1. Send POST request to `/posts` with JSON payload containing `userId`, `title`, `body` | Status 201, response body contains posted data with ID auto-assigned |
| TC03 - Create Post with test data | Verify that POST `/posts` with test data creates a post. | API is reachable; `config/testData.json` is provided | 1. Send POST request to `/posts` with payload contained in `config/testData.json` | Status 201, response body contains posted data with ID auto-assigned |
| TC04 - Get Invalid Post | Verify GET `/posts/{id}` with invalid id returns not found. | API is reachable | 1. Send GET request to `/posts/0` | Status 404 |
| TC05 - Malformed JSON | Verify POST `/posts` with malformed JSON returns error. | API is reachable | 1. Send POST request with invalid JSON in body | Status 400 or 500 |
| TC06 - Delete Not Allowed | Verify DELETE `/posts` without id is not allowed. | API is reachable | 1. Send DELETE request to `/posts` | Status 404 or 405 |
| TC07 - Large Payload | Verify POST `/posts` handles large payload gracefully. | API is reachable | 1. Send POST request with very large `body` field | Status 201 and response echoes payload |
| TC08 - Missing Post Field | Verify POST `/posts` with missing required field fails. | API is reachable | 1. Send POST request with payload missing `body` or `userId` | Status 400-500 |
| TC09 - Wrong Post Content Type | Verify POST `/posts` with wrong content type fails. | API is reachable | 1. Send POST request with header `Content-Type: text/plain` | Status 400-500 |
| TC10 - Get Post by Id | Verify that GET `/posts/1` returns the post with id 1. | API is reachable | 1. Send GET request to `/posts/1` | Status 200 and JSON object with `id` 1 |
| TC11 - List Post Comments | Verify that GET `/posts/1/comments` returns comments. | API is reachable | 1. Send GET request to `/posts/1/comments` | Status 200 and response is array with `postId` 1 |
| TC12 - Filter Comments | Verify that GET `/comments?postId=1` filters comments. | API is reachable | 1. Send GET request to `/comments?postId=1` | Status 200 and every object has `postId` 1 |
| TC13 - Update Post | Verify that PUT `/posts/1` updates a post. | API is reachable | 1. Send PUT request to `/posts/1` with JSON payload | Status 200 and response matches payload |
| TC14 - Patch Post | Verify that PATCH `/posts/1` partially updates a post. | API is reachable | 1. Send PATCH request to `/posts/1` with JSON body | Status 200 and field updated |
| TC15 - Delete Post | Verify that DELETE `/posts/1` removes a post. | API is reachable | 1. Send DELETE request to `/posts/1` | Status 200-299 |
| TC16 - Get All Comments | Verify GET `/comments` returns list of comments. | API is reachable | 1. Send GET request to `/comments` | Status 200 and body is array |
| TC17 - Get Comment by Id | Verify GET `/comments/1` returns a comment. | API is reachable | 1. Send GET request to `/comments/1` | Status 200 and `id` 1 |
| TC18 - Get All Albums | Verify GET `/albums` returns list of albums. | API is reachable | 1. Send GET request to `/albums` | Status 200 and body is array |
| TC19 - Get Album by Id | Verify GET `/albums/1` returns an album. | API is reachable | 1. Send GET request to `/albums/1` | Status 200 and `id` 1 |
| TC20 - Get All Photos | Verify GET `/photos` returns list of photos. | API is reachable | 1. Send GET request to `/photos` | Status 200 and body is array |
| TC21 - Get Photo by Id | Verify GET `/photos/1` returns a photo. | API is reachable | 1. Send GET request to `/photos/1` | Status 200 and `id` 1 |
| TC22 - Get All Todos | Verify GET `/todos` returns list of todos. | API is reachable | 1. Send GET request to `/todos` | Status 200 and body is array |
| TC23 - Get Todo by Id | Verify GET `/todos/1` returns a todo. | API is reachable | 1. Send GET request to `/todos/1` | Status 200 and `id` 1 |
| TC24 - Get All Users | Verify GET `/users` returns list of users. | API is reachable | 1. Send GET request to `/users` | Status 200 and body is array |
| TC25 - Get User by Id | Verify GET `/users/1` returns a user. | API is reachable | 1. Send GET request to `/users/1` | Status 200 and `id` 1 |
| TC26 - Binary Post Data | Verify POST `/posts` with binary data fails. | API is reachable | 1. Send POST request to `/posts` with `Content-Type: application/octet-stream` and binary payload | Status 400-500 |
| TC27 - Create Comment | Verify POST `/comments` creates a comment. | API is reachable | 1. Send POST request with JSON body | Status 201 and response matches payload |
| TC28 - Update Comment | Verify PUT `/comments/1` updates a comment. | API is reachable | 1. Send PUT request to `/comments/1` | Status 200 and response matches payload |
| TC29 - Patch Comment | Verify PATCH `/comments/1` partially updates comment. | API is reachable | 1. Send PATCH request to `/comments/1` | Status 200 and field updated |
| TC30 - Delete Comment | Verify DELETE `/comments/1` deletes a comment. | API is reachable | 1. Send DELETE request to `/comments/1` | Status 200-299 |
| TC31 - Invalid Comment Id | Verify GET `/comments/0` returns 404. | API is reachable | 1. Send GET request to `/comments/0` | Status 404 |
| TC32 - Malformed Comment JSON | Verify POST `/comments` with malformed JSON fails. | API is reachable | 1. Send POST request to `/comments` with invalid JSON | Status 400 or 500 |
| TC33 - Large Comment Payload | Verify POST `/comments` handles large payload. | API is reachable | 1. Send POST to `/comments` with very large field | Status 201 and echoed payload |
| TC34 - Missing Comment Field | Verify POST `/comments` with missing field fails. | API is reachable | 1. Send POST with payload missing a property | Status 400-500 |
| TC35 - Wrong Comment Content Type | Verify POST `/comments` with wrong content type fails. | API is reachable | 1. Send POST with `Content-Type: text/plain` | Status 400-500 |
| TC36 - Create Album | Verify POST `/albums` creates an album. | API is reachable | 1. Send POST request to `/albums` with JSON body | Status 201 and response matches payload |
| TC37 - Update Album | Verify PUT `/albums/1` updates an album. | API is reachable | 1. Send PUT request to `/albums/1` | Status 200 and response matches payload |
| TC38 - Patch Album | Verify PATCH `/albums/1` partially updates album. | API is reachable | 1. Send PATCH request to `/albums/1` | Status 200 and field updated |
| TC39 - Delete Album | Verify DELETE `/albums/1` deletes an album. | API is reachable | 1. Send DELETE request to `/albums/1` | Status 200-299 |
| TC40 - Invalid Album Id | Verify GET `/albums/0` returns 404. | API is reachable | 1. Send GET request to `/albums/0` | Status 404 |
| TC41 - Malformed Album JSON | Verify POST `/albums` with malformed JSON fails. | API is reachable | 1. Send POST request to `/albums` with invalid JSON | Status 400 or 500 |
| TC42 - Large Album Payload | Verify POST `/albums` handles large payload. | API is reachable | 1. Send POST request to `/albums` with very large field | Status 201 and echoed payload |
| TC43 - Missing Album Field | Verify POST `/albums` with missing field fails. | API is reachable | 1. Send POST to `/albums` omitting a property | Status 400-500 |
| TC44 - Wrong Album Content Type | Verify POST `/albums` with wrong content type fails. | API is reachable | 1. Send POST to `/albums` with `Content-Type: text/plain` | Status 400-500 |
| TC45 - Create Photo | Verify POST `/photos` creates a photo. | API is reachable | 1. Send POST request to `/photos` with JSON body | Status 201 and response matches payload |
| TC46 - Update Photo | Verify PUT `/photos/1` updates a photo. | API is reachable | 1. Send PUT request to `/photos/1` | Status 200 and response matches payload |
| TC47 - Patch Photo | Verify PATCH `/photos/1` partially updates photo. | API is reachable | 1. Send PATCH request to `/photos/1` | Status 200 and field updated |
| TC48 - Delete Photo | Verify DELETE `/photos/1` deletes a photo. | API is reachable | 1. Send DELETE request to `/photos/1` | Status 200-299 |
| TC49 - Invalid Photo Id | Verify GET `/photos/0` returns 404. | API is reachable | 1. Send GET request to `/photos/0` | Status 404 |
| TC50 - Malformed Photo JSON | Verify POST `/photos` with malformed JSON fails. | API is reachable | 1. Send POST request to `/photos` with invalid JSON | Status 400 or 500 |
| TC51 - Large Photo Payload | Verify POST `/photos` handles large payload. | API is reachable | 1. Send POST request to `/photos` with very large field | Status 201 and echoed payload |
| TC52 - Missing Photo Field | Verify POST `/photos` with missing field fails. | API is reachable | 1. Send POST to `/photos` omitting a property | Status 400-500 |
| TC53 - Wrong Photo Content Type | Verify POST `/photos` with wrong content type fails. | API is reachable | 1. Send POST to `/photos` with `Content-Type: text/plain` | Status 400-500 |
| TC54 - Create Todo | Verify POST `/todos` creates a todo. | API is reachable | 1. Send POST request to `/todos` with JSON body | Status 201 and response matches payload |
| TC55 - Update Todo | Verify PUT `/todos/1` updates a todo. | API is reachable | 1. Send PUT request to `/todos/1` | Status 200 and response matches payload |
| TC56 - Patch Todo | Verify PATCH `/todos/1` partially updates todo. | API is reachable | 1. Send PATCH request to `/todos/1` | Status 200 and field updated |
| TC57 - Delete Todo | Verify DELETE `/todos/1` deletes a todo. | API is reachable | 1. Send DELETE request to `/todos/1` | Status 200-299 |
| TC58 - Invalid Todo Id | Verify GET `/todos/0` returns 404. | API is reachable | 1. Send GET request to `/todos/0` | Status 404 |
| TC59 - Malformed Todo JSON | Verify POST `/todos` with malformed JSON fails. | API is reachable | 1. Send POST request to `/todos` with invalid JSON | Status 400 or 500 |
| TC60 - Large Todo Payload | Verify POST `/todos` handles large payload. | API is reachable | 1. Send POST request to `/todos` with very large field | Status 201 and echoed payload |
| TC61 - Missing Todo Field | Verify POST `/todos` with missing field fails. | API is reachable | 1. Send POST to `/todos` omitting a property | Status 400-500 |
| TC62 - Wrong Todo Content Type | Verify POST `/todos` with wrong content type fails. | API is reachable | 1. Send POST to `/todos` with `Content-Type: text/plain` | Status 400-500 |
| TC63 - Create User | Verify POST `/users` creates a user. | API is reachable | 1. Send POST request to `/users` with JSON body | Status 201 and response matches payload |
| TC64 - Update User | Verify PUT `/users/1` updates a user. | API is reachable | 1. Send PUT request to `/users/1` | Status 200 and response matches payload |
| TC65 - Patch User | Verify PATCH `/users/1` partially updates user. | API is reachable | 1. Send PATCH request to `/users/1` | Status 200 and field updated |
| TC66 - Delete User | Verify DELETE `/users/1` deletes a user. | API is reachable | 1. Send DELETE request to `/users/1` | Status 200-299 |
| TC67 - Invalid User Id | Verify GET `/users/0` returns 404. | API is reachable | 1. Send GET request to `/users/0` | Status 404 |
| TC68 - Malformed User JSON | Verify POST `/users` with malformed JSON fails. | API is reachable | 1. Send POST request to `/users` with invalid JSON | Status 400 or 500 |
| TC69 - Large User Payload | Verify POST `/users` handles large payload. | API is reachable | 1. Send POST request to `/users` with very large field | Status 201 and echoed payload |
| TC70 - Missing User Field | Verify POST `/users` with missing field fails. | API is reachable | 1. Send POST to `/users` omitting a property | Status 400-500 |
| TC71 - Wrong User Content Type | Verify POST `/users` with wrong content type fails. | API is reachable | 1. Send POST to `/users` with `Content-Type: text/plain` | Status 400-500 |
| TC72 - List Album Photos | Verify GET `/albums/1/photos` returns photos for an album. | API is reachable | 1. Send GET request to `/albums/1/photos` | Status 200 and array with `albumId` 1 |
| TC73 - Invalid Album Photos | Verify GET `/albums/0/photos` returns 404 or an empty array. | API is reachable | 1. Send GET request to `/albums/0/photos` | Status 404 |
| TC74 - List User Albums | Verify GET `/users/1/albums` returns albums for a user. | API is reachable | 1. Send GET request to `/users/1/albums` | Status 200 and array with `userId` 1 |
| TC75 - Invalid User Albums | Verify GET `/users/0/albums` returns 404 or an empty array. | API is reachable | 1. Send GET request to `/users/0/albums` | Status 404 |
| TC76 - List User Todos | Verify GET `/users/1/todos` returns todos for a user. | API is reachable | 1. Send GET request to `/users/1/todos` | Status 200 and array with `userId` 1 |
| TC77 - Invalid User Todos | Verify GET `/users/0/todos` returns 404 or an empty array. | API is reachable | 1. Send GET request to `/users/0/todos` | Status 404 |
| TC78 - List User Posts | Verify GET `/users/1/posts` returns posts for a user. | API is reachable | 1. Send GET request to `/users/1/posts` | Status 200 and array with `userId` 1 |
| TC79 - Invalid User Posts | Verify GET `/users/0/posts` returns 404 or an empty array. | API is reachable | 1. Send GET request to `/users/0/posts` | Status 404 |
| TC80 - Invalid Post Comments | Verify GET `/posts/0/comments` returns 404 or an empty array. | API is reachable | 1. Send GET request to `/posts/0/comments` | Status 404 |