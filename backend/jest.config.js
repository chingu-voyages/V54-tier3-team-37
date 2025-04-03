export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  // Do not remove or edit transformIgnorePatterns
  // Transforming is crucial for testing
  transformIgnorePatterns: [
    "node_modules/(?!(octokit|@octokit|before-after-hook|universal-user-agent)/)",
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["dotenv/config"],
};
