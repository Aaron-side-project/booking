<template lang="pug">

</template>

<script setup>
import { io } from "socket.io-client";
const socket = io('http://localhost:5001');

socket.on('connect', () => {
    console.log(socket);
    socket.emit('message', '你好嗎？');
})
</script>

<style scoped>
.common-layout {
    display: none !important;
}
</style>