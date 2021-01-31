module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn"
  },
  parserOptions: { ecmaVersion: 2019 }
};
