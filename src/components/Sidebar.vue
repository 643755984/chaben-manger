<template>
    <div class="sidebar">
        <el-menu
            :default-active="onRoutes"
            background-color="#324157"
            class="sidebar-el-menu"
            text-color="#bfcbd9" 
            active-text-color="#20a0ff"
            unique-opened
            router
            :collapse="collapse"
        >
            <template v-for="(item, index) in slideBarList">
                <template v-if="item.children">
                    <el-sub-menu :index="item.path" :key="item.path">
                        <template #title>
                            <el-icon><component :is="item.meta.icon"></component></el-icon>
                            <span>{{ item.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path">{{ subItem.meta.title }}</el-menu-item>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path">
                        <el-icon><component :is="item.meta.icon"></component></el-icon>
                        <template #title>{{item.meta.title}}</template>
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

        const slideBarList = ref(slideBar)
        
        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

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
