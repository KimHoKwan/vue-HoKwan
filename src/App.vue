<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <RouterView />
</template>

<style>
body {
    -ms-overflow-style: none; /* IE 스크롤바 스타일 제거 */
}
body::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('assets/밸리곰.jpg');
    background-size: 40%; /* 이미지 크기 */
    background-position: center; /* 화면 가운데 배치 */
    opacity: 0.1; /* 배경 이미지 투명도 설정 */
    z-index: -1; /* 배경 이미지를 텍스트 뒤로 보내기 */
}
body::-webkit-scrollbar {
    display: none;
}
</style>
