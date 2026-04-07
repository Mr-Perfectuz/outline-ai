import { generateSlug, escapeRegex, splitIntoSegments, formatDuration } from '@/lib/utils';

describe('generateSlug', () => {
    it('converts spaces to hyphens and lowercases', () => {
        expect(generateSlug('Rich Dad Poor Dad')).toBe('rich-dad-poor-dad');
    });

    it('removes file extension', () => {
        expect(generateSlug('my-book.pdf')).toBe('my-book');
    });

    it('removes special characters', () => {
        expect(generateSlug('Hello, World!')).toBe('hello-world');
    });

    it('strips leading and trailing hyphens', () => {
        expect(generateSlug('  --hello--  ')).toBe('hello');
    });

    it('handles empty string', () => {
        expect(generateSlug('')).toBe('');
    });
});

describe('escapeRegex', () => {
    it('escapes regex special characters', () => {
        expect(escapeRegex('hello.world')).toBe('hello\\.world');
        expect(escapeRegex('a+b*c?')).toBe('a\\+b\\*c\\?');
    });

    it('leaves plain strings unchanged', () => {
        expect(escapeRegex('hello world')).toBe('hello world');
    });
});

describe('splitIntoSegments', () => {
    const words100 = Array.from({ length: 100 }, (_, i) => `word${i}`).join(' ');

    it('splits text into segments of correct size', () => {
        const segments = splitIntoSegments(words100, 50, 10);
        expect(segments[0].wordCount).toBe(50);
    });

    it('assigns correct segment indexes', () => {
        const segments = splitIntoSegments(words100, 50, 10);
        expect(segments[0].segmentIndex).toBe(0);
        expect(segments[1].segmentIndex).toBe(1);
    });

    it('returns one segment when text fits within segmentSize', () => {
        const segments = splitIntoSegments('one two three', 50, 5);
        expect(segments).toHaveLength(1);
        expect(segments[0].text).toBe('one two three');
    });

    it('throws if segmentSize is 0', () => {
        expect(() => splitIntoSegments('hello', 0, 0)).toThrow();
    });

    it('throws if overlapSize >= segmentSize', () => {
        expect(() => splitIntoSegments('hello', 10, 10)).toThrow();
    });

    it('handles empty string', () => {
        const segments = splitIntoSegments('');
        expect(segments).toHaveLength(0);
    });
});

describe('formatDuration', () => {
    it('formats seconds to MM:SS', () => {
        expect(formatDuration(90)).toBe('1:30');
        expect(formatDuration(60)).toBe('1:00');
        expect(formatDuration(9)).toBe('0:09');
        expect(formatDuration(0)).toBe('0:00');
    });
});
