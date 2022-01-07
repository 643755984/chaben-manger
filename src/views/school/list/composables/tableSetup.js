import { router } from '@/router/index'

export default function useNav() {
    // 编辑
    const handleEdit = () => {
    }
    // 新增
    const handleAdd = () => {
        router.push({name: 'schoolAdd'})
    }

    // 删除操作
    const handleDelete = (index) => {
    };

    const handleDetail = (index) => {
        router.push({name: 'schoolDetail'})
    }

    return {
        handleEdit,
        handleAdd,
        handleDelete,
        handleDetail
    }
}