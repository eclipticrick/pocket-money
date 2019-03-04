module.exports = function(config) {
  config.set({
    frameworks: ['karma-typescript', 'mocha', 'chai'],
    files: [
      "node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js",
      { pattern: "src/**/*.ts", include: true }
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    plugins: [
      'karma-typescript',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai'
    ],
    reporters: ['progress', 'karma-typescript'],
    karmaTypescriptConfig: {
      compilerOptions: {
        target: "es5"
      },
      exclude: [
        'node_modules',
        '*.test.ts',
        '*_test.ts'
      ],
      coverageOptions: {
        exclude: [
          /[._](spec|test)\.ts/i
        ]
      }
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
