import fs from 'fs'; // Importing the file system module from node.js
/* Importing the path module so that we can open a file and load a files content. 
We wanna open and load the index.html file. */
import path from 'path';

import { it, vi, expect, beforeEach } from 'vitest';
import { Window } from 'happy-dom';
 
import {showError} from './dom';

const htmlDocumentPath = path.join(process.cwd(), 'index.html'); // The process.cwd() method is an inbuilt API of the process module which is used to get the current working directory (cwd) of the node.js process.
const htmlDocumentContent = fs.readFileSync(htmlDocumentPath).toString(); // The content is inside of the index.html file. 

// Setting up the virtual DOM.
const window = new Window(); // This creates an emulated browser. 
const document = window.document;
vi.stubGlobal('document', document); // Now the document is provided by happy-dom with our content written into it, and it renders our html content into our virtual browser.

// Cleanup work. v
// Resetting the virtual document before each test.
beforeEach(() => {
    // Rewrite/reset the document body before each test.
    document.body.innerHTML = '';

    // Calling the write method to write the htmlDocumentContent which we loaded from the index.html file into this emulated browser:
    // Before each test, rewrite the document.
    document.write(htmlDocumentContent); // This now renders this page virtually.
});

it ('should add an error paragraph to the id="errors" element', () => {
    showError('Test');

    const errorsElement = document.getElementById('errors');
    const errorParagraph = errorsElement.firstElementChild; 

    expect(errorParagraph).not.toBeNull();
});

/* Before calling the showError function, if we do not call the showError function, 
then there should not be an error paragraph in the document. */
it('should not contain an error paragraph initially', () => {
    const errorsElement = document.getElementById('errors');
    const errorParagraph = errorsElement.firstElementChild; 

    expect(errorParagraph).toBeNull();
});

it('should output the provided message in the error paragraph', () => {
    const testErrorMessage = 'Test';

    showError(testErrorMessage);

    const errorsElement = document.getElementById('errors');
    const errorParagraph = errorsElement.firstElementChild; 

    expect(errorParagraph.textContent).toBe(testErrorMessage);
}); 