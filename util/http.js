import {HttpError} from './errors.js';

/* This function sends an HTTP request by using the Fetch function. It sends a request to 
a backend API that is 'https://dummy-site.dev/posts' */
export async function sendDataRequest(data) { 
  // Dummy backend, which does not exist. 'https://dummy-site.dev/posts' this URL will not work.
  /* The Fetch function is a globally available function that is made available by the browser, so 
  it is a browser API. It is available in JavaScript in the browser. */
  /* The fetch function takes two arguments, the URL to which the request is sent, 
  and an object that is used for configuring the request. Fetch returns a Promise that is why await is there. */
  const response = await fetch('https://dummy-site.dev/posts', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  // We call json() to extract the response data from the response. 
  const responseData = await response.json();

  if (!response.ok) {
    throw new HttpError(response.status, 'Sending the request failed.', responseData);
  }

  return responseData;
}
