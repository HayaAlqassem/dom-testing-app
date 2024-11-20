import fs from 'fs'; 
import path from 'path';

import { it, vi, expect, beforeEach } from 'vitest';
import { Window } from 'happy-dom';
 
import {showError} from './dom';

const htmlDocumentPath = path.join(process.cwd(), 'index.html');   
const htmlDocumentContent = fs.readFileSync(htmlDocumentPath).toString(); 

// Setting up the virtual DOM.
const window = new Window();  
const document = window.document;
vi.stubGlobal('document', document);

beforeEach(() => {
    document.body.innerHTML = '';
 
    document.write(htmlDocumentContent); 
});

it ('should add an error paragraph to the id="errors" element', () => {
    showError('Test');

    const errorsElement = document.getElementById('errors');
    const errorParagraph = errorsElement.firstElementChild; 

    expect(errorParagraph).not.toBeNull();
});

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
