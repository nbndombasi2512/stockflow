/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testRegex: ".*\\.spec\\.tsx?$",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "^stockflow-helpers$": "<rootDir>/../stockflow-helpers/src/index.ts",
    "^stockflow-component$": "<rootDir>/../stockflow-component/src/index.ts",
  },
};
