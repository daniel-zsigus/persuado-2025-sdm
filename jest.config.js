export default {
  preset: "ts-jest/presets/default-esm", // Use ESM preset
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ESM
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }], // Transform TypeScript files
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Fix imports for ESM
  },
};
