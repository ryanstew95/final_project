module.exports = {
    parser: "babel-eslint",
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "standard",
      "plugin:react/recommended",
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [
          ".eslintrc.{js,cjs}",
        ],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: [
      "react",
    ],
    rules: {
      // add any specific rules if needed
    },
  };
  
