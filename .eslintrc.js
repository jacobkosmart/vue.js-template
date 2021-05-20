module.exports = {
  env: { // eslint의 코드 검사를 browser, node 환경에서 동작할 수 있게 ture 설정
    browser: true,
    node: true
  },
  extends: [ // 코드검사를 할 규칙들을 명시
    // vue.js 관련 규칙

    // 'plugin:vue/vue3-essential', // Lv.1
    'plugin:vue/vue3-strongly-recommended', // Lv.2
    // 'plugin:vue/vue3-recommended', // Lv.3 - 가장엄격한 vue.js 문법을 따르는것

    // js 관련 규칙
    'eslint:recommended' // eslint 에서 권장으로 규칙으로 js 를 검사하게 됨
  ],
  parserOptions: { // 기본적으로 code 를 분석할 수 있는 분석기를 지정해주는것
    parser: 'babel-eslint' // JS 코드 검사할때 es6 이상의 문법을 es5 형태로 맞춰서 검사를 도와주는 plugin
  },
  rules: { // extends 를 그대로 사용하면 안써도 되는데, 상황에 맞게 Customizing 하기 위해서 변경하고, 추가 할 수 있는 부분임.

    
    "vue/html-closing-bracket-newline": ["error", { // html </> 기호가 싱글라인, 멀티라인에도 사용될수 있게 하는 옵션
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always", // always 로 하면은 빈 tag 에도 / 기호를 사용해야지 eslint 규칙에 맞는게 됨
        "normal": "never", // never 로 하면 일반 tag 에는 self closing 을 하지 않아도 된다는 것임
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }]
  }
}