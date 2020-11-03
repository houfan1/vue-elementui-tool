<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="商品 ID" prop="id">
                <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{ scope.row.id }}</span>
                    <el-input v-if="scope.row.edit" v-model="form.id" placeholder="请输入id"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name">
                <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{ scope.row.name }}</span>
                    <el-input v-if="scope.row.edit" v-model="form.name" placeholder="请输入name"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="desc">
                <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{ scope.row.desc }}</span>
                    <el-input v-if="scope.row.edit" v-model="form.desc" placeholder="请输入desc"></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button
                        type="success"
                        size="small"
                        icon="el-icon-circle-check"
                        @click="confirmEdit(scope.$index)"
                        v-loading="loading"
                        v-if="scope.row.edit"
                    >
                        确定
                    </el-button>
                    <el-button
                        type="warning"
                        size="small"
                        v-loading="loading"
                        icon="el-icon-circle-check"
                        @click="cancel(scope.row)"
                        v-if="scope.row.edit"
                    >
                        取消
                    </el-button>
                    <el-button
                        v-if="!scope.row.edit"
                        type="primary"
                        size="small"
                        @click="edit(scope.row, scope.$index)"
                        :disabled="disabled"
                    >
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>



<script>
export default {
    name: 'App',
    data() {
        return {
            tableData: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    edit: false,
                },
                {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    edit: false,
                },
                {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    edit: false,
                },
                {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    edit: false,
                },
            ],
            form: {},
            disabled: false,
            loading: false,
        };
    },
    methods: {
        confirmEdit(index) {
            this.loading = true;
            // 确定
            this.AnalogInterface().then((res) => {
                console.log(res);

                res.edit = false;
                //关闭loading
                this.loading = false;
                // 关闭disabled
                this.disabled = false;
                this.$set(this.tableData, index, res);
                this.$message.success('修改成功');
            });
        },
        AnalogInterface() {
            //模拟接口请求
            // 将数据提交到服务端，并异步加载，我是用setTimeout模拟异步加载
            //三秒的定时器
            return new Promise((resolve) => {
                let params = this.form;
                setTimeout(() => {
                    resolve(params);
                }, 3000);
            });
        },

        edit(val) {
            //编辑
            this.form = JSON.parse(JSON.stringify(val));
            val.edit = true;
            //不让其他按钮处于可编辑状态
            this.disabled = true;
        },
        cancel(val) {
            //取消
            this.form = {};
            val.edit = false;
            this.disabled = false;
        },
    }
};
</script>
