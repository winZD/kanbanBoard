/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest", // use ts-jest for TS files
  testEnvironment: "jest-environment-jsdom", // simulate browser
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // compile TS/TSX via ts-jest
    "^.+\\.(js|jsx)$": "babel-jest", // optional: if you also use Babel
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"], // default patterns
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // or a dedicated tsconfig.test.json
    },
  },
};
