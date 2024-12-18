<template>
    <ContextBox>공지사항</ContextBox>
    <NoticeSearch />
    <NoticeMain />
</template>

<script setup>
const provideValue = ref();

provide('providedValue', provideValue);
</script>
