module.exports = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  bracketSpacing: true,
  importOrder: ['^@m/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['jsx', 'typescript', 'decorators-legacy'],
  overrides: [
    {
      "endOfLine":"auto",
      files: ['*.js', '*.ts', '*.tsx', '*.jsx'],
      options: {
        tabWidth: 2,
      },
    },
  ],
}
