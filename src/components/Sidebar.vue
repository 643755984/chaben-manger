<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="(item, index) in slideBarList">
                <template v-if="item.children">
                    <el-submenu :index="item.path" :key="item.path">
                        <template #title>
                            <!-- <i :class="item.icon"></i> -->
                            <i class="el-icon-lx-home"></i>
                            <span>{{ item.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path">
                            {{ subItem.meta.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path">
                        <i class="el-icon-lx-compass"></i>
                        <template #title>{{ item.meta.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { slideBar } from '@/router/index'
import { ref } from 'vue'

export default {
    setup() {
        // const slideBar = [
        //     {
        //         icon: "el-icon-lx-home",
        //         index: "/dashboard",
        //         title: "系统首页",
        //     },
        //     {
        //         icon: "el-icon-lx-cascades",
        //         index: "2",
        //         title: "学校管理",
        //          subs: [
        //             {
        //                 index: "/school/list",
        //                 title: "学校列表",
        //             }
        //         ],
        //     },
        //     {
        //         icon: "el-icon-lx-cascades",
        //         index: "/table",
        //         title: "基础表格",
        //     },
        //     {
        //         icon: "el-icon-lx-copy",
        //         index: "/tabs",
        //         title: "tab选项卡",
        //     },
        //     {
        //         icon: "el-icon-lx-calendar",
        //         index: "3",
        //         title: "表单相关",
        //         subs: [
        //             {
        //                 index: "/form",
        //                 title: "基本表单",
        //             },
        //             {
        //                 index: "/upload",
        //                 title: "文件上传",
        //             },
        //             {
        //                 index: "4",
        //                 title: "三级菜单",
        //                 subs: [
        //                     {
        //                         index: "/editor",
        //                         title: "富文本编辑器",
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         icon: "el-icon-lx-emoji",
        //         index: "/icon",
        //         title: "自定义图标",
        //     },
        //     {
        //         icon: "el-icon-pie-chart",
        //         index: "/charts",
        //         title: "schart图表",
        //     },
        //     {
        //         icon: "el-icon-lx-global",
        //         index: "/i18n",
        //         title: "国际化功能",
        //     },
        //     {
        //         icon: "el-icon-lx-warn",
        //         index: "7",
        //         title: "错误处理",
        //         subs: [
        //             {
        //                 index: "/permission",
        //                 title: "权限测试",
        //             },
        //             {
        //                 index: "/404",
        //                 title: "404页面",
        //             },
        //         ],
        //     },
        //     {
        //         icon: "el-icon-lx-redpacket_fill",
        //         index: "/donate",
        //         title: "支持作者",
        //     },
        // ];
        

        const slideBarList = ref(slideBar)
        // console.log(slideBar)
        
        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });
        console.log('on--->', onRoutes.value)
        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            onRoutes,
            collapse,
            slideBarList
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
