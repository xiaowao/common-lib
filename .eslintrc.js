module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true
  },
  "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
  ],
  "parserOptions": {
      "parser": 'babel-eslint',
      "ecmaVersion": 2016,
      "sourceType": "module"
  },
  "plugins": [
      "html",
      "vue"
  ],
  "rules": {
      "linebreak-style": [
          "error",
          "windows"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "no-undef": "off",
      "no-console": 0
  }
};