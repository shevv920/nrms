module.exports = {
  root: true,
  extends: ["plugin:react/recommended", "next", "next/core-web-vitals", "custom"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
