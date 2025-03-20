export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
