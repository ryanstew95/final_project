module.exports = {
  "root": true,
    parser: "@babel/eslint-parser",
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
          requireConfigFile: false,
          babelOptions: {
              presets: ["@babel/preset-react"],
            },
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
  
