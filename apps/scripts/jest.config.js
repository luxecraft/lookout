/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    testTimeout: 1000 * 60 * 2,
    slowTestThreshold: 1000 * 60 * 2,
};
