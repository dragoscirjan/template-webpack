module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  }, // combine
  // https://stylelint.io/user-guide/rules/about with
  // https://github.com/kristerkari/stylelint-scss#list-of-rules
};
