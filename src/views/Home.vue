<template>
    <div>
        <div class="radio">
            <span>时间线：</span> 
            <el-radio-group v-model="reverse">
                <el-radio :label="true">倒序</el-radio>
                <el-radio :label="false">正序</el-radio>
            </el-radio-group>
        </div>
        <el-divider></el-divider>
        <el-timeline :reverse="reverse" class="timeline">
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
                {{ activity.content }}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reverse: true,
            activities: [
                {
                    content: '创建项目',
                    timestamp: '2020-11-03',
                },
                {
                    content: '表格内嵌表单修改',
                    timestamp: '2020-11-03',
                },
                {
                    content: '添加页面水印',
                    timestamp: '2020-11-04',
                },
            ],
        };
    },
};
</script>

<style lang="less" scoped>
.radio {
    span{
        color: #5e6d82;
    }
    padding: 20px;
}
.el-timeline  {
    margin: 40px;
}
</style>