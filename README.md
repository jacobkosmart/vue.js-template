#  Vue.js Webpack with ESLint 기본 템플릿

## Vue3.0 초기 환경 및 Template 관련 설정 보기 


> [Jacob's Devlog](https://jacobko.info/vue/Vue.js_01/)


```js
// in webpack.config.js 설정 파일

// path: NodeJS에서 파일 및 디렉토리 경로 작업을 위한 전역 모듈
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'], // 확장자 명 .js 와 .vue 를 안적어도 자동으로 인식해줌 (확장자를 생략해서 사용할 수 있음)
    alias: { // 경로 별칭 쉽게 접근하기 위해 만듬
      '~': path.resolve(__dirname, 'src'), // ~ 에 경로 값을 alias 해줌 node.js의 현재 webpack.config.js 경로에 scr 폴더를 가리킴
      'assets': path.resolve(__dirname, 'src/assets') // 실제 image 가 있는 경로를 가리킴
    }
  },
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // 주석은 기본값!, `__dirname`은 현재 파일의 위치를 알려주는 NodeJS 전역 변수
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [{
        test: /\.vue$/, // .vue 로 끝나는 것 파일 탐색
        use: [
          'vue-loader' // vue-loader 사용
        ]
      },
      {
        test: /\.s?css$/, // .css 로 끝나는 것 파일 탐색 과 .scss 를 위해 s가 있어도 되고 없어도 되는 파일들 탐색
        use: [
          // 순서 중요! (역순으로 실행됨)
          'vue-style-loader', // 5번 vue-style loader 추가 
          'style-loader', // 4번 
          'css-loader', // 3번
          'postcss-loader', // 2번
          'sass-loader' // 1번
        ]
      },
      {
        test: /\.js$/, // .js 로 끝나는 것 파일 탐색
        exclude: /node_modules/, // 제외할 경로
        use: [
          'babel-loader' // babel-loader 사용
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/, // image 파일 포멧들 탐색 확장자로 png, jpeg, jpg(e는 있어도 되고 없어도 되고), gif, webp 파일 탐색
        use: 'file-loader' // file-loader 사용
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{
        from: 'static'
      }]
    }),
    new VueLoaderPlugin() // vue loader 생성자 함수로 실행
  ],

  // 개발 서버 옵션
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true
  }
}
```


```js
// .eslintrc.js  에서 설정된 code 확인

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
```


```json
// in package.json

{
  "name": "vue3.0-webpack-basic",
  "version": "1.0.0",
  "description": "",
  "__browserslist": "이 프로젝트가 지원하는 대상 브라우저를 지정 for Autoprefixer!",
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ],
  "scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.13.10",
    "@babel/plugin-transform-runtime": "^7.13.10",
    "@babel/preset-env": "^7.13.10",
    "@vue/compiler-sfc": "^3.0.11",
    "autoprefixer": "^10.2.5",
    "babel-eslint": "^10.1.0",
    "babel-loader": "^8.2.2",
    "copy-webpack-plugin": "^8.0.0",
    "css-loader": "^5.1.3",
    "eslint": "^7.26.0",
    "eslint-plugin-vue": "^7.9.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.1",
    "postcss": "^8.2.8",
    "postcss-loader": "^5.2.0",
    "sass": "^1.32.8",
    "sass-loader": "^11.0.1",
    "style-loader": "^2.0.0",
    "vue-loader": "^16.2.0",
    "vue-style-loader": "^4.1.3",
    "webpack": "^5.27.1",
    "webpack-cli": "^4.5.0",
    "webpack-dev-server": "^4.0.0-beta.0"
  },
  "dependencies": {
    "vue": "^3.0.11"
  }
}

```