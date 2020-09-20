module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    env: {
        browser: true
    },
    ignorePatterns: ["**/*.js"]
};
