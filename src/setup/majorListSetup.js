import { ref, reactive, onMounted } from "vue";
import { getMajorList } from '@/api/major'

export default function majorList(isEdit) {

    const majorOptions = ref([
        {label: '文科', value: 0},
        {label: '理科', value: 1}
    ])

    let page = reactive({
        majorType: '',
        majorName: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });

    let majorList = ref([])

    const handleSearch = () => {
        getMajorList(page).then(res => {
            if(res.code === 200) {
                majorList.value = res.data.rows
                page.pageTotal = res.data.count
            }
        })  
    }

    const changePage  = (index) => {
        page.pageNum = index
        handleSearch()
    }

    const getTypeLabel = (type) => {
        const obj = {
            '0': '文科',
            '1': '理科'
        }
        return obj[type]
    }

    return {
        page,
        majorList,
        majorOptions,
        handleSearch,
        changePage,
        getTypeLabel
    }
}