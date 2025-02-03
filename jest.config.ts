module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testMatch: ["**/__tests__/**/*.(ts|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
}
