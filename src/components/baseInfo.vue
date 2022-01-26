<template>
    <div class="base-info">
        <div class="title">
            <span>{{ text }}</span>
            <slot name="right"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
import { toRefs } from 'vue'

export default {
    props: {
        text: {
            type: String,
            require: true
        }
    },
    setup(props) {
        const { text } = toRefs(props)

        return {
            text
        }
    }
}
</script>
<style lang="scss" scoped>
.base-info {
    padding: 15px 0;
    .title {
        position: relative;
        padding-left: 20px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: bold;
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 10px;
            height: 100%;
            border-radius: 4px;
            background: #20a0ff;
        }
    }
}
</style>