# Found bugs

## Bug-01 
- **Summary**: The api successfuly returns POST 201, if the request body is not complete 
- **Priority**: **High** (Reasoning: there is no strict validation of the content type send in the request header, which can lead to unexpected behavior and security vulnerabilities)
- **Description**: Applicable for all routes! There is no strict validation of the content type sent in the request header, which can lead to unexpected behavior and security vulnerabilities. 		
 For example, if a request is sent with a content type of "text/plain" instead of "application/json", the API should return a 400 Bad Request error instead of a 201 Created response. 
 Furthermore, I have tested another non-text content type, such as "application/octet-stream" -- binary data, and the API still returns a 201 Created response, which should not be happening. 
 The API should enforce strict validation of the content type to ensure that only valid requests are processed.
- **Linked test cases**: TC-09, TC-26, TC-34, TC-43, TC-52, TC-61, TC-70

## Bug-02 
- **Summary**: The api successfuly returns POST 201, if the request body is not complete (missing required fields) 
- **Priority**: **Low** (Reasoning: The API should not accept incomplete requests, as it can lead to data integrity issues. As for now, the server autoassigns missing values)
- **Description**: Applicable for all routes! For example, if the request body is missing the "name" field, the API should return a 400 Bad Request error instead of a 201 Created response. 
 This ensures that all required fields are provided before creating a new resource. In multiple routes it is evident that there is no strict validation present and the server just autofills missing fields. 
 Notably, the documentation does not mention that the request body can be incomplete, which is misleading and assuming best industry practices, this should not be the case.
- **Linked test cases**: TC-08, TC-33, TC-42, TC-51, TC-60, TC-69

## Bug-03 
- **Summary**: The api returns array instead of GET 404 or an empty array, if the request is sent to an invalid nested resource 
- **Priority**: **Medium** (Reasoning: The API should not return any of the data, if the nested route is unsopported -- it could lead to a possible data security issue)
- **Description**: By sending a request to an invalid nested resource, such as `/comments/1/posts` or `/posts/1/albums`, the API should return a 404 Not Found status or an empty array. 
 Instead, it returns an array with data from the parent route e.g. `/comments`, or `/posts` which is misleading and could lead to exposure of some restricted data (if we have users with different privileges)
 This behavior is inconsistent with the expected behavior of the API and should be corrected to ensure that invalid nested resources are handled appropriately.
- **Linked test cases**: TC-81, TC-82