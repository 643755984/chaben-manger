import { ref } from "vue"
import majorListSetup from '@/setup/majorListSetup'

export default function useMajorList() {
    let {page, majorList, majorOptions, handleSearch, changePage, getTypeLabel } = majorListSetup()

    let majorSelection = ref([])

    const handleSelectionChange = (val) => {
        majorSelection.value = val
    }

    return {
        page,
        majorList,
        majorOptions,
        handleSelectionChange,
        handleSearch,
        changePage,
        getTypeLabel
    }
}