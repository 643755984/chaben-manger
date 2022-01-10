import { onMounted } from 'vue'
import { deleteMajor } from "@/api/major";
import majorListSetup from '@/setup/majorListSetup'
import { ElMessage } from "element-plus";

export default function useNav() {
    let { page, majorList, majorOptions, handleSearch, changePage, getTypeLabel } = majorListSetup()

    // 删除操作
    const handleDelete = (item) => {
        deleteMajor(item.id).then(res => {
            if(res.code === 200) {
                ElMessage.success("删除专业成功")
            }else {
                ElMessage.error("删除专业失败")
            }
            handleSearch()
        })
    };

    onMounted(() => {
        handleSearch()
    })

    return {
        page,
        majorList,
        majorOptions,
        handleDelete,
        changePage,
        handleSearch,
        getTypeLabel
    }
}