process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: ['@antfu/eslint-config-react'],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "warn"
  }
}
