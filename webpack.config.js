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