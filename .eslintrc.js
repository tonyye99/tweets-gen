module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    extends: ["@nuxtjs/eslint-config-typescript", "prettier"],
    plugins: [],
    rules: {
        semi: "error",
        indent: ["error", 4],
        "@typescript-eslint/space-before-function-paren": "error",
        "vue/no-v-html": "off",
        "vue/first-attribute-linebreak": "off",
    },
}
