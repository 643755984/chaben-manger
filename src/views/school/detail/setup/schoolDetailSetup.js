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

    onMounted(() => {
        getSchoolInfo(route.params.schoolId).then(res => {
            if(res.code === 200) {
                Object.assign(schoolInfo, res.data)
            }
        })
    })

    return {
        schoolInfo
    }
}