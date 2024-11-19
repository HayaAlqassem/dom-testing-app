import { it, vi, expect } from 'vitest';
import { sendDataRequest } from './http';
import { HttpError } from './errors';

const testResponseData = {testKey: 'testData'};
// fn has the replacement function for the fetch function, for our test.
const testFetch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
      // Checking if the body we received is JSON, JSON is just text so we are checking the typeof 'string'.
      if(typeof options.body !== 'string'){
        return reject('Not a string.'); // To not execute the below code
      }
        // testResponse is an object
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testResponseData);
                });
            }

        };
        resolve(testResponse);
    });
});
// The stubGlobal method allows us to replace globally available objects or functions with other implementations. 
// The stubGlobal method has our test replacement for the fetch function. 
vi.stubGlobal('fetch', testFetch);  

it('should return any available response data', () => {
    const testData = {key: 'test'};

    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

/*
Mocking Frontend Libraries
In this example project, the global fetch() API / function is used.

You can, of course, also use third-party libraries in frontend JavaScript projects though. 
For example, the axios library is a very popular library for sending HTTP requests from the frontend.

In case you're working with such a library, instead of a global value, you can mock that library 
as you learned in the previous section (i.e., use vi.mock('axios'), provide a __mocks__/axios.js file 
if necessary etc.).
*/

it('should convert the provided data to JSON before sending the request', async() => {
    const testData = {key: 'test'};

    let errorMessage;

    try {
        await sendDataRequest(testData);
    } catch(error) {
        errorMessage = error;
    }

    expect(errorMessage).not.toBe('Not a string.');
});

// An HttpError is an error of the type of the custom error calss (errors.js) type.
// If ok: true is false in the testResponse (line 13 and 14)
it('should throw an HttpError in case of non-ok responses', () => {
    testFetch.mockImplementationOnce((url, options) => {
        return new Promise((resolve, reject) => {
            // testResponse is an object
            const testResponse = {
                ok: false,
                json() {
                    return new Promise((resolve, reject) => {
                        resolve(testResponseData);
                    });
                }
    
            };
            resolve(testResponse);
        });
    });

    const testData = {key: 'test'};

    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});