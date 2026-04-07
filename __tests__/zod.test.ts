import { UploadSchema } from '@/lib/zod';

const makePdfFile = (size = 1024) =>
    new File(['a'.repeat(size)], 'test.pdf', { type: 'application/pdf' });

const makeImageFile = (size = 1024, type = 'image/png') =>
    new File(['a'.repeat(size)], 'cover.png', { type });

describe('UploadSchema', () => {
    const validData = {
        title: 'Clean Code',
        author: 'Robert Martin',
        persona: 'rachel',
        pdfFile: makePdfFile(),
        coverImage: undefined,
    };

    it('passes with valid data', () => {
        const result = UploadSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('fails when title is empty', () => {
        const result = UploadSchema.safeParse({ ...validData, title: '' });
        expect(result.success).toBe(false);
    });

    it('fails when author is empty', () => {
        const result = UploadSchema.safeParse({ ...validData, author: '' });
        expect(result.success).toBe(false);
    });

    it('fails when persona is empty', () => {
        const result = UploadSchema.safeParse({ ...validData, persona: '' });
        expect(result.success).toBe(false);
    });

    it('fails when pdfFile is missing', () => {
        const result = UploadSchema.safeParse({ ...validData, pdfFile: undefined });
        expect(result.success).toBe(false);
    });

    it('fails when pdf exceeds 50MB', () => {
        const bigFile = makePdfFile(51 * 1024 * 1024);
        const result = UploadSchema.safeParse({ ...validData, pdfFile: bigFile });
        expect(result.success).toBe(false);
    });

    it('fails when pdf has wrong mime type', () => {
        const wrongFile = new File(['data'], 'test.txt', { type: 'text/plain' });
        const result = UploadSchema.safeParse({ ...validData, pdfFile: wrongFile });
        expect(result.success).toBe(false);
    });

    it('passes with valid cover image', () => {
        const result = UploadSchema.safeParse({ ...validData, coverImage: makeImageFile() });
        expect(result.success).toBe(true);
    });

    it('fails when cover image has wrong type', () => {
        const wrongImg = new File(['data'], 'cover.gif', { type: 'image/gif' });
        const result = UploadSchema.safeParse({ ...validData, coverImage: wrongImg });
        expect(result.success).toBe(false);
    });
});
