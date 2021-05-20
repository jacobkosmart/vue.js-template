<template>
  <h1>{{ message }}</h1>
  <HelloWorld />  
</template>

<script>
import HelloWorld from '~/components/HelloWorld' // ~ 는 alias 를 통해서 root/src 폴더를 가리킴 그 안에 components 연결 (마치 절대 경로로 연결하는것과 같음)
export default { // 객체 literal 을 반환해주는 부분
  components: {
    HelloWorld // HelloWorld 연결
  },
  data() {
    return {
      message: "Hello Vue!!!"
    }
  }
}
</script>