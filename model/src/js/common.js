new Vue({
    el: '#app',
    data: function () {
        return {
            title: '股票数据浏览器',
            filterText: '',
            tableHeight:400,
            toggleShowHeader:true,
            loading:false,
            toggleDeleteColumn:true,
            selectedColumn:"",
            data2: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        prop:'x2',
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        prop:'x2',
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    prop:'x2',
                    label: '二级 2-1'
                }, {
                    id: 6,
                    prop:'x2',
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    prop:'x2',
                    label: '二级 3-1'
                }, {
                    id: 8,
                    prop:'x2',
                    label: '二级 3-2'
                }]
            }, {
                id: 11,
                label: '一级 4',
                children: [{
                    id: 7,
                    prop:'x2',
                    label: '二级 4-1'
                }, {
                    id: 8,
                    prop:'x1',
                    label: '二级 4-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            tableHeadData:[{
                prop:'date',
                label:'日期'
            },{
                prop:'name',
                label:'姓名'
            },{
                prop:'address',
                label:'地址'
            }],
        }
    },
    watch: {
        filterText: function (val) {
            this.$refs.tree2.filter(val);
        }
    },
    mounted: function () {
        this.calcTableHeight();
        var oThat = this;
        /**
         * 监听窗口改变大小事件动态改变table高度
         */
        window.onresize = function () {
            return (function () {
                oThat.tableHeight = oThat.$refs.tableBox.clientHeight - 40;
            })()
        }
    },
    methods: {
        filterNode: function (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        /**
         * 添加指标
         */
        addColumn: function (obj,node,ele) {
            if(node.childNodes.length == '0'){
                var oThat = this;
                var num   = 0;
                if(this.tableHeadData.length != 0){
                     Array.prototype.forEach.call(this.tableHeadData,function(v,k){
                        if(v.label != obj.label){
                            num++;
                        };
                        /**
                         * 判断是否需要添加
                         */
                        if(num == oThat.tableHeadData.length){
                            oThat.tableHeadData.push({
                                prop:obj.prop,
                                label:obj.label
                            });
                        };
                        /**
                         * 已经添加则弹出警告框！
                         */
                        if(k == (oThat.tableHeadData.length-1)){
                            oThat.$message({
                                message:'请勿重复添加指标！',
                                type:'warning'
                            });
                        }
                    });
                }else{
                    oThat.tableHeadData.push({
                        prop:obj.prop,
                        label:obj.label
                    });
                }  
            }
        },
        /**
         * 清空指标
         */
        clearColumn: function () {
            this.tableHeadData = [];
        },
        /**
         * 计算表格的高度
         */
        calcTableHeight: function () {
            this.tableHeight = this.$refs.tableBox.clientHeight - 40;
        },
        /**
         * 提取数据
         */
        pullData: function () {
            var oThat = this;
            this.loading = true;
            setTimeout(function () {
                oThat.tableData3.push.apply(oThat.tableData3,oThat.tableData3);
                oThat.loading = false;
            },1000);
        },
        /**
         * 隐藏或者显示参数
         */
        toggleThead: function (el) {
            // this.toggleShowHeader = !this.toggleShowHeader;
            // console.log(el);
            // this.$refs.table.$children[4].$el.style = "display:none";
            // console.log(this.$refs.table.$children[4].$el.style);
            // if(this.$refs.table.$children[4].$el.style.display == "none"){
            //     this.$refs.table.$children[4].$el.style = 'display:block';
            // }else{
            //     this.$refs.table.$children[4].$el.style = 'display:none';
            // }
            // Array.prototype.forEach.call(this.$refs.table.$children,function(v){
            //     if (v.$el == 'table.el-table__header') {
            //         consoel.log(v);
            //     }
            //     console.log(v.$el);
            // });
            // console.log(this.$refs.table.$children);
        },
        /**
         * 选中某个表头
         */
        activeColumn: function (column,event) {
            if(column.label == this.selectedColumn){
                this.toggleDeleteColumn = !this.toggleDeleteColumn;
            }else{
                this.selectedColumn = column.label;
                this.toggleDeleteColumn = false;
            }     
        },
        /**
         * 删除选中的表头
         */
        deleteColumn: function () {
            var oThat = this;
            Array.prototype.forEach.call(this.tableHeadData,function(v,k){
                console.log(oThat.selectedColumn);
                if(v.label == oThat.selectedColumn){
                    oThat.tableHeadData.splice(k,1);
                    oThat.toggleDeleteColumn = !oThat.toggleDeleteColumn;
                }
            });
        }   
    }
});