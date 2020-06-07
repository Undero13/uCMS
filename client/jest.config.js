module.exports = {
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
