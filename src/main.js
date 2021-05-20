import {
  createApp
} from 'vue' // 가지고 올때 객체 분해를 통해 바로 createApp 를 가져옴
import App from './App'

// App.vue 가 project 에 시작이 되는것을 설정
createApp(App).mount('#app') // app이라는 ID 값을 가지고 있는 곳에 vue.js 프로젝트를 연결 한다는 개념임