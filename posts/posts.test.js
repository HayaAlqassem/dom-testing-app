import { describe, it, expect, beforeEach } from 'vitest';
import { extractPostData } from './posts';

const testTitle = 'Test title';
const testContent = 'Test content';
let testDataForm;

describe('extractPostData()', () => {
    beforeEach(() => {
        testDataForm = {
            title: testTitle,
            content: testContent,
            get(identifier){
                return this [identifier];
            },
        };
    });
    
    it('should extract the title and content from the provided data form', () => {

        const data = extractPostData(testDataForm);

        expect(data.title).toBe(testTitle);
        expect(data.content).toBe(testContent);
    });
});
