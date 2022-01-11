import { reactive, onMounted } from "vue";
import { getSchoolInfo } from '@/api/school'
import { useRoute } from 'vue-router'

export default function useNav(isEdit) {
    const route = useRoute()

    let schoolInfo = reactive({
        schoolName: "",
        schoolType: "",
        schoolLevel: "",
        schoolAddress: '',
        schoolLogo: '',
        schoolEmail: ''
    })

    let tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        }
    ]

    const handleDelete = () => {

    }

    onMounted(() => {
        getSchoolInfo(route.params.schoolId).then(res => {
            if(res.code === 200) {
                Object.assign(schoolInfo, res.data)
            }
        })
    })

    return {
        schoolInfo,
        tableData,
        handleDelete
    }
}