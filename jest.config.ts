import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: { jsx: 'react', module: 'CommonJS' },
            diagnostics: false,
        }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        // block pdfjs and vercel/blob — tested separately, not needed in unit tests
        '^pdfjs-dist(.*)$': '<rootDir>/__mocks__/pdfjs-dist.ts',
        '^@vercel/blob(.*)$': '<rootDir>/__mocks__/vercel-blob.ts',
    },
    // mock import.meta.url which is used in parsePDFFile
    globals: {
        'import.meta': { url: 'file://' },
    },
    testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    collectCoverageFrom: [
        'lib/utils.ts',
        'lib/zod.ts',
        'lib/subscription-constants.ts',
    ],
};

export default config;
