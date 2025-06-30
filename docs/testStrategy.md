# Test Strategy

This project verifies the behavior of the JSONPlaceholder API by checking typical CRUD operations and error handling for each main route. The goal is to confirm that the service responds with the correct status codes and data formats.

## Test Scope
The tests cover the following main routes: 
- `/posts`	
- `/comments`	
- `/albums`	
- `/photos`	
- `/todos`
- `/users` 

Test cases are utilizing supported HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
### Specifics:
- For `GET` requests, both `{resource}` and `/{resource}/{id}` endpoints are tested.
- For some `GET` requests, nester resources are also checked, such as `/posts/{id}/comments`.

Testing includes both positive and negative scenarios, as well as edge cases.

## Positive scenarios
- **Listing resources (TC01, TC14, etc.)** – Ensure that `GET` requests return an array of objects with `application/json` content.
- **Retrieving by ID (TC08, TC15, etc.)** – Validate that a single object is returned for a valid identifier.
- **Creating resources (TC02 and similar)** – Send `POST` requests with a JSON payload and expect status `201` with the created object in the response.
- **Updating resources (TC11, etc. via `PUT`, TC12, etc. via `PATCH`)** – Check that updates are reflected in the response body.
- **Deletion (TC13, etc.)** – Confirm that deleting a resource yields a success status (200‑299).

## Negative scenarios
- **Invalid identifiers (TC04, TC30, etc.)** – Requests with nonexistent IDs should return `404 Not Found`.
- **Malformed JSON payloads (TC05, TC31, etc.)** – Posting invalid JSON should fail with status `400` or `500`.
- **Unsupported methods (TC06, etc.)** – Certain endpoints reject unsupported HTTP methods, returning `404` or `405`.
- **Missing required fields (TC08, TC33, etc.)** – Omitting mandatory properties in POST requests should return an error status.
- **Wrong content type (TC09, TC34, etc.)** – Sending payloads with an unexpected `Content-Type` should also fail with status `400`‑`500`.
- **Binary data (TC26)** – Posting file-like content such as `application/octet-stream` should be rejected.

## Edge cases
- **Large payloads (TC06, TC30, etc.)** – Verify that the API accepts unusually large bodies and echoes them back.

## Custom data cases
- **Data-driven cases (TC03)** – Use a predefined payload from `config/testData.json` to confirm consistent behavior across different inputs.

## Test Execution Strategy
Each test follows the same pattern:
1. **Precondition** – the API must be reachable.
2. **Steps** – perform the HTTP request described in the table.
3. **Expected Result** – check the returned status code and payload structure.

## Summary
This strategy ensures broad coverage of typical use cases and helps detect inconsistensies in the API behavior, while verifying that the service behaves as expected under various conditions, as specified in the project guidlines.
