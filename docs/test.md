# API Test Cases

| Test Case Name | Description | Precondition | Steps | Expected Result |
|----------------|-------------|--------------|-------|-----------------|
| TC01 - Get All Posts | Verify that GET `/posts` returns a list of posts. | API is reachable | 1. Send GET request to `/posts` | Response status 200, content-type `application/json`, body is array of posts |
| TC02 - Create Post | Verify that POST `/posts` with valid payload creates a post. | API is reachable | 1. Send POST request to `/posts` with JSON payload containing `userId`, `title`, `body` | Status 201, response body contains posted data |
| TC03 - Create Post with test data | `/posts/{id}` with valid test Datra creates a post. | API is reachable; `config/testData.json` is provided | 1. Send POST request to `/posts` with payload containing in `config/testData.json` | Status 201, response body contains posted data |
| TC04 - Get Invalid Post | Verify GET `/posts/{id}` with invalid id returns not found. | API is reachable | 1. Send GET request to `/posts/0` | Status 404 |
| TC05 - Malformed JSON | Verify POST `/posts` with malformed JSON returns error. | API is reachable | 1. Send POST request with invalid JSON in body | Status 400 or 500 |
| TC06 - Large Payload | Verify POST `/posts` handles large payload gracefully. | API is reachable | 1. Send POST request with very large `body` field | Status 201 and response echoes payload |