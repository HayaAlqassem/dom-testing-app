export function showError(message) {
  const errorContainerElement = document.getElementById('errors'); // Reaching out to the DOM to select an element.
  const errorMessageElement = document.createElement('p'); // Adding a paragraph ('p')
  errorMessageElement.textContent = message;
  errorContainerElement.innerHTML = ''; // Clearing the selected element "errorContainerElement".
  /* Adding the newly created element "errorMessageElement" as a child to 
  the cleared element "errorContainerElement" */
  errorContainerElement.append(errorMessageElement);
}
