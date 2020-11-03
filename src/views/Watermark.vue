<template >
    <div>
        <el-button @click="openWM()">打开水印</el-button>
        <el-button @click="closeWM()">关闭水印</el-button>
    </div>
</template>

<script>
import  __canvasWM from "../assets/js/wm.js";
export default {
    methods: {
        openWM() {
            __canvasWM(true,{ content: new Date().getTime() });
        },
        closeWM() {
            __canvasWM(false);
        },
    },
};
</script>

<style lang="less" scoped>
</style>