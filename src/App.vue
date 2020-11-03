<template>
    <el-container>
        <el-header> 该项目用于记录日常开发中或灵机一动写下的相关的实用功能 </el-header>
        <el-container>
            <el-aside width="300px">
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        <router-link :to="item.path" :class="$route.path.startsWith(item.path) ? 'active' : ''">
                            {{ item.name }}
                        </router-link>
                    </li>
                </ul>
            </el-aside>
            <el-main><router-view /></el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/home',
            items: [
                { name: '主页', path: '/Home' },
                { name: '表格内表单', path: '/FormInTable' },
                { name: '水印', path: '/Watermark' },
            ],
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>

<style lang="less">
body,
html {
    padding: 0;
    margin: 0;
}
.el-header {
    line-height: 60px;
    border-bottom: 1px solid #dcdfe6;
}
.el-aside {
    ul {
        li {
            list-style: none;
            display: block;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            a {
                text-decoration: none;
                color: #444;
            }
            :hover {
                color: #409eff;
            }
            :focus {
                color: #409eff;
            }
            .active {
                color: #409eff;
            }
        }
    }
}
</style>