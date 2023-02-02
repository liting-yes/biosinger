process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: ['@lovelliu/eslint-config-react', '@unocss'],
  rules: {
    '@unocss/order': 'error',
    '@unocss/order-attributify': 'error',
  },
}
