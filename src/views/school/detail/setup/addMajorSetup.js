import { ref } from "vue"
import majorListSetup from '@/setup/majorListSetup'

export default function useAddMajor(isEdit) {
    let {page, majorList, majorOptions, handleSearch, changePage, getTypeLabel } = majorListSetup()

    let addMajorListRef = ref(null)

    const handleSelectionChange = () => {

    }

    return {
        page,
        majorList,
        addMajorListRef,
        majorOptions,
        handleSelectionChange,
        handleSearch,
        changePage,
        getTypeLabel
    }
}