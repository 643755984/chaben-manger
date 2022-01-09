import { useRouter } from 'vue-router'

export default function useNav() {
    const router = useRouter();
    // 编辑
    const handleEdit = (item) => {
        router.push({name: 'schoolEdit', params: { schoolId: item.schoolId}})
    }
    // 新增
    const handleAdd = () => {
        router.push({name: 'schoolAdd'})
    }

    // 删除操作
    const handleDelete = (index) => {
    };

    const handleDetail = (item) => {
        router.push({name: 'schoolDetail', params: { schoolId: item.schoolId}})
    }

    return {
        handleEdit,
        handleAdd,
        handleDelete,
        handleDetail
    }
}