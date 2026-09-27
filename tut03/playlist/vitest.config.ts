import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Show console output and its stack traces
    // Useful when debugging infinite loops!
    disableConsoleIntercept: true,
    printConsoleTrace: true,
    silent: false,

    // Disable file parallelism as different test files reference shared data
    fileParallelism: false,

    // Timeout if test or hook (beforeEach, afterEach, etc) takes too long
    testTimeout: 10_000,
    hookTimeout: 10_000,

    // Run tests in a predictable order
    sequence: {
      concurrent: false,
    },
  },
})