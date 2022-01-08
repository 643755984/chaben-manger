import { useRouter } from 'vue-router'

export default function useNav() {
    const router = useRouter();
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

    const handleDetail = (item) => {
        console.log(item.schoolId)
        router.push({name: 'schoolDetail', params: { schoolId: item.schoolId}})
    }

    return {
        handleEdit,
        handleAdd,
        handleDelete,
        handleDetail
    }
}